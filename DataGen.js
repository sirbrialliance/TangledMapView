/*

Transition types:
bot: 123
left: 321
right: 288
top: 117
door: 20
door_*: 13

*/

 /** Loads data from the save file and hands general information about that data */
class DataGen {
	// centerPos = [0, 0]
	rooms = {}//map of room id => RoomNode
	transitions = {}//map of transition id => RoomLink
	/** transitions, but includes lookups for destination-only doors (e.g. A->B can be found in allTransitions[A] or allTransitions[B]) */
	allTransitions = {}

	load(saveData) {
		this.saveData = saveData
		var randomizerDataJSON = saveData["PolymorphicModData"]["RandomizerMod"]
		this.randomizerData = JSON.parse(randomizerDataJSON)

		var transitionRawData = JSON.parse(this.randomizerData["StringValues"]["_obtainedTransitions"])


		this.visitedTransitions = {}
		this.transitions = {}
		this.rooms = {}

		for (let id of transitionRawData._keys) this.visitedTransitions[id] = true

		const getAndUpdateRoom = (roomId, transitionId) => {
			var room = this.rooms[roomId]
			if (!room) {
				room = this.rooms[roomId] = new RoomNode(roomId, this)

				//pin starting room to the center
				// if (room === this.randomizerData.StringValues.StartSceneName) {
				// 	this.setCenter(this.centerPos)
				// }
			}
			room.addTransition(transitionId)
			return room
		}

		var tPlacements = this.randomizerData["_transitionPlacements"];
		for (var src in tPlacements) {
			var srcInfo = this.parseTransition(src)
			var dst = tPlacements[src]
			var dstInfo = this.parseTransition(dst)

			var srcRoom = getAndUpdateRoom(srcInfo.room, src)
			var dstRoom = getAndUpdateRoom(dstInfo.room, dst)

			this.transitions[src] = Object.assign(new RoomTransition, {
				id: src,
				src,
				srcRoom,
				srcSide: srcInfo.side,

				dst,
				dstRoom,
				dstSide: dstInfo.side,

				visited: this.visitedTransitions[src] || false,
				bidi: tPlacements[dst] === src,//bidirectional link
			})
		}

		//Extra lookup for finding at least SOME transition when looking at destination-only doors
		this.allTransitions = {...this.transitions}
		for (let k in this.transitions) {
			var transition = this.transitions[k]
			if (!this.allTransitions[transition.dst]) this.allTransitions[transition.dst] = transition
		}

		this.buildNodes()
	}

	// setCenter(pos) {
	// 	this.centerPos = pos;

	// 	var startRoom = this.rooms[this.randomizerData.StringValues.StartSceneName]
	// 	if (startRoom) {
	// 		[startRoom.fx, startRoom.fy] = pos
	// 	}

	// }

	parseTransition(transitionName) {
		var parts = transitionName.match(/^(\w+)\[([a-zA-Z_]+)(\d*)\]$/);
		return {
			transition: transitionName,
			room: parts[1],
			side: parts[2],
			number: parts[3] || -1,
		}
	}

	getVisitedRoomIds() {
		//can't use this.saveData.playerData.scenesVisited, not all rooms get recorded (e.g. White_Palace*)
		var ret = {}

		for (let transitionId in this.visitedTransitions) {
			if (ret[transitionId]) continue;

			var transitionA = this.transitions[transitionId]
			if (!transitionA) continue;//one-way, handle from the other side

			ret[transitionA.srcRoom.id] = true
			ret[transitionA.dstRoom.id] = true
		}

		return ret
	}

	/** Populates this.nodes and this.links with data for rendering the map (generally a subset of this.rooms and this.transitions). */
	buildNodes() {
		this.nodes = []
		this.links = []
		var includedRooms = {}, includedTransitions = {}


		const ensureRoomNode = room => {
			if (!includedRooms[room.id]) {
				this.nodes.push(room)
				includedRooms[room.id] = true
			}
			return room
		}

		for (let transitionId in this.visitedTransitions) {
			if (includedTransitions[transitionId]) continue;//already handled

// if (this.links.length >= 8) break;

			var transitionA = this.transitions[transitionId]
			if (!transitionA) continue;//one-way, handle from the other side

			var transitionB = transitionA.bidi ? this.transitions[transitionA.dst] : null

			ensureRoomNode(transitionA.srcRoom)
			ensureRoomNode(transitionA.dstRoom)

			this.links.push(new RoomLink(transitionA, transitionB))
			includedTransitions[transitionA.id] = true
			if (transitionB) includedTransitions[transitionB.id] = true

		}
	}

}

class RoomNode {
	transitions = {}
	numTransitions = 0
	island = null
	islandDistance = 0//0 = hub, 1 = adjacent to hub, 2 = adjacent to that, etc.

	constructor(id, dataSource) {
		this.id = id
		this.dataSource = dataSource
	}

	addTransition(transitionId) {
		this.transitions[transitionId] = true
		this.numTransitions = Object.keys(this.transitions).length
	}

	get isStartRoom() {
		return this.id === this.dataSource.randomizerData.StringValues.StartSceneName
	}

	get isEveryTransitionVisited() {
		let visitedTransitions = this.dataSource.visitedTransitions
		for (let k in this.transitions) {
			if (!visitedTransitions[k]) {
				return false
			}
		}
		return true
	}

	get adjacentRooms() {
		var ret = []
		for (let k in this.transitions) {
			let transition = this.dataSource.allTransitions[k]
			if (transition.srcRoom !== this && ret.indexOf(transition.srcRoom) < 0) ret.push(transition.srcRoom)
			if (transition.dstRoom !== this && ret.indexOf(transition.dstRoom) < 0) ret.push(transition.dstRoom)
		}
		return ret
	}

	get displayText() {
		return this.id
	}

	/** True if we are an island hub */
	get isHub() {
		return this.island && this.island.hub === this
	}
}

/** A transition from room A to room B. Might have a brother that's for room B to A. */
class RoomTransition {}
/** A connecting line between rooms on the map. */
class RoomLink {

	constructor(transitionA, transitionB) {
		//id is transition name + "-" + transition name, with the alphabetically first one first
		this.id = [transitionA.src, transitionA.dst].sort().join("-")

		this.transitionA = transitionA
		//optional, but if given must be transitionA with src and dst swapped
		this.transitionB = transitionB

		this.source = transitionA.srcRoom
		this.target = transitionA.dstRoom

		//Try to cluster near nexus rooms and allow larger distances for "straight-though"/travel rooms.
		var mostRooms = Math.max(transitionA.srcRoom.numTransitions, transitionA.dstRoom.numTransitions)
		this.strength = Math.pow(mostRooms, 1.2) / 30

	}

}
