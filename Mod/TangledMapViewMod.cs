
using System;
using System.Collections;
using System.Linq;
using System.Reflection;
using ItemChanger;
using Modding;
using Modding.Patches;
using MonoMod.RuntimeDetour;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RandomizerMod;
using UnityEngine;
using UnityEngine.SceneManagement;
using Object = UnityEngine.Object;

namespace TangledMapView {

public class TangledMapViewMod : Mod {
	// We could do ITogglableMod now but...if you don't want to sue it just don't open a browser window
	// RandomizerMod isn't tobbleable either.

	public static TangledMapViewMod Instance { get; private set; }

	internal MapServer server;

	private bool saveLoaded, startingSave;
	private RandomizerMod.RandomizerMod rndMod;
	private ItemChangerMod itemMod;
	public string CurrentRoom { get; private set; }

	public TangledMapViewMod() : base("TangledMapView") { }

	public override string GetVersion() => "0.1.0";

	public override int LoadPriority() => 100;//want randomizer to load before us

	public override void Initialize() {
		base.Initialize();
		Instance = this;

		//Make an object to help us do things:
		var go = new GameObject("TangledMapManager", typeof(TangledMapManager));
		var tmm = go.GetComponent<TangledMapManager>();
		tmm.mod = this;
		Object.DontDestroyOnLoad(go);

		rndMod = (RandomizerMod.RandomizerMod)ModHooks.GetMod(typeof(RandomizerMod.RandomizerMod));
		itemMod = (ItemChangerMod)ModHooks.GetMod(typeof(ItemChangerMod));

		//add hook to watch when the randomizer gives the player an item
		AbstractItem.AfterGiveGlobal += OnGiveItem;

		ItemChanger.Events.OnBeginSceneTransition += OnBeginSceneTransition;


		UnityEngine.SceneManagement.SceneManager.sceneLoaded += OnSceneLoaded;
		ModHooks.AfterSavegameLoadHook += data => {
			// Log("get load");
			saveLoaded = true;
			server.Send(PrepareSaveDataMessage());
		};

		ItemChanger.Events.AfterStartNewGame += () => {
			server.Send(PrepareSaveDataMessage());
		};
		// On.UIManager.StartNewGame += (orig, self, death, rush) => {
		// 	// Log("got StartNewGame");
		// 	startingSave = true;//we will actually push data once a scene loads
		// 	orig(self, death, rush);
		// };
	}


	private static void OnGiveItem(ReadOnlyGiveEventArgs ev) {
		// Instance.Log($"GiveItem hook: {action}, {item}, {location}, {geo}");

		Instance.server.Send(JToken.FromObject(new {
			type = "getItem",
			item = ev.Item.name, location = ev.Placement.Name,
		}).ToString());
	}

	private void OnBeginSceneTransition(Transition transition) {
		// Log($"OnBeginSceneTransition: to {info.SceneName}[{info.EntryGateName}]");
		if (!string.IsNullOrEmpty(transition.SceneName) && !string.IsNullOrEmpty(transition.GateName)) {
			server.Send("revealTransition", "to", $"{transition.SceneName}[{transition.GateName}]");
		}
	}

	private void OnSceneLoaded(Scene scene, LoadSceneMode mode) {
		CurrentRoom = scene.name;

		if (scene.name == "Menu_Title") {
			if (saveLoaded) {
				saveLoaded = false;
				startingSave = false;
				server.Send(PrepareSaveDataMessage());
			}
			return;
		}

		if (startingSave) {
			startingSave = false;
			saveLoaded = true;
			server.Send(PrepareSaveDataMessage());
		}

		server.Send(PreparePlayerMoveMessage());
	}

	public string PreparePlayerMoveMessage() {
		return JToken.FromObject(new {
			type = "playerMove",
			newRoom = CurrentRoom,
		}).ToString();
	}

	public string PrepareSaveDataMessage() {
		if (!saveLoaded) {
			return JToken.FromObject(new {
				type = "unloadSave",
			}).ToString();
		}


		var randoContext = RandomizerMod.RandomizerMod.RS.Context;

		var itemPlacements = randoContext.itemPlacements.Select(placement => new {
			item = placement.Item.ItemDef.Name,
			location = placement.Location.LocationDef.Name,
		}).ToArray();

		var transitionPlacements = randoContext.transitionPlacements
			.ToDictionary(p => p.Source.TransitionDef.Name, p => p.Target.TransitionDef.Name)
		;

		return JsonConvert.SerializeObject(
			new {
				type = "loadSave",
				data = new {
					playerData = GameManager.instance.playerData,
					itemPlacements,
					transitionPlacements,
					randomizerSettings = RandomizerMod.RandomizerMod.RS,
					//where we spawn
					start = ItemChanger.Internal.Ref.Settings.Start,
				},
			},
			Formatting.None, new JsonSerializerSettings {
				ContractResolver = ShouldSerializeContractResolver.Instance,
				TypeNameHandling = TypeNameHandling.Auto,
				Converters = JsonConverterTypes.ConverterTypes,
			}
		);
	}


}

internal class TangledMapManager : MonoBehaviour {
	public TangledMapViewMod mod;
	public void Start() => StartCoroutine(StartServer());
	public void OnApplicationQuit() => mod?.server.Stop();
	public void OnDisable() => mod?.server.Stop();

	private IEnumerator StartServer() {
		//game crashes if we start server right away
		yield return null;
		yield return null;
		yield return null;

		mod.server = new MapServer((Modding.ILogger)mod);
		mod.server.Start();
		mod.Log("TangledMapViewMod web server started: http://localhost:" + mod.server.port + "/");

	}
}

}
