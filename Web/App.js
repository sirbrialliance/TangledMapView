
class App {
	ws = null
	prefs = {
		spoilers: false,
		clusterBasedOnAll: false,
		followPlayer: true,
		fpsSaver: true,
		layout: "islands",
		visibleItems: "relevant",
	}

	/** Should we render/update/animate? We can pause that to help with resource consumption. */
	_frameUpdateEnabled = true
	_pendingZoomTarget = null

	constructor() {
		this.data = window.data = new DataGen()

		this.cluster = new ClusterHandler(this.data)
		this.dataRender = new DataRender(this.cluster)


		var focused = true
		window.addEventListener("focus", () => {
			focused = true
			this._resumeFrameUpdate()
		})
		window.addEventListener("blur", () => {
			focused = false
			if (this.prefs["fpsSaver"]) this._pauseFrameUpdate()
		})
		window.addEventListener("visibilitychange", () => {
			if (document.visibilityState === "visible") {
				if (focused) this._resumeFrameUpdate()
				else if (!this.prefs["fpsSaver"]) this._resumeFrameUpdate()
			} else {//not visible
				this._pauseFrameUpdate()
			}
		})
	}

	_setBlockingMessage(msg) {
		var el = d3.select("#blockingMessage")
		if (msg) {
			el.style("display", "").text(msg)
		} else {
			el.style("display", "none").text("")
		}
	}

	async start() {
		this._setBlockingMessage("Loading...")

		this._setupPrefs()
		this._setupSearch()

		var svg = this.svg = d3.select("svg")

		var zoom = this.zoom = d3.zoom()
			.scaleExtent([.1, 5])
			.filter(ev => {
				if (ev.ctrlKey && ev.type === "wheel") return false
				if (!ev.type.startsWith("mouse")) return true
				return ev.button === 0 || ev.button === 2
			})
			.on("zoom", ev => updateZoom(ev.transform))

		function updateZoom(transform) {
			nodeHolder.attr("transform", transform)
		}
		function updateSize() {
			var w2 = svg.node().clientWidth / 2
			var h2 = svg.node().clientHeight / 2
			svg.attr("viewBox", [-w2, -h2, w2 * 2, h2 * 2])
			zoom.extent([[-w2, -h2], [w2, h2]])
		}

		window.addEventListener("resize", updateSize)

		svg
			.call(zoom)
			.on("dblclick.zoom", null)
			.on("contextmenu", ev => ev.preventDefault())//don't show menu, we permit right drag to pan

		const nodeHolder = svg.append("g").attr("id", "mainMap")

		this.dataRender.renderInto(nodeHolder)

		updateSize()

		this._ready = true

		if (location.protocol === "file:") {
			await this.loadTestData()
			this._render()
		} else {
			this.wsConnect()
			setInterval(this.wsConnect.bind(this), 10 * 1000)
		}
	}

	_setupPrefs() {
		for (let k in this.prefs) {
			let defaultValue = this.prefs[k]
			let v = localStorage.getItem("pref-" + k)
			if (v === null) v = defaultValue
			else v = JSON.parse(v)

			this.updatePref(k, v)
		}
	}

	_setupSearch() {
		var resultsEl = document.getElementById("searchResults")
		this._searchHelpEl = document.getElementById("searchHelp")
		this._searchHelpEl.parentNode.removeChild(this._searchHelpEl)

		d3.select("#searchInput")
			.on("focus", ev => {
				var rect = ev.target.getBoundingClientRect()
				resultsEl.style.display = "block"
				resultsEl.style.top = rect.bottom + "px"
				resultsEl.style.left = rect.left + "px"
				this._updateSearch()
			})
			.on("blur", ev => {
				resultsEl.style.display = ""
			})
			.on("keyup",  ev => {
				this._updateSearch()
			})
		resultsEl.addEventListener("pointerdown", ev => {
			let target = ev.target
			while (target != document.body && !target.getAttribute("data-roomId")) target = target.parentNode

			let targetRoom = target?.getAttribute("data-roomId")
			if (targetRoom) {
				this.selectRoom(targetRoom)
				this.zoomToRoom(targetRoom)
			}
		}, {capture: true})
	}

