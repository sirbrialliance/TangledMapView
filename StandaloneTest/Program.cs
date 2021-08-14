using System;
using System.Collections.Generic;
using System.Threading;
using TangledMapView;

class Program {
	static void Main(string[] args) {
		var server = new MapServer();
		server.Start();

		System.Console.WriteLine("Server started");

		var i = 0;
		while (!System.Console.KeyAvailable) {
			Thread.Sleep(1000);

			server.Send("thing: " + i++);
		}
	}
}
