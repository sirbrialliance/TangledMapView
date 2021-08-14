
using System;
using System.IO;
using System.Net;
using System.Reflection;
using System.Text;
using System.Threading;

namespace TangledMapView {

public class MapServer {
	private HttpListener server;
	public int port = 7900;

	private volatile bool serverEnabled = true;

	public void Start() {
		server = new HttpListener();
		server.Prefixes.Add("http://*:" + port + "/");
		server.Start();
		serverEnabled = true;
		new Thread(ListenThread).Start();
	}

	private void ListenThread() {
		while (serverEnabled) {
			try {
				var context = server.GetContext();
				new Thread(ResponseThread).Start(context);
			} catch (HttpListenerException) {
				break;
			} catch (Exception ex) {
				Modding.Logger.LogError("Web server error " + ex.Message);
			}
		}
	}

	private void ResponseThread(object obj) {
		var context = (HttpListenerContext)obj;

		var path = context.Request.Url.AbsolutePath;
		if (path == "/") path = "/index.html";

		var res = context.Response;
		var resourceName = "TangledMapView.Web." + path.Substring(1);
		using (var resourceStream = Assembly.GetExecutingAssembly().GetManifestResourceStream(resourceName)) {
			if (resourceStream == null) {
				res.StatusCode = 404;
				using (var output = new StreamWriter(res.OutputStream)) output.WriteLine("Not found.");
				return;
			}

			if (path.EndsWith(".js")) res.AddHeader("Content-Type", "application/javascript");
			else if (path.EndsWith(".html")) res.AddHeader("Content-Type", "text/html");
			else res.AddHeader("Content-Type", "text/plain");

			var buffer = new byte[1024 * 10];
			int readCount;
			while ((readCount = resourceStream.Read(buffer, 0, buffer.Length)) > 0) {
				res.OutputStream.Write(buffer, 0, readCount);
			}

			res.OutputStream.Close();
		}
	}

	private string HTMLEscape(string s) {
		//simple, not perfect. Use something better if it's important.
		return s.Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;");
	}

	public void Stop() {
		serverEnabled = false;
		server.Stop();
	}
}

}