	_updateSearch() {
		//setup
		var resultsEl = document.getElementById("searchResults")
		var searchEl = document.getElementById("searchInput")
		var searchText = searchEl.value

		//don't let help bits get nuked
		if (this._searchHelpEl.parentNode) this._searchHelpEl.parentNode.removeChild(this._searchHelpEl)

		if (!searchText) {
			resultsEl.textContent = ""
			resultsEl.appendChild(this._searchHelpEl)
			return
		}
		resultsEl.textContent = ""


		//parse search string
		const wildcardSearch = {}
		const benchSearch = {}
		const stagSearch = {}
		const nullSearch = {}

		var searches = searchText.split("&")
		for (let i = 0; i < searches.length; i++) {
			let regex
			switch (searches[i]) {
				case "*": regex = wildcardSearch; break
				case "bench": regex = benchSearch; break
				case "": regex = nullSearch; break
				case "stag":
				case "station":
					regex = stagSearch
					break
				default:
					try {
						regex = new RegExp(searches[i], 'i')
					} catch (ex) {
						console.error(ex)
						resultsEl.textContent = "Invalid regex: " + ex.message
						return
					}
					break
			}
			searches[i] = regex
		}

		//search
		var roomList = []
		var visibleRooms = this.data.visibleRooms
		var allMatchReasons = {}

		let matchCheck = (regex, room) => {
			let reasons = []

			if (regex === wildcardSearch) {
				reasons.push(['id'])
			} else if (regex === nullSearch) {
				//no match
			} else if (regex === stagSearch) {
				if (room.mapData.stag) reasons.push(['stag'])
			} else if (regex === benchSearch) {
				if (room.mapData.benches.length) reasons.push(['bench'])
			} else {
				if (regex.test(room.id)) reasons.push(['id'])
				if (regex.test(room.mapData.name)) reasons.push(['name'])
				if (room.mapData.boss && regex.test(room.mapData.boss)) reasons.push(['boss', room.mapData.boss])

				for (let itemId in room.items) {
					if (regex.test(itemId)) reasons.push(['item', itemId])
				}
			}

			return reasons
		}

		for (let room of Object.values(this.data.rooms)) {
			let reasons = []
			for (let regex of searches) {
				let r = matchCheck(regex, room)
				if (!r.length) {
					reasons = null
					break
				} else {
					reasons = reasons.concat(r)
				}
			}

			if (reasons === null) continue

			roomList.push(room)
			allMatchReasons[room.id] = Array.from(new Set(reasons))
		}


		//render
		roomList.sort((a, b) => a.id < b.id ? -1 : 1)

		for (let room of roomList) {
			let el = document.createElement("div")
			el.className = "result"
			el.setAttribute("data-roomId", room.id)

			if (!visibleRooms[room.id]) el.classList.add("unavailable")

			let area = room.mapData.area
			let areaEl = document.createElement("span")
			areaEl.className = "areaName"
			areaEl.textContent = window.mapData.areas[area]
			areaEl.setAttribute("data-area", area)
			el.appendChild(areaEl)

			let nameEl = document.createElement("span")
			nameEl.className = "name"
			if (room.mapData.name) nameEl.textContent = `${room.mapData.name} (${room.id})`
			else nameEl.textContent = room.id
			el.appendChild(nameEl)

			for (let reason of allMatchReasons[room.id] || []) {
				if (reason[0] === "id" || reason[0] === "name") continue

				let reasonEl = document.createElement("span")
				reasonEl.className = "matchReason"
				switch (reason[0]) {
					case "stag": reasonEl.textContent = "Stag Station"; break
					case "bench": reasonEl.textContent = "Bench"; break
					case "item": reasonEl.textContent = "Item: " + reason[1]; break
					case "boss": reasonEl.textContent = "Boss: " + reason[1]; break
				}
				el.appendChild(reasonEl)
			}

			resultsEl.appendChild(el)
		}
		if (roomList.length === 0) {
			resultsEl.textContent = "Nothing found"
		}
	}

	_resumeFrameUpdate() {
		if (this._frameUpdateEnabled) return

		this.cluster.enableFrameUpdate(true)
		document.body.classList.remove("noAnimate")

		this._frameUpdateEnabled = true

		if (this._pendingZoomTarget) {
			//the transition doesn't appear to get triggered if we call it directly, so fire from a timeout
			setTimeout(() => {
				this.zoomToRoom(this._pendingZoomTarget)
				this._pendingZoomTarget = null
			}, 0)
		}
	}

	_pauseFrameUpdate() {
		if (!this._frameUpdateEnabled) return

		this.cluster.enableFrameUpdate(false)
		document.body.classList.add("noAnimate")

		this._frameUpdateEnabled = false
	}

	selectRoom(roomId) {
		this.data.selectedRoom = roomId
		document.getElementById("selectedRoomIdText").textContent = roomId || ""
		this.updateRoute()
	}

	updateRoute() {
		let path = window.ngraphPath.aStar(this.data.visibleRoomGraph, {oriented: true})
		let statusEl = document.getElementById("routeState")

		try {
			var route = path.find(this.data.currentPlayerRoom, this.data.selectedRoom)
		} catch {
			route = []
		}
		if (route.length === 0) {
			//no route found
			//still highlight the room, though
			if (this.data.selectedRoom) {
				route = [{id: this.data.selectedRoom}]
				if (this.data.visibleRooms[this.data.selectedRoom]) {
					statusEl.textContent = "No route found."
				} else {
					statusEl.textContent = "Target room not visited."
				}
			} else {
				statusEl.textContent = ""
			}
		} else {
			statusEl.textContent = `Route to target in ${route.length} step(s).`
		}

		route.reverse()//pathfinder gives it to us backwards
		//console.log(route)

		this.dataRender.highlightPath(route.map(x => {
			//chop off ".1" or whatnot for split rooms so we just have the base room id
			let roomSplitId = x.id
			return this.data.rooms[roomSplitId.split(".")[0]]
		}))
	}

