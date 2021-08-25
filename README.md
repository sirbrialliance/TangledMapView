# Tangled Map View

A work in progress, a browser-based map visualizer for Hollow Knight room-randomized runs.


## Install + Use

- This depends on [RandomizerMod3](https://github.com/homothetyhk/HollowKnight.RandomizerMod), install that.
- Either:
	- Grab a prebuilt .dll and put it in your Hollow Knight mods folder or
	- Build TangledMapView.sln and copy the generated .dll in Mod/ to your Hollow Knight mods folder
- Start the game.
- Open a browser to http://localhost:7900/ and (recommended) put the window on another monitor.
	- You should also be able to open it on another device on your LAN, replacing "localhost" for your IP address.
- Start a save file with room randomization turned on
	- I haven't tested/tried it with room randomization off...
	- bug: if you create a new save you have to quit and reload the save for the map to appear
- See the map in your browser.
	- Current room is highlighted.
	- Hover a room to see connections
	- Drag to pan (right drag to pan even if you are hovering a room)
	- Scroll to zoom
	- Fiddle with the various options on the side to taste
	- Click a room to select it and get a route to it (but it might be wrong, it doesn't take into account your equipment or one-way transitions)
	- Drag rooms to influence how they are arranged at the moment



# Misc

Rebuild door metadata: `python builddata.py "path\to\hollow_knight_ripped_Data\hollow_knight\Assets\Scene"` (slow, takes hours)

