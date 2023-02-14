using UnityEngine;

namespace TangledMapView {
public class TransitionLinkMarker : MonoBehaviour {

	private static AnimationCurve widthCurve;
	private static Gradient gradient;

	private const int PointCount = 100;

	static TransitionLinkMarker() {
		widthCurve = AnimationCurve.EaseInOut(0, 1, 1, .5f);
		gradient = new Gradient {
			colorKeys = new[] {
				new GradientColorKey(Color.white, 0),
				new GradientColorKey(Color.gray, 1),
			}
		};
	}

	public static TransitionLinkMarker Create(CheckMarker src, CheckMarker dest) {
		var go = new GameObject($"{src.element.id} -> {dest.element.id}");
		var ret = go.AddComponent<TransitionLinkMarker>();
		ret.src = src;
		ret.dest = dest;

		var lr = ret.lineRenderer = go.AddComponent<LineRenderer>();
		lr.positionCount = PointCount;
		lr.numCornerVertices = 3;
		lr.colorGradient = gradient;
		lr.widthCurve = widthCurve;

		// var mat = new Material(ResourceUtil.UnlitTransparentShader());
		var mat = new Material(Shader.Find("Unlit/Color"));
		ret.lineRenderer.material = mat;

		ret.srcDir = Direction(src.element);
		ret.destDir = -Direction(dest.element);

		return ret;
	}

	private static Vector3 Direction(RoomElement el) {
		var transition = el as RoomTransition;
		if (transition == null) return Vector3.zero;

		switch (transition.doorId[0]) {
			case 't': return Vector3.up;
			case 'b': return Vector3.down;
			case 'l': return Vector3.left;
			case 'r': return Vector3.right;
			default: return Vector3.zero;//doors, mostly
		}
	}



	public CheckMarker src, dest;
	public Vector3 srcDir, destDir;
	private LineRenderer lineRenderer;
	private static Vector3[] posTemp = new Vector3[PointCount];


	public void LateUpdate() {
		var leadInOut = 40;
		var p0 = src.transform.position + srcDir * leadInOut;
		var p1 = dest.transform.position - destDir * leadInOut;
		var strength = (p0 - p1).magnitude * .6f;
		var v0 = srcDir * strength * 1.2f;
		var v1 = destDir * strength * .8f;

		posTemp[0] = src.transform.position;
		posTemp[1] = p0;

		var curveCount = PointCount - 4;
		for (int i = 0; i < curveCount; i++) {
			var t = i / (curveCount - 1f);
			var p = CalcHermite(p0, v0, p1, v1, t);
			posTemp[i + 2] = p;
		}

		posTemp[PointCount - 2] = p1;
		posTemp[PointCount - 1] = dest.transform.position;

		lineRenderer.SetPositions(posTemp);
	}

	public static Vector3 CalcHermite(Vector3 p1, Vector3 t1, Vector3 p2, Vector3 t2, float percent) {
		//http://cubic.org/docs/hermite.htm
		float s = percent, s2 = s * s, s3 = s2 * s;
		float h1 = 2 * s3 - 3 * s2 + 1;
		float h2 = -2 * s3 + 3 * s2;
		float h3 = s3 - 2 * s2 + s;
		float h4 = s3 - s2;

		return new Vector3(
			h1 * p1.x + h2 * p2.x + h3 * t1.x + h4 * t2.x,
			h1 * p1.y + h2 * p2.y + h3 * t1.y + h4 * t2.y,
			h1 * p1.z + h2 * p2.z + h3 * t1.z + h4 * t2.z
		);
	}

}
}
