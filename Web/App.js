
class App {
	ws = null

	constructor() {
		this.data = window.data = new DataGen()

		this.cluster = new ClusterHandler(this.data)
		this.dataRender = new DataRender(this.cluster)
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

		if (location.protocol === "file:") {
			await this.loadTestData()
			this._render()
		} else {
			this.wsConnect()
			setInterval(this.wsConnect.bind(this), 10 * 1000)
		}
	}

	_render() {
		this.zoom.scaleTo(this.svg, .3)
		this.zoom.translateTo(this.svg, 0, 0)

		this.dataRender.update()

		if (this.data.saveData) this._setBlockingMessage(null)
		else this._setBlockingMessage("No save loaded")
	}

	async loadTestData() {
		this.data.load(testSaveData)
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

	handleMessage(msg) {
		switch (msg.type) {
			case "playerMove":
				d3.select(".currentRoom").classed("currentRoom", false)
				d3.select("#room-" + msg.newRoom).classed("currentRoom", true)
				break
			case "loadSave":
				this.data.load(msg.data)
				this._render()
				break
			case "unloadSave":
				this.unloadSave()
				break
			default:
				console.warn("Unknown message: ", msg)
				break
		}
	}
}