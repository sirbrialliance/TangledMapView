
using System;
using System.Linq;
using System.Reflection;
using System.Text;
using Modding;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using WebSocketSharp;
using WebSocketSharp.Server;

namespace TangledMapView {

public class MapServer {
	private HttpServer server;
	public int port = 7900;
	private WebSocketSessionManager sessions;
	private ILogger logger;

	internal class WSHandler : WebSocketBehavior {
		protected override void OnMessage(MessageEventArgs e) {
			// var msg = JsonConvert.DeserializeObject<JObject>(e.Data);
			// if ((string)msg["type"] == "___") {
			//
			// }
		}

		protected override void OnOpen() {
			if (TangledMapViewMod.Instance != null) {
				Send(TangledMapViewMod.Instance.PrepareSaveDataMessage());
				Send(TangledMapViewMod.Instance.PreparePlayerMoveMessage());
			}
		}
	}

	public MapServer() {
		this.logger = null;
	}

	public MapServer(ILogger logger) {
		this.logger = logger;
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

	public void Send(JObject msg) {
		sessions.Broadcast(msg.ToString());
	}

	public void Send(string type, params object[] kvDataPairs) {
		var msg = new JObject();
		msg["type"] = type;

		for (int i = 0; i < kvDataPairs.Length; i += 2) {
			msg[(string)kvDataPairs[i]] = JToken.FromObject(kvDataPairs[i + 1]);
		}

		sessions.Broadcast(msg.ToString());
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
		if (server == null) return;
		logger?.Log("Stopping web server");
		foreach (var sessionId in sessions.IDs.ToArray()) {
			sessions.CloseSession(sessionId, CloseStatusCode.Away, "GameShutdown");
		}
		server.Stop();
		server = null;
	}
}

}
