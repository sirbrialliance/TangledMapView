using System.Text.RegularExpressions;
using Newtonsoft.Json;
using UnityEngine;

namespace TangledMapView {
public class RoomTransition : RoomElement {
	//Note: this.id is the full id e.g. "Town[bot1]"

	/// <summary>
	/// Id of where this normally goes.
	/// </summary>
	[JsonProperty("target")]
	public string vanillaTarget;

	/// <summary>
	/// Where this transition currently leads. null if not changed/randomized.
	/// </summary>
	[JsonIgnore]
	public string currentTarget;

	[JsonIgnore]
	public string Target => currentTarget ?? vanillaTarget;

	[JsonIgnore]
	public string srcDoor, srcRoom, srcSide;
	[JsonIgnore]
	public string destDoor, destRoom, destSide;

	/// <summary>
	/// Populate details about the transition and its destination based on our id and current
	/// target.
	/// </summary>
	public void UpdateDetails() {
		var src = ParseDoorId(id);
		srcDoor = src.doorId;//which is just our id
		srcRoom = src.roomId;
		srcSide = src.side;

		var dest = ParseDoorId(Target);
		destDoor = dest.doorId;
		destRoom = dest.roomId;
		destSide = dest.side;
	}

	// public record DoorId(string doorId, string roomId, string doorName, string side, int number);
	public struct DoorId {
		public string doorId;
		public string roomId;
		public string doorName;
		public string side;
		public int number;
	}

	private static Regex doorIdMatch = new Regex(@"^(\w+)\[(([a-zA-Z_]+)(\d*))\]$");

	public static DoorId ParseDoorId(string doorId) {
		if (string.IsNullOrEmpty(doorId)) {
			return new DoorId{number = -1};
		}
		var parts = doorIdMatch.Match(doorId);

		if (int.TryParse(parts.Groups[4].Value, out var number)) {
			number = -1;
		}

		var ret = new DoorId {
			doorId = doorId,// Town[left1]
			roomId = parts.Groups[1].Value, // Town
			doorName = parts.Groups[2].Value, // left1
			side = parts.Groups[3].Value, // left
			number = number, // 1
		};

		// let info = window.mapData.rooms[ret.roomId].transitions[ret.doorName]
		// if (info && info.side) ret.side = info.side

		return ret;
	}


	public static Vector3 DoorDirection(RoomElement el) {
		var transition = el as RoomTransition;
		if (transition == null) return Vector3.zero;

		return DoorDirection(transition.srcSide);
	}

	public static Vector3 DoorDirection(string side) {
		if (string.IsNullOrEmpty(side)) return Vector3.zero;

		switch (side[0]) {
			case 't': return Vector3.up;
			case 'b': return Vector3.down;
			case 'l': return Vector3.left;
			case 'r': return Vector3.right;
			// default: return Vector3.zero;//doors, mostly
			default: return Vector3.back;//doors, mostly
		}
	}

}
}
