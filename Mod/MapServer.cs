
using System;
using System.IO;
using System.Reflection;
using System.Text;
using System.Threading;
using WebSocketSharp;
using WebSocketSharp.Net;
using WebSocketSharp.Server;

namespace TangledMapView {

public class MapServer {
	private HttpServer server;
	public int port = 7900;
	private WebSocketSessionManager sessions;

	internal class WSHandler : WebSocketBehavior {
		protected override void OnMessage(MessageEventArgs e) {
			//Send("You sent me: " + e.Data);
		}

		protected override void OnOpen() {
			//Send("Hello");
		}
	}


	public void Start() {
		server = new HttpServer(port);
		server.OnGet += OnGet;

		server.AddWebSocketService<WSHandler>("/ws");
		sessions = server.WebSocketServices["/ws"].Sessions;

		server.Start();
	}

	public void Send(string msg) {
		sessions.Broadcast(msg);
	}
	public void Send(string type, string dataPartialJSON) {
		sessions.Broadcast($"{{\"type\": \"{type}\", {dataPartialJSON}}}");
	}

	public void Send(string type, params object[] kvDataPairs) {
		var sb = new StringBuilder();

		sb.Append("{\"type\": \"").Append(type).Append("\"");

		for (int i = 0; i < kvDataPairs.Length; i += 2) {
			sb.Append(", \"").Append((string)kvDataPairs[i]).Append("\": ");

			var value = kvDataPairs[i + 1];
			if (value == null) sb.Append("null");
			else if (value is bool b) sb.Append(b ? "true" : "false");
			else if (value is int ii) sb.Append(ii);
			else if (value is float f) sb.Append(f);
			else if (value is string s) sb.Append("\"").Append(s).Append("\"");
			else throw new ArgumentException("unknown type", nameof(kvDataPairs));
		}

		sb.Append("}");
		sessions.Broadcast(sb.ToString());
	}

	private void OnGet(object sender, HttpRequestEventArgs e) {
		var req = e.Request;
		var res = e.Response;

		var path = req.Url.AbsolutePath;
		if (path == "/") path = "/index.html";

		var resourceName = "Web\\" + path.Substring(1);
		var resourceInfo = Assembly.GetExecutingAssembly().GetManifestResourceInfo(resourceName);

		if (resourceInfo == null) {
			res.StatusCode = 404;
			var text = Encoding.UTF8.GetBytes("Not found.");
			res.ContentType = "text/plain";
			res.ContentLength64 = text.Length;
			res.Close(text, true);
			return;
		}

		using (var resourceStream = Assembly.GetExecutingAssembly().GetManifestResourceStream(resourceName)) {
			var len = resourceStream.Length;

			if (path.EndsWith(".js")) res.ContentType = "application/javascript";
			else if (path.EndsWith(".html")) res.ContentType = "text/html";
			else if (path.EndsWith(".css")) res.ContentType = "text/css";
			else res.ContentType = "text/plain";

			res.ContentEncoding = Encoding.UTF8;
			res.ContentLength64 = len;

			var buffer = new byte[len];
			int readCount, pos = 0;
			while ((readCount = resourceStream.Read(buffer, pos, buffer.Length - pos)) > 0) {
				pos += readCount;
			}

			res.Close(buffer, true);
		}
	}

	public void Stop() {
		server.Stop();
	}
}

}
