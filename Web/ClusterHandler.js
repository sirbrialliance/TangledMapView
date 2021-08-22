
//target number of rooms per island, in practice will vary
const roomsPerIsland = 40
const breakOffThreshold = 20

class ClusterHandler {

	layout = "islands"
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

		if (this.layout === "islands") this._setupIslands()
		else if (this.layout === "islandsCluster") this._setupCluster()
		else if (this.layout === "player") this._setupPlayerIsland()
		else this._setupUglyIsland()

		if (this.layout !== "islandsCluster") {
			this._measureDistances()
		}
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

	fullRebuild() {
		for (let room of Object.values(this.data.rooms)) {
			// delete room.x
			// delete room.y
			delete room.fx
			delete room.fy
			delete room.island
			delete room.islandDistance
		}
		this.islands = []
		this.buildIslands()
	}

	_setupIslands() {
		var numRooms = Object.keys(this._visibleRooms).length
		if (numRooms === 0) return

		var desiredNumIslands = Math.round(numRooms / roomsPerIsland)
		if (desiredNumIslands === 0 || desiredNumIslands > numRooms) desiredNumIslands = 1
		//console.log("have " + numRooms + " want " + desiredNumIslands)

		//delete islands that are no longer visible
		this.islands.filter(x => !this._visibleRooms[x.hub.id]).forEach(island => {
			island.dead = true
			delete island.hub.fx
			delete island.hub.fy
		})
		this.islands = this.islands.filter(x => this._visibleRooms[x.hub.id])


		var rooms = Object.values(this._visibleRooms)
		//Anything that's really far away from the nearest hub? We should split it to its own island
		//but, use a weighted "distance" so we're moor likely to pick a room with more connections
		const distanceWeight = room => room.island ? room.islandDistance + room.numDoors * 1.4 : 0
		rooms.sort((a, b) => distanceWeight(b) - distanceWeight(a))
		if (distanceWeight(rooms[0]) > breakOffThreshold) {
			this._addIsland(rooms[0])
			//limit once per iter, we want to see the new "farthest" after adding a new island
		}


		//need more islands?
		if (this.islands.length < desiredNumIslands) {
			//grab top rooms (most doors)
			rooms.sort((a, b) => b.numDoors - a.numDoors)

			//add new islands to target number
			while (this.islands.length < desiredNumIslands) {
				let hub = rooms.shift()
				//skip room if already hub of an island
				while (this.islands.some(x => x.hub === hub)) hub = rooms.shift()

				this._addIsland(hub)
			}
		}

		this._setInitialIslandPositions()
	}

	_setInitialIslandPositions() {
		//give islands initial positions
		let i = -1
		for (let island of this.islands) {
			++i
			if (typeof island.x === "number") continue
			var angle = (i / this.islands.length + (this.islands.length % 8) / 8) * 2 * Math.PI
			island.x = 1200 * Math.cos(angle)
			island.y = 1200 * Math.sin(angle)
		}
	}

	_setupPlayerIsland() {
		let playerRoom = this.data.rooms[this.data.currentPlayerRoom] || this.data.rooms[this.data.startRoom]
		if (!playerRoom) return

		if (this.islands.length !== 1) {
			this.islands = []
			this._addIsland(playerRoom)
		}

		let island = this.islands[0]
		if (island.hub) {
			delete island.hub.fx
			delete island.hub.fy
			island.hub.x += 1e-16
		}
		island.hub = playerRoom
		// island.hub.fx = 0
		// island.hub.fy = 0
		island.x = island.fx = 0
		island.y = island.fy = 0
	}

	_setupUglyIsland() {
		let hub = this.data.rooms[this.data.startRoom]
		if (!hub) return

		if (this.islands.length !== 1) {
			this.islands = []
			this._addIsland(this.data.rooms[this.data.startRoom])
		}
	}