	updatePref(k, v) {
		let el = document.getElementById("pref-" + k)
		if (el.tagName === "BUTTON") {
			d3.select(el).classed("enabled", v)
		} else if (el.tagName === "SELECT") {
			el.value = v
		}

		switch (k) {
			case "clusterBasedOnAll": this.data.clusterBasedOnAll = v; break
			case "spoilers": this.data.showAll = v; break
			case "layout": this.cluster.layout = v; break
			case "visibleItems": this.dataRender.visibleItems = v; break
		}
		this.prefs[k] = v
		localStorage.setItem("pref-" + k, JSON.stringify(v))

		if (!this._ready) return

		switch (k) {
			case "clusterBasedOnAll":
				this.cluster.fullRebuild()
				break
			case "layout":
				this.cluster.fullRebuild()
				if (this.prefs.followPlayer) {
					this.svg.transition().duration(800).call(this.zoom.translateTo, 0, 0)
				}
				break
			case "visibleItems":
				this.dataRender.updateVisibleItems()
				return
		}
		this._updateView()
	}

	_render() {
		this.zoom.scaleTo(this.svg, .5)
		this.zoom.translateTo(this.svg, 0, 0)

		document.getElementById("currentRoomIdText").textContent = this.data.currentPlayerRoom || ""
		this._updateView()

		if (this.data.saveData) this._setBlockingMessage(null)
		else this._setBlockingMessage("No save loaded")
	}

	_updateView() {
		this.dataRender.update()
		this.updateRoute()
	}

	async loadTestData() {
		this.data.load(testSaveData[localStorage.testSaveId || "a3"])
	}

	unloadSave() {
		this.data.clear()
		this._render()
	}

	wsConnect() {
		if (this.ws || location.protocol === "file:") return

		this.ws = new WebSocket("ws://" + location.host + "/ws")
		this.ws.addEventListener("open", ev => {
			console.log("Connected to server")
			this._render()
		})
		this.ws.addEventListener("message", ev => {
			//console.log("Msg", ev.data)
			this.handleMessage(JSON.parse(ev.data))
		})
		this.ws.addEventListener("close", ev => {
			this.ws = null
			this.unloadSave()
			this._setBlockingMessage("No game running")
		})
		this.ws.addEventListener("error", ev => {
			this.ws = null
			this.unloadSave()
			this._setBlockingMessage("No game running")
		})
	}

	enterRoom(roomId) {
		console.log("Got enterRoom to " + roomId)

		//Ignore non-room scenes
		if (!roomId || !this.data.rooms[roomId]) return

		//Clear selection when we enter our target
		if (this.data.selectedRoom === roomId) this.selectRoom(null)

		this.data.currentPlayerRoom = roomId
		document.getElementById("currentRoomIdText").textContent = roomId || ""
		d3.select(".currentRoom").classed("currentRoom", false)
		//the new room generally should exist in normal gameplay, revealTransition fires in advance of enterRoom
		d3.select("#room-" + roomId).classed("currentRoom", true)
		if (this.prefs.followPlayer && this.cluster.layout !== "player") {
			this.zoomToRoom(roomId)
		}
		this._updateView()
	}

	zoomToRoom(roomId) {
		if (!roomId || !this.data.rooms[roomId]) return
		let el = d3.select("#room-" + roomId)
		if (!el.node()) return //not visible

		if (!this._frameUpdateEnabled) {
			this._pendingZoomTarget = roomId
			return
		}

		let room = el.data()[0]
		let x = room.x + (room.island?.x || 0)
		let y = room.y + (room.island?.y || 0)
		this.svg.transition().duration(800).call(this.zoom.translateTo, x, y)
	}

	handleMessage(msg) {
		switch (msg.type) {
			case "playerMove":
				this.enterRoom(msg.newRoom)
				break
			case "loadSave":
				this.data.load(msg.data)
				this._render()
				break
			case "unloadSave":
				this.unloadSave()
				break
			case "revealTransition":
				this.data.addVisit(msg.to)
				this._updateView()
				break
			case "getItem":
				console.log(`Got item ${msg.item} at ${msg.location}`)
				this.data.markItemAcquired(msg.item)
				if (this.prefs.visibleItems !== "none") this._updateView()
				break
			default:
				console.warn("Unknown message: ", msg)
				break
		}
	}

	debugReveal(type) {
		var bestRoom, bestDistance = -Infinity
		for (let room of Object.values(this.data.visibleRooms)) {
			if (room.islandDistance > bestDistance && !room.isEveryTransitionVisited) {
				bestRoom = room
				bestDistance = room.islandDistance
			}
		}

		if (bestRoom) {
			var doors = bestRoom.unvisitedDoors
			var door = doors[Math.floor(Math.random() * doors.length)]
			console.log("debug reveal " + door)
			this.data.addVisit(door)
			this._updateView()
		}
	}
}