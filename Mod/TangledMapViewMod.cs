
using System;
using System.Collections;
using System.Collections.Generic;
using System.Reflection;
using ItemChanger;
using Modding;
using Modding.Patches;
using RandomizerMod;
using RandomizerMod.IC;
using UnityEngine;
using UnityEngine.SceneManagement;
using Object = UnityEngine.Object;
using USceneManager = UnityEngine.SceneManagement.SceneManager;

namespace TangledMapView {

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

	public TangledMapViewMod() : base("TangledMapView") {}
	public override string GetVersion() => Assembly.GetExecutingAssembly().GetName().Version.ToString(3);

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


		USceneManager.sceneLoaded += (scene, mode) => tmm.StartCoroutine(AfterSceneChange());
		TrackerUpdate.OnFinishedUpdate += TriggerDataChange;
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


}
}
