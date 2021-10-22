"""
Look thorugh assorted data files and puts together a big master file of
map/game (meta)data we need for mapping.

Including:
	- RandomizerMod data
	- roomMeta.yaml
	- scene source files

"""
import sys, os, io
import json

# local modules:
import config, unityScene, roomInfo

roomInfo.loadData()

handler = unityScene.SceneHandler()

def _test():
	testScenes = [
		# "Town",
		"Room_Bretta",
		# "Tutorial_01",
	]
	for scene in testScenes:
		handler.loadFile(scene, config.scenesPath + "/" + scene + ".unity")
		handler.addInfo(roomInfo.roomData[scene])
		print(repr(roomInfo.roomData[scene]))
	# print(repr(roomInfo.roomData))
	exit(0)

if __name__ == "__main__":
	_test()
	# import cProfile; cProfile.run('_test()'); exit(0)
	# python -m cProfile -s tottime [script and args]
	# python -m cProfile -s cumulative [script and args]

	for root, dirs, files in os.walk(config.scenesPath):
		for file in files:
			if not file.endswith(".unity"): continue
			if file.startswith("Cinematic"): continue
			if file[:-6] in ("BetaEnd", "Opening_Sequence", "Beta", "Pre_Menu_Intro", "PermaDeath_Unlock", "Quit_To_Menu"): continue
			if file.startswith("Cutscene"): continue
			if file.startswith("End"): continue
			if file.startswith("Menu"): continue
			if root.endswith("Bosses") and file.startswith("GG_"): continue

			room = file[:-6]
			roomData[room] = unityScene.handleSceneFile(room, root + "/" + file)

	print(repr(roomData))
	with open("roomData.json", "w") as f:
		json.dump(roomData, f)
