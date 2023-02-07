using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using Modding;
using UnityEngine;
using UnityEngine.SceneManagement;
using USceneManager = UnityEngine.SceneManagement.SceneManager;

namespace TangledMapView {


/// <summary>
/// Helper camera for rendering out views of scenes for use in maps.
/// </summary>
public class MappingCamera : MonoBehaviour {
	public const int Layer = 6;
	public const string OutFolder = "MappingTiles";
	public const float MapTileScale = 30f;//how world size is scaled to pixel size in exported tiles
	public const float LiveViewZoom = 100;

	public static MappingCamera Create(TangledMapViewMod mod) {
		Display.displays[1].Activate();
		Display.displays[1].SetParams(800, 600, 100, 100);

		var go = new GameObject("MappingCamera");
		DontDestroyOnLoad(go);
		var ret = go.AddComponent<MappingCamera>();
		ret.mod = mod;
		var cam = ret.camera = go.AddComponent<Camera>();

		cam.targetDisplay = 1;
		cam.clearFlags = CameraClearFlags.Color | CameraClearFlags.Depth;
		cam.backgroundColor = new Color(.4f, .4f, .4f);
		cam.orthographic = true;
		cam.orthographicSize = LiveViewZoom;
		const float maxZ = 10;
		cam.nearClipPlane = -10;
		cam.farClipPlane = maxZ + .00001f;

		/** HK Layers:
			0 -> Default
			1 -> TransparentFX
			2 -> Ignore Raycast
			4 -> Water
			5 -> UI
			6 -> [Hijacked for this camera]
			8 -> Terrain
			9 -> Player
			10 -> TransitionGates
			11 -> Enemies
			12 -> Projectiles
			13 -> Hero Detector
			14 -> Terrain Detector
			15 -> Enemy Detector
			16 -> Tinker
			17 -> Attack
			18 -> Particle
			19 -> Interactive Object
			20 -> Hero Box
			21 -> Grass
			22 -> Enemy Attack
			23 -> Damage All
			24 -> Bouncer
			25 -> Soft Terrain
			26 -> Corpse
			27 -> uGUI
			28 -> Hero Only
			29 -> ActiveRegion
			30 -> Map Pin
			31 -> Orbit Shield
		*/
		cam.cullingMask = (1 << 0) | (1 << 4) | (1 << Layer) | (1 << 8) | (1 << 21);


		var back = ret.backplane = GameObject.CreatePrimitive(PrimitiveType.Quad);
		back.name = "Backplane";
		back.transform.SetParent(ret.transform);
		back.transform.localPosition = new Vector3(0, 0, maxZ);
		back.transform.localScale = new Vector3(10000, 10000, 10000);
		back.layer = Layer;

		return ret;
	}


	public Camera camera;
	private HeroController _hero;
	private SpriteRenderer heroLight;
	private TangledMapViewMod mod;
	private GameObject backplane;
	private Bounds currentBorders;

	public HeroController Hero {
		get {
			//use FindObjectOfType instead of aHeroController.instance so no logspam when not present
			if (!_hero) _hero = FindObjectOfType<HeroController>();
			return _hero;
		}
	}


	public void OnEnable() {
		// ModHooks.SceneChanged += SceneChanged;//useless, not called
		USceneManager.activeSceneChanged += SceneChanged;
		ModHooks.DrawBlackBordersHook += OnDrawBorders;

		Directory.CreateDirectory(OutFolder);
	}


	public void OnDisable() {
		// ModHooks.SceneChanged -= SceneChanged;
		USceneManager.activeSceneChanged -= SceneChanged;
		ModHooks.DrawBlackBordersHook -= OnDrawBorders;
	}
	private void OnDrawBorders(List<GameObject> borders) {
		if (borders.Count == 0) {
			currentBorders = new Bounds();
			return;
		}

		currentBorders = new Bounds(borders[0].transform.position, Vector3.zero);
		foreach (var obj in borders) {
			currentBorders.Encapsulate(obj.transform.position);
		}

		// mod.Log($"New scene borders: {currentBorders}");
	}

	private void SceneChanged(Scene prev, Scene current) {
		mod.Log($"Switch from {prev.name} to {current.name}");
		StartCoroutine(SnapScene());
	}


