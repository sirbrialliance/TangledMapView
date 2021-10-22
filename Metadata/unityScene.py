import yaml # pip install pyyaml
import io

import config

class Loader(yaml.SafeLoader):
	def load104(self, node):
		return self.construct_object(node)

Loader.add_constructor("tag:unity3d.com,2011:104", Loader.load104)
yaml.parser.Parser.DEFAULT_TAGS[u'!u!'] = u'tag:unity3d.com,2011:'

def loadYAML(stringData):
	data = yaml.parse(io.BytesIO(stringData))
	i = iter(data)
	token = next(i)
	def consume(type = None):
		nonlocal token
		# print("Consume " + repr(token))
		ret = token
		if type is not None and not isinstance(token, type): raise ValueError("Wrong type, wanted " + str(type) + " but got " + str(token))
		token = next(i)
		return ret

	def nextIs(type):
		return isinstance(token, type)

	def burnValue():
		if nextIs(yaml.MappingStartEvent):
			consume()
			while True:
				if nextIs(yaml.MappingStartEvent): burnValue()
				elif nextIs(yaml.MappingEndEvent): break
				else: consume()
			consume(yaml.MappingEndEvent)
		elif nextIs(yaml.SequenceStartEvent):
			consume()
			while True:
				if nextIs(yaml.SequenceStartEvent): burnValue()
				elif nextIs(yaml.SequenceEndEvent): break
				else: consume()
			consume(yaml.SequenceEndEvent)
		else: consume(yaml.ScalarEvent)


	def readObject():
		if nextIs(yaml.ScalarEvent):
			return consume().value
		elif nextIs(yaml.SequenceStartEvent):
			ret = []
			consume(yaml.SequenceStartEvent)
			while not nextIs(yaml.SequenceEndEvent): ret.append(readObject())
			consume(yaml.SequenceEndEvent)
			return ret

		consume(yaml.MappingStartEvent)
		ret = {}
		while nextIs(yaml.ScalarEvent):
			k = consume(yaml.ScalarEvent).value
			v = readObject()
			ret[k] = v

		consume(yaml.MappingEndEvent)
		return ret


	consume(yaml.StreamStartEvent)

	objects = {}

	keyWhitelist = set((
		"m_Component", "m_LocalPosition", "m_Name", "m_Script", "m_GameObject", "m_Father", "m_LocalScale",
		"targetScene", "entryPoint",
	))

	while nextIs(yaml.DocumentStartEvent):
		consume()
		_ = consume(yaml.MappingStartEvent)
		id = _.anchor

		_ = consume(yaml.ScalarEvent)
		type = _.value

		object = {"type": type}

		#props
		consume(yaml.MappingStartEvent)
		while nextIs(yaml.ScalarEvent):
			k = consume(yaml.ScalarEvent).value
			if k in keyWhitelist:
				v = readObject()
			else:
				burnValue()
				continue
			object[k] = v
		consume(yaml.MappingEndEvent) # props

		consume(yaml.MappingEndEvent) # object start

		objects[id] = object

		consume(yaml.DocumentEndEvent)
		# print("---")

	# print(repr(objects))
	return objects

class SceneHandler:
	def __init__(self):
		self.roomId = None
		self.sceneData = None

	def loadFile(self, name, path):
		print("Read " + name)

		with open(path, "rb") as f:
			fileData = f.read()
		self.roomId = name
		self.sceneData = loadYAML(fileData)


	def addInfo(self, roomData):
		global doorData
		print("Scene " + self.roomId)
		sceneData = self.sceneData

		def getGameObject(object):
			return sceneData[object["m_GameObject"]["fileID"]]

		def getComponent(go, type):
			for comp in go["m_Component"]:
				compObj = sceneData[comp["component"]["fileID"]]
				if compObj["type"] == type: return compObj
			raise ValueError("Found no " + type + " on " + str(go))

		def getParent(transform):
			father = transform["m_Father"]["fileID"]
			if father != '0': return sceneData[father]
			else: return None

		doors = roomData["transitions"]

		for id, object in sceneData.items():
			if object["type"] != "MonoBehaviour": continue
			if object["m_Script"]["guid"] != config.doorTypeGUID: continue
			print("Found a door on " + id)

			go = getGameObject(object)
			transform = getComponent(go, "Transform")

			print("Pos is " + repr(transform["m_LocalPosition"]))
			x = float(transform["m_LocalPosition"]["x"])
			y = float(transform["m_LocalPosition"]["y"])
			parent = getParent(transform)
			while parent:
				print("has a parent! " + repr(transform["m_LocalPosition"]) + " scale " + repr(transform["m_LocalScale"]))
				x *= float(parent["m_LocalScale"]["x"])
				y *= float(parent["m_LocalScale"]["y"])
				x += float(parent["m_LocalPosition"]["x"])
				y += float(parent["m_LocalPosition"]["y"])
				parent = getParent(parent)

			targetDoorId = f"{object['targetScene']}[{object['entryPoint']}]"
			if targetDoorId == "[]": targetDoorId = None
			doors[go["m_Name"]] = {"x": x, "y": y, "to": targetDoorId}

		if len(doors):
			print("Add for scene " + repr(doors))

		# print(sceneData.entries)
		# print(sceneData.dump_yaml())
		# doors = sceneData.filter(class_names=("MonoBehaviour",), attributes=("isADoor",))
		# print(repr(sceneData))

		# doors = []
		# for doc in sceneData:
		# 	print(repr(doc.value))
		# 	if "MonoBehaviour" not in doc.value: continue
		# 	if "isADoor" not in doc['MonoBehaviour']: continue
		# 	doors.append(doc)
		# if not len(doors): return

		# print("Has " + str(len(doors)) + " doors")

