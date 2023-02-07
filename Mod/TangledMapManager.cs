using UnityEngine;

namespace TangledMapView {
internal class TangledMapManager : MonoBehaviour {
	public TangledMapViewMod mod;

	public void Start() {
		if (Display.displays.Length > 1) {
			MappingCamera.Create(mod);
		}
	}

}

}
