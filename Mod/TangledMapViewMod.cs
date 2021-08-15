
using System.Collections;
using Modding;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace TangledMapView {

public class TangledMapViewMod : Mod {
	public static TangledMapViewMod Instance { get; private set; }

	internal MapServer server;
	public SaveGameData activeSaveData;
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

		rndMod = RandomizerMod.RandomizerMod.Instance;


		UnityEngine.SceneManagement.SceneManager.sceneLoaded += OnSceneLoaded;
		ModHooks.Instance.AfterSavegameLoadHook += OnSaveLoaded;
	}

	private void OnSaveLoaded(SaveGameData data) {
		activeSaveData = data;
		server.Send(PrepareSaveDataMessage());
	}

	private void OnSceneLoaded(Scene scene, LoadSceneMode mode) {
		var from = rndMod.LastRandomizedExit;
		var to = rndMod.LastRandomizedEntrance;
		Log($"Left {from} to enter {to} in {scene.name}");

		CurrentRoom = scene.name;

		if (scene.name == "Menu_Title") {
			if (activeSaveData != null) {
				activeSaveData = null;
				server.Send(PrepareSaveDataMessage());
			}
			return;
		}

		if (from != null && to != null) {
			server.Send("revealTransition", "from", from, "to", to);
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
		if (activeSaveData == null) {
			return JToken.FromObject(new {
				type = "unloadSave",
			}).ToString();
		}

		return JToken.FromObject(new {
			type = "loadSave",
			data = new {
				//don't need the full save file, just the stuff we need
				// activeSaveData.PolymorphicModData,
				PolymorphicModData = new {RandomizerMod = JsonConvert.SerializeObject(rndMod.Settings)},
			},
		}).ToString();
	}



	public override string GetVersion() {
		return "0.0.1";
	}
}

internal class TangledMapManager : MonoBehaviour {
	public TangledMapViewMod mod;
	public void Start() => StartCoroutine(StartServer());

	private IEnumerator StartServer() {
		//game crashes if we start server right away
		yield return null;
		yield return null;
		yield return null;

		mod.server = new MapServer();
		mod.server.Start();
		mod.Log("TangledMapViewMod web server started: http://localhost:" + mod.server.port + "/");

	}
}

}
