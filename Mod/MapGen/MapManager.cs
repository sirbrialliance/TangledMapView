using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

namespace TangledMapView {
public class MapManager : MonoBehaviour {
	public static MapManager instance;

	private GameObject roomsGO, linksGO;

	internal HashSet<RoomMB> wantsLoadImage = new HashSet<RoomMB>();
	private Dictionary<string, CheckMarkerMap> transitions;

	public void Awake() {
		instance = this;

		roomsGO = new GameObject("Rooms");
		linksGO = new GameObject("Links");

		foreach (var kvp in Room.rooms) {
			var room = RoomMB.Create(kvp.Value);
			room.transform.parent = roomsGO.transform;

			room.transform.position = Random.onUnitSphere * 2000;
		}

		LinkTransitions();

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
}
}
