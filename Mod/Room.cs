using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using RandomizerMod.RandomizerData;
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


	static Dictionary<string, Room> rooms;
	static Room() {
		var assembly = typeof(TangledMapViewMod).Assembly;
		using var resourceStream = assembly.GetManifestResourceStream("mapData.json");
		using var sr = new StreamReader(resourceStream);
		var json = sr.ReadToEnd();

		var roomsList = JsonUtil.DeserializeString<List<Room>>(json);
		rooms = roomsList.ToDictionary(x => x.id, x => x);
	}

	public static Room Get(string name) {
		rooms.TryGetValue(name, out var ret);
		return ret;
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
