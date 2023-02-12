using System;
using System.Collections.Generic;
using System.IO;
using UnityEngine;

namespace TangledMapView {
/// <summary>
/// World-space marker for indicating the location/state of a
/// item placement or location.
/// </summary>
[DefaultExecutionOrder(1000)]//run later
public class WorldCheckMarker : MonoBehaviour {
	public string placementId;
	public CheckState state;
	public Vector3 targetLocation;
	/// <summary>
	/// Distance in world units to stay away from the edges of the screen.
	/// </summary>
	public float inset = 1;

	public bool forTransition;

	private static Dictionary<string, Texture2D> images = new Dictionary<string, Texture2D>();
	private Renderer renderer;

	public void Awake() {
		renderer = GetComponent<Renderer>();
		renderer.material = new Material(Shader.Find("Sprites/Default-ColorFlash"));
	}

	public Color StateColor(CheckState state) {
		switch (state) {
			case CheckState.Unreachable: return new Color(1, 0, 0, .6f);
			case CheckState.Reachable: return new Color(0, 1, 0, .7f);
			case CheckState.Previewed: return new Color(1, 1, 0, .5f);
			case CheckState.Obtained: return new Color(.5f, .5f, .5f, .4f);
			default: return Color.red;
		}
	}

	public Texture2D StateTexture(CheckState state) {
		var name = forTransition ? $"Transition{state}" : $"Item{state}";

		if (!images.TryGetValue(name, out var ret)) {
			using var resourceStream = typeof(TangledMapViewMod).Assembly.GetManifestResourceStream($"TangledMapView.Resources.Images.{name}.png");
			if (resourceStream == null) {
				ret = Texture2D.whiteTexture;
				Debug.LogWarning($"No image for {name}");
			} else {
				using var sr = new BinaryReader(resourceStream);

				ret = new Texture2D(0, 0);
				ret.LoadImage(sr.ReadBytes((int)resourceStream.Length));
				ret.Apply();
			}

			images[name] = ret;
		}

		return ret;
	}

	public void UpdateVisuals() {

		renderer.material.color = StateColor(state);
		renderer.material.mainTexture = StateTexture(state);
	}


	public void LateUpdate() {
		//try to keep in view
		var camera = GameManager.instance.cameraCtrl.cam;
		var p1 = camera.ViewportToWorldPoint(new Vector3(0, 0, -camera.transform.position.z));
		var p2 = camera.ViewportToWorldPoint(new Vector3(1, 1, -camera.transform.position.z));

		var cameraRect = new Bounds(p1, Vector2.zero);
		cameraRect.Encapsulate(p2);
		cameraRect.Expand(-inset);//add a bit of margin

		//Clamp visible location
		var pos = targetLocation;
		var rectMin = cameraRect.min;
		var rectMax = cameraRect.max;
		pos.x = Mathf.Clamp(pos.x, rectMin.x, rectMax.x);
		pos.y = Mathf.Clamp(pos.y, rectMin.y, rectMax.y);

		transform.position = pos;
	}
}
}
