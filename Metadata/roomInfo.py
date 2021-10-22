from xml.dom import minidom
import yaml # pip install pyyaml

import config

# See roomMeta.yaml
metaData = None
roomData = None

def loadData():
	global metaData, roomData
	with open("roomMeta.yaml", "rb") as f:
		metaData = yaml.load(f, yaml.SafeLoader)

	roomData = metaData['rooms']

	# print(repr(roomData))

	for roomId, data in roomData.items():
		if data is None: roomData[roomId] = data = {}
		if "items" not in data: data["items"] = []
		if "transitions" not in data: data["transitions"] = {}

	loadRandomizerData()
	print("Loaded room info")
	print(repr(roomData["Room_Bretta"]))
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

	skipRooms = (
		"Dream_Nailcollection",
		"Room_Colosseum_Bronze", "Room_Colosseum_Silver", "Room_Colosseum_Gold",
		"Ruins1_24_boss_defeated", #todo
	)

	for doc in items:
		for item in doc.getElementsByTagName("item"):
			try:
				roomId = prop(item, "sceneName")
				if roomId is None:
					# not originally in the game
					continue
				elif roomId in skipRooms:
					# not a room ew handle, but one that has item(s)
					continue
				elif roomId.endswith("_boss"):
					# todo.
					continue

				itemList = roomData[roomId]["items"]

				if prop(item, "newShiny") == "true":
					itemInfo = {
						'name': item.getAttribute("name"),
						'x': float(prop(item, 'x')),
						'y': float(prop(item, 'y')),
					}
				else:
					itemInfo = {
						'name': item.getAttribute("name"),
						'objectName': prop(item, 'objectName'),
					}
				itemList.append(itemInfo)
			except:
				print("Issue handling " + item.toxml())
				raise













class RoomInfo():
	def __init__(self, roomId):
		self.roomId = roomId
