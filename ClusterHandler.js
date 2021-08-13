
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
		for (let island of this.islands) this._buildIslandData(island)
		this._buildMacroData()
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
				this._crawlDistances(otherRoom, island, islandDistance)
			}
		}
	}

	_buildMacroData() {
		this.macro = {
			nodes: this.islands
		}

		this.macro.simulation = d3.forceSimulation(this.macro.nodes)
			// .force("group", d3.forceManyBody())
			.force("group", d3.forceCollide().radius(island => island.radius).strength(.5))
			.force("center", d3.forceCenter())
			.force("x", d3.forceX().strength(.05))
			.force("y", d3.forceY().strength(.05))
	}

	_buildIslandData(island) {
		let links = island.links

		var handledDoors = {}

		for (let doorId in this.data.visitedDoors) {
			if (handledDoors[doorId]) continue;//already handled
			// if (links.length >= 2) break;

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

		const positionDistance = 300
		//Picks relative positions and parent for parent-relative positioning mode
		const positionRooms = (room, depth) => {
			var levelDistance = positionDistance / Math.pow(1.5, depth)
			// var levelDistance = positionDistance * (1 - depth / 5)
			let i = 0, doorIds = Object.keys(room.doorIds)
			for (let doorId of doorIds) {
				let transition = this.data.doorTransitions[doorId]
				let [cRoom, side] = transition.dstRoom === room ? [transition.srcRoom, transition.dstSide] : [transition.dstRoom, transition.srcSide]

				if (cRoom.island !== island) continue//leaving the island
				if (cRoom.islandDistance <= depth) continue//would be handled at a higher level already

				cRoom.graphParent = room

				cRoom.parentDeltaX = 0
				cRoom.parentDeltaY = 0

				switch (side) {
					case "top": cRoom.parentDeltaY += -levelDistance; break
					case "bot": cRoom.parentDeltaY += levelDistance; break
					case "right": cRoom.parentDeltaX += levelDistance; break
					case "left": cRoom.parentDeltaX += -levelDistance; break
					default: {
						let angle = i / doorIds.length * 2 * Math.PI + Math.PI / 8
						cRoom.parentDeltaX += levelDistance * Math.cos(angle)
						cRoom.parentDeltaY += levelDistance * Math.sin(angle)
						break
					}
				}

				positionRooms(cRoom, depth + 1)
				++i
			}

		}
		island.hub.x = 0
		island.hub.y = 0
		positionRooms(island.hub, 0)

		const islandBoundary = alpha => {
			var radius2 = island.radius * island.radius
			const strength = 3
			const nodes = island.rooms
			for (let i = 0, len = nodes.length; i < len; i++) {
				let node = nodes[i]
				var dist2 = node.x * node.x + node.y * node.y
				if (dist2 > radius2) {
					var dist = Math.sqrt(dist2)
					var force = (dist - island.radius) * strength * alpha
					node.vx += -force * node.x / dist
					node.vy += -force * node.y / dist
				}
			}
		}

		// island.radius = 40 * Math.sqrt(island.rooms.length) + 30
		island.radius = 80 * Math.sqrt(island.rooms.length)

		island.simulation = d3.forceSimulation(island.rooms)
			.force("link", d3.forceLink(island.links)
				.strength(.3)
				// .strength(x => x.strength)
				.distance(60)
			)
			.force("group", d3.forceCollide().radius(60).strength(.3))
			// .force("group", d3.forceManyBody()
			// 	.strength(-30)
			// 	.distanceMin(30)
			// 	.distanceMax(200)
			// )
			// .force("placement", ClusterHandler.forceParentRelative().strength(.03))
			.force("noExplode", ClusterHandler.forcePreventExplosions())
			.force("doorAlign", ClusterHandler.forceDoorAlignment(island.links).strengths(.3, .3))
			.force("islandBoundary", islandBoundary)
			.alphaDecay(.005)
			.alphaMin(.09)
	}

	static forcePreventExplosions(maxDistance_ = 1000) {
		const maxDistance = maxDistance_
		const maxDistance2 = maxDistance * maxDistance
		var nodes

		var ret = alpha => {
			for (let i = 0, len = nodes.length; i < len; i++) {
				let node = nodes[i]

				//prevent explosions, stop things that are going far
				var dist2 = node.x * node.x + node.y * node.y
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

		ret.initialize = nodes_ => nodes = nodes_

		return ret
	}

	static forceParentRelative() {
		var strength = 1, nodes
		var ret = alpha => {
			for (let i = 0, len = nodes.length; i < len; i++) {
				let node = nodes[i]
				let parent = node.graphParent
				if (!parent) continue

				let diffX = (node.parentDeltaX + parent.x) - node.x
				let diffY = (node.parentDeltaY + parent.y) - node.y

				node.vx += strength * diffX * alpha
				node.vy += strength * diffY * alpha
			}
		}

		ret.initialize = nodes_ => nodes = nodes_
		ret.strength = str => (strength = str, ret)

		return ret
	}

	/** Tries to push nodes so they line up with the correct side fora doorway. */
	static forceDoorAlignment(links) {
		var alignStrength = 1
		var sideShiftStrength = .1

		var ret = alpha => {
			for (let i = 0, len = links.length; i < len; i++) {
				let link = links[i]

				const pushLink = (side, room, otherRoom) => {
					if (side[0] === "d") return//for side.startsWith(door), don't apply forces to them

					var dx = otherRoom.x - room.x
					var dy = otherRoom.y - room.y

					switch (side) {
						case "top":
							room.vx += dx * alignStrength * alpha
							if (dy > 0) room.vy += dy * sideShiftStrength * alpha
							break
						case "bot":
							room.vx += dx * alignStrength * alpha
							if (dy < 0) room.vy -= -dy * sideShiftStrength * alpha
							break
						case "right":
							room.vy += dy * alignStrength * alpha
							if (dx < 0) room.vx -= -dx * sideShiftStrength * alpha
							break
						case "left":
							room.vy += dy * alignStrength * alpha
							if (dx > 0) room.vx += dx * sideShiftStrength * alpha
							break
					}

				}

				pushLink(link.transitionA.srcSide, link.transitionA.srcRoom, link.transitionA.dstRoom)
				pushLink(link.transitionA.dstSide, link.transitionA.dstRoom, link.transitionA.srcRoom)
			}
		}

		//ret.initialize = nodes_ => nodes = nodes_
		ret.strengths = (alignStr, sideStr) => (alignStrength = alignStr, sideShiftStrength = sideStr, ret)

		return ret
	}


}


class Island {
	rooms = []
	links = []
	simulation = null
	radius = 300

	constructor(room) {
		this.hub = room
		this.id = room.id
	}

}
