const roomScale = .5 //in-game room size time this = SVG pixel size
const roomLeadOutLen = 10//length of "leaving this room" stub lines

const roomDirections = {
	top: {x: 0, y: -1, r: 0},
	bot: {x: 0, y: 1, r: 180},
	right: {x: 1, y: 0, r: 90},
	left: {x: -1, y: 0, r: -90},
}

const SVG_NS = 'http://www.w3.org/2000/svg'

class DataRender {
	constructor(cluster) {
		this.cluster = cluster
		this.data = cluster.data
		this.visibleItems = "none"
	}

	renderInto(holder) {
		this._holder = holder

		DataRender._scratchPath?.remove()
		DataRender._scratchPath = document.createElementNS(SVG_NS, "path")
		DataRender._scratchPath.id = "_scratchPath"
		holder.node().appendChild(DataRender._scratchPath)
		DataRender._scratchPath.style.display = "none"

		this._crossIslandHolder = this._holder.append("g").attr("id", "crossIslandHolder").lower()

		this.update()

		this.cluster.macroSimulation.on("tick", () => {
			// for (let island of this.cluster.islands) if (isNaN(island.x) || isNaN(island.y)) throw new Error("bad data")
			this._islandEls.attr("transform", d => `translate(${d.x},${d.y})`)

			this._updateCrossLinks()
		})
	}

	_getRoomDragHandler(island, holder, isHub) {
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
					`Visited: ${room.visitedDoors.map(x=>x + " => " + this.data.doorTransitions[x].otherDoor(x)).join(", ")}`,
					`Unvisited: ${room.unvisitedDoors.map(x=>x + " => " + this.data.doorTransitions[x].otherDoor(x)).join(", ")}`,
					)

				room.__isDrag = true
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

				room.__isDrag = false

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

	_renderRoom(el, room) {
		//benches
		let benchData = room.benches
		d3.select(el)
			.selectAll("use.bench")
			.data(benchData)
			.join(enter => {
				return enter.append("use").classed("bench", true).attr("href", "#icon-bench")
			})
			.attr("x", d => d.x * roomScale - room.aabb.cx * roomScale)
			.attr("y", d => d.y * roomScale - room.aabb.cy * roomScale)


		//edge stubs
		let c = {x: room.aabb.cx * roomScale, y: room.aabb.cy * roomScale}
		let edgeDoors = Object.values(room.doors)
			.filter(door => roomDirections[door.side])
			.map(door => {
				let dir = roomDirections[door.side] || {x: 0, y: 0}
				return {
					x1: door.x * roomScale - c.x,
					y1: door.y * roomScale - c.y,
					x2: door.x * roomScale + roomLeadOutLen * dir.x - c.x,
					y2: door.y * roomScale + roomLeadOutLen * dir.y - c.y,
					door
				}
			})

		d3.select(el)
			.selectAll("use.roomLeadOut")
			.data(edgeDoors)
			.join("use")
			.attr("href", d => {
				let transition = this.data.transitions[d.door.doorId]
				if (!transition) return "#icon-entrance-oneWay"
				else if (transition.srcSplit !== 0) return "#icon-entrance-split"
				else return "#icon-entrance"
			})
			.classed("roomLeadOut", true)
			.attr("x", d => d.x1)
			.attr("y", d => d.y1)
			.attr("transform", d => {
				let door = d.door
				let angle = roomDirections[door.side].r
				return `rotate(${angle} ${d.x1} ${d.y1})`
			})
			.each(function(d) { d.door.__el = this })


		//door dots
		let doorDoors = Object.values(room.doors).filter(door => !roomDirections[door.side])

		d3.select(el)
			.selectAll("circle.door")
			.data(doorDoors)
			.join("circle")
			.classed("door", true)
			.attr("cx", d => d.x * roomScale - room.aabb.cx * roomScale)
			.attr("cy", d => d.y * roomScale - room.aabb.cy * roomScale)
			.each(function(door) { door.__el = this })


		//items
		var itemInfoEl = document.getElementById("itemInfo")
		let itemData = Object.values(room.items)

		d3.select(el)
			.selectAll("use.roomItem")
			.data(itemData)
			.join(enter => {
				var els = enter.append("use")
					.classed("roomItem", true)
				return els
			})
			.attr("x", d => d.x * roomScale - room.aabb.cx * roomScale)
			.attr("y", d => d.y * roomScale - room.aabb.cy * roomScale)
			.attr("href", "#icon-item") // collected item state is set later
			.attr("class", d => "roomItem pool-" + d.randPool)
			.on("pointerover", (ev, item) => {
				itemInfoEl.textContent = ""
				let mkEl = (className, content) => {
					let el = document.createElement("span")
					el.className = className
					el.textContent = content
					el.title = item.id
					itemInfoEl.appendChild(el)
				}

				mkEl("normalItem", DataRender.getItemDescription(item))

				let currentDesc = "???"
				if (this.data.shouldRevealItemAt(item.id)) {
					let realItemId = this.data.getItemAt(item.id)
					let realItem = this.data.getNormalItemInfo(realItemId)
					currentDesc = DataRender.getItemDescription(realItem)
				}

				mkEl("currentItem", currentDesc)
			})
			.on("pointerleave", (ev, item) => {
				itemInfoEl.textContent = ""
			})
			.each(function(d) { d.__el = this })
	}

