using Unity.Collections;
using Unity.Jobs;
using UnityEngine;
using UnityEngine.Jobs;

namespace TangledMapView {
public struct RoomPusher : IJobParallelFor {
	public struct Data {
		/// <summary>
		/// Position/velocity
		/// </summary>
		public Vector3 p, v;

		public Bounds worldBounds;
	}

	[ReadOnly]
	public NativeArray<Data> prevRoomsData;

	public NativeArray<Data> roomsData;

	public void Execute(int i) {
		var data = prevRoomsData[i];

		_Execute(i, ref data);

		roomsData[i] = data;
	}

	public void _Execute(int i, ref Data data) {
		data.worldBounds.center = data.p;

		BiasCenter(ref data);
		Collide(i, ref data);

		data.p += data.v * 1 / 60f;
	}

	private void BiasCenter(ref Data data) {
		data.v += -data.p * .01f;
	}

	private void Collide(int myIdx, ref Data data) {
		//fixme: n^2 algo, slow
		//fixme: accessing data that may be getting mutated on another thread
		for (int i = 0; i < roomsData.Length; i++) {
			if (i == myIdx) continue;
			if (!prevRoomsData[i].worldBounds.Intersects(data.worldBounds)) continue;

			//push apart
			//fixme: should be based on overlap
			data.v += (prevRoomsData[i].worldBounds.center - data.worldBounds.center) * 1.2f;
		}
	}
}
}