	_setupCluster() {
		this.islands = []
		if (Object.keys(this._visibleRooms).length === 0) {
			return
		}
		let graph = this.data.clusterBasedOnAll ? this.data.allRoomGraph : this.data.visibleRoomGraph

		function mkRndIter(ids) {
			let rng = d3.randomLcg(.59556736066)
			ids = [...ids]//copy list

			return {
				forEach: cb => {
					// https://stackoverflow.com/a/2450976/710714

					for (let i = ids.length - 1; i >= 0; --i) {
						let rIdx = d3.randomInt.source(rng)(i)()
						// [ids[rIdx], ids[i]] = [ids[i], ids[rIdx]]
						let t = ids[i]
						ids[i] = ids[rIdx]
						ids[rIdx] = t
					}
					for (let id of ids) cb(id)
				}
			}
		}

		let clusterer = window.createChineseWhisper(graph, null, mkRndIter)
		for (let i = 0; i < 30; ++i) {
			clusterer.step()
			//console.log("iter of " + i + " rate is " + clusterer.getChangeRate())
			if (clusterer.getChangeRate() === 0) break
		}

		let islandMap = {}

		graph.forEachNode(n => {
			islandMap[clusterer.getClass(n.id)] = n.id
		})

		console.log(islandMap)

		for (let islandClass in islandMap) {
			let aRoomId = islandMap[islandClass]
			let island = this._addIsland(this.data.rooms[aRoomId])
			islandMap[islandClass] = island
		}

		graph.forEachNode(n => {
			let island = islandMap[clusterer.getClass(n.id)]
			let room = this._visibleRooms[n.id]
			if (!room) return //not visible
			island.rooms.push(room)
			room.island = island
			room.islandDistance = 1
		})

		//prune empty islands (no visible rooms)
		this.islands = this.islands.filter(x => x.rooms.length)

		this._setInitialIslandPositions()
	}

	_addIsland(room) {
		let island = room.island = new Island(room)
		room.islandDistance = 0
		this.islands.push(island)

		return island
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
		if (this.layout === "player") {
			for (let roomId in this._visibleRooms) {
				let room = rooms[roomId]
				if (room.islandDistance > 4 || !room.island) {
					room.island = null
					continue
				}
				room.island.rooms.push(room)
			}
		} else {
			for (let roomId in this._visibleRooms) {
				let room = rooms[roomId]
				if (!room.island) {
					//isolated, make an island for it
					console.log(roomId + " is isolated, make it an island")
					this._addIsland(room)
					this._crawlDistances(room, room.island, 0)
				}
				room.island.rooms.push(room)
			}
		}
	}

