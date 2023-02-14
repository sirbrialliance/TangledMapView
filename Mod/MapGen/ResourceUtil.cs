using System.IO;
using UnityEngine;
using UnityEngine.Profiling;

namespace TangledMapView {
public class ResourceUtil {
	public static Texture2D LoadImage(string path) {
		byte[] data;
		Profiler.BeginSample("ResourceUtil.ReadBytes");
		#if UNITY_EDITOR
			var localPath = $"../Mod/Resources/{path}";
			if (!File.Exists(localPath)) data = null;
			else data = File.ReadAllBytes(localPath);
		#else
			var assembly = typeof(ResourceUtil).Assembly;
			var resName = $"TangledMapView.Resources.{path.Replace("/", ".")}";
			using var resourceStream = assembly.GetManifestResourceStream(resName);
			if (resourceStream != null) {
				using var sr = new BinaryReader(resourceStream);
				data = sr.ReadBytes((int)resourceStream.Length);
			} else {
				data = null;
			}
		#endif
		Profiler.EndSample();

		if (data == null) {
			Debug.LogWarning($"No image for {path}");
			return Texture2D.whiteTexture;
		} else {
			Profiler.BeginSample("ResourceUtil.LoadImage");
			var ret = new Texture2D(0, 0);
			ret.name = path;
			ret.LoadImage(data);
			Profiler.BeginSample("ResourceUtil.LoadImage.Apply");
			ret.Apply();
			Profiler.EndSample();
			Profiler.EndSample();
			return ret;
		}
	}

	public static Shader UnlitTransparentShader() {
		#if UNITY_EDITOR
			return Shader.Find("Sprites/Default");
		#else
			return Shader.Find("Sprites/Default-ColorFlash");
		#endif
	}

	private static Mesh _quad;
	public static Mesh Quad() {
		if (!_quad) {
			//I'm lazy.
			var go = GameObject.CreatePrimitive(PrimitiveType.Quad);
			_quad = go.GetComponent<MeshFilter>().mesh;
			GameObject.Destroy(go);
		}

		return _quad;
	}
}
}
