using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Unity.Collections;
using UnityEngine;

namespace TangledMapView {
/// <summary>
/// Main handler for the main, full map view.
/// </summary>
public class MapManager : MonoBehaviour {
	public static MapManager instance;

	private GameObject roomsGO, linksGO;

	internal HashSet<RoomMB> wantsLoadImage = new HashSet<RoomMB>();
	private Dictionary<string, CheckMarkerMap> transitions;

	private RoomPusher pusher;

	public void Awake() {
		instance = this;

		roomsGO = new GameObject("Rooms");
		linksGO = new GameObject("Links");

		pusher = new RoomPusher(Room.rooms.Count);

		int i = 0;
		foreach (var kvp in Room.rooms) {
			var room = kvp.Value;
			var roomMB = RoomMB.Create(kvp.Value);
			roomMB.transform.parent = roomsGO.transform;

			roomMB.transform.position = Random.onUnitSphere * 2000;

			var bounds = new Bounds(
				new Vector3((room.x2 + room.x1) / 2f, (room.y2 + room.y1) / 2f, 0),
				new Vector3(room.x2 - room.x1, room.y2 - room.y1, 35)
			);
			var offset = -bounds.center;

			var pos = roomMB.transform.position;
			var data = new RoomPusher.Data {
				transform = roomMB.transform,
				X = pos.x - offset.x,
				Y = pos.y - offset.y,
				// Z = pos.z,
				Z = 0,
				levelBounds = bounds,
				nodeOffset = offset,
			};
			pusher.Add(data);

			roomMB.data = data;

			++i;
		}

		// LinkTransitions();

		StartCoroutine(LoadImages());
	}

	private void LinkTransitions() {

		transitions = FindObjectsOfType<CheckMarkerMap>()
			.Where(x => x.element is RoomTransition)
			.ToDictionary(x => x.element.id, x => x)
		;

		foreach (var kvp in transitions) {
			var transition = (RoomTransition)kvp.Value.element;
			if (transition.target == null) continue;

			if (!transitions.TryGetValue(transition.target, out var dest)) {
				Debug.LogWarning($"No such transition: {transition.target}");
				continue;
			}

			var link = TransitionLinkMarker.Create(kvp.Value, dest);
			link.transform.parent = linksGO.transform;
		}

	}

	private IEnumerator LoadImages() {
		var eof = new WaitForEndOfFrame();
		while (true) {
			yield return eof;

			RoomMB room = null;
			if (wantsLoadImage.Count > 0) {
				var iter = wantsLoadImage.GetEnumerator();
				iter.MoveNext();
				room = iter.Current;
				iter.Dispose();
				wantsLoadImage.Remove(room);
			} else {
				room = roomsGO.GetComponentsInChildren<RoomMB>().FirstOrDefault(x => !x.textureLoaded);
			}

			if (!room) break;

			var tex = ResourceUtil.LoadImage($"MapTiles/{room.room.id}.jpg");
			var mat = room.GetComponent<Renderer>().material;
			mat.mainTexture = tex;
			mat.color = Color.white;
			room.textureLoaded = true;
		}
	}

	public void Update() {
		pusher.Tick();

		if (Input.GetKeyDown(KeyCode.Space)) {
			var pokeTarget = pusher.data[Random.Range(0, pusher.data.Count)];
			var pos = Random.onUnitSphere * 2000;
			pokeTarget.X = pos.x;
			pokeTarget.Y = pos.y;
			pusher.Kick();
		}
	}

	public void LateUpdate() {
		pusher.UpdateTransforms();
	}
}

}
