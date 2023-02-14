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
public class CheckMarkerWorld : CheckMarker {
	/// <summary>
	/// Distance in world units to stay away from the edges of the screen.
	/// </summary>
	public float inset = 1;


	public void LateUpdate() {
		//try to keep in view
		var camera = GameManager.instance.cameraCtrl.cam;
		var p1 = camera.ViewportToWorldPoint(new Vector3(0, 0, -camera.transform.position.z));
		var p2 = camera.ViewportToWorldPoint(new Vector3(1, 1, -camera.transform.position.z));

		var cameraRect = new Bounds(p1, Vector2.zero);
		cameraRect.Encapsulate(p2);
		cameraRect.Expand(-inset);//add a bit of margin

		//Clamp visible location
		var pos = element.Position;
		var rectMin = cameraRect.min;
		var rectMax = cameraRect.max;
		pos.x = Mathf.Clamp(pos.x, rectMin.x, rectMax.x);
		pos.y = Mathf.Clamp(pos.y, rectMin.y, rectMax.y);

		transform.localPosition = pos;
	}
}
}
