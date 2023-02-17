using System.Collections.Generic;
using D3Sharp.Force;
using Unity.Collections;
using Unity.Jobs;
using UnityEngine;
using UnityEngine.Jobs;
using UnityEngine.Profiling;

namespace TangledMapView {

public class RoomPusher {
	public class Data : INode {
		public int Index { get; set; }
		public double Fx { get; set; } = double.NaN;
		public double Fy { get; set; } = double.NaN;
		public double Vx { get; set; } = double.NaN;
		public double Vy { get; set; } = double.NaN;
		public double X { get; set; } = double.NaN;
		public double Y { get; set; } = double.NaN;
		public double Z { get; set; } = double.NaN;
		public Vector3 XYZ => new Vector3((float)X, (float)Y, (float)Z);

		/// <summary>
		/// Bounds of the level thumbnail in its local world space.
		/// </summary>
		public Bounds levelBounds;
		public Transform transform;

		/// <summary>
		/// offset from object's center
		/// transform.position is where (0, 0, 0) is in the level, but
		/// this.X,Y,Z are for the center.
		/// </summary>
		public Vector3 nodeOffset;
	}

	private Simulation<Data> simulation;
	public readonly List<Data> data;


	public RoomPusher(int capacity) {
		data = new List<Data>(capacity);
	}

	public void Add(Data item) {
		data.Add(item);
	}

	public void Tick() {
		if (simulation == null) {
			simulation = new Simulation<Data>(data)
				{AlphaDecay = .005, AlphaMin = .09}
				.AddForce("center", new ForceCenter<Data>(0, 0).SetStrength(.01f))
				.AddForce("collide", new ForceCollide<Data>
					((room, i, list) => room.levelBounds.extents.magnitude)
					{Strength = 1}
				)
				.AddForce("manyBody", new ForceManyBody<Data>().SetStrength(20))
			;
		}
		Profiler.BeginSample("Simulation.Tick");
		simulation.Tick();
		Profiler.EndSample();
	}

	public void UpdateTransforms() {
		for (int i = 0; i < data.Count; i++) {
			data[i].transform.position = data[i].nodeOffset + data[i].XYZ;
		}
	}

	public void Kick() {
		simulation.Alpha = .3;
	}
}
}
