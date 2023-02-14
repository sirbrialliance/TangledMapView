using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Unity.Collections;
using Unity.Jobs;
using UnityEngine;
using UnityEngine.Jobs;

namespace TangledMapView {
public class MapManager : MonoBehaviour {
	public static MapManager instance;

	private GameObject roomsGO, linksGO;

	internal HashSet<RoomMB> wantsLoadImage = new HashSet<RoomMB>();
	private Dictionary<string, CheckMarkerMap> transitions;
	private JobHandle? jobHandle;
	private NativeArray<RoomPusher.Data> pusherData, prevPusherData;
	private Transform[] roomTransforms;

	public void Awake() {
		instance = this;

		roomsGO = new GameObject("Rooms");
		linksGO = new GameObject("Links");

		pusherData = new NativeArray<RoomPusher.Data>(Room.rooms.Count, Allocator.Persistent);
		prevPusherData = new NativeArray<RoomPusher.Data>(Room.rooms.Count, Allocator.Persistent);
		roomTransforms = new Transform[Room.rooms.Count];

		int i = 0;
		foreach (var kvp in Room.rooms) {
			var room = kvp.Value;
			var roomMB = RoomMB.Create(kvp.Value);
			roomMB.transform.parent = roomsGO.transform;

			roomMB.transform.position = Random.onUnitSphere * 2000;

			var bounds = new Bounds(
				//todo: not yet correctly centered on the object
				roomMB.transform.position,
				new Vector3(room.x2 - room.x1, room.y2 - room.y1, 35) * .5f
			);

			pusherData[i] = prevPusherData[i] = new RoomPusher.Data {
				p = roomMB.transform.position,
				worldBounds = bounds,
			};

			roomTransforms[i] = roomMB.transform;

			++i;
		}

		LinkTransitions();

		StartCoroutine(LoadImages());
	}

	public void OnDestroy() {
		pusherData.Dispose();
		prevPusherData.Dispose();
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
		var job = new RoomPusher{roomsData = pusherData, prevRoomsData = prevPusherData};
		jobHandle = job.Schedule(pusherData.Length, 16);
	}

	public void LateUpdate() {
		jobHandle?.Complete();
		jobHandle = null;

		for (int i = 0; i < pusherData.Length; i++) {
			roomTransforms[i].position = pusherData[i].p;
		}

		var t = pusherData;
		pusherData = prevPusherData;
		prevPusherData = t;
	}
}

}
