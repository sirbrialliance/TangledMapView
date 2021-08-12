
//target number of rooms per island, in practice will vary
const roomsPerIsland = 40

class ClusterHandler {

	hubs = []//central room of each island
	islands = []
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

		//rough visible room estimate:
		var numRooms = Object.keys(this._visitedRooms).length

		if (numRooms === 0) return

		var numIslands = Math.round(numRooms / roomsPerIsland)
		if (numIslands === 0 || numIslands > numRooms) numIslands = 1

		//grab top rooms
		var rooms = Object.values(this.data.rooms)
		rooms.sort((a, b) => b.numTransitions - a.numTransitions)

		for (let i = 0; i < numIslands; i++) this.hubs.push(rooms[i])
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
		for (let room of this.hubs) {
			let island = room.island = {
				id: room.id,
				rooms: [],
				links: [],
				hub: room,
				simulation: null,
			}
			room.islandDistance = 0
			this.islands.push(island)

			//pin to local origin
			room.fx = 0
			room.fy = 0
		}

		//find distances
		for (let room of this.hubs) {
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

	_buildMacroData() {
		this.macro = {
			nodes: this.islands
		}

		this.macro.simulation = d3.forceSimulation(this.macro.nodes)
			.force("group", d3.forceManyBody())
			.force("center", d3.forceCenter())
	}

	_buildIslandData(island) {
		let links = island.links

		var includedTransitions = {}

		for (let transitionId in this.data.visitedTransitions) {
			if (includedTransitions[transitionId]) continue;//already handled

// if (links.length >= 8) break;

			var transitionA = this.data.allTransitions[transitionId]

			if (transitionA.srcRoom.island !== island || transitionA.dstRoom.island !== island) {
				//todo, cross island connecting stuffs
				continue
			}

			//(transitionA might only end at transitionId, so pick the right side to check for the return transition)
			var transitionADoor = transitionA.id === transitionId ? transitionId : transitionA.dst

			var transitionB = transitionA.bidi ? this.data.transitions[transitionADoor] : null

			links.push(new RoomLink(transitionA, transitionB))
			includedTransitions[transitionA.id] = true
			if (transitionB) includedTransitions[transitionB.id] = true
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
			.alphaMin(.05)
	}

}