	private IEnumerator CleanupView() {
		if (!Hero) yield break;

		//Thanks to DebugMod for showing us what needs to happen.
		yield return null;
		yield return null;
		yield return null;

		Hero.vignette.enabled = false;

		heroLight = Hero.transform.Find("HeroLight").GetComponent<SpriteRenderer>();

		//deactivate visual masks
		foreach (var renderer in FindObjectsOfType<Renderer>()) {
			var name = renderer.gameObject.name;
			if (
				name.StartsWith("msk_") || name.StartsWith("Tut_msk") ||
				name.StartsWith("black_solid") ||
				name.ToLower().Contains("vignette")
			) {
				renderer.enabled = false;
			}
		}

		foreach (var fsm in FindObjectsOfType<PlayMakerFSM>()) {
			if (fsm.FsmName == "unmasker" || fsm.FsmName == "remasker_inverse" || fsm.FsmName == "remasker") {
				foreach (var renderer in fsm.gameObject.GetComponentsInChildren<Renderer>()) {
					renderer.enabled = false;
				}
			}
		}
	}

	private IEnumerator SnapScene() {
		yield return StartCoroutine(CleanupView());

		var aspect = currentBorders.size.x / currentBorders.size.y;
		var width = Mathf.RoundToInt(currentBorders.size.x * MapTileScale);
		var height = Mathf.RoundToInt(currentBorders.size.y * MapTileScale);

		if (width <= 0 || height <= 0) {
			mod.LogError($"Current scene has no size");
			yield break;
		}

		//Camera setup
		//Doing the extra RT dance is annoying, but it does let us render things larger than the screen when needed.
		var buf = new RenderTexture(width, height, 24);
		buf.antiAliasing = 16;
		camera.transform.position = currentBorders.center;
		//"orthographicSize is half the size of the vertical viewing volume"
		camera.orthographicSize = currentBorders.size.y / 2f;


		//Render to buffer, pull image
		var tex = new Texture2D(width, height, TextureFormat.RGBA32, false);
		camera.targetTexture = buf;
		RenderTexture.active = buf;

		camera.Render();
		tex.ReadPixels(new Rect(0, 0, width, height), 0, 0, true);
		tex.Apply();

		//Encode
		var data = tex.EncodeToPNG();

		//Cleanup
		camera.targetTexture = null;
		RenderTexture.active = null;
		Destroy(tex);
		Destroy(buf);
		camera.orthographicSize = LiveViewZoom;

		//Write
		var fileName = OutFolder + "/" + USceneManager.GetActiveScene().name + ".png";
		File.WriteAllBytes(fileName, data);
		mod.Log($"Wrote {fileName}");
	}

	public void LateUpdate() {
		if (!Hero) return;

		transform.position = Hero.transform.position;

		if (heroLight) {
			// Debug.Log($"Light was {heroLight.color}");
			heroLight.color = new Color(1, 1, 1, 0);
		}

		if (Input.GetKeyDown(KeyCode.F11) && Input.GetKey(KeyCode.LeftControl) && Input.GetKey(KeyCode.LeftShift)) {
			StartCoroutine(DoGrandTour());
		}
	}

	private bool WantScene(string name) {
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
			// case "Room_Jinn":
				return false;
			case "GG_Lurker":
			case "GG_Pipeway":
			case "GG_Waterways":
				return true;
		}

		if (name.StartsWith("Cinematic")) return false;
		if (name.StartsWith("End")) return false;
		if (name.StartsWith("Menu")) return false;
		if (name.StartsWith("GG_")) return false;

		return true;
	}

	private IEnumerator DoGrandTour() {
		for (int i = 6; i < USceneManager.sceneCountInBuildSettings; i++) {
			var scene = USceneManager.GetSceneByBuildIndex(i);

			//Unity is annoying, it doesn't include names for unloaded scenes. :facepalm:
			if (!scene.IsValid()) {
				Debug.Log($"Blind load scene {i} {scene.name}");
				USceneManager.LoadScene(i, LoadSceneMode.Single);
				yield return null;
				scene = USceneManager.GetSceneByBuildIndex(i);
				Debug.Log($"Loaded scene, now it's {i} {scene.name}, loaded? {scene.isLoaded}");
				yield return new WaitForSeconds(.2f);
			}

			if (!WantScene(scene.name)) continue;
			if (File.Exists($"{OutFolder}/{name}.png")) continue;

			if (!scene.isLoaded) {
				Debug.Log($"Normal load scene {i} {scene.name}");
				USceneManager.LoadScene(i, LoadSceneMode.Single);
			}

			//wait for thing to do the thing
			yield return new WaitForSeconds(1);
		}
	}
}
}
