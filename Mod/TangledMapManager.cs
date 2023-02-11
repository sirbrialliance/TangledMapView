using System.Collections.Generic;
using System.Linq;
using System.Text;
using ItemChanger;
using Modding;
using RandomizerCore.Logic;
using RandomizerMod.Logging;
using RandomizerMod.RandomizerData;
using RandomizerMod.RC;
using UnityEngine;
using UnityEngine.SceneManagement;
using USceneManager = UnityEngine.SceneManagement.SceneManager;
using RandoMod = RandomizerMod.RandomizerMod;

namespace TangledMapView {
internal class TangledMapManager : MonoBehaviour {
	public TangledMapViewMod mod;

	public static LogicManager RandoLogic => RandoMod.RS?.Context?.LM;

	private List<WorldCheckMarker> markers = new List<WorldCheckMarker>();

	public void Start() {
		// if (Display.displays.Length > 1) {
		// 	MappingCamera.Create(mod);
		// }
	}

	public void OnEnable() {
		TangledMapViewMod.onDataChange += OnDataChange;
	}

	private void OnDataChange() {
		mod.LogDebug($"OnDataChange");

		if (RandoLogic == null || !TangledMapViewMod.GS.showChecksLive) ClearMarkers();
		else UpdateMarkers();

		LogicDump();
	}

	private CheckState GetState(ItemPlacement placement) {
		var name = placement.Location.Name;
		var tracker = RandoMod.RS.TrackerData;
		if (tracker.clearedLocations.Contains(name)) return CheckState.Obtained;
		else if (tracker.previewedLocations.Contains(name)) return CheckState.Previewed;
		else if (tracker.uncheckedReachableLocations.Contains(name)) return CheckState.Reachable;
		else return CheckState.Unreachable;
	}

	private void UpdateMarkers() {
		var keepMarkers = new List<WorldCheckMarker>();
		var room = Room.Get(GameManager.instance.sceneName);

		if (room == null) {
			if (GameManager.instance.sceneName != "Menu_Title") {
				mod.LogWarn($"Unknown room {GameManager.instance.sceneName}");
			}
			ClearMarkers();
			return;
		}

		// mod.LogDebug($"UpdateMarkers scene: {room.id}");

		foreach (var placement in RandoMod.RS.Context.itemPlacements) {
			if (placement.Location.LocationDef.SceneName != room.id) {
				// mod.LogDebug($"No match on {placement}, {placement.Location.Name}, {placement.Location.LocationDef.SceneName}");
				continue;
			}

			var marker = markers.FirstOrDefault(x => x.placementId == placement.Location.Name);
			if (!marker) {
				// var go = new GameObject("Marker for " + placement.Location.Name);
				var go = GameObject.CreatePrimitive(PrimitiveType.Quad);
				go.name = "Marker for " + placement.Location.Name;
				marker = go.AddComponent<WorldCheckMarker>();
				marker.placementId = placement.Location.Name;
				markers.Add(marker);
			}

			marker.state = GetState(placement);
			//(Even though the scene is loaded, can't use RoomLocation.From here as items have already been swapped.)
			var loc = room.locations.FirstOrDefault(x => x.id == placement.Location.Name);
			if (loc == null) {
				mod.LogWarn($"Couldn't find item location {placement.Location.Name}");
				marker.targetLocation = Vector3.zero;
			} else {
				marker.targetLocation = loc.Position;
			}

			marker.UpdateVisuals();

			// mod.LogDebug($"Maker for {marker.placementId} in state {marker.state}");

			keepMarkers.Add(marker);
		}


		for (int i = 0; i < markers.Count; i++) {
			var marker = markers[i];
			if (!marker || !keepMarkers.Contains(marker)) {
				if (marker) Destroy(marker.gameObject);
				markers.RemoveAt(i--);
			}
		}
	}

	private void ClearMarkers() {
		foreach (var marker in markers) {
			Destroy(marker.gameObject);
		}
		markers.Clear();
	}

	private void LogicDump() {
		mod.Log("Trigger logic dump");

		var sb = new StringBuilder();
		sb.Append("Logic dump:\n");

		if (RandoLogic == null) {
			//No save, or save not randomized
			return;
		}
		var RS = RandoMod.RS;
		var progress = RS.TrackerData.pm;


		mod.Log("Part 2");

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
