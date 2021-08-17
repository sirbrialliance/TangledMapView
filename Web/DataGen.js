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
//visitedDoorIdsRaw._keys = ["Town[left1]"]

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
			var srcInfo = DataGen.parseDoorId(srcDoor)
			var dstDoor = tPlacements[srcDoor]
			var dstInfo = DataGen.parseDoorId(dstDoor)

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

		for (let roomId in this.rooms) {
			this.rooms[roomId].finishSetup()
		}
	}

	static parseDoorId(doorId) {
		var parts = doorId.match(/^(\w+)\[(([a-zA-Z_]+)(\d*))\]$/);
		return {
			doorId,
			roomId: parts[1],
			doorName: parts[2],
			side: parts[3],
			number: parts[4] || -1,
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
	doors = {}//map of door id => {x, y} that leave this room
	numDoors = 0
	island = null
	islandDistance = 0//0 = hub, 1 = adjacent to hub, 2 = adjacent to that, etc.
	graphParent = null//an adjacent room on our island that's closer to the hub than us
	/** Bounding box, in local coordinates, center of that, width and height of that. */
	aabb = {x1: Infinity, y1: Infinity, x2: -Infinity, y2: -Infinity, cx: null, cy: null, width: null, height: null}

	constructor(id, dataSource) {
		this.id = id
		this.dataSource = dataSource
	}

	addDoor(doorId) {
		this.doors[doorId] = {}
		this.numDoors = Object.keys(this.doors).length
	}

	finishSetup() {
		//how big to make a room if we don't have data for its doors
		const defaultSize = 30
		const defaultSize2 = defaultSize / 2

		if (this.numDoors === 0) {
			this._calcAABBData(-defaultSize2, -defaultSize2)
			this._calcAABBData(defaultSize2, defaultSize2)
			this._calcAABBData()
			return
		}

		var b = this.aabb
		let sidesArray = Object.keys(this.doors).map(x => DataGen.parseDoorId(x).side)

		//Check for door positions we know about
		var unknownDoorCount = 0
		for (let doorId in this.doors) {
			let doorInfo = DataGen.parseDoorId(doorId)
			try {
				var door = this.doors[doorId] = window.doorData[doorInfo.roomId][doorInfo.doorName]
				door.y *= -1
				this._expandAABB(door.x, door.y)
			} catch {
				++unknownDoorCount
			}
		}

		//make room big enough for unknown doors
		if (unknownDoorCount > 0) {
			let hCount = sidesArray.filter(x => x === "left" || x === "right").length
			let vCount = sidesArray.filter(x => x === "top" || x === "bot").length
			if (hCount) {
				this._expandAABB(-defaultSize2 * hCount, NaN)
				this._expandAABB(defaultSize2 * hCount, NaN)
			}
			if (vCount) {
				this._expandAABB(-defaultSize2 * vCount, NaN)
				this._expandAABB(defaultSize2 * vCount, NaN)
			}
		}

		this._calcAABBData()

		//Make room at least minimum width/height, keeping in mind the local origin may not be included
		if (b.width < defaultSize) {
			if (b.x1 === Infinity && b.x2 === -Infinity) b.x1 = -defaultSize2, b.x2 = defaultSize2
			else if (b.x1 === Infinity) b.x1 = b.x2 - defaultSize
			else if (b.x2 === -Infinity) b.x2 = b.x1 + defaultSize
			else {
				let axisDoors = sidesArray.filter(x => x === "left" || x === "right")
				if (axisDoors.length === 1) {
					if (axisDoors[0] === "left") b.x2 = b.x1 + defaultSize
					else b.x1 = b.x2 - defaultSize
				} else {
					let c = (b.x1 + b.x2) / 2
					b.x1 = c - defaultSize2
					b.x2 = c + defaultSize2
				}
			}
		}
		if (b.height < defaultSize) {
			if (b.y1 === Infinity && b.y2 === -Infinity) b.y1 = -defaultSize2, b.y2 = defaultSize2
			else if (b.y1 === Infinity) b.y1 = b.y2 - defaultSize
			else if (b.y2 === -Infinity) b.y2 = b.y1 + defaultSize
			else {
				let axisDoors = sidesArray.filter(x => x === "top" || x === "bot")
				if (axisDoors.length === 1) {
					if (axisDoors[0] === "left") b.y2 = b.y1 + defaultSize
					else b.y1 = b.y2 - defaultSize
				} else {
					let c = (b.y1 + b.y2) / 2
					b.y1 = c - defaultSize2
					b.y2 = c + defaultSize2
				}
			}
		}

		this._calcAABBData()

		//add unknown doors to edges is maybe plausible locations
		if (unknownDoorCount > 0) {
			for (let doorId in this.doors) {
				let door = this.doors[doorId]
				if (typeof door.x === "number") continue
				let parts = DataGen.parseDoorId(doorId)

				let numThatSide = sidesArray.filter(x => x === parts.side).length
				let posNorm = numThatSide === 1 ? .5 : (parts.number - 1) / (numThatSide - 1)
				switch (parts.side) {
					case "top": door.x = b.x1 + posNorm * b.width, door.y = b.y1; break
					case "bot": door.x = b.x1 + posNorm * b.width, door.y = b.y2; break
					case "left": door.y = b.y1 + posNorm * b.height, door.x = b.x1; break
					case "right": door.y = b.y1 + posNorm * b.height, door.x = b.x2; break
					default: door.x = door.y = 0; break
				}

			}
		}
	}

	_expandAABB(x, y) {
		var b = this.aabb
		if (!isNaN(x)) {
			b.x1 = Math.min(b.x1, x)
			b.x2 = Math.max(b.x2, x)
		}
		if (!isNaN(y)) {
			b.y1 = Math.min(b.y1, y)
			b.y2 = Math.max(b.y2, y)
		}
	}

	_calcAABBData() {
		var b = this.aabb
		b.width = b.x2 - b.x1
		b.height = b.y2 - b.y1
		b.cx = b.x1 + b.width / 2
		b.cy = b.y1 + b.height / 2
	}

	get isStartRoom() {
		return this.id === this.dataSource.randomizerData.StringValues.StartSceneName
	}

	get isEveryTransitionVisited() {
		let visitedDoors = this.dataSource.visitedDoors
		for (let k in this.doors) {
			if (!visitedDoors[k]) return false
		}
		return true
	}

	get visitedDoors() {
		let allVisited = this.dataSource.visitedDoors
		let ret = []
		for (let k in this.doors) if (allVisited[k]) ret.push(k)
		return ret
	}
	get unvisitedDoors() {
		let allVisited = this.dataSource.visitedDoors
		let ret = []
		for (let k in this.doors) if (!allVisited[k]) ret.push(k)
		return ret
	}

	get numTransitionsVisited() {
		let visitedDoors = this.dataSource.visitedDoors
		let ret = 0
		for (let k in this.doors) {
			if (visitedDoors[k]) ++ret
		}
		return ret
	}

	get adjacentRooms() {
		//(aside: rooms can link to themselves, FYI)
		var ret = []
		for (let doorId in this.doors) {
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
