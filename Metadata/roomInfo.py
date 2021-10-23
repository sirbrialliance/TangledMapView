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

	return data

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

def loadRandomizerData():
	dataPath = config.randomizerSourcePath + "/RandomizerMod3.0/Resources/"
	areas = minidom.parse(dataPath + "areas.xml")
	items = [
		minidom.parse(dataPath + "items.xml"),
		minidom.parse(dataPath + "rocks.xml"),
		minidom.parse(dataPath + "soul_lore.xml"),
	]

	def prop(el, name):
		target = el.getElementsByTagName(name)
		if len(target):
			if len(target[0].childNodes): return target[0].childNodes[0].data
			else: return None
		else: return None

	# Note what area the randomizer considers each room to be in
	for transition in areas.getElementsByTagName("transition"):
		roomId = prop(transition, "sceneName")
		room = getRoom(roomId)
		room["randomizerArea"] = prop(transition, "areaName")

	# note what items/checks are in each room
	for doc in items:
		for item in doc.getElementsByTagName("item"):
			try:
				roomId = prop(item, "sceneName")
				if not roomId: continue

				# if roomId is None:
				# 	# not originally in the game
				# 	continue
				# elif roomId in skipRooms:
				# 	# not a room ew handle, but one that has item(s)
				# 	continue
				# elif roomId.endswith("_boss"):
				# 	# todo.
				# 	continue

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
				items[item.getAttribute("name")] = itemInfo
			except:
				print("Issue handling " + item.toxml())
				raise


