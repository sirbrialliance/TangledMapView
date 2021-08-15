
using System.Collections;
using Modding;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace TangledMapView {

public class TangledMapViewMod : Mod {
	internal MapServer server;
	public TangledMapViewMod() : base("TangledMapView") { }

	public override void Initialize() {
		base.Initialize();

		var go = new GameObject("TangledMapManager", typeof(TangledMapManager));
		var tmm = go.GetComponent<TangledMapManager>();
		tmm.mod = this;
		Object.DontDestroyOnLoad(go);

		UnityEngine.SceneManagement.SceneManager.sceneLoaded += SceneManagerOnsceneLoaded;
	}

	private void SceneManagerOnsceneLoaded(Scene scene, LoadSceneMode mode) {
		Log("Scene change: " + scene.name);
		server.Send("playerMove", "newRoom", scene.name);
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
