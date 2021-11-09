import math
from xml.dom import minidom
import yaml # pip install pyyaml

import config

# See roomMeta.yaml
metaData = None
roomData = None

def getRoom(roomId):
	if roomId not in roomData or roomData[roomId] is None:
		data = roomData[roomId] = {}
	else:
		data = roomData[roomId]

	if "items" not in data: data["items"] = {}
	if "transitions" not in data: data["transitions"] = {}
	if "area" not in data:
		# usually the name before the first underscore, unless the area has an underscore in it or has none
		if roomId.startswith("White_Palace"): data["area"] = "White_Palace"
		elif roomId.startswith("Deepnest_East"): data["area"] = "Deepnest_East"
		elif roomId == "Town": data["area"] = "Town"
		else: data["area"] = roomId.split("_")[0]
	if "benches" not in data: data["benches"] = []

	return data

def addArea(node):
	"""Adds the randomizarArea for the given <transition>, <item>, etc."""
	roomId = prop(node, "sceneName")
	if not roomId: return
	room = getRoom(roomId)
	area = prop(node, "areaName")

	# Randomizer isn't consistent on this one:
	if area == "Palace_Grounds": area = "White_Palace"

	if not area: return
	if "randomizerArea" in room and room["randomizerArea"] != area:
		# print("Multiple areas for " + roomId, area, room["randomizerArea"]); return
		raise Exception("Multiple areas for " + roomId, area, room["randomizerArea"])
	room["randomizerArea"] = area

def loadData():
	global metaData, roomData
	with open("roomMeta.yaml", "rb") as f:
		metaData = yaml.load(f, yaml.SafeLoader)

	roomData = metaData['rooms']

	# print(repr(roomData))

	# for roomId, data in roomData.items():
	# 	if data is None: roomData[roomId] = data = {}
	# 	if "items" not in data: data["items"] = []
	# 	if "transitions" not in data: data["transitions"] = {}

	loadRandomizerData()
	print("Loaded room info")
	# print(repr(roomData["Room_Bretta"]))
	# print(repr(metaData))

def prop(el, name):
	target = el.getElementsByTagName(name)
	if len(target):
		if len(target[0].childNodes): return target[0].childNodes[0].data
		else: return None
	else: return None

def maybeProp(el, name, dest):
	val = prop(el, name)
	if val is not None: dest[name] = val

rndRoomXML = rndAreaXML = None

def loadRandomizerData():
	dataPath = config.randomizerSourcePath + "/RandomizerMod3.0/Resources/"

	# Note what area the randomizer considers each room to be in
	# use the areaName from a number of files since it isn't always filled out...and even still some places
	# don't have it so it's added in roomMeta.yaml

	global rndRoomXML, rndAreaXML

	# Most the room areas are in this file:
	rndRoomXML = rooms = minidom.parse(dataPath + "rooms.xml")
	for transition in rooms.getElementsByTagName("transition"):
		addArea(transition)

	rndAreaXML = areas = minidom.parse(dataPath + "areas.xml")
	for transition in areas.getElementsByTagName("transition"):
		addArea(transition)


	# note what items/checks are in each room and info about them
	items = [
		minidom.parse(dataPath + "items.xml"),
		minidom.parse(dataPath + "rocks.xml"),
		minidom.parse(dataPath + "soul_lore.xml"),
	]
	for doc in items:
		for item in doc.getElementsByTagName("item"):
			try:
				roomId = prop(item, "sceneName")
				if not roomId: roomId = "__orphans__"
				addArea(item)

				items = getRoom(roomId)["items"]

				if prop(item, "newShiny") == "true":
					itemInfo = {
						'x': float(prop(item, 'x')),
						'y': float(prop(item, 'y')),
					}
				else:
					itemInfo = {
						'objectName': prop(item, 'objectName'),
					}
				itemInfo['randType'] = prop(item, "type")
				itemInfo['randAction'] = prop(item, "action")
				itemInfo['randPool'] = prop(item, "pool")
				maybeProp(item, "geo", itemInfo)
				items[item.getAttribute("name")] = itemInfo
			except:
				print("Issue handling " + item.toxml())
				raise

def finishData():
	buildStagTransitions()

	# merge items from certain rooms to other rooms
	for roomId, room in roomData.copy().items():
		targetRoomId = None
		if roomId.endswith("_boss"): targetRoomId = roomId[:-5]
		if roomId.endswith("_boss_defeated"): targetRoomId = roomId[:-14]
		if roomId == "Dream_Nailcollection": targetRoomId = "__orphans__"

		if not targetRoomId: continue


		# merge to new room
		targetRoom = getRoom(targetRoomId)
		if "items" not in room: continue
		if "items" not in targetRoom: continue

		print("Forward data from", roomId, "to", targetRoomId)
		# print("----", roomId, "going to", targetRoomId)
		# print(repr(room), repr(targetRoom))

		targetRoom["items"].update(room["items"])

		del roomData[roomId]


def buildStagTransitions():
	stagHub = getRoom("Cinematic_Stag_travel")
	stagRooms = []
	for roomId, room in roomData.items():
		if "stag" not in room: continue
		stagRooms.append(roomId)

	stagRooms.sort()

	radius = 15
	for i in range(len(stagRooms)):
		angle = i / len(stagRooms) * 2 * math.pi
		roomId = stagRooms[i]
		room = getRoom(roomId)

		doorName = "stag_" + room["stag"]

		stagDoor = room["transitions"]["door_stagExit"]
		stagDoor["to"] = "Cinematic_Stag_travel[" + doorName + "]"

		stagHub["transitions"][doorName] = {
			"x": math.cos(angle) * radius,
			"y": math.sin(angle) * radius,
			"to": roomId + "[door_stagExit]",
		}


def markOneWayDoors():

	def handleTransition(node):
		# oneWay: 1 is entrance, 2 is exit
		# See RandomizerMod.Randomization.TransitionDef.oneWay
		oneWay = prop(node, "oneWay")
		if oneWay != "2": return

		roomId = prop(node, "sceneName")
		doorName = prop(node, "doorName")

		room = getRoom(roomId)
		if doorName not in room["transitions"]:
			print("One-way: No " + doorName + " on " + roomId)
			return
		room["transitions"][doorName]["to"] = None

	for transition in rndRoomXML.getElementsByTagName("transition"):
		handleTransition(transition)

	for transition in rndAreaXML.getElementsByTagName("transition"):
		handleTransition(transition)

