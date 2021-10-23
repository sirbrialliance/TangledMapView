const roomScale = .5 //in-game room size time this = SVG pixel size
const roomLeadOutLen = 10//length of "leaving this room" stub lines

const roomDirections = {
	top: {x: 0, y: -1},
	bot: {x: 0, y: 1},
	right: {x: 1, y: 0},
	left: {x: -1, y: 0},
}

class DataRender {
	constructor(cluster) {
		this.cluster = cluster
		this.data = cluster.data
	}

	renderInto(holder) {
		this._holder = holder

		this._crossIslandHolder = this._holder.append("g").attr("id", "crossIslandHolder").lower()

		this.update()

		this.cluster.macroSimulation.on("tick", () => {
			// for (let island of this.cluster.islands) if (isNaN(island.x) || isNaN(island.y)) throw new Error("bad data")
			this._islandEls.attr("transform", d => `translate(${d.x},${d.y})`)

			this._updateCrossLinks()
		})
	}

	_renderIsland(island, holder) {
		var this_ = this

		var roomInfoEl = document.getElementById("roomInfo")
		var itemInfoEl = document.getElementById("itemInfo")

		function setupDrag(isHub) {
			function note(ev) {}// console.log(ev.active, ev.subject, simulation.alpha(), simulation.alphaTarget(), simulation.alphaMin())}

			//Target simulation can very based on the node, we want to drag the room in the macro simulation if you grab an island hub
			function getTargets(room) {
				return [island.simulation, room]
				// if (room.isHub) return [this_.cluster.macroSimulation, room.island]
				// else return [island.simulation, room]
			}

			var ret = d3.drag()
				.on("start", ev => {
					let room = ev.subject; note(ev)
					let [simulation, target] = getTargets(room)

					console.log(
						`Clicked ${room.displayText}`, room,
						`Visited: ${room.visitedDoors.map(x=>x + " => " + this_.data.doorTransitions[x].otherDoor(x)).join(", ")}`,
						`Unvisited: ${room.unvisitedDoors.map(x=>x + " => " + this_.data.doorTransitions[x].otherDoor(x)).join(", ")}`,
					)

					simulation.alphaTarget(0.3).restart()//ask it to "keep the alpha warm" while we drag

					if (typeof target.fx === "number") target.__hadFixedPos = true

					if (isHub) target.__eventOffset = [target.x, target.y]
					target.fx = target.x
					target.fy = target.y


					if (ev.sourceEvent.shiftKey) {
						window.app.enterRoom(room.id)
					} else {
						window.app.selectRoom(room.id)
					}
				})
				.on("drag", (event) => {
					let room = event.subject; note(event)
					let [simulation, target] = getTargets(room)


					if (isHub) {
						let [ox, oy] = target.__eventOffset
						target.fx = event.x + ox
						target.fy = event.y + oy
					} else {
						target.fx = event.x
						target.fy = event.y
					}
				})
				.on("end", (event) => {
					let room = event.subject; note(event)
					let [simulation, target] = getTargets(room)

					simulation.alphaTarget(0)//let alpha cool off and stop now

					delete target.__eventOffset
					if (target.__hadFixedPos) {
						delete target.__hadFixedPos
					} else {
						target.fx = null
						target.fy = null
					}

				})
			if (isHub) return ret.container(holder)
			else return ret
		}

		const linkEls = holder.selectAll("path")
			.data(island.links, x => x.id)
			.join(enter => enter.append("path").lower())
				.classed("roomLink", true)
				.attr("id", link => "link-" + link.id)

		const relatedElements = room => {
			return [
				...room.adjacentVisibleRooms.map(x => document.getElementById(`room-${x.id}`)),
				...Object.keys(room.doors).map(doorId => {
					var elId = RoomLink.getId(this.data.doorTransitions[doorId])
					return document.getElementById("link-" + elId)
				}),
			]
		}

		var node = holder.selectAll("g.mapNode")
			.data(island.rooms, x => x.id)
			.join(enter => {
				var els = enter.append("g")
					.classed("mapNode", true)
					.attr("id", x => "room-" + x.id)
					.classed("currentRoom", room => room.id === this.data.currentPlayerRoom)
					.each(function(room) {
						//Set class for room (original) area
						var area = window.mapData.rooms[room.id].area || "Unknown"
						this.classList.add("area-" + area)
					})
				els.append("rect").classed("roomShape", true)
				els.each(function(room) {
					//edge stubs
					let c = {x: room.aabb.cx * roomScale, y: room.aabb.cy * roomScale}
					let edgeDoors = Object.keys(room.doors)
						.filter(x => x.indexOf("[door") < 0)
						.map(x => {
							let door = room.doors[x]
							let dir = roomDirections[door.side] || {x: 0, y: 0}
							return {
								x1: door.x * roomScale - c.x,
								y1: door.y * roomScale - c.y,
								x2: door.x * roomScale + roomLeadOutLen * dir.x - c.x,
								y2: door.y * roomScale + roomLeadOutLen * dir.y - c.y,
								door
							}
						})

					d3.select(this)
						.selectAll("line.roomLeadOut")
						.data(edgeDoors)
						.join("line")
						.classed("roomLeadOut", true)
						.attr("x1", d => d.x1)
						.attr("x2", d => d.x2)
						.attr("y1", d => d.y1)
						.attr("y2", d => d.y2)
						.each(function(d) { d.door.__el = this })

					//door dots
					let doorDoors = Object.keys(room.doors).filter(x => x.indexOf("[door") >= 0).map(x => room.doors[x])

					d3.select(this)
						.selectAll("circle.door")
						.data(doorDoors)
						.join("circle")
						.classed("door", true)
						.attr("cx", d => d.x * roomScale - room.aabb.cx * roomScale)
						.attr("cy", d => d.y * roomScale - room.aabb.cy * roomScale)
						.each(function(door) { door.__el = this })

					let itemData = Object.keys(room.items)
						.map(x => {
							let item = room.items[x]
							return item
						})

					//items
					d3.select(this)
						.selectAll("g.roomItem")
						.data(itemData)
						.join(enter => {
							var els = enter.append("g")
								.classed("roomItem", true)
							els.append("rect")
							return els
						})
						.attr("transform", d => {
							let x = d.x * roomScale - room.aabb.cx * roomScale
							let y = d.y * roomScale - room.aabb.cy * roomScale
							return `translate(${x}, ${y})`
						})
						.on("pointerover", (ev, item) => {
							itemInfoEl.textContent = `${item.id} (${item.randType}/${item.randAction}/${item.randPool})`
						})
						.on("pointerleave", (ev, item) => {
							itemInfoEl.textContent = ""
						})
				})
				return els
			})
			.on("pointerover", (ev, room) => {
				d3.selectAll(relatedElements(room)).classed("hoverRelated", true)

				let roomInfo = window.mapData.rooms[room.id]
				roomInfoEl.style.display = "block"
				let areaEl = roomInfoEl.querySelector(".areaName")
				areaEl.setAttribute("data-area", roomInfo.area)
				areaEl.textContent =  window.mapData.areas[roomInfo.area]
				roomInfoEl.querySelector(".roomName").textContent = roomInfo.name
				roomInfoEl.querySelector(".roomId").textContent = room.id
			})
			.on("pointerleave", (ev, room) => {
				d3.selectAll(relatedElements(room)).classed("hoverRelated", false)
				roomInfoEl.style.display = ""
			})

		// node.filter(x => x.isHub).call(setupDrag(true))
		// node.filter(x => !x.isHub).call(setupDrag(false))
		node.call(setupDrag(false))

		//update door colors
		let visitedDoors = this.data.visitedDoors
		node.each(function(room) {
			for (let doorId in room.doors) {
				let door = room.doors[doorId]
				if (!door.__el) continue

				if (!this_.data.transitions[doorId]) {
					//one-way door
					door.__el.classList.add("noEntry")
				} else if (visitedDoors[doorId]) {
					door.__el.classList.add("visitedDoor")
				} else {
					door.__el.classList.remove("visitedDoor")
				}
			}
		})

		node.select("rect")
			.attr("x", node => -node.aabb.width / 2 * roomScale)
			.attr("y", node => -node.aabb.height / 2 * roomScale)
			.attr("width", node => node.aabb.width * roomScale)
			.attr("height", node => node.aabb.height * roomScale)

		island.simulation.on("tick", () => {
			// for (let room of island.rooms) if (isNaN(room.x) || isNaN(room.y)) throw new Error("bad data")
			linkEls.attr("d", link => {
				var pos = this._getDoorPositions(link)
				return DataRender.buildLinkPath(link.transitionA, pos.src, pos.dst)
			})

			node.attr("transform", d => `translate(${d.x},${d.y})`)
			this._updateCrossLinks()
		})

	}

