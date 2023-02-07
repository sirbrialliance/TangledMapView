
using System;
using System.Collections;
using System.Reflection;
using Modding;
using Modding.Patches;
using RandomizerMod;
using UnityEngine;
using UnityEngine.SceneManagement;
using Object = UnityEngine.Object;

namespace TangledMapView {

public class TangledMapViewMod : Mod {
	public static TangledMapViewMod Instance { get; private set; }

	// public SaveGameData activeSaveData;
	private bool saveLoaded, startingSave;
	private RandomizerMod.RandomizerMod rndMod;
	public string CurrentRoom { get; private set; }

	public TangledMapViewMod() : base("TangledMapView") { }

	public override int LoadPriority() {
		return 100;//want randomizer to load before us
	}


	public override void Initialize() {
		base.Initialize();
		Instance = this;

		//Make an object to help us do things:
		var go = new GameObject("TangledMapManager", typeof(TangledMapManager));
		var tmm = go.GetComponent<TangledMapManager>();
		tmm.mod = this;
		Object.DontDestroyOnLoad(go);


		ModHooks.SceneChanged += OnSceneChanged;
		// UnityEngine.SceneManagement.SceneManager.sceneLoaded += OnSceneLoaded;
		ModHooks.AfterSavegameLoadHook += data => {
			Log("get load");
			saveLoaded = true;
		};

		// ModHooks.NewGameHook...
		// 	startingSave = true;//we will actually push data once a scene loads
		// On.UIManager.StartNewGame += (orig, self, death, rush) => {
		// 	// Log("got StartNewGame");
		// 	orig(self, death, rush);
		// };
		//note: ModHooks.Instance.NewGameHook not called, likely because the randomizer mod overrides how a game is started
	}

	// private static void OnGiveItem(GiveItem_Fn orig, GiveAction action, string item, string location, int geo) {
	// 	orig(action, item, location, geo);
	// 	Instance.Log($"GiveItem hook: {action}, {item}, {location}, {geo}");
	//
	// 	Instance.server.Send(JToken.FromObject(new {
	// 		type = "getItem",
	// 		item, location,
	// 	}).ToString());
	// }

	private void OnSceneChanged(string newScene) {
		// Log($"OnBeginSceneTransition: to {info.SceneName}[{info.EntryGateName}]");
		// if (!string.IsNullOrEmpty(info.SceneName) && !string.IsNullOrEmpty(info.EntryGateName)) {
		// 	server.Send("revealTransition", "to", $"{info.SceneName}[{info.EntryGateName}]");
		// }

		LogDebug("Scene transition " + newScene);

		// CurrentRoom = scene.name;
		//
		// if (scene.name == "Menu_Title") {
		// 	if (saveLoaded) {
		// 		saveLoaded = false;
		// 		startingSave = false;
		// 		server.Send(PrepareSaveDataMessage());
		// 	}
		// 	return;
		// }
		//
		// if (startingSave) {
		// 	startingSave = false;
		// 	saveLoaded = true;
		// 	server.Send(PrepareSaveDataMessage());
		// }
		//
		// server.Send(PreparePlayerMoveMessage());
	}

	// public string PreparePlayerMoveMessage() {
	// 	return JToken.FromObject(new {
	// 		type = "playerMove",
	// 		newRoom = CurrentRoom,
	// 	}).ToString();
	// }
	//
	// public string PrepareSaveDataMessage() {
	// 	if (!saveLoaded) {
	// 		return JToken.FromObject(new {
	// 			type = "unloadSave",
	// 		}).ToString();
	// 	}
	//
	// 	return JsonConvert.SerializeObject(
	// 		new {
	// 			type = "loadSave",
	// 			data = new {
	// 				//this is more-or-less the normal save file data, but not everything
	// 				playerData = GameManager.instance.playerData,
	// 				PolymorphicModData = new {RandomizerMod = JsonConvert.SerializeObject(rndMod.Settings)},
	// 			},
	// 		},
	// 		Formatting.None, new JsonSerializerSettings {
	// 			ContractResolver = ShouldSerializeContractResolver.Instance,
	// 			TypeNameHandling = TypeNameHandling.Auto,
	// 			Converters = JsonConverterTypes.ConverterTypes,
	// 		}
	// 	);
	// }



	public override string GetVersion() {
		return "0.4.0";
	}
}
}
