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
	private TransformAccessArray transformAccess;
	private JobHandle? jobHandle;
	private NativeArray<RoomPusher.Data> pusherData, prevPusherData;

	public void Awake() {
		instance = this;

		roomsGO = new GameObject("Rooms");
		linksGO = new GameObject("Links");

		transformAccess = new TransformAccessArray(Room.rooms.Count);
		pusherData = new NativeArray<RoomPusher.Data>(Room.rooms.Count, Allocator.Persistent);
		prevPusherData = new NativeArray<RoomPusher.Data>(Room.rooms.Count, Allocator.Persistent);

		int i = 0;
		foreach (var kvp in Room.rooms) {
			var room = kvp.Value;
			var roomMB = RoomMB.Create(kvp.Value);
			roomMB.transform.parent = roomsGO.transform;

			roomMB.transform.position = Random.onUnitSphere * 2000;

			transformAccess.Add(roomMB.transform);

			var bounds = new Bounds(
				//todo: not yet correctly centered on the object
				roomMB.transform.position,
				new Vector3(room.x2 - room.x1, room.y2 - room.y1, 35) * .5f
			);

			pusherData[i] = prevPusherData[i] = new RoomPusher.Data {
				worldBounds = bounds,
			};

			++i;
		}

		LinkTransitions();

		StartCoroutine(LoadImages());
	}

	public void OnDestroy() {
		transformAccess.Dispose();
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


		jobHandle = job.Schedule(transformAccess);

		// job.Execute(0, transformAccess.););
	}

	public void LateUpdate() {
		jobHandle?.Complete();
		jobHandle = null;

		var t = pusherData;
		pusherData = prevPusherData;
		prevPusherData = t;
	}
}

}
