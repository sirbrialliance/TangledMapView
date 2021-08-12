class DataGen {
	nodeMap = {}
	linkMap = {}


	load(saveData) {
		this.saveData = saveData
		var randomizerDataJSON = saveData.PolymorphicModData.RandomizerMod
		this.randomizerData = JSON.parse(randomizerDataJSON)

		var transitionRawData = JSON.parse(this.randomizerData.StringValues._obtainedTransitions)
		this.obtainedTransitions = transitionRawData._keys

		this.transitions = {}
		this.rooms = {}

		var tPlacements = this.randomizerData._transitionPlacements;
		for (var k in tPlacements) {
			var info = this.parseTransition(k)
			var target = tPlacements[k]

			this.transitions[k] = {
				target: target,
				side: info.side,
				sideNumber: info.number,
				room: info.room,
				bidi: tPlacements[target] === k,//bidirectional link?
			};
		}

		this.buildNodes()
	}

	parseTransition(transitionName) {
		var parts = transitionName.match(/^(\w+)\[([a-zA-Z_]+)(\d*)\]$/);
		return {
			transition: transitionName,
			room: parts[1],
			side: parts[2],
			number: parts[3] || -1,
		}
	}

	buildNodes() {
		this.nodes = []
		this.links = []
		this.linkMap = {}

		const getAndUpdateNode = (room, transitionId) => {
			var node = this.nodeMap[room]
			if (!node) {
				node = this.nodeMap[room] = {
					room: room,
					transitions: {},
					numTransitions: 0,
				}

				//pin starting room to the center
				if (room === this.randomizerData.StringValues.StartSceneName) {
					node.fx = 600
					node.fy = 600
				}

				this.nodes.push(node)
			}
			node.transitions[transitionId] = true
			node.numTransitions = Object.keys(node.transitions).length
			return node
		}

		//can't use this.saveData.playerData.scenesVisited to make all nodes, not all rooms get recorded (e.g. White_Palace*)

		for (let linkName of this.obtainedTransitions) {
// if (this.links.length > 20) break;

			if (this.linkMap[linkName]) continue;//already handled
			var linkInfo = this.transitions[linkName]
			if (!linkInfo) continue;//one-way link, handle from the other side

			var reverseLink = linkInfo.bidi ? this.transitions[linkInfo.target] : null
			var targetInfo = reverseLink || this.parseTransition(linkInfo.target)

			var sourceRoom = getAndUpdateNode(linkInfo.room, linkName)
			var targetRoom = getAndUpdateNode(targetInfo.room, linkInfo.target)


			//id is transition name + "-" + transition name, with the alphabetically first one first
			var id = [linkName, linkInfo.target].sort().join("-")

			//Try to cluster near nexus rooms and allow larger distances for "straight-though"/travel rooms.
			var mostRooms = Math.max(sourceRoom.numTransitions, targetRoom.numTransitions)
			var strength = mostRooms * mostRooms / 30

			let link = {
				id: id,

				source: sourceRoom,
				sourceTransition: linkName,

				target: targetRoom,
				targetTransition: linkInfo.target,

				bidi: !!reverseLink,

				strength: strength,
			}

			this.linkMap[linkName] = link
			if (reverseLink) this.linkMap[reverseLink] = link

			this.links.push(link)
		}
	}



}