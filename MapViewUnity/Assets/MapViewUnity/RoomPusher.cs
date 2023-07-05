using System;
using System.Collections.Generic;
using System.Linq;
using BEPUphysics.Constraints.TwoEntity.Joints;
using BEPUphysics.Entities;
using BEPUphysics.Entities.Prefabs;
using BEPUphysics.UpdateableSystems.ForceFields;
using UnityEngine;
using UnityEngine.Profiling;
using Space = BEPUphysics.Space;
using BVector3 = BEPUutilities.Vector3;
using BQuaternion = BEPUutilities.Quaternion;

namespace TangledMapView {

public class RoomPusher {
	public class Room {//: INode {
		public string id;
		// public int Index { get; set; }
		// public double Fx { get; set; } = double.NaN;
		// public double Fy { get; set; } = double.NaN;
		// public double Vx { get; set; } = double.NaN;
		// public double Vy { get; set; } = double.NaN;
		// public double Vz { get; set; } = double.NaN;
		// public double X { get; set; } = double.NaN;
		// public double Y { get; set; } = double.NaN;
		// public double Z { get; set; } = double.NaN;
		// public Vector3 XYZ {
		// 	get => new Vector3((float)X, (float)Y, (float)Z);
		// 	set { X = value.x; Y = value.y; Z = value.z; }
		// }
		// public Vector3 VXYZ {
		// 	get => new Vector3((float)Vx, (float)Vy, (float)Vz);
		// 	set { Vx = value.x; Vy = value.y; Vz = value.z; }
		// }

		public Entity rb;

		public Vector3 XYZ {
			get => new Vector3(rb.Position.X, rb.Position.Y, rb.Position.Z);
			set => rb.Position = new BVector3(value.x, value.y, value.z);
		}

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

	/// <summary>
	/// A pair of transitions, or a single transition.
	/// Max one per transition pair.
	/// Having just one helps avoid stronger forces being applied to bidirectional links than
	/// one-way links.
	/// </summary>
	public class Link {
		public Link(RoomTransition transitionA, RoomTransition transitionB) {
			if (string.Compare(transitionA.id, transitionB.id, StringComparison.InvariantCulture) > 0) {
				this.transitionA = transitionB;
				this.transitionB = transitionA;
			} else {
				this.transitionA = transitionA;
				this.transitionB = transitionB;
			}
		}

		public string Id => $"{transitionA.id}-{transitionB.id}";

		/// <summary>
		/// Rooms involved in the transition in alphabetical order.
		/// </summary>
		public RoomTransition transitionA, transitionB;

		public Room roomA, roomB;

		public void Init(RoomPusher pusher) {
			roomA = pusher.rooms.FirstOrDefault(x => x.id == transitionA.srcRoom);
			roomB = pusher.rooms.FirstOrDefault(x => x.id == transitionA.destRoom);
		}
	}

	public static BVector3 Convert(Vector3 v) {
		return new BVector3(v.x, v.y, v.z);
	}
	public static Quaternion Convert(BQuaternion v) {
		return new Quaternion(v.X, v.Y, v.Z, v.W);
	}

	// private Simulation<Room> simulation;
	public readonly List<Room> rooms;
	public List<Link> links;

	private Space physicsWorld;

	public RoomPusher(int capacity) {
		rooms = new List<Room>(capacity);
		links = new List<Link>();
	}

	public void Add(Room item) {
		rooms.Add(item);
	}

	protected void SetupSimulation() {
		/*simulation = new Simulation<Room>(rooms)
			// {AlphaDecay = .005, AlphaMin = .09}
			{AlphaDecay = .0005, AlphaMin = .09}
			.AddForce("center", new ForceCenter<Room>(0, 0).SetStrength(.01f))
			// .AddForce("collide", new ForceCollide<Room>
			// 	((room, i, list) => room.levelBounds.extents.magnitude)
			// 	// {Strength = 1}
			// 	{Strength = .01}
			// )
			// .AddForce("manyBody", new ForceManyBody<Room>().SetStrength(20))
			.AddForce("doorAlign", new ForceDoorAlign(links).SetStrengths(.1, .6))
		;*/

		physicsWorld = new Space();

		foreach (var room in rooms) {
			var pos = Convert(room.transform.position - room.nodeOffset);
			var box = new Box(pos, room.levelBounds.size.x, room.levelBounds.size.y, room.levelBounds.size.z);
			// var box = new Box(pos, room.levelBounds.size.x, room.levelBounds.size.y, 5);
			// var box = new Box(pos, 1, 1, 1);
			room.rb = box;

			box.Mass = 1;
			box.LocalInertiaTensorInverse = default;//no rotation, NB: set after Mass

			physicsWorld.Add(box);
		}

		const float targetDistance = 200;
		foreach (var link in links) {
			if (link.roomA == null || link.roomB == null) continue;

			var joint = new BallSocketJoint(link.roomA.rb, link.roomB.rb, BVector3.Zero);
			joint.SpringSettings.Stiffness = .6f;
			joint.SpringSettings.Damping = .9f;

			var pointA = (
				// link.roomA.XYZ + link.roomA.nodeOffset +
				link.transitionA.Position +
				RoomTransition.DoorDirection(link.transitionA.srcSide) * targetDistance
			);
			var pointB = (
				// link.roomB.XYZ + link.roomB.nodeOffset +
				link.transitionB.Position +
				RoomTransition.DoorDirection(link.transitionA.destSide) * targetDistance
			);

			Debug.Log($"Set local offsets to {pointA} and {pointB}, offsetets were {joint.OffsetA} and {joint.OffsetB}");
			joint.LocalOffsetA = Convert(pointA);
			joint.LocalOffsetB = Convert(pointB);
			Debug.Log($"offsetets now {joint.OffsetA} and {joint.OffsetB}");

			physicsWorld.Add(joint);
		}

		physicsWorld.Add(new CenteringForce(new InfiniteForceFieldShape()));

		// var ground = new Box(new BVector3(0, -2500, 0), 10000, 500, 10000);
		// ground.BecomeKinematic();
		// ground.Orientation = BQuaternion.CreateFromYawPitchRoll(0, 0, 1.1f);
		// physicsWorld.Add(ground);
		//
		// physicsWorld.ForceUpdater.Gravity = new BVector3(0, -91.8f, 0);
	}

