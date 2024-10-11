
using System;
using System.Collections;
using System.Collections.Generic;
using System.Reflection;
using ItemChanger;
using Modding;
using Modding.Patches;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RandomizerMod;
using RandomizerMod.IC;
using UnityEngine;
using UnityEngine.SceneManagement;
using Object = UnityEngine.Object;
using USceneManager = UnityEngine.SceneManagement.SceneManager;

namespace TangledMapView {

/// <summary>
/// A mod for helping you find your way when things are randomized, particularly for transition randomizations.
///
/// This class also handles the web server side of things for the in-browser map.
/// </summary>
public class TangledMapViewMod : Mod, IMenuMod,
	IGlobalSettings<TangledMapViewGlobalSettings>,
	ILocalSettings<TangledMapViewLocalSettings>
{
	public static TangledMapViewMod Instance { get; private set; }

	public static TangledMapViewGlobalSettings GS = new TangledMapViewGlobalSettings();
	public static TangledMapViewLocalSettings LS = new TangledMapViewLocalSettings();

	/// <summary>
	/// Called when data we care about changes (scene, item get/preview, visit transition, etc.)
	/// </summary>
	public static event Action onDataChange;

	internal bool saveLoaded, startingSave;
	public string CurrentRoom { get; private set; }
	internal MapServer server;
	private HUDManager hud;


	public TangledMapViewMod() : base("TangledMapView") {}
	public override string GetVersion() => Assembly.GetExecutingAssembly().GetName().Version.ToString(3);

	public override int LoadPriority() {
		return 100;//want randomizer to load before us
	}

	public override void Initialize() {
		base.Initialize();
		Instance = this;

		//Make an object to help us do things:
		var go = new GameObject("TangledMapManager", typeof(HUDManager));
		hud = go.GetComponent<HUDManager>();
		hud.mod = this;
		Object.DontDestroyOnLoad(go);


		USceneManager.sceneLoaded += OnSceneLoaded;
		TrackerUpdate.OnFinishedUpdate += TriggerDataChange;

		ModHooks.AfterSavegameLoadHook += data => {
			// Log("get load");
			saveLoaded = true;
			server.Send(PrepareSaveDataMessage());
		};
		// On.UIManager.StartNewGame += (orig, self, death, rush) => {
		// 	startingSave = true;//we will actually push data once a scene loads
		// 	orig(self, death, rush);
		// };
		//note: ModHooks.Instance.NewGameHook not called, likely because the randomizer mod overrides how a game is started
		//later: is this still true?
		ModHooks.NewGameHook += () => {
			Log("NewGameHook called");
			saveLoaded = true;
			server.Send(PrepareSaveDataMessage());
		};

		hud.StartCoroutine(StartWebServer());
	}

	private IEnumerator StartWebServer() {
		Log("Startted start coroutine");
		//game crashes if we start server right away
		yield return null;
		yield return null;
		yield return null;

		server = new MapServer((Modding.ILogger)this);
		server.Start();
		Log("TangledMapViewMod web server started: http://localhost:" + MapServer.MapPort + "/");
	}

	public void GameExiting() {
		server?.Stop();
		server = null;
	}



	private IEnumerator AfterSceneChange() {
		//Wait a few frames for, e.g., benchwarp moving you after a save load.
		yield return null;
		yield return null;
		yield return null;
		TriggerDataChange();
	}

	protected void TriggerDataChange() {
		try {
			onDataChange?.Invoke();
		} catch (Exception ex) {
			Debug.LogException(ex);
		}
	}

	public bool ToggleButtonInsideMenu => false;
	public List<IMenuMod.MenuEntry> GetMenuData(IMenuMod.MenuEntry? toggleButtonEntry) {
		return new List<IMenuMod.MenuEntry> {
			new IMenuMod.MenuEntry(
				"Open Map",
				new [] {""},
				"Open the map in your browser",
				v => {
					Application.OpenURL($"http://localhost:{MapServer.MapPort}/");
				},
				() => 0
			),
			new IMenuMod.MenuEntry(
				"Show Live Checks",
				new[] {"Off", "On"},
				"Show live location/transition status in-game",
				v => {
					GS.showChecksLive = v == 1;
					TriggerDataChange();
				},
				() => GS.showChecksLive ? 1 : 0
			),
		};
	}

	public void OnLoadGlobal(TangledMapViewGlobalSettings s) => GS = s;
	public TangledMapViewGlobalSettings OnSaveGlobal() => GS;
	public void OnLoadLocal(TangledMapViewLocalSettings s) {
		LS = s;
		TriggerDataChange();
	}
	public TangledMapViewLocalSettings OnSaveLocal() => LS;

	private void OnSceneLoaded(Scene scene, LoadSceneMode mode) {
		hud.StartCoroutine(AfterSceneChange());

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

		//No good clean way to get the Item Changer save data short of re-reading the file off
		//the disk so...hacks.
		var changerData =
			typeof(ItemChangerMod)
			.GetField("SET", BindingFlags.NonPublic | BindingFlags.Static)!
			.GetValue(null)
		;


		return JsonConvert.SerializeObject(
			new {
				type = "loadSave",
				//this is more-or-less the normal save file data as it is on disk with the
				//mod data from foo.modding.json interpolated in.
				//Except we don't need everything.
				data = new {
					playerData = GameManager.instance.playerData,
					modData = new Dictionary<string, object>() {
						{"Randomizer 4", RandomizerMod.RandomizerMod.RS},
						{"ItemChangerMod", new {value = changerData}},
					},
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
}
