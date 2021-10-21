
class App {
	ws = null
	prefs = {
		spoilers: false,
		clusterBasedOnAll: false,
		followPlayer: true,
		fpsSaver: true,
		layout: "islands",
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

		var svg = this.svg = d3.select("svg")

		var zoom = this.zoom = d3.zoom()
			.scaleExtent([.1, 2.5])
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
		var rooms = Object.values(this.data.rooms)
		rooms.sort((a, b) => a.id < b.id ? -1 : 1)
		rooms.unshift({id: ""})
		var roomSearch = d3.select("#search-room")
		roomSearch
			.selectAll("option")
			.data(rooms, x => x.id)
			.join("option")
			.attr("value", x => x.id)
			.text(x => x.id)
		roomSearch.node().value = ""
		roomSearch.on("change", ev => this.selectRoom(ev.target.value))
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
		d3.select("#search-room").node().value = roomId
		this.updateRoute()
	}

	updateRoute() {
		let path = window.ngraphPath.aStar(this.data.visibleRoomGraph)

		try {
			var route = path.find(this.data.currentPlayerRoom, this.data.selectedRoom)
		} catch {
			route = []
		}
		route.reverse()//pathfinder gives it to us backwards
		//console.log(route)

		this.dataRender.highlightPath(route.map(x => this.data.rooms[x.id]))
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
		}
		this._updateView()
	}

	_render() {
		this.zoom.scaleTo(this.svg, .5)
		this.zoom.translateTo(this.svg, 0, 0)

		this._setupSearch()
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
		d3.select(".currentRoom").classed("currentRoom", false)
		let el = d3.select("#room-" + roomId).classed("currentRoom", true)
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
				this.data.addVisit(msg.from)
				this.data.addVisit(msg.to)
				this._updateView()
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