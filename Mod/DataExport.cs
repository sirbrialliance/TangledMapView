using System.Collections.Generic;
using System.IO;
using System.Reflection;
using RandomizerMod.RandomizerData;

namespace TangledMapView {
public class DataExport {
	// public const string SrcScenesFolder = "SrcScenes";
	public const string OutFolder = "MappingTiles";

	public static bool WantScene(string name) {
		if (string.IsNullOrEmpty(name)) return false;
		switch (name) {
			case "BetaEnd":
			case "Opening_Sequence":
			case "Beta":
			case "Pre_Menu_Intro":
			case "PermaDeath_Unlock":
			case "Quit_To_Menu":
			case "Dream_Room_Believer_Shrine":
			case "Dream_Backer_Shrine":
			case "PermaDeath":
			case "Menu_Title":
				return false;
			case "GG_Lurker":
			case "GG_Pipeway":
			case "GG_Waterways":
				return true;
		}

		name = name.ToLowerInvariant();
		if (name.StartsWith("_")) return false;
		if (name.StartsWith("cutscene")) return false;
		if (name.StartsWith("cinematic")) return false;
		if (name.StartsWith("end")) return false;
		if (name.StartsWith("menu")) return false;
		if (name.StartsWith("gg_")) return false;
		if (name.EndsWith("_preload")) return false;
		if (name.EndsWith("_boss")) return false;
		if (name.EndsWith("_boss_defeated")) return false;

		return true;
	}

	public static IEnumerable<string> GetGameScenes() {
		//Can't use UnitySceneManager to grab data, unloaded scenes don't have names.
		//So we'll...just steal the list from ItemChanger.
		var consts = typeof(ItemChanger.SceneNames).GetFields(BindingFlags.Public | BindingFlags.Static);
		foreach (var fieldInfo in consts) {
			if (fieldInfo.FieldType != typeof(string)) continue;
			var name = fieldInfo.GetRawConstantValue() as string;
			if (string.IsNullOrEmpty(name)) continue;
			if (!WantScene(name)) continue;
			yield return name;
		}
	}

	public static void ExportData() {
		var allRooms = new List<Room>();

		foreach (var sceneName in GetGameScenes()) {
			var json = File.ReadAllText($"{OutFolder}/{sceneName}.json");
			var roomData = JsonUtil.DeserializeString<Room>(json);
			allRooms.Add(roomData);
		}

		var allData = JsonUtil.Serialize(allRooms);
		File.WriteAllText($"{OutFolder}/mapData.json", allData);
	}
}
}
