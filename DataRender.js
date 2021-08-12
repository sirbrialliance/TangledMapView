class DataRender {
	constructor(dataGen) {
		this.dataGen = dataGen
	}

	explosionPrevention(maxDistance) {
		const maxDistance2 = maxDistance * maxDistance
		return alpha => {
			let nodes = this.dataGen.nodes
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
	}
}