	_getDoorPositions(link) {
		let srcDoor = link.source.doors[link.transitionA.srcDoor]
		let dstDoor = link.target.doors[link.transitionA.dstDoor]

		let srcDir = roomDirections[srcDoor.side] || {x: 0, y: 0}
		let dstDir = roomDirections[dstDoor.side] || {x: 0, y: 0}

		let ret = {
			src: {
				x: link.source.x + (srcDoor.x - link.source.aabb.cx) * roomScale + srcDir.x * roomLeadOutLen,
				y: link.source.y + (srcDoor.y - link.source.aabb.cy) * roomScale + srcDir.y * roomLeadOutLen,
			},
			dst: {
				x: link.target.x + (dstDoor.x - link.target.aabb.cx) * roomScale + dstDir.x * roomLeadOutLen,
				y: link.target.y + (dstDoor.y - link.target.aabb.cy) * roomScale + dstDir.y * roomLeadOutLen,
			},
		}

		// if (isNaN(ret.src.x) || isNaN(ret.src.y) || isNaN(ret.dst.x) || isNaN(ret.dst.y)) throw new Error("bad data")

		return ret
	}

	_updateCrossLinks() {
		if (this._crossLinkTask) return

		this._crossLinkTask = setTimeout(() => {
			this._crossLinkTask = null
			this._crossLinkLines.attr("d", link => {
				var pos = this._getDoorPositions(link)
				pos.src.x += link.source.island.x
				pos.src.y += link.source.island.y

				pos.dst.x += link.target.island.x
				pos.dst.y += link.target.island.y

				return DataRender.buildLinkPath(link.transitionA, pos.src, pos.dst)
			})
		}, 0)
	}

