using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using UnityEngine;

namespace TangledMapView {
public class Room {
	public string id;
		//, name;
	// public string area, randomizerArea;
	// public List<string> benches;
	/// <summary>
	/// List of items or "checks" that are in this room,
	/// typically named by what is normally there.
	/// </summary>
	public List<RoomLocation> locations = new List<RoomLocation>();
	/// <summary>
	/// Room can't be fully accessed from any entrance.
	/// List of entrances that can be accessed together.
	/// </summary>
	// public string[][] splitRoom;

	/// <summary>
	/// map of door in room -> where it goes (normally)
	/// </summary>
	public Dictionary<string, RoomTransition> transitions = new Dictionary<string, RoomTransition>();
}


public class RoomTransition {
	public string id;
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



// public class Vector3Converter : JsonConverter {
// 	public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer) {
// 		var v = (Vector3)value;
// 		writer.WriteStartObject();
// 		writer.writ
// 		writer.WriteEndObject();
// 		return new Vector3(
// 			(float)token["x"],
// 			(float)token["y"],
// 			(float)token["z"]
// 		);
//
// 	}
//
// 	public override object? ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer) {
// 		throw new NotImplementedException();
// 	}
//
// 	public override bool CanConvert(Type objectType) {
// 		return objectType == typeof(Vector3);
// 	}
// }

}
