# Tangled Map View

A work in progress, a browser-based map visualizer for Hollow Knight room-randomized runs.

Assuming you have a perfect knowledge of the base game, the goal is to have a system that perfectly remembers and cleanly presents anything you've seen in your current randomized playthrough without spoiling anything (unless you turn on a spoiler option).

Because remembering where anything is with room randomization on is really hard.

## Install

- This depends on [RandomizerMod3](https://github.com/homothetyhk/HollowKnight.RandomizerMod), install that.
- Copy TangledMapView.dll and websocket-sharp.dll to your Hollow Knight mods folder
	- You can get a build from [here](https://github.com/sirbrialliance/TangledMapView/releases) or build TangledMapView.sln.

## Use

- Start the game.
- Open a browser to http://localhost:7900/ and (recommended) put the window on another monitor.
	- You could also open it on another device on your LAN, replacing "localhost" with your IP address.
- Start a save file with room randomization turned on
	- I haven't tested/tried it with room randomization off...
	- bug: if you create a new save you have to quit and reload the save for the map to appear
- See the map in your browser.

### General Usage

- The current room is highlighted
- Click a room to select it and get a route to it (but it might be wrong, it doesn't take into account your equipment or game state)
- Shift-click a room to tell the map to act like you are in that room.
- Hover a room to see connections
- Transitions you have taken are colored black. Those you have not are white. A dotted black transition indicates one that you can never enter (e.g. falling into Dirtmouth from the above).
- Drag to pan (right drag to pan even if you are hovering a room)
- Scroll to zoom
- Fiddle with the various options on the side to taste
- Drag rooms to influence how they are arranged at the moment

### Room Arrangements

Unlike the original game, the room arrangement with room randomization doesn't cleanly fit on a nice 2D map view. Rooms can connect to other rooms in ways that are physically impossible or illogical. (I even had a save file where the bottom exit of a room connected to the top of the same room!)

To help visualize the room arrangement a few different view options are provided:

- **Islands (cluster)** uses a clustering algorithm to try to determine "groups" of rooms that don't connect to other rooms as much. In theory it sounds useful, in practice I'm not so sure.
- **Islands (hubs & distance)** picks the visible rooms with the most doorways leading in/out and as the main island "centers". (e.g. Dirtmouth has 9 different transitions in/out of it and will often get picked.) Then, we group all the remaining rooms in the island they are "closest" to with "closest" being defined as the number of room transitions it takes to get there. This is a good choice for seeing a general world overview.
- **Player-centric** picks the knight's current room as the "center" of our grouping and shows all nearby rooms, up to a certain number of transitions away. It doesn't show everything we know, just what's nearby.
- **Tangled Mess** doesn't group rooms at all. It just throws everything into a giant pile, which generally results in a tangled spider-web mess of rooms and connections going everywhere. When you get frustrated with how things look with the other options, switch to this for a moment of reflection. Arranging the rooms in a way that's visually easy to parse is actually kind of hard!

And options:

- **Spoilers -> Show all rooms**: Turn this on to see all rooms, be that you have visited them or not. When disabled, only places you've been to are shown.
- **Spoilers -> Cluster based on all rooms**: When using an island-based layout, clustering/island-picking is done considering all rooms and connections. This causes rooms to stay where they would finally end up if you visited every room, but also can leak information about how some of the rooms relate to each other (hench it's a spoilers option).

# Dev

## Building

- Install the modding API and Randomizer3.0
- If needed: crack open `Mod/TangledMapView.csproj` and make sure the paths to the Hollow Knight installation match up with your installation
- Build `Mod/TangledMapView.csproj`
- Copy/symlink/etc. `Mod/bin/(Debug or Release)/TangledMapView.dll` and `websocket-sharp.dll` to your mods directory.


## Misc

Rebuild door metadata:

- You'll need the .unity scenes ([see here](https://radiance.host/apidocs/EditScene.html)) and the [RandomizerMod sources](https://github.com/homothetyhk/HollowKnight.RandomizerMod).
- `cd Metadata`
- Edit `config.py`
- `python builddata.py`