	_renderIsland(island, holder) {
		var this_ = this

		var roomInfoEl = document.getElementById("roomInfo")


		const linkEls = holder.selectAll("path")
			.data(island.links, x => x.id)
			.join(enter => enter.append("path").lower())
				.classed("roomLink", true)
				.attr("id", link => "link-" + link.id)

		const relatedElements = room => {
			var roomLinks = []
			for (let doorId of Object.keys(room.doors)) {
				var transitionA = this.data.doorTransitions[doorId]
				var transitionB = this.data.reverseDoorTransitions[doorId]

				if (transitionA) {
					roomLinks.push(RoomLink.getId(transitionA))
				}
				if (transitionB && !transitionA?.bidi) {
					roomLinks.push(RoomLink.getId(transitionB))
				}
			}

			return [
				...Object.values(room.adjacentVisibleRooms).map(x => document.getElementById(`room-${x.id}`)),
				...roomLinks.map(linkId => document.getElementById("link-" + linkId)),
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
					this_._renderRoom(this, room)
				})
				return els
			})
			.on("pointerover", (ev, room) => {
				room.__isHover = true

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
				room.__isHover = false

				//update pos if it changed while hovered
				ev.target.setAttribute("transform", `translate(${room.x},${room.y})`)

				d3.selectAll(relatedElements(room)).classed("hoverRelated", false)
				roomInfoEl.style.display = ""
			})

		// node.filter(x => x.isHub).call(setupDrag(true))
		// node.filter(x => !x.isHub).call(setupDrag(false))
		node.call(this._getRoomDragHandler(island, holder, false))

		let visitedDoors = this.data.visitedDoors
		node.each(function(room) {
			//update door colors
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

			//update collected items
			for (let itemId in room.items) {
				//do we have the item that's randomized into that location?
				let got = this_.data.hasItemAt(itemId)
				if (got) {
					let el = room.items[itemId].__el
					el.setAttribute("href", "#icon-item-got")
					el.classList.add("got")
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

			node
				.filter(d => !d.__isHover || d.__isDrag)//don't include hovered room, unless dragging
				.attr("transform", d => `translate(${d.x},${d.y})`)

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

	static _makeCurve(start, startDir, endDir, end) {
		let delta = {x: start.x - end.x, y: start.y - end.y}
		var curveDist = Math.sqrt(delta.x * delta.x + delta.y * delta.y)

		let tangentLen = Math.max(10, Math.min(curveDist * .6, 300))

		return `M ${start.x} ${start.y} ` +
			`C ${start.x + (startDir.x || 0) * tangentLen} ${start.y + (startDir.y || 0) * tangentLen} ` +
			`${end.x + (endDir.x || 0) * tangentLen} ${end.y + (endDir.y || 0) * tangentLen} ` +
			`${end.x} ${end.y} `
	}

	static _arrowSize = 10
	static _arrowLeadSize = 10
	static _makeArrow(start, direction) {
		let matrix = [//direction must be normalized
			direction.y, direction.x,
			-direction.x, direction.y,
		]

		let rotateFromStart = (x, y) => ({
			x: start.x + matrix[0] * x + matrix[1] * y,
			y: start.y + matrix[2] * x + matrix[3] * y,
		})

		let a = rotateFromStart(-DataRender._arrowSize / 2, 0)
		let b = rotateFromStart(0, DataRender._arrowSize)
		let c = rotateFromStart(DataRender._arrowSize / 2, 0)

		var ret = `L ${a.x} ${a.y} `
		ret += `L ${b.x} ${b.y} `
		ret += `L ${c.x} ${c.y} `
		ret += `L ${start.x} ${start.y} `
		ret += `L ${b.x} ${b.y} `
		return ret
	}

	/** Returns the path bit to use with a <path d=XXYY /> */
	static buildLinkPath(transition, src, dst) {
		// if (isNaN(src.x) || isNaN(src.y) || isNaN(dst.x) || isNaN(dst.y)) throw Error("bad data")
		let srcSide = transition.srcSide, dstSide = transition.dstSide
		//Unit (or zero) vector for the direction we want to head towards (use zero influence on doors)
		let srcDir = roomDirections[srcSide] || false, dstDir = roomDirections[dstSide] || false

		var ret = ""

		// var curveStart = srcDir ? {x: src.x + srcDir.x * leadOutLen, y: src.y + srcDir.y * leadOutLen} : src
		// var curveEnd = dstDir ? {x: dst.x + dstDir.x * leadOutLen, y: dst.y + dstDir.y * leadOutLen} : dst
		var curveStart = src
		var curveEnd = dst

		if (!transition.bidi) {
			if (!srcDir) {
				//if no base direction, just point at our destination
				srcDir = {x: dst.x - src.x, y: dst.y - src.y}
				let scale = 1 / Math.sqrt(srcDir.x * srcDir.x + srcDir.y * srcDir.y)
				srcDir.x *= scale
				srcDir.y *= scale
			}
			if (!dstDir) {
				//if no base direction, just point at our source
				dstDir = {x: dst.x - src.x, y: dst.y - src.y}
				let scale = -1 / Math.sqrt(dstDir.x * dstDir.x + dstDir.y * dstDir.y)
				dstDir.x *= scale
				dstDir.y *= scale
			}

			// //straight line start
			// curveStart.x += srcDir.x * DataRender._arrowLeadSize
			// curveStart.y += srcDir.y * DataRender._arrowLeadSize
			// ret += `L ${curveStart.x} ${curveStart.y} `

			// //Little arrow thing
			// ret += DataRender._makeArrow(curveStart, srcDir)
			// curveStart.x += srcDir.x * DataRender._arrowSize
			// curveStart.y += srcDir.y * DataRender._arrowSize

			//calculate curve midpoint
			DataRender._scratchPath.setAttribute("d",
				DataRender._makeCurve(curveStart, srcDir, dstDir, curveEnd)
			)
			let len = DataRender._scratchPath.getTotalLength()
			let midpoint = DataRender._scratchPath.getPointAtLength(len / 2)
			let midpoint1 = DataRender._scratchPath.getPointAtLength(len / 2 + .001)
			let midDir = {x: midpoint1.x - midpoint.x, y: midpoint1.y - midpoint.y}
			let scale = 1 / Math.sqrt(midDir.x * midDir.x + midDir.y * midDir.y)
			midDir.x *= scale
			midDir.y *= scale

			//curve to middle
			ret += DataRender._makeCurve(curveStart, srcDir, {x: -midDir.x, y: -midDir.y}, midpoint)

			//arrow
			ret += DataRender._makeArrow(midpoint, midDir)
			// midpoint.x += midDir.x * DataRender._arrowSize
			// midpoint.y += midDir.y * DataRender._arrowSize

			//curve to dest
			ret += DataRender._makeCurve(midpoint, midDir, dstDir, curveEnd)
		} else {
			//bidirectional
			ret += DataRender._makeCurve(curveStart, srcDir, dstDir, curveEnd)
		}

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

		this.updateVisibleItems()
	}

	updateVisibleItems() {
		for (let cls of Array.from(document.body.classList)) {
			if (cls.startsWith("showItemsInPool-")) document.body.classList.remove(cls)
		}

		let pools = []
		switch (this.visibleItems) {
			default:
			case "none":
				break
			case "all":
				pools = Object.keys(DataGen.allItemPools)
				break
			case "relevant":
				pools = Object.keys(this.data.itemPools)
				break
		}

		for (let pool of pools) {
			document.body.classList.add("showItemsInPool-" + pool)
		}
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
			if (i > 0 || rooms.length === 1) pulseElements.push(el)

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

	/**
	 * Returns an English string describing what item the given item object
	 * represents.
	 */
	static getItemDescription(item) {
		if (!item) return "Nothing"

		const simpleMapping = {
			Cocoon: "Life Blood",
			Cursed: "Focus",
			CursedNail: "Nail Direction",
			Egg: "Rancid Egg",
			Flame: "Grimmkin Flame",
			Grub: "Grub",
			Lore: "Lore",
			Mask: "Mask Shard",
			Notch: "Charm Notch",
			Ore: "Pale Ore",
			PalaceLore: "Lore",
			PalaceSoul: "Soul Refill",
			Soul: "Soul Refill",
			Vessel: "Vessel Fragment",

			//The id is a good description:
			Charm: null,
			Skill: null,
			Stag: null,
			SplitClaw: null,
			SplitCloak: null,
			SplitCloakLocation: null,
			Fake: null,
		}

		var simpleResult = simpleMapping[item.randPool]
		if (typeof simpleResult !== "undefined") {
			if (simpleResult) return simpleResult
			else return item.id.replace(/_/g, " ")
		}

		switch (item.randPool) {
			case "Dreamer":
				if (item.id === "World_Sense") return "World Sense"
				else if (item.id === "Dreamer") return "Dreamer (wildcard)"
				else return item.id
			case "Key":
				if (item.id.startsWith("Simple_Key")) return "Simple Key"
				else return item.id.replace(/_/g, " ")
			case "Boss_Geo":
			case "Rock":
			case "Geo":
				return item.geo + " Geo"
			case "Relic":
				return {
					WanderersJournal: "Wanderer's Journal",
					HallownestSeal: "Hallownest Seal",
					KingsIdol: "King's Idol",
					ArcaneEgg: "Arcane Egg",
				}[item.randAction]
			case "Root":
			case "Essence_Boss":
				return item.geo + " Essence"
			case "Map":
				if (item.id === "Deepnest_Map-Upper") return "Deepnest Map"
				else if (item.id === "Deepnest_Map-Right_[Gives_Quill]") return "Quill"
				else return item.id.replace(/_/g, " ")
		}

		// //`${item.id} (${item.randType}/${item.randAction}/${item.randPool})`

		console.warn("Don't know how to describe item", item)
		return "<unknown: " + item.id + ">"
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
