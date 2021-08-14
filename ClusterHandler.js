
//target number of rooms per island, in practice will vary
const roomsPerIsland = 40

class ClusterHandler {

	islands = []
	crossIslandLinks = []
	macroSimulation = null

	constructor(data) {
		this.data = data
	}

	update() { this.buildIslands() }

	buildIslands() {
		this._visibleRooms = this.data.visibleRooms
		this._visibleTransitions = this.data.visibleTransitions

		//flag links to delete
		this.crossIslandLinks.forEach(x => x.dead = true)

		//convert existing room positions to absolute coordinates
		for (let room of Object.values(this.data.rooms)) {
			if (typeof room.x !== "number" || !room.island) continue
			room.x += room.island.x
			room.y += room.island.y
		}

		this._pickIslands()
		this._measureDistances()
		for (let island of this.islands) this._buildIslandData(island)
		this._buildMacroData()

		//convert room positions back to relative coordinates
		for (let room of Object.values(this.data.rooms)) {
			if (!room.island) continue
			room.x -= room.island.x
			room.y -= room.island.y
		}

		//delete links that weren't renewed
		this.crossIslandLinks = this.crossIslandLinks.filter(x => !x.dead)
	}

	_pickIslands() {
		var numRooms = Object.keys(this._visibleRooms).length
		if (numRooms === 0) return

		var desiredNumIslands = Math.round(numRooms / roomsPerIsland)
		if (desiredNumIslands === 0 || desiredNumIslands > numRooms) desiredNumIslands = 1

		//delete islands that are no longer visible
		this.islands.filter(x => !this._visibleRooms[x.hub.id]).forEach(island => {
			island.dead = true
			delete island.hub.fx
			delete island.hub.fy
		})
		this.islands = this.islands.filter(x => this._visibleRooms[x.hub.id])

		//grab top rooms (most doors)
		var rooms = Object.values(this._visibleRooms)
		rooms.sort((a, b) => b.numDoors - a.numDoors)

		//add new islands to target number
		while (this.islands.length < desiredNumIslands) {
			let hub = rooms.shift()
			//skip room if already hub of an island
			while (this.islands.some(x => x.hub === hub)) rooms.shift()

			this._addIsland(hub)
		}

		//give islands initial positions
		let i = 0
		for (let island of this.islands) {
			if (typeof island.x === "number") continue
			var angle = i / this.islands.length * 2 * Math.PI
			island.x = 1200 * Math.cos(angle)
			island.y = 1200 * Math.sin(angle)
			++i
		}
	}

	_addIsland(room) {
		let island = room.island = new Island(room)
		room.islandDistance = 0
		this.islands.push(island)

		//pin to local origin
		room.x = room.fx = 0
		room.y = room.fy = 0
	}

	/** Marks each room with the closest island */
	_measureDistances() {
		var rooms = this.data.rooms

		//clear island data from rooms
		for (let roomId in this._visibleRooms) {
			rooms[roomId].island = null
			rooms[roomId].islandDistance = Infinity
		}

		//find distances
		for (let island of this.islands) {
			island.rooms = []
			this._crawlDistances(island.hub, island, 0)
		}

		//collect island members
		for (let roomId in this._visibleRooms) {
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
			//don't allow graph traversal along transitions we haven't taken, even if both rooms are visited (or not)
			if (!this._visibleTransitions[doorId]) continue

			let transition = this.data.doorTransitions[doorId]

			let otherRoom = transition.dstRoom === room ? transition.srcRoom : transition.dstRoom

			//ignore non-visible rooms
			if (!this._visibleRooms[otherRoom.id]) continue


			if (islandDistance < otherRoom.islandDistance) {
				//we're closer than what it currently has
				this._crawlDistances(otherRoom, island, islandDistance)
			}
		}
	}

	_buildMacroData() {
		if (!this.macroSimulation) this.macroSimulation = d3.forceSimulation([])

		this.macroSimulation
			.nodes(this.islands)
			// .force("group", d3.forceManyBody())
			.force("group", d3.forceCollide().radius(island => island.radius).strength(.5))
			.force("center", d3.forceCenter())
			.force("x", d3.forceX().strength(.05))
			.force("y", d3.forceY().strength(.05))

		if (this.macroSimulation.alpha() < .2) this.macroSimulation.alpha(.2).restart()
	}

