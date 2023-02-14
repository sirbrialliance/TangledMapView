using System.Collections.Generic;
using UnityEngine;

namespace TangledMapView {
/// <summary>
/// Visual indicator for an item location/transition/etc.
/// </summary>
public class CheckMarker : MonoBehaviour {
	public RoomElement element;
	public CheckState state;

	protected static Dictionary<string, Texture2D> icons = new Dictionary<string, Texture2D>();
	protected Renderer markRenderer;

	public void Awake() {
		markRenderer = GetComponent<Renderer>();
		markRenderer.material = new Material(ResourceUtil.UnlitTransparentShader());
	}

	public Color StateColor(CheckState state) {
		switch (state) {
			case CheckState.Unreachable:
			case CheckState.UnchangedUnreachable:
				return new Color(1, 0, 0, .6f);
			case CheckState.Reachable:
				return new Color(0, 1, 0, .7f);
			case CheckState.Previewed:
				return new Color(1, 1, 0, .5f);
			case CheckState.Obtained:
			case CheckState.Unchanged:
			case CheckState.OneWay:
				return new Color(.5f, .5f, .5f, .4f);
			default:
				return Color.red;
		}
	}

	public Texture2D StateTexture(CheckState state) {
		string graphic;
		switch (state) {
			case CheckState.UnchangedUnreachable:
				graphic = "Unchanged";
				break;
			default:
				graphic = state.ToString();
				break;
		}

		return LoadTexture(element is RoomTransition ? $"Transition{graphic}" : $"Item{graphic}");
	}

	private Texture2D LoadTexture(string name) {
		if (!icons.TryGetValue(name, out var ret)) {
			ret = ResourceUtil.LoadImage($"Images/{name}.png");
			icons[name] = ret;
		}

		return ret;
	}

	public void UpdateVisuals() {
		if (element == null) throw new System.Exception("No element set");

		markRenderer.material.color = StateColor(state);
		markRenderer.material.mainTexture = StateTexture(state);
	}

}
}
