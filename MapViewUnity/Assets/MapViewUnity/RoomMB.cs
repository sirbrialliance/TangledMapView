using System.IO;
using UnityEngine;

namespace TangledMapView {
public class RoomMB : MonoBehaviour {

	public static RoomMB Create(Room room) {
		var go = new GameObject(room.id);
		var roomMB = go.AddComponent<RoomMB>();
		roomMB.room = room;


		var meshFilter = go.AddComponent<MeshFilter>();
		var mesh = new Mesh();
		mesh.name = "Quad for " + room.id;

		const float z = .01f;
		mesh.vertices = new[] {
			new Vector3(room.x1, room.y1, z),
			new Vector3(room.x1, room.y2, z),
			new Vector3(room.x2, room.y2, z),
			new Vector3(room.x2, room.y1, z),
		};
		mesh.uv = new[] {
			new Vector2(0, 0),
			new Vector2(0, 1),
			new Vector2(1, 1),
			new Vector2(1, 0),
		};
		mesh.triangles = new[] {
			0, 1, 2,
			0, 2, 3,
		};
		meshFilter.mesh = mesh;


		var renderer = go.AddComponent<MeshRenderer>();
		var mat = new Material(ResourceUtil.UnlitTransparentShader());
		mat.color = Color.black;
		mat.mainTexture = Texture2D.whiteTexture;//will load later
		renderer.material = mat;

		roomMB.AddMarkers();

		return roomMB;
	}



	public Room room;

	public bool textureLoaded;
	public RoomPusher.Data data;

	public void OnWillRenderObject() {
		if (!textureLoaded) MapManager.instance.wantsLoadImage.Add(this);
	}

	private void AddMarkers() {
		CheckMarkerMap MakeMarker(RoomElement el) {
			var go = new GameObject(el.id);
			go.AddComponent<MeshFilter>().mesh = ResourceUtil.Quad();
			var renderer = go.AddComponent<MeshRenderer>();
			// renderer.material = new Material(ResourceUtil.UnlitTransparentShader());
			var marker = go.AddComponent<CheckMarkerMap>();
			marker.element = el;

			go.transform.parent = transform;
			go.transform.localPosition = el.Position;

			return marker;
		}

		foreach (var location in room.locations) {
			var marker = MakeMarker(location);
			marker.state = CheckState.Reachable;
			marker.UpdateVisuals();
		}

		foreach (var transition in room.transitions) {
			var marker = MakeMarker(transition);
			marker.state = transition.target == null ? CheckState.OneWay : CheckState.Reachable;
			marker.UpdateVisuals();
		}

	}

	public void OnDrawGizmosSelected() {
		Gizmos.color = Color.cyan;
		Gizmos.DrawWireSphere(data.XYZ, data.levelBounds.extents.magnitude);
	}

}
}