	public void Tick() {
		if (physicsWorld == null) SetupSimulation();
		Profiler.BeginSample("RoomPusher.Tick");
		physicsWorld.Update(Time.deltaTime);
		Profiler.EndSample();
	}

	public void UpdateTransforms() {
		// Debug.Log($"Item is at {rooms[0].XYZ}");
		for (int i = 0; i < rooms.Count; i++) {
			rooms[i].transform.position = rooms[i].nodeOffset + rooms[i].XYZ;
			rooms[i].transform.rotation = Convert(rooms[i].rb.Orientation);
		}
	}

	public void Kick() {
	}
}

public class CenteringForce : ForceField {
	public CenteringForce(ForceFieldShape shape) : base(shape) {}

	protected override void CalculateImpulse(Entity e, float dt, out BVector3 impulse) {
		var dir = -e.Position;
		dir.Normalize();

		// impulse = dir * dt * 50f;
		impulse = dir * dt * .3f;
	}
}

#if false
public class ForceDoorAlign : Force<RoomPusher.Room> {
	public double alignStrength = 1;
	public double sideShiftStrength = .1;
	public double targetDistance = 90;
	public List<RoomPusher.Link> links;

	public ForceDoorAlign(List<RoomPusher.Link> links) {
		this.links = links;
	}

	public ForceDoorAlign SetStrengths(double align, double sideShift) {
		alignStrength = align;
		sideShiftStrength = sideShift;
		return this;
	}

	protected override void Initialize() {}

	public override Force<RoomPusher.Room> UseForce(double alpha = 0) {
		for (int i = 0, len = links.Count; i < len; i++) {
			var link = links[i];

			if (link.roomA == null || link.roomB == null) continue;//todo
			//todo: is this symmetric if A/B are swapped?

			//Pick a "meeting point" off the edge of each door and try to draw them together.
			var pointA = (
				link.roomA.XYZ + link.roomA.nodeOffset + link.transitionA.Position +
				RoomTransition.DoorDirection(link.transitionA.srcSide) * (float)targetDistance
			);
			var pointB = (
				link.roomB.XYZ + link.roomB.nodeOffset + link.transitionB.Position +
				RoomTransition.DoorDirection(link.transitionA.destSide) * (float)targetDistance
			);

			var force = (pointB - pointA) * (float)alignStrength * (float)alpha;

			link.roomA.VXYZ += force;
			link.roomB.VXYZ -= force;


			/*void PushLink(string side, RoomPusher.Room room, RoomPusher.Room otherRoom) {
				if (side == null || otherRoom == null) return;//fixme: one-way, should still apply force, though
				if (side[0] == 'd') return;//for side.startsWith(door), don't apply forces to them

				var dx = otherRoom.X - room.X;
				var dy = otherRoom.Y - room.Y;

				switch (side[0]) {
					case 't':
						room.Vx += dx * alignStrength * alpha;
						if (dy > 0) room.Vy += dy * sideShiftStrength * alpha;
						break;
					case 'b':
						room.Vx += dx * alignStrength * alpha;
						if (dy < 0) room.Vy -= -dy * sideShiftStrength * alpha;
						break;
					case 'r':
						room.Vy += dy * alignStrength * alpha;
						if (dx < 0) room.Vx -= -dx * sideShiftStrength * alpha;
						break;
					case 'l':
						room.Vy += dy * alignStrength * alpha;
						if (dx > 0) room.Vx += dx * sideShiftStrength * alpha;
						break;
				}

			}

			PushLink(link.transitionA.srcSide, link.roomA, link.roomB);
			PushLink(link.transitionA.destSide, link.roomB, link.roomA);*/
		}


		return this;
	}
}

#endif
}