	/** Returns the path bit to use with a <path d=XXYY /> */
	static buildLinkPath(transition, src, dst) {
		// if (isNaN(src.x) || isNaN(src.y) || isNaN(dst.x) || isNaN(dst.y)) throw Error("bad data")
		let srcSide = transition.srcSide, dstSide = transition.dstSide
		//Unit (or zero) vector for the direction we want to head towards (use zero influence on doors)
		let srcDir = roomDirections[srcSide] || false, dstDir = roomDirections[dstSide] || false

		// var curveStart = srcDir ? {x: src.x + srcDir.x * leadOutLen, y: src.y + srcDir.y * leadOutLen} : src
		// var curveEnd = dstDir ? {x: dst.x + dstDir.x * leadOutLen, y: dst.y + dstDir.y * leadOutLen} : dst
		var curveStart = src
		var curveEnd = dst

		let delta = {x: curveStart.x - curveEnd.x, y: curveStart.y - curveEnd.y}
		var curveDist = Math.sqrt(delta.x * delta.x + delta.y * delta.y)

		let tangentLen = Math.max(10, Math.min(curveDist * .6, 300))


		var ret = `M ${src.x} ${src.y} `

		// if (srcDir) ret += `L ${curveStart.x} ${curveStart.y} `

		ret += `C ${curveStart.x + (srcDir.x || 0) * tangentLen} ${curveStart.y + (srcDir.y || 0) * tangentLen} ` +
			`${curveEnd.x + (dstDir.x || 0) * tangentLen} ${curveEnd.y + (dstDir.y || 0) * tangentLen} ` +
			`${curveEnd.x} ${curveEnd.y} `

		// if (dstDir) ret += `L ${dst.x} ${dst.y} `

		return ret
	}

	/** Updates the graph and rendering with any changes. */
	update() {
		this.cluster.update()

		var this_ = this

		function islandUpdate(island, idx, el) { this_._renderIsland(island, d3.select(this)) }

		this._islandEls = this._holder
			.selectAll("g.island")
			.data(this.cluster.islands, x => x.id)
			.join(enter => {
				var els = enter.append("g").classed("island", true)
				els.append("circle").lower().classed("islandBackdrop", true)
				return els
			})
			.each(islandUpdate)
		this._islandEls.select("circle.islandBackdrop").attr("r", island => island.radius)


		var crossIslandLinks = this._crossIslandHolder.selectAll("path.crossIslandLink")
			.data(this.cluster.crossIslandLinks, x => x.id)
			.join(enter => {
				var els = enter.append("path")
					.classed("crossIslandLink", true)
					.classed("roomLink", true)
				return els
			})
			.attr("id", link => "link-" + link.id)

		this._crossLinkLines = crossIslandLinks
	}

	highlightPath(rooms) {
		d3.selectAll(".currentRoute")
			.style("animation-delay", null)
			.classed("currentRoute", false)
			.each(function() { this.getClientRects() })//force reflow to reset any animation timing

		if (!rooms) return

		let pulseElements = []

		for (let i = 0; i < rooms.length; ++i) {
			let room = rooms[i]
			let el = document.getElementById("room-" + room.id)?.querySelector(":scope > rect")
			if (i > 0) pulseElements.push(el)

			if (i < rooms.length - 1) {
				//find a link (hopefully there's exactly one)
				let nextRoom = rooms[i + 1]
				for (let doorId in room.doors) {
					//should only have forward transitions, never reverse
					let transition = this.data.transitions[doorId]
					if (transition && transition.dstRoom.id === nextRoom.id) {
						let el = document.getElementById("link-" + RoomLink.getId(transition))
						pulseElements.push(el)
					}
				}
			}
		}

		for (let i = 0; i < pulseElements.length; ++i) {
			let el = pulseElements[i]
			if (!el) continue
			el.classList.add("currentRoute")
			// el.style.animationDelay = (i / pulseElements.length * 3) + "s"
			el.style.animationDelay = (i * .2) + "s"
		}
	}

}



/* Some parts of code may be
Copyright 2017–2020 Observable, Inc.
Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/
