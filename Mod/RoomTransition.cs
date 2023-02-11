using Newtonsoft.Json;
using UnityEngine;

namespace TangledMapView {
public class RoomTransition {
	public string id;
	public float x, y, z;
	public string target;

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
