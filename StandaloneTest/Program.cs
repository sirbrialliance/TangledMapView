using System;
using System.Collections.Generic;
using TangledMapView;

class Program {
	static void Main(string[] args) {
		var server = new MapServer();
		server.Start();


		System.Console.WriteLine("Server started");
		System.Console.ReadKey();
	}
}
