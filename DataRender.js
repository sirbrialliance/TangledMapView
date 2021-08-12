class DataRender {
	constructor(cluster) {
		this.cluster = cluster
		this.dataGen = cluster.data
	}

	renderInto(holder) {
		var dataRender = this

		var islandHolder = holder
			.selectAll("g.island")
			.data(this.cluster.islands)
			.join("g")
				.classed("island", true)
				.each(function(island, idx, el) { dataRender._renderIsland(island, d3.select(this)) })

		this.cluster.macro.simulation.on("tick", () => {
			islandHolder.attr("transform", d => `translate(${d.x},${d.y})`)
		})
	}

	_renderIsland(island, holder) {
		var _this = this

		function setupDrag(isHub) {
			function note(ev) {}// console.log(ev.active, ev.subject, simulation.alpha(), simulation.alphaTarget(), simulation.alphaMin())}

			//Target simulation can very based on the node, we want to drag the room in the macro simulation if you grab an island hub
			function getTargets(room) {
				if (room.isHub) return [_this.cluster.macro.simulation, room.island]
				else return [island.simulation, room]
			}

			var ret = d3.drag()
				.on("start", (event) => {
					let room = event.subject; note(event)
					let [simulation, target] = getTargets(room)

					console.log(`Clicked ${room.displayText} which links to ${Object.keys(room.doorIds).join(", ")}`, room)

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
				})
			if (isHub) return ret.container(holder)
			else return ret
		}

		const link = holder.selectAll("line")
			.data(island.links, x => x.id)
			.join("line")

		const node = holder.selectAll("g")
			.data(island.rooms, x => x.id)
			.join("g")
				.classed("mapNode", true)
				.attr("id", x => "room-" + x.id)
				.on("pointerover", (ev, room) => {
					d3.selectAll(room.adjacentRooms.map(x => document.getElementById(`room-${x.id}`)))
						.classed("hoverRelated", true)
				})
				.on("pointerleave", (ev, room) => {
					d3.selectAll(room.adjacentRooms.map(x => document.getElementById(`room-${x.id}`)))
						.classed("hoverRelated", false)
				})

		node.filter(x => x.isHub).call(setupDrag(true))
		node.filter(x => !x.isHub).call(setupDrag(false))

		node.append("circle")
			.attr("r", node => node.numDoors * 2.5 + 3.5)
			.attr("fill", room => {
				if (room.isStartRoom) return "orange"
				else if (room.island.hub === room) return "red"
				else if (room.isEveryTransitionVisited) return "green"
				else return "#BB0"
			})

		node.append("text")
			.classed("mapNodeLabel shadow", true)
			// .text(x => x.displayText)
			.text(x => `${x.displayText}, dist ${x.islandDistance} on ${x.island.id} with ${x.numTransitionsVisited - x.numDoors} unvisited`)
			.clone(true).classed("shadow", false)

		island.simulation.on("tick", () => {
			link
				.attr("x1", d => d.source.x)
				.attr("y1", d => d.source.y)
				.attr("x2", d => d.target.x)
				.attr("y2", d => d.target.y)

			node.attr("transform", d => `translate(${d.x},${d.y})`)
		})

	}
}

/*
function setupDrag(isHub) {
			function note(ev) {}// console.log(ev.active, ev.subject, simulation.alpha(), simulation.alphaTarget(), simulation.alphaMin())}

			//Target simulation can very based on the node, we want to drag the room in the macro simulation if you grab an island hub
			function getTargets(room) {
				if (room.isHub) return [_this.cluster.macro.simulation, room.island]
				else return [island.simulation, room]
			}

			return d3.drag()
				.on("start", (event) => {
					let room = event.subject; note(event)
					let [simulation, target] = getTargets(room)

					simulation.alphaTarget(0.3).restart()//ask it to "keep the alpha warm" while we drag

					if (typeof target.fx === "number") target.__hadFixedPos = true

					target.__eventOffset = [event.x, event.y]
					target.fx = target.x
					target.fy = target.y
				})
				.on("drag", (event) => {
					let room = event.subject; note(event)
					let [simulation, target] = getTargets(room)

					let [ox, oy] = target.__eventOffset

					// target.fx = event.x - ox
					// target.fy = event.y - oy
					target.fx = event.x
					target.fy = event.y
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
		}
*/


/* Some parts of code are
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

/*
	getForceFunc() {
		// const alignStrength = .5
		const alignStrength = .3
		const sideShiftStrength = 20

		return alpha => {
			let links = this.dataGen.links
			for (let i = 0, len = links.length; i < len; i++) {
				let link = links[i]

				const pushLink = (side, room, otherRoom) => {
					if (side[0] === "d") return//for side.startsWith(door), don't apply forces to them

					var dx = otherRoom.x - room.x
					var dy = otherRoom.y - room.y

					switch (side) {
						case "top":
							room.vx += dx * alignStrength * alpha
							if (dy < 0) room.vy -= sideShiftStrength * alpha
							break
						case "bot":
							room.vx += dx * alignStrength * alpha
							if (dy > 0) room.vy += sideShiftStrength * alpha
							break
						case "right":
							room.vy += dy * alignStrength * alpha
							if (dx < 0) room.vx -= sideShiftStrength * alpha
							break
						case "left":
							room.vy += dy * alignStrength * alpha
							if (dx > 0) room.vx += sideShiftStrength * alpha
							break
					}

				}

				pushLink(link.transitionA.srcSide, link.transitionA.srcRoom, link.transitionA.dstRoom)
				if (link.transitionB) {
					pushLink(link.transitionB.srcSide, link.transitionB.srcRoom, link.transitionB.dstRoom)
				}
			}
		}
	}*/
