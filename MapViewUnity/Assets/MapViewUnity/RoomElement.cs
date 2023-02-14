using Newtonsoft.Json;
using UnityEngine;

namespace TangledMapView {

/// <summary>
/// Something that's located in a room and has a position.
/// </summary>
public class RoomElement {
	public string id;

	/// <summary>
	/// Position in room.
	/// </summary>
	public float x, y, z;

	[JsonIgnore]
	public Vector3 Position {
		get => new Vector3(x, y, z);
		set {
			x = value.x;
			y = value.y;
			z = value.z;
		}
	}
}

}
