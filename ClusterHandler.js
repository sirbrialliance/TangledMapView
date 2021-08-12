
//target number of rooms per island, in practice will vary
const roomsPerIsland = 40

class ClusterHandler {

	hubs = []//central room of each island
	islands = []
	crossIslandLinks = []
	macro = null

	constructor(data) {
		this.data = data
	}

	buildIslands() {
		this._visitedRooms = this.data.getVisitedRoomIds()

		this._pickIslands()
		this._measureDistances()
		this._buildMacroData()
		for (let island of this.islands) this._buildIslandData(island)
	}

	_pickIslands() {
		this.islands = []
		this.crossIslandLinks = []

		//rough visible room estimate:
		var numRooms = Object.keys(this._visitedRooms).length

		if (numRooms === 0) return

		var numIslands = Math.round(numRooms / roomsPerIsland)
		if (numIslands === 0 || numIslands > numRooms) numIslands = 1

		//grab top rooms
		var rooms = Object.values(this.data.rooms)
		rooms.sort((a, b) => b.numDoors - a.numDoors)

		for (let i = 0; i < numIslands; i++) this.hubs.push(rooms[i])
	}

	_addIsland(room) {
		let island = room.island = new Island(room)
		room.islandDistance = 0
		this.islands.push(island)

		//pin to local origin
		room.fx = 0
		room.fy = 0
	}

	/** Marks each room with the closest island */
	_measureDistances() {
		var rooms = this.data.rooms

		//clear
		for (let roomId in this._visitedRooms) {
			rooms[roomId].island = null
			rooms[roomId].islandDistance = Infinity
			rooms[roomId].fx = null
			rooms[roomId].fy = null
		}

		//promote islands
		for (let room of this.hubs) this._addIsland(room)

		//find distances
		for (let room of this.hubs) {
			this._crawlDistances(room, room.island, 0)
		}

		//collect island members
		for (let roomId in this._visitedRooms) {
			let room = rooms[roomId]
			if (!room.island) {
				//isolated, make an island for it
				this._addIsland(room)
				this._crawlDistances(room, room.island, 0)
			}
			room.island.rooms.push(room)
		}
	}

	_crawlDistances(room, island, islandDistance) {
		if (room.islandDistance <= islandDistance && islandDistance !== 0) return

		room.island = island
		room.islandDistance = islandDistance
		++islandDistance

		for (let doorId in room.doorIds) {
			if (!this.data.visitedDoors[doorId]) continue
			let transition = this.data.doorTransitions[doorId]

			let otherRoom = transition.dstRoom === room ? transition.srcRoom : transition.dstRoom

			//ignore unvisited rooms
			if (!this._visitedRooms[otherRoom.id]) continue

			if (islandDistance < otherRoom.islandDistance) {
				//we're closer than what it currently has
				this._crawlDistances(transition.dstRoom, island, islandDistance)
			}
		}
	}

	_buildMacroData() {
		this.macro = {
			nodes: this.islands
		}

		this.macro.simulation = d3.forceSimulation(this.macro.nodes)
			// .force("group", d3.forceManyBody())
			.force("group", d3.forceCollide().radius(400).strength(.5))
			.force("center", d3.forceCenter())
			.force("x", d3.forceX().strength(.1))
			.force("y", d3.forceY().strength(.1))
	}

	_buildIslandData(island) {
		let links = island.links

		var handledDoors = {}

		for (let doorId in this.data.visitedDoors) {
			if (handledDoors[doorId]) continue;//already handled
			// if (links.length >= 8) break;

			var transitionA = this.data.transitions[doorId]
			if (!transitionA) continue //one-way that doesn't start on doorId we'll get this form the other side

			if (transitionA.srcRoom.island !== island && transitionA.dstRoom.island !== island) {
				//Fully unrelated to this island
				continue
			}

			var transitionB = this.data.transitions[transitionA.dstDoorId]
			let link = new RoomLink(transitionA, transitionB)

			if (transitionA.srcRoom.island !== transitionA.dstRoom.island) {
				//different islands
				if (this.crossIslandLinks.every(x => x.id !== link.id)) {
					//not a duplicate, add it
					this.crossIslandLinks.push(link)
				}
			} else {
				//same island
				links.push(link)
				handledDoors[transitionA.srcDoor] = true
				handledDoors[transitionA.dstDoor] = true
			}

		}

		const explosionPrevention = () => {
			const maxDistance = 1000
			const maxDistance2 = maxDistance * maxDistance
			return alpha => {
				let nodes = island.rooms
				for (let i = 0, len = nodes.length; i < len; i++) {
					let node = nodes[i]

					//prevent explosions, stop things that are going far
					var dist2 = node.vx * node.vx + node.vy * node.vy
					if (dist2 > maxDistance2) {
						var dist = Math.sqrt(dist2)
						node.vx = node.vy = 0
						// var old = [node.x, node.y]
						node.x = node.x / dist * maxDistance
						node.y = node.y / dist * maxDistance
						//console.log(`Warp bad from ${old[0]} ${old[1]} to ${node.x} ${node.y}`)
					}
				}
			}
		}

		island.simulation = d3.forceSimulation(island.rooms)
			.force("link", d3.forceLink(island.links)
				.strength(x => x.strength)
				.distance(35)
			)
			.force("group", d3.forceManyBody()
				// .strength(-30)
				// .distanceMin(30)
				// .distanceMax(200)
			)
			.force("noExplode", explosionPrevention)
			// .force("custom", dataRender.getForceFunc())
			.alphaDecay(.005)
			.alphaMin(.09)
	}

}


class Island {
	rooms = []
	links = []
	simulation = null

	constructor(room) {
		this.hub = room
		this.id = room.id
	}

}
