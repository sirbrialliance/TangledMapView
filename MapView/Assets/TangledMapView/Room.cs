using System.Collections.Generic;
using UnityEngine;

namespace TangledMapView {
public class Room {
	public string id, name;
	public string area, randomizerArea;
	public List<string> benches;
	/// <summary>
	/// List of items or "checks" that are in this room,
	/// typically named by what is normally there.
	/// </summary>
	public List<RoomLocation> locations;
	/// <summary>
	/// Room can't be fully accessed from any entrance.
	/// List of entrances that can be accessed together.
	/// </summary>
	public string[][] splitRoom;

	/// <summary>
	/// map of door in room -> where it goes (normally)
	/// </summary>
	public Dictionary<string, Transition> transitions;
}


public class RoomLocation {
	public string id;
	//public string objectName;
	public string pool;
	public Vector3 position;


}

public class Transition {
	public string target;
	public Vector3 position;
}

}