	_buildIslandData(island) {
		let links = island.links = []//just fully rebuilding links each time (for now?)

		var handledDoors = {}

		//build links form transitions/doors
		for (let doorId in this._visibleTransitions) {
			if (handledDoors[doorId]) continue;//already handled
			// if (links.length >= 2) break;

			var transitionA = this._visibleTransitions[doorId]
			if (!transitionA) continue //one-way that doesn't start on doorId we'll get this from the other side

			if (transitionA.srcRoom.island !== island && transitionA.dstRoom.island !== island) {
				//Fully unrelated to this island
				continue
			}

			var transitionB = this.data.transitions[transitionA.dstDoorId]
			let link = new RoomLink(transitionA, transitionB)

			if (transitionA.srcRoom.island !== transitionA.dstRoom.island) {
				//different islands
				let existing = this.crossIslandLinks.find(x => x. id === link.id)
				if (existing) {
					delete existing.dead//keep alive
				} else {
					this.crossIslandLinks.push(link)
				}
			} else {
				//same island
				links.push(link)
				handledDoors[transitionA.srcDoor] = true
				handledDoors[transitionA.dstDoor] = true
			}
		}

		/*
		const positionDistance = 300
		//Picks relative positions and parent for parent-relative positioning mode
		const positionRooms = (room, depth) => {
			var levelDistance = positionDistance / Math.pow(1.5, depth)
			// var levelDistance = positionDistance * (1 - depth / 5)
			let i = 0, doorIds = Object.keys(room.doorIds)
			for (let doorId of doorIds) {
				let transition = this.data.doorTransitions[doorId]
				let [cRoom, side] = transition.dstRoom === room ? [transition.srcRoom, transition.dstSide] : [transition.dstRoom, transition.srcSide]

				if (cRoom === room) continue//room links to self
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
		positionRooms(island.hub, 0)
		*/

		island.radius = 80 * Math.sqrt(island.rooms.length)

		//initial positions (helps start expanded instead of growing out as it relaxes)
		let i = 0
		for (let room of island.rooms) {
			if (typeof room.x !== "number") {
				var angle = i / island.rooms.length * 2 * Math.PI
				//(room coordinates are absolute, not relative, right now)
				room.x = island.radius * Math.cos(angle) + island.x
				room.y = island.radius * Math.sin(angle) + island.y
			}
			++i
		}

		if (!island.simulation) island.simulation = d3.forceSimulation([])

		island.simulation
			.nodes(island.rooms)
			.force("link", d3.forceLink(island.links)
				.strength(x => x.strength)
				.distance(60)
			)
			.force("keepApart", d3.forceCollide().radius(60).strength(.3))
			// .force("keepApart", d3.forceManyBody()
			// 	.strength(-30)
			// 	.distanceMin(30)
			// 	.distanceMax(200)
			// )
			// .force("placement", ClusterHandler.forceParentRelative().strength(.03))
			.force("noExplode", ClusterHandler.forcePreventExplosions())
			.force("doorAlign", ClusterHandler.forceDoorAlignment(island.links).strengths(.5, .6))
			.force("keepAway", ClusterHandler.forceKeepInsideCircle(island.radius))
			.alphaDecay(.005)
			.alphaMin(.09)
		if (island.simulation.alpha() < .5) island.simulation.alpha(.5).restart()
	}

	static forceKeepInsideCircle(radius) {
		var nodes, radius2 = radius * radius, strength = 3

		var ret = alpha => {
			for (let i = 0, len = nodes.length; i < len; i++) {
				let node = nodes[i]
				var dist2 = node.x * node.x + node.y * node.y
				if (dist2 > radius2) {
					var dist = Math.sqrt(dist2)
					var force = (dist - radius) * strength * alpha
					node.vx += -force * node.x / dist
					node.vy += -force * node.y / dist
				}
			}
		}

		ret.initialize = nodes_ => nodes = nodes_
		ret.strength = str => (strength = str, ret)

		return ret
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
	x = null; y = null
	rooms = []
	links = []
	simulation = null
	radius = 300

	constructor(room) {
		this.hub = room
		this.id = room.id
	}

}
