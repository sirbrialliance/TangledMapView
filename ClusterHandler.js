
//target number of rooms per island, in practice will vary
const roomsPerIsland = 40

class ClusterHandler {

	islands = []
	macro = null

	constructor(data) {
		this.data = data
	}

	buildIslands() {
		this._visitedRooms = this.data.getVisitedRoomIds()

		this._pickIslands()
		this._measureDistances()
		this._buildMacroSimulation()
	}

	_pickIslands() {
		this.islands = []

		//rough visible room estimate:
		var numRooms = Object.keys(this._visitedRooms).length

		if (numRooms === 0) return

		var numIslands = Math.round(numRooms / roomsPerIsland)
		if (numIslands === 0 || numIslands > numRooms) numIslands = 1

		//grab top rooms
		var rooms = Object.values(this.data.rooms)
		rooms.sort((a, b) => b.numTransitions - a.numTransitions)

		for (let i = 0; i < numIslands; i++) this.islands.push(rooms[i])
	}

	/** Marks each room with the closest island */
	_measureDistances() {
		var rooms = this.data.rooms

		//clear
		for (let roomId in this._visitedRooms) {
			rooms[roomId].island = null
			rooms[roomId].islandDistance = Infinity
		}

		//promote islands
		for (let room of this.islands) {
			room.island = {
				id: room.id,
				rooms: [],
				hub: room,
				simulation: null,
			}
			room.islandDistance = 0
		}

		//find distances
		for (let room of this.islands) {
			this._crawlDistances(room, room.island, 0)
		}

		//collect island members
		for (let roomId in this._visitedRooms) {
			let room = rooms[roomId]
			if (!room.island) {
				// console.warn("Isolated room " + roomId)
				continue
			}
			room.island.rooms.push(room)
		}
	}

	_crawlDistances(room, island, islandDistance) {
		if (room.islandDistance <= islandDistance && islandDistance !== 0) return

		room.island = island
		room.islandDistance = islandDistance

		++islandDistance

		for (let tId in room.transitions) {
			let transition = this.data.transitions[tId]
			if (!transition) continue//inbound-only transition

			let otherRoom = transition.dstRoom === room ? transition.srcRoom : transition.dstRoom

			//ignore unvisited rooms
			if (!this._visitedRooms[otherRoom.id]) continue

			if (islandDistance < otherRoom.islandDistance) {
				//we're closer than what it currently has
				this._crawlDistances(transition.dstRoom, island, islandDistance)
			}
		}
	}

	_buildMacroSimulation() {
		var nodes = []
		this.macro = {
			nodes
		}

		// this.macro.simulation = d3.forceSimulation(nodes)
		// 	.force("group", d3.forceManyBody())
		// 	.
	}
}

