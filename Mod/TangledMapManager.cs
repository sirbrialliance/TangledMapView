using System.Collections.Generic;
using System.Linq;
using System.Text;
using Modding;
using RandomizerCore.Logic;
using RandomizerMod.Logging;
using RandomizerMod.RandomizerData;
using RandomizerMod.RC;
using UnityEngine;
using USceneManager = UnityEngine.SceneManagement.SceneManager;
using RandoMod = RandomizerMod.RandomizerMod;

namespace TangledMapView {

[DefaultExecutionOrder(1050)]
internal class TangledMapManager : MonoBehaviour {
	/// <summary>
	/// GameObject layer we use for our purposes.
	/// </summary>
	public const int Layer = 6;

	public TangledMapViewMod mod;

	public static LogicManager RandoLogic => RandoMod.RS?.Context?.LM;

	private List<CheckMarkerWorld> markers = new List<CheckMarkerWorld>();

	public Camera overlayCamera;

	public void Start() {
		// if (Display.displays.Length > 1) {
		// 	MappingCamera.Create(mod);
		// }

		var go = new GameObject("TangledMapView Overlay");
		DontDestroyOnLoad(go);
		overlayCamera = go.AddComponent<Camera>();
		overlayCamera.enabled = false;

		TangledMapViewMod.onDataChange += OnDataChange;
	}


	private void OnDataChange() {
		// mod.LogDebug($"OnDataChange");

		if (RandoLogic == null || !TangledMapViewMod.GS.showChecksLive || !GameManager.UnsafeInstance) ClearMarkers();
		else UpdateMarkers();

		LogicDump();
	}

	private CheckState GetState(ItemPlacement placement) {
		var name = placement.Location.Name;
		var tracker = RandoMod.RS.TrackerData;
		if (tracker.clearedLocations.Contains(name)) return CheckState.Obtained;
		else if (tracker.previewedLocations.Contains(name)) return CheckState.Previewed;
		else if (tracker.uncheckedReachableLocations.Contains(name)) return CheckState.Reachable;
		//todo: don't show unrandomized items
		else return CheckState.Unreachable;
	}

	private CheckState GetState(TransitionDef transition) {
		var name = transition.Name;
		var tracker = RandoMod.RS.TrackerData;

		if (transition.Sides == TransitionSides.OneWayOut) {
			//If you can't travel through it from here at all, it's moot to show any state.
			return CheckState.OneWay;
		}

		var isRandomized = false;
		var transitionPlacements = RandoMod.RS.Context.transitionPlacements;
		if (transitionPlacements != null) isRandomized = transitionPlacements.Any(
			x => x.Source.TransitionDef == transition
		);

		if (isRandomized) {
			if (tracker.visitedTransitions.ContainsKey(name)) return CheckState.Obtained;
			else if (tracker.uncheckedReachableTransitions.Contains(name)) return CheckState.Reachable;
			else return CheckState.Unreachable;
		} else {
			if (tracker.pm.Get(name) > 0) return CheckState.Unchanged;
			else return CheckState.UnchangedUnreachable;
		}
	}

