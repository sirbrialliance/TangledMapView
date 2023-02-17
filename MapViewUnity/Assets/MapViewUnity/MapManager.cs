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

			foreach (var transition in room.transitions) {
				transition.UpdateDetails();
			}

			var bounds = new Bounds(
				new Vector3((room.x2 + room.x1) / 2f, (room.y2 + room.y1) / 2f, 0),
				new Vector3(room.x2 - room.x1, room.y2 - room.y1, 35)
			);
			var offset = -bounds.center;

			var pos = roomMB.transform.position;
			var data = new RoomPusher.Room {
				id = room.id,
				transform = roomMB.transform,
				X = pos.x - offset.x,
				Y = pos.y - offset.y,
				// Z = pos.z,
				Z = 0,
				levelBounds = bounds,
				nodeOffset = offset,
			};
			pusher.Add(data);

			roomMB.pusherData = data;

			++i;
		}

		LinkTransitions();

		StartCoroutine(LoadImages());
	}

	private void LinkTransitions() {

		//All the rooms we created contain their item locations and transitions, grab the transitions.
		transitions = FindObjectsOfType<CheckMarkerMap>()
			.Where(x => x.element is RoomTransition)
			.ToDictionary(x => x.element.id, x => x)
		;

		var handledLinks = new HashSet<string>();

		foreach (var kvp in transitions) {
			var transition = (RoomTransition)kvp.Value.element;
			if (transition.Target == null) continue;

			if (!transitions.TryGetValue(transition.Target, out var dest)) {
				Debug.LogWarning($"No such transition: {transition.Target}, which {transition.id} targets");
				continue;
			}

			var line = TransitionLineMarker.Create(kvp.Value, dest);
			line.transform.parent = linksGO.transform;

			var link = new RoomPusher.Link(transition, (RoomTransition)dest.element);

			if (!handledLinks.Contains(link.Id)) {
				link.Init(pusher);
				pusher.links.Add(link);
				handledLinks.Add(link.Id);
			}

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
			var pokeTarget = pusher.rooms[Random.Range(0, pusher.rooms.Count)];
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