	_crawlDistances(room, island, islandDistance) {
		if (room.islandDistance <= islandDistance && islandDistance !== 0) return

		room.island = island
		room.islandDistance = islandDistance
		++islandDistance

		for (let doorId in room.doors) {
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

			var transitionB = this.data.transitions[transitionA.otherDoor(doorId)]
			let link = new RoomLink(transitionA, transitionB)

			if (transitionA.srcRoom.island !== transitionA.dstRoom.island) {
				if (this.layout === "player") continue
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

		island.radius = 80 * Math.sqrt(island.rooms.length)

		//initial positions (helps start expanded instead of growing out as it relaxes)
		let i = 0
		for (let room of island.rooms) {
			if (typeof room.x !== "number" || isNaN(room.x)) {
				var angle = i / island.rooms.length * 2 * Math.PI
				//(room coordinates are absolute, not relative, right now)
				room.x = island.radius * Math.cos(angle) + island.x
				room.y = island.radius * Math.sin(angle) + island.y
			}
			if (isNaN(room.x) || isNaN(room.y)) throw Error("bad data")
			++i
		}

		if (!island.simulation) island.simulation = d3.forceSimulation([])

		island.simulation
			.nodes(island.rooms)
			.force("link", d3.forceLink(island.links)
				.strength(x => x.strength * .2)
				.distance(x => x.source.aabb.radius + x.target.aabb.radius)
			)
			.force("keepApart", d3.forceCollide().radius(x => x.aabb.radius).strength(.3))
			// .force("keepApart", d3.forceManyBody()
			// 	.strength(-30)
			// 	.distanceMin(30)
			// 	.distanceMax(200)
			// )
			// .force("placement", ClusterHandler.forceParentRelative().strength(.03))
			.force("noExplode", ClusterHandler.forcePreventExplosions())
			.force("doorAlign", ClusterHandler.forceDoorAlignment(island.links).strengths(.5, .6))
			.force("keepInside", ClusterHandler.forceKeepInsideCircle(island.radius))
			.force("a1", null)
			.force("keepCentered", d3.forceCenter().strength(.01))
			.force("hubTweaks", ClusterHandler.forceHubTweaks(island.hub))
			.alphaDecay(.005)
			.alphaMin(.09)

		if (this.layout === "islands") {
			//island.simulation
		} else if (this.layout === "player") {
			island.simulation
				.force("doorAlign", ClusterHandler.forceDoorAlignment(island.links).strengths(.8, 1))
				// .force("a1", d3.forceRadial().radius(x => x.islandDistance * 150).strength(.05))
				// .force("a1", ClusterHandler.forceMinDist().radius(x => x.islandDistance * 50).strength(.4))
		} else if (this.layout === "tangled") {
			island.simulation.force("a1", d3.forceManyBody()
				.strength(-60)
				.distanceMin(30)
				.distanceMax(600)
			)
			island.simulation.force("link").distance(x => (x.source.aabb.radius + x.target.aabb.radius) * 3)
		}

		if (island.simulation.alpha() < .5) island.simulation.alpha(.5).restart()
	}

	_buildMacroData() {
		if (!this.macroSimulation) this.macroSimulation = d3.forceSimulation([])

		this.macroSimulation
			.nodes(this.islands)
			.force("center", d3.forceCenter())
			.force("x", d3.forceX().strength(.05))
			.force("y", d3.forceY().strength(.05))
			// .force("group", d3.forceManyBody())
			.force("group", d3.forceCollide().radius(island => island.radius).strength(.5))

		// if (this.layout === "islands") {
		// 	this.macroSimulation.force("group", d3.forceCollide().radius(island => island.radius).strength(.5))
		// } else {
		// 	this.macroSimulation.force("group", null)
		// }

		if (this.macroSimulation.alpha() < .2) this.macroSimulation.alpha(.2).restart()
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
					force = Math.min(force, 500)
					node.vx += -force * node.x / dist
					node.vy += -force * node.y / dist
				}
			}
		}

		ret.initialize = nodes_ => nodes = nodes_
		ret.strength = str => (strength = str, ret)

		return ret
	}

	static forcePreventExplosions(maxDistance_ = 3000) {
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

	static forceMinDist() {
		var strength = 1, nodes, radiusFn = n => 20

		var ret = alpha => {
			for (let i = 0, len = nodes.length; i < len; i++) {
				let node = nodes[i]
				let dist = Math.sqrt(node.x * node.x + node.y * node.y)
				let radius = radiusFn(node)
				if (dist > radius) continue

				var force = (radius - dist) * strength * alpha
				node.vx += force * node.x / dist
				node.vy += force * node.y / dist
			}
		}

		ret.initialize = nodes_ => nodes = nodes_
		ret.strength = str => (strength = str, ret)
		ret.radius = fn => (radiusFn = fn, ret)

		return ret
	}

	static forceHubTweaks(hub) {
		let dampen = .01, strength = .8 / dampen
		var ret = alpha => {
			if (!hub.island) return
			var range = hub.island.radius * .2
			var dist = Math.sqrt(hub.x * hub.x + hub.y * hub.y)
			if (dist > range) {
				var force = (dist - range) * strength * alpha
				hub.vx += -force * hub.x / dist
				hub.vy += -force * hub.y / dist
			}

			hub.vx *= dampen
			hub.vy *= dampen
		}
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