	private void UpdateMarkers() {
		UpdateCamera(true);
		var keepMarkers = new List<CheckMarkerWorld>();
		var room = Room.Get(GameManager.instance.sceneName);

		if (room == null) {
			if (GameManager.instance.sceneName != "Menu_Title") {
				mod.LogWarn($"Unknown room {GameManager.instance.sceneName}");
			}
			ClearMarkers();
			return;
		}

		// mod.LogDebug($"UpdateMarkers scene: {room.id}");

		CheckMarkerWorld GetMarker(RoomElement element) {
			var marker = markers.FirstOrDefault(x => x.element == element);
			if (!marker) {
				// var go = new GameObject("Marker for " + placement.Location.Name);
				var go = GameObject.CreatePrimitive(PrimitiveType.Quad);
				go.name = "Marker for " + element.id;
				go.layer = Layer;
				marker = go.AddComponent<CheckMarkerWorld>();
				marker.element = element;
				markers.Add(marker);
			}
			keepMarkers.Add(marker);

			return marker;
		}

		foreach (var placement in RandoMod.RS.Context.itemPlacements) {
			if (placement.Location.LocationDef.SceneName != room.id) {
				// mod.LogDebug($"No match on {placement}, {placement.Location.Name}, {placement.Location.LocationDef.SceneName}");
				continue;
			}

			//(Even though the scene is loaded, can't use RoomLocation.From here as items have already been swapped.)
			var loc = room.locations.FirstOrDefault(x => x.id == placement.Location.Name);
			if (loc == null) {
				mod.LogWarn($"Couldn't find item location {placement.Location.Name}");
				continue;
			}

			var marker = GetMarker(loc);
			marker.state = GetState(placement);

			//Make everything clamp a little different so it's easier to see multiple items at the edge.
			//...using random because itemPlacements might have spoiler biases and I'm too lazy to do a deterministic thing.
			//...like based on the item name.
			marker.offset = new Vector2(Random.Range(-.2f, .2f), Random.Range(-.2f, .2f));
			marker.inset = 2.1f;

			marker.UpdateVisuals();
			// mod.LogDebug($"Maker for {marker.placementId} in state {marker.state}");
		}

		foreach (var kvp in Data.Transitions) {
			var randoTransition = kvp.Value;
			if (randoTransition.SceneName != room.id) continue;



			var tangledTransition = room.transitions.FirstOrDefault(x => x.id == kvp.Key);
			if (tangledTransition == null || tangledTransition.Position == Vector3.zero) {
				//don't have it or don't have data, try to find it locally.
				var door = FindObjectsOfType<TransitionPoint>(true)
					.FirstOrDefault(x => x.name == randoTransition.DoorName)
				;
				if (door) {
					mod.LogWarn($"Failed to find location for {randoTransition.Name}, but is in scene");
					// room.transitions.Add(new RoomTransition {
					// 	id = kvp.Key,
					// 	doorId = door.name,
					// 	Position = door.transform.position,
					// });
				} else {
					mod.LogError($"Failed to find location for {randoTransition.Name}");
					continue;
				}
			}

			var marker = GetMarker(tangledTransition);
			marker.state = GetState(randoTransition);

			marker.offset = new Vector2(Random.Range(-.2f, .2f), Random.Range(-.2f, .2f));
			marker.inset = 1.1f;

			marker.UpdateVisuals();

		}

		for (int i = 0; i < markers.Count; i++) {
			var marker = markers[i];
			if (!marker || !keepMarkers.Contains(marker)) {
				if (marker) Destroy(marker.gameObject);
				markers.RemoveAt(i--);
			}
		}
	}

	private void UpdateCamera(bool enable) {
		if (!enable || !GameManager.UnsafeInstance) {
			overlayCamera.enabled = false;
			return;
		}

		var mainCamera = GameManager.instance.cameraCtrl.cam;

		if (!mainCamera) {
			overlayCamera.enabled = false;
			return;
		}

		//set the normal camera to not render our layer
		mainCamera.cullingMask &= ~(1 << Layer);

		overlayCamera.CopyFrom(mainCamera);
		overlayCamera.cullingMask = 1 << Layer;
		overlayCamera.depth = 100;
		overlayCamera.enabled = true;
		overlayCamera.clearFlags = CameraClearFlags.Nothing;
	}

	public void LateUpdate() {
		if (overlayCamera && overlayCamera.enabled && GameManager.UnsafeInstance && GameManager.UnsafeInstance.cameraCtrl) {
			overlayCamera.transform.position = GameManager.instance.cameraCtrl.cam.transform.position;
		}
	}

	private void ClearMarkers() {
		foreach (var marker in markers) {
			if (marker) Destroy(marker.gameObject);
		}
		markers.Clear();
	}

	private void LogicDump() {
		// mod.Log("Trigger logic dump");

		var sb = new StringBuilder();
		sb.Append("Logic dump:\n");

		if (RandoLogic == null) {
			//No save, or save not randomized
			return;
		}
		var RS = RandoMod.RS;
		var progress = RS.TrackerData.pm;


		var locationList = new List<string>();
		foreach (var location in RS.TrackerData.uncheckedReachableLocations) {
			var data = Data.Locations[location];
			locationList.Add($"{data.SceneName} -> {data.Name}");
		}
		locationList.Sort();
		sb.Append("Reachable:\n");
		sb.Append(string.Join("\n", locationList));



		sb.Append("\n\nLogic details:\n");
		var usedTerms = new HashSet<int>();

		void DumpDef(string logicName) {
			sb.Append(logicName).Append(": ");
			var logic = RandoLogic.GetLogicDef(logicName);

			if (logic == null) {
				sb.Append("<not found>\n");
				return;
			}

			sb.Append(logic.InfixSource).Append("\n");

			usedTerms.Clear();

			foreach (var term in logic.GetTerms()) {
				if (usedTerms.Contains(term.Id)) continue;
				sb.Append($"\t{term.Name} = {progress.Get(term.Id)}\n");
				usedTerms.Add(term.Id);
			}

			// foreach (var token in logic.ToTokenSequence()) {
			// 	sb.Append("\t").Append(token.ToString()).Append("\n");
			// }

			sb.Append("\n");
		}

		sb.Append("Unchecked reachable placements:\n");
		foreach (var logicName in RS.TrackerData.uncheckedReachableLocations) {
			DumpDef(logicName);
		}

		sb.Append("\n\nTransitions:\n");
		foreach (var kvp in Data.Transitions) {
			DumpDef(kvp.Value.Name);
		}


		LogManager.Write(sb.ToString(), "DebugLogicDump.txt");
	}
}

}
