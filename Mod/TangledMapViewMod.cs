
using Modding;

namespace TangledMapView {

public class TangledMapViewMod : Mod {
	public TangledMapViewMod() : base("TangledMapView") { }

	public override void Initialize() {
		base.Initialize();

		Log("Hello mod world");
		start web server...
		log when player changes maps
	}

	public override string GetVersion() {
		return "0.0.1";
	}
}

}
