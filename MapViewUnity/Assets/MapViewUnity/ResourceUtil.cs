using System;
using System.IO;
using System.Reflection;
using UnityEngine;
using UnityEngine.Profiling;
using Object = UnityEngine.Object;

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
			var assembly = Assembly.GetExecutingAssembly();
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

	private static AssetBundle assets;

	public static T LoadAsset<T>(string path) where T: Object {
		#if UNITY_EDITOR
			return UnityEditor.AssetDatabase.LoadAssetAtPath<T>("Assets/Bundle/" + path);
		#else
			if (!assets) {
				var assembly = Assembly.GetExecutingAssembly();
				var resName = $"TangledMapView.Resources.UnityBundle";
				using var resourceStream = assembly.GetManifestResourceStream(resName);
				if (resourceStream == null) throw new Exception("Failed to load embedded asset bundle");
				assets = AssetBundle.LoadFromStream(resourceStream);
			}

			return assets.LoadAsset<T>(path);
		#endif
	}
}
}
