
class App {
	ws = null

	constructor() {
		this.data = window.data = new DataGen()

		this.cluster = new ClusterHandler(this.data)
		this.dataRender = new DataRender(this.cluster)
	}

	async start() {
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
	}

	async loadTestData() {
		this.data.load(testSaveData)
	}

	wsConnect() {
		if (this.ws || location.protocol === "file:") return

		this.ws = new WebSocket("ws://" + location.host + "/ws")
		this.ws.addEventListener("open", ev => {
			console.log("Connected to server")
		})
		this.ws.addEventListener("message", ev => {
			//console.log("Msg", ev.data)
			this.handleMessage(JSON.parse(ev.data))
		})
		this.ws.addEventListener("close", ev => {
			this.ws = null
		})
		this.ws.addEventListener("error", ev => {
			this.ws = null
		})
	}

	handleMessage(msg) {
		switch (msg.type) {
			case "playerMove":
				d3.select(".currentRoom").classed("currentRoom", false)
				d3.select("#room-" + msg.newRoom).classed("currentRoom", true)
				break
			case "loadSave":
				break
			case "unloadSave":
				break
			default:
				console.warn("Unknown message: ", msg)
				break
		}
	}
}