using System;
using UnityEngine;

namespace TangledMapView {
/// <summary>
/// World-space marker for indicating the location/state of a
/// item placement or location.
/// </summary>
public class WorldCheckMarker : MonoBehaviour {
	public string placementId;
	public CheckState state;
	public Vector3 targetLocation;

	public static Color StateColor(CheckState state) {
		switch (state) {
			case CheckState.Unreachable: return Color.red;
			case CheckState.Reachable: return Color.green;
			case CheckState.Previewed:  return Color.yellow;
			case CheckState.Obtained: return Color.gray;
			default: return Color.red;
		}
	}

	public void UpdateVisuals() {
		var renderer = GetComponent<Renderer>();

		renderer.material.color = StateColor(state);
		renderer.material.renderQueue = 100000;//render last, over things
	}

	public void LateUpdate() {
		//try to keep in view
		var camera = GameManager.instance.cameraCtrl.cam;
		var p1 = camera.ViewportToWorldPoint(new Vector3(0, 0, -camera.transform.position.z));
		var p2 = camera.ViewportToWorldPoint(new Vector3(1, 1, -camera.transform.position.z));

		var cameraRect = new Bounds(p1, Vector2.zero);
		cameraRect.Encapsulate(p2);
		cameraRect.Expand(-3);//add a bit of margin

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
