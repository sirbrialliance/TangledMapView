class DataRender {
	constructor(dataGen) {
		this.dataGen = dataGen
	}

	getForceFunc() {
		const maxDist = 1000
		return alpha => {
			let nodes = this.dataGen.nodes
			for (let i = 0, len = nodes.length; i < len; i++) {
				let node = nodes[i]

				//prevent explosions, stop things that are going far
				var dist2 = node.vx * node.vx + node.vy * node.vy
				if (dist2 > maxDist * maxDist) {
					var dist = Math.sqrt(dist2)
					node.vx = node.vy = 0
					// var old = [node.x, node.y]
					node.x = node.x / dist * maxDist
					node.y = node.y / dist * maxDist
					//console.log(`Warp bad from ${old[0]} ${old[1]} to ${node.x} ${node.y}`)
					continue
				}

				// node.vx += 3 * alpha
			}
		}
	}
}
