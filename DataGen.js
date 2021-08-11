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

		const getOrMakeNode = room => {
			var node = this.nodeMap[room]
			if (!node) {
				node = this.nodeMap[room] = {room: room}
				this.nodes.push(node)
			}
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

			let link = {
				source: getOrMakeNode(linkInfo.room),
				sourceTransition: linkName,
				target: getOrMakeNode(targetInfo.room),
				targetTransition: linkInfo.target,
				bidi: !!reverseLink,
			}

			this.linkMap[linkName] = link
			if (reverseLink) this.linkMap[reverseLink] = link

			this.links.push(link)
		}
	}



}