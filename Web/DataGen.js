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
	transitions = {}//map of (srcDoor) => RoomTransition
	/** Map of door id => RoomTransition. The forward transition is preferred, but if there isn't one the reverse transition is used. */
	doorTransitions = {}
	/** set of doors we've used including src and dst door, door id => true */
	visitedDoors = {}

	/** Show everything? If false just what we've visited. */
	showAll = false

	clear() {
		this.saveData = null
		this.randomizerData = null
		this.transitions = {}
		this.visitedDoors = {}
		this.rooms = {}
	}

	load(saveData) {
		this.saveData = saveData
		var randomizerDataJSON = saveData["PolymorphicModData"]["RandomizerMod"]
		this.randomizerData = JSON.parse(randomizerDataJSON)

		var visitedDoorIdsRaw = JSON.parse(this.randomizerData["StringValues"]["_obtainedTransitions"])

		this.transitions = {}
		this.visitedDoors = {}
		this.rooms = {}

		const getAndUpdateRoom = (roomId, doorId) => {
			var room = this.rooms[roomId] || (this.rooms[roomId] = new RoomNode(roomId, this))
			room.addDoor(doorId)
			return room
		}

		var tPlacements = this.randomizerData["_transitionPlacements"];

		for (var srcDoor in tPlacements) {
			var srcInfo = this.parseDoorId(srcDoor)
			var dstDoor = tPlacements[srcDoor]
			var dstInfo = this.parseDoorId(dstDoor)

			var srcRoom = getAndUpdateRoom(srcInfo.roomId, srcDoor)
			var dstRoom = getAndUpdateRoom(dstInfo.roomId, dstDoor)

			this.transitions[srcDoor] = Object.assign(new RoomTransition, {
				id: srcDoor + "-" + dstDoor,
				srcDoor,
				srcRoom,
				srcSide: srcInfo.side,

				dstDoor,
				dstRoom,
				dstSide: dstInfo.side,

				visited: null,//will fill out shortly
				bidi: tPlacements[dstDoor] === srcDoor,//bidirectional link
			})
		}

		this.doorTransitions = {}
		//add door mappings
		for (let k in this.transitions) {
			var transition = this.transitions[k]
			this.doorTransitions[transition.srcDoor] = transition
			if (!transition.bidi) this.doorTransitions[transition.dstDoor] = transition
		}

		//mark what's been visited
		for (let doorId of visitedDoorIdsRaw._keys) {
			let transitionA = this.doorTransitions[doorId]
			transitionA.visited = true
			this.visitedDoors[transitionA.srcDoor] = true
			this.visitedDoors[transitionA.dstDoor] = true

			if (transitionA.bidi) {
				let transitionB = this.doorTransitions[transitionA.dstDoor]
				transitionB.visited = true
			}
		}
	}

	parseDoorId(doorId) {
		var parts = doorId.match(/^(\w+)\[([a-zA-Z_]+)(\d*)\]$/);
		return {
			doorId,
			roomId: parts[1],
			side: parts[2],
			number: parts[3] || -1,
		}
	}

	/** Returns a map of rooms that are currently visible (roomId => room) */
	get visibleRooms() {
		if (this.showAll) {
			return this.rooms
		} else {
			//just what we've visited
			//can't use this.saveData.playerData.scenesVisited, not all rooms get recorded (e.g. White_Palace*)
			var ret = {}

			for (let doorId in this.visitedDoors) {
				if (ret[doorId]) continue;

				var transition = this.doorTransitions[doorId]
				ret[transition.srcRoom.id] = transition.srcRoom
				ret[transition.dstRoom.id] = transition.dstRoom
			}

			return ret
		}
	}

	/** Returns a map of visible transitions (srcDoor (or maybe dstDoor) => transition) */
	get visibleTransitions() {
		if (this.showAll) {
			return this.transitions
		} else {
			var ret = {}
			for (let doorId in this.visitedDoors) {
				var transition = this.doorTransitions[doorId]
				ret[transition.srcDoor] = transition
				if (transition.bidi) {
					var transitionB = this.transitions[transition.dstDoor]
					ret[transitionB.srcDoor] = transitionB
				} else {
					ret[transition.dstDoor] = transition
				}
			}

			return ret
		}
	}

	addVisit(doorId) {
		var transition = this.doorTransitions[doorId]
		this.visitedDoors[transition.srcDoor] = true
		this.visitedDoors[transition.dstDoor] = true
	}

}

class RoomNode {
	doorIds = {}//set of door id => true that leave this room
	numDoors = 0
	island = null
	islandDistance = 0//0 = hub, 1 = adjacent to hub, 2 = adjacent to that, etc.
	graphParent = null//an adjacent room on our island that's closer to the hub than us

	constructor(id, dataSource) {
		this.id = id
		this.dataSource = dataSource
	}

	addDoor(doorId) {
		this.doorIds[doorId] = true
		this.numDoors = Object.keys(this.doorIds).length
	}

	get isStartRoom() {
		return this.id === this.dataSource.randomizerData.StringValues.StartSceneName
	}

	get isEveryTransitionVisited() {
		let visitedDoors = this.dataSource.visitedDoors
		for (let k in this.doorIds) {
			if (!visitedDoors[k]) return false
		}
		return true
	}

	get visitedDoors() {
		let allVisited = this.dataSource.visitedDoors
		let ret = []
		for (let k in this.doorIds) if (allVisited[k]) ret.push(k)
		return ret
	}
	get unvisitedDoors() {
		let allVisited = this.dataSource.visitedDoors
		let ret = []
		for (let k in this.doorIds) if (!allVisited[k]) ret.push(k)
		return ret
	}

	get numTransitionsVisited() {
		let visitedDoors = this.dataSource.visitedDoors
		let ret = 0
		for (let k in this.doorIds) {
			if (visitedDoors[k]) ++ret
		}
		return ret
	}

	get adjacentRooms() {
		//(aside: rooms can link to themselves, FYI)
		var ret = []
		for (let doorId in this.doorIds) {
			let transition = this.dataSource.doorTransitions[doorId]
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
class RoomTransition {
	/** Returns the room on this transition that isn't the given one. */
	otherRoom(room) {
		if (this.srcRoom === room) return this.dstRoom
		else if (this.dstRoom === room) return this.srcRoom
		else throw new Error("Room is unrelated")
	}

	otherDoor(doorId) {
		if (this.srcDoor === doorId) return this.dstDoor
		else if (this.dstDoor === doorId) return this.srcDoor
		else throw new Error("Door is unrelated")
	}

}
/** A connecting line between rooms on the map. Only one link even if it covers two transitions.  */
class RoomLink {

	static getId(transition) {
		return [transition.srcDoor, transition.dstDoor].sort().join("-")
	}

	constructor(transitionA, transitionB) {
		//id is door id + "-" + door id, with the alphabetically first one first
		this.id = RoomLink.getId(transitionA)

		this.transitionA = transitionA
		//optional, but if given must be transitionA with src and dst swapped
		this.transitionB = transitionB

		this.source = transitionA.srcRoom
		this.target = transitionA.dstRoom

		//Try to cluster near nexus rooms and allow larger distances for "straight-though"/travel rooms.
		var mostDoors = Math.max(transitionA.srcRoom.numDoors, transitionA.dstRoom.numDoors)
		this.strength = Math.pow(mostDoors, 1.2) / 30

	}

}
