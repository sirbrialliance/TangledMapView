const roomScale = .5 //in-game room size time this = SVG pixel size

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
			this._islandEls.attr("transform", d => `translate(${d.x},${d.y})`)

			this._updateCrossLinks()
		})
	}

	_renderIsland(island, holder) {
		var this_ = this

		function setupDrag(isHub) {
			function note(ev) {}// console.log(ev.active, ev.subject, simulation.alpha(), simulation.alphaTarget(), simulation.alphaMin())}

			//Target simulation can very based on the node, we want to drag the room in the macro simulation if you grab an island hub
			function getTargets(room) {
				if (room.isHub) return [this_.cluster.macroSimulation, room.island]
				else return [island.simulation, room]
			}

			var ret = d3.drag()
				.on("start", (event) => {
					let room = event.subject; note(event)
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

					// //debug reveal
					// var doors = room.unvisitedDoors
					// if (doors.length) {
					// 	var door = doors[Math.floor(Math.random() * doors.length)]
					// 	console.log("debug reveal " + door)
					// 	this_.data.addVisit(door)
					// 	this_.update()
					// }
				})
			if (isHub) return ret.container(holder)
			else return ret
		}

		const linkEls = holder.selectAll("path")
			.data(island.links, x => x.id)
			.join(enter => enter.append("path").lower())
				.classed("roomLink", true)
				.attr("id", link => link.id)

		const relatedElements = room => {
			return [
				...room.adjacentRooms.map(x => document.getElementById(`room-${x.id}`)),
				...Object.keys(room.doors).map(doorId => {
					var elId = RoomLink.getId(this.data.doorTransitions[doorId])
					return document.getElementById(elId)
				}),
			]
		}

		var node = holder.selectAll("g.mapNode")
			.data(island.rooms, x => x.id)
			.join(enter => {
				var els = enter.append("g")
					.classed("mapNode", true)
					.attr("id", x => "room-" + x.id)
					.each(function(room) {
						var area = "Unknown"
						if (room.id.startsWith("Deepnest_East")) area = "Deepnest_East"
						else if (room.id.startsWith("White_Palace")) area = "White_Palace"
						else if (room.id === "Town") area = "Town"
						else area = room.id.substring(0, room.id.indexOf("_"))

						this.classList.add("area-" + area)
					})
				els.append("rect")
				els.append("text")
					.classed("mapNodeLabel shadow", true)
					.clone(true).classed("shadow", false)
				return els
			})
			.on("pointerover", (ev, room) => {
				d3.selectAll(relatedElements(room)).classed("hoverRelated", true)
			})
			.on("pointerleave", (ev, room) => {
				d3.selectAll(relatedElements(room)).classed("hoverRelated", false)
			})

		node.filter(x => x.isHub).call(setupDrag(true))
		node.filter(x => !x.isHub).call(setupDrag(false))

		node.select("rect")
			.attr("x", node => -node.aabb.width / 2 * roomScale)
			.attr("y", node => -node.aabb.height / 2 * roomScale)
			.attr("width", node => node.aabb.width * roomScale)
			.attr("height", node => node.aabb.height * roomScale)
			// .attr("fill", room => {
			// 	if (room.isStartRoom) return "orange"
			// 	else if (room.island.hub === room) return "red"
			// 	else if (room.numTransitionsVisited === 0) return "gray"
			// 	else if (room.isEveryTransitionVisited) return "green"
			// 	else return "#BB0"
			// })

		node.selectAll("text")
			// .text(x => x.displayText)
			.text(x => `${x.displayText}, dist ${x.islandDistance} on ${x.island.id} with ${x.numDoors - x.numTransitionsVisited} unvisited`)

		island.simulation.on("tick", () => {
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

		return {
			src: {
				x: link.source.x + (srcDoor.x - link.source.aabb.cx) * roomScale,
				y: link.source.y + (srcDoor.y - link.source.aabb.cy) * roomScale,
			},
			dst: {
				x: link.target.x + (dstDoor.x - link.target.aabb.cx) * roomScale,
				y: link.target.y + (dstDoor.y - link.target.aabb.cy) * roomScale,
			},
		}
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
		const leadOutLen = 15

		let srcSide = transition.srcSide, dstSide = transition.dstSide
		//Unit (or zero) vector for the direction we want to head towards (use zero influence on doors)
		let srcDir = roomDirections[srcSide] || false, dstDir = roomDirections[dstSide] || false

		var curveStart = srcDir ? {x: src.x + srcDir.x * leadOutLen, y: src.y + srcDir.y * leadOutLen} : src
		var curveEnd = dstDir ? {x: dst.x + dstDir.x * leadOutLen, y: dst.y + dstDir.y * leadOutLen} : dst

		let delta = {x: curveStart.x - curveEnd.x, y: curveStart.y - curveEnd.y}
		var curveDist = Math.sqrt(delta.x * delta.x + delta.y * delta.y)

		let tangentLen = Math.max(50, Math.min(curveDist * .6, 300))


		var ret = `M ${src.x} ${src.y} `

		if (srcDir) ret += `L ${curveStart.x} ${curveStart.y} `

		ret += `C ${curveStart.x + (srcDir.x || 0) * tangentLen} ${curveStart.y + (srcDir.y || 0) * tangentLen} ` +
			`${curveEnd.x + (dstDir.x || 0) * tangentLen} ${curveEnd.y + (dstDir.y || 0) * tangentLen} ` +
			`${curveEnd.x} ${curveEnd.y} `

		if (dstDir) ret += `L ${dst.x} ${dst.y} `

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


		var crossIslandLinks = this._crossIslandHolder.selectAll("g.crossIslandLink")
			.data(this.cluster.crossIslandLinks, x => x.id)
			.join(enter => {
				var els = enter.append("g").classed("crossIslandLink", true)
				els.append("path").classed("roomLink", true)
				return els
			})
			.attr("id", link => link.id)

		this._crossLinkLines = crossIslandLinks.select("path")
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
