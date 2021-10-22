window.mapData = {
	"areas": {
		"Abyss": "Ancient Basin",
		"Cliffs": "Howling Cliffs",
		"Crossroads": "Forgotten Crossroads",
		"Deepnest": "Deepnest",
		"Deepnest_East": "Kingdom's Edge",
		"Fungus1": "Greenpath",
		"Fungus2": "Fungal Wastes",
		"Fungus3": "Queen's Gardens",
		"FogCanyon": "Fog Canyon",
		"GG": "Godhome",
		"Grimm": "Grimm",
		"Hive": "The Hive",
		"Mines": "Crystal Peak",
		"RestingGrounds": "Resting Grounds",
		"Room": "Room",
		"Ruins": "City of Tears",
		"Ruins2": "City of Tears",
		"Town": "Dirtmouth",
		"White_Palace": "White Palace"
	},
	"rooms": {
		"Cinematic_Stag_travel": {
			"name": "Stag Travel"
		},
		"Abyss_01": {
			"name": "Broken Elevator Shaft",
			"splitRoom": [
				[
					"left2",
					"right2"
				],
				[
					"left1",
					"left3",
					"right1"
				]
			],
			"items": {
				"Whispering_Root-Waterways": {
					"x": 37.9,
					"y": 10.4
				},
				"Geo_Rock-Broken_Elevator_1": {
					"x": 6.074166,
					"y": 53.81757
				},
				"Geo_Rock-Broken_Elevator_2": {
					"x": 24.89054,
					"y": 91.70493
				},
				"Geo_Rock-Broken_Elevator_3": {
					"x": 26.66,
					"y": 98.61
				}
			},
			"transitions": {
				"left2": {
					"x": -0.5,
					"y": 51.0,
					"to": "Waterways_06[right1]"
				},
				"right2": {
					"x": 30.5,
					"y": 51.0,
					"to": "Waterways_07[left1]"
				},
				"left3": {
					"x": -0.5,
					"y": 11.0,
					"to": "Abyss_02[right1]"
				},
				"left1": {
					"x": -0.5,
					"y": 133.0,
					"to": "Waterways_05[right1]"
				},
				"right1": {
					"x": 30.5,
					"y": 161.0,
					"to": "Ruins2_04[left2]"
				}
			},
			"area": "Abyss"
		},
		"Abyss_02": {
			"items": {
				"Wanderer's_Journal-Ancient_Basin": {
					"x": 160.6613,
					"y": 5.26
				},
				"Grimmkin_Flame-Ancient_Basin": {
					"x": 100.37,
					"y": 17.94
				},
				"Geo_Rock-Broken_Bridge_Upper": {
					"x": 65.07578,
					"y": 34.83622
				},
				"Geo_Rock-Broken_Bridge_Lower": {
					"x": 41.09491,
					"y": 4.926064
				},
				"Geo_Rock-Broken_Bridge_Lower_Dupe": {
					"x": 43.53579,
					"y": 4.990069
				}
			},
			"transitions": {
				"bot1": {
					"x": 9.0,
					"y": -0.5,
					"to": "Abyss_03[top1]"
				},
				"right1": {
					"x": 170.5,
					"y": 23.0,
					"to": "Abyss_01[left3]"
				}
			},
			"area": "Abyss"
		},
		"Abyss_03_b": {
			"name": "Basin Tram (West)",
			"transitions": {
				"tram": {
					"x": 32.4,
					"y": 10.4,
					"to": "Abyss_03[tram_west]"
				},
				"door_tram": {
					"x": 32.339999999999996,
					"y": 9.989999999999998,
					"to": null
				},
				"door_tram_arrive": {
					"x": 32.34,
					"y": 9.99,
					"to": null
				},
				"left1": {
					"x": -0.5,
					"y": 10.0,
					"to": "Deepnest_37[right1]"
				}
			},
			"items": {},
			"area": "Abyss"
		},
		"Abyss_03": {
			"name": "Basin Tram (Center)",
			"transitions": {
				"tram_west": {
					"x": 74.5,
					"y": 10.4,
					"to": "Abyss_03b[tram]"
				},
				"tram_east": {
					"x": 92.6,
					"y": 10.4,
					"to": "Abyss_03_c[tram]"
				},
				"door_tram_arrive": {
					"x": 80.36,
					"y": 9.952386,
					"to": null
				},
				"bot2": {
					"x": 62.5,
					"y": 7.0,
					"to": "Abyss_04[top1]"
				},
				"top1": {
					"x": 47.0,
					"y": 22.5,
					"to": "Abyss_02[bot1]"
				},
				"bot1": {
					"x": 14.0,
					"y": 0.0,
					"to": "Abyss_17[top1]"
				},
				"door_tram": {
					"x": 80.36,
					"y": 9.952390000000001,
					"to": null
				}
			},
			"items": {},
			"area": "Abyss"
		},
		"Abyss_03_c": {
			"name": "Basin Tram (East)",
			"transitions": {
				"tram": {
					"x": 44.4,
					"y": 10.4,
					"to": "Abyss_03[tram_east]"
				},
				"door_tram_arrive": {
					"x": 44.42,
					"y": 10.09,
					"to": null
				},
				"door_tram": {
					"x": 44.419999999999995,
					"y": 10.09,
					"to": null
				},
				"right1": {
					"x": 150.5,
					"y": 10.0,
					"to": "Hive_01[left1]"
				},
				"top1": {
					"x": 140.0,
					"y": 25.5,
					"to": "Deepnest_East_01[bot1]"
				}
			},
			"items": {},
			"area": "Abyss"
		},
		"Abyss_04": {
			"name": "Ancient Basin",
			"items": {
				"Vessel_Fragment-Basin": {
					"x": 64.32000000000001,
					"y": 61.90992
				},
				"Ancient_Basin_Map": {
					"x": 68.3,
					"y": 41.4
				},
				"Soul_Totem-Basin": {
					"x": 5.597937,
					"y": 53.26731
				}
			},
			"transitions": {
				"top1": {
					"x": 56.0,
					"y": 90.5,
					"to": "Abyss_03[bot2]"
				},
				"bot1": {
					"x": 59.0,
					"y": -0.5,
					"to": "Abyss_06_Core[top1]"
				},
				"left1": {
					"x": -0.5,
					"y": 9.0,
					"to": "Abyss_18[right1]"
				},
				"right1": {
					"x": 100.5,
					"y": 21.0,
					"to": "Abyss_05[left1]"
				}
			},
			"area": "Abyss"
		},
		"Abyss_05": {
			"name": "Old White Palace Location",
			"transitions": {
				"dream": {
					"x": 129,
					"y": 17.4,
					"to": "White_Palace_03_hub"
				},
				"left1": {
					"x": -0.5,
					"y": 18.0,
					"to": "Abyss_04[right1]"
				},
				"door_dreamReturn": {
					"x": 125.54,
					"y": 16.87,
					"to": null
				},
				"door_dreamReturn_reality": {
					"x": 125.54,
					"y": 16.87,
					"to": null
				},
				"right1": {
					"x": 200.5,
					"y": 18.0,
					"to": "Abyss_22[left1]"
				}
			},
			"items": {},
			"area": "Abyss"
		},
		"Abyss_06_Core": {
			"name": "Abyss Core",
			"items": {
				"Geo_Rock-Abyss_1": {
					"x": 76.03484,
					"y": 184.8635
				},
				"Geo_Rock-Abyss_2": {
					"x": 63.74,
					"y": 170.09
				},
				"Geo_Rock-Abyss_3": {
					"x": 42.01,
					"y": 76.26
				},
				"Lore_Tablet-Ancient_Basin": {
					"x": 60.8,
					"y": 232.6
				}
			},
			"transitions": {
				"bot1": {
					"x": 27.0,
					"y": -0.5,
					"to": "Abyss_15[top1]"
				},
				"door_dreamReturn": {
					"x": 12.45744,
					"y": 138.63,
					"to": null
				},
				"left1 extra": {
					"x": 0.5,
					"y": 144.0,
					"to": "Abyss_08[right1]"
				},
				"left3": {
					"x": -0.5,
					"y": 6.0,
					"to": "Abyss_12[right1]"
				},
				"right2": {
					"x": 100.5,
					"y": 6.0,
					"to": "Abyss_16[left1]"
				},
				"top1": {
					"x": 90.0,
					"y": 270.5,
					"to": "Abyss_04[bot1]"
				},
				"left1": {
					"x": 0.5,
					"y": 140.0,
					"to": "Abyss_08[right1]"
				}
			},
			"area": "Abyss"
		},
		"Abyss_08": {
			"name": "Lifeblood Core",
			"transitions": {
				"magic_circle": {
					"x": 63,
					"y": 3,
					"to": "Abyss_06_Core"
				},
				"right1": {
					"x": 110.0,
					"y": 92.0,
					"to": "Abyss_06_Core[left1]"
				}
			},
			"items": {
				"Lifeblood_Core": {
					"x": 78.61,
					"y": 24.10472
				},
				"Arcane_Egg-Lifeblood_Core": {
					"x": 81.09,
					"y": 4.47
				}
			},
			"area": "Abyss"
		},
		"Abyss_09": {
			"name": "Abyss Lake",
			"splitRoom": [
				[
					"right1"
				],
				[
					"right2",
					"right3",
					"left1"
				]
			],
			"items": {},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 26.0,
					"to": "Abyss_16[right1]"
				},
				"right1": {
					"x": 260.5,
					"y": 26.0,
					"to": "Abyss_10[left1]"
				},
				"right3": {
					"x": 260.5,
					"y": 57.0,
					"to": "Abyss_10[left2]"
				},
				"right2": {
					"x": 81.50000081923,
					"y": 90.9999970592716,
					"to": "Abyss_Lighthouse_room[left1]"
				}
			},
			"area": "Abyss"
		},
		"Abyss_10": {
			"name": "Shade Cloak",
			"items": {
				"Shade_Cloak": {
					"x": 102.13,
					"y": 17.07
				},
				"Arcane_Egg-Shade_Cloak": {
					"x": 70.01193,
					"y": 9.092091
				},
				"Left_Shade_Cloak": {
					"x": 102.13,
					"y": 17.07
				},
				"Right_Shade_Cloak": {
					"x": 102.13,
					"y": 17.07
				}
			},
			"transitions": {
				"left2": {
					"x": -0.5,
					"y": 42.0,
					"to": "Abyss_09[right3]"
				},
				"left1": {
					"x": -0.5,
					"y": 11.0,
					"to": "Abyss_09[right1]"
				}
			},
			"area": "Abyss"
		},
		"Abyss_12": {
			"name": "Abyss Shriek",
			"items": {
				"Abyss_Shriek": {
					"x": 47.48,
					"y": 9.24
				}
			},
			"transitions": {
				"right1": {
					"x": 180.5,
					"y": 16.0,
					"to": "Abyss_06_Core[left3]"
				}
			},
			"area": "Abyss"
		},
		"Abyss_15": {
			"name": "Void Heart",
			"items": {
				"Void_Heart": {
					"x": 141.0,
					"y": 11.0
				},
				"Arcane_Egg-Birthplace": {
					"x": 16.91,
					"y": 4.26
				}
			},
			"transitions": {
				"door_dreamReturn": {
					"x": 141.38,
					"y": 10.82,
					"to": null
				},
				"top1": {
					"x": 11.0,
					"y": 110.5,
					"to": "Abyss_06_Core[bot1]"
				}
			},
			"area": "Abyss"
		},
		"Abyss_16": {
			"items": {},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 8.0,
					"to": "Abyss_06_Core[right2]"
				},
				"right1": {
					"x": 100.5,
					"y": 9.0,
					"to": "Abyss_09[left1]"
				}
			},
			"area": "Abyss"
		},
		"Abyss_17": {
			"name": "Lesser Mawlek Miniboss for Ore",
			"items": {
				"Pale_Ore-Basin": {
					"x": 14.82673,
					"y": 15.18
				},
				"Grub-Basin_Requires_Dive": {
					"x": 152.45,
					"y": 4.52
				}
			},
			"transitions": {
				"top1": {
					"x": 163.0,
					"y": 37.0,
					"to": "Abyss_03[bot1]"
				}
			},
			"area": "Abyss"
		},
		"Abyss_18": {
			"name": "Superdash Over Spikes",
			"items": {
				"Geo_Rock-Basin_Tunnel": {
					"x": 58.12402,
					"y": 12.63
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 18.0,
					"to": "Abyss_19[right1]"
				},
				"right1": {
					"x": 200.5,
					"y": 12.0,
					"to": "Abyss_04[left1]"
				}
			},
			"area": "Abyss"
		},
		"Abyss_19": {
			"name": "Broken Vessel",
			"boss": "Broken Vessel, Lost Kin",
			"items": {
				"Boss_Essence-Lost_Kin": {
					"x": 23.25784,
					"y": 28.189
				},
				"Grub-Basin_Requires_Wings": {
					"x": 82.51846,
					"y": 85.47667
				},
				"Geo_Rock-Basin_Grub": {
					"x": 143.6396,
					"y": 69.91467
				},
				"Geo_Rock-Basin_Before_Broken_Vessel": {
					"x": 117.73,
					"y": 9.925488
				}
			},
			"transitions": {
				"bot1": {
					"x": 84.0,
					"y": -0.5,
					"to": "Abyss_20[top1]"
				},
				"door_dreamReturn": {
					"x": 26.81,
					"y": 27.75,
					"to": null
				},
				"right1": {
					"x": 160.5,
					"y": 32.0,
					"to": "Abyss_18[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 28.5,
					"to": "Abyss_21[right1]"
				},
				"bot2": {
					"x": 118.5,
					"y": -0.5,
					"to": "Abyss_20[top2]"
				}
			},
			"area": "Abyss"
		},
		"Abyss_20": {
			"name": "Mawlurks",
			"items": {
				"Simple_Key-Basin": {
					"x": 57.04813,
					"y": 8.194823
				}
			},
			"transitions": {
				"top2": {
					"x": 118.5,
					"y": 70.5,
					"to": "Abyss_19[bot2]"
				},
				"top1": {
					"x": 83.0,
					"y": 70.5,
					"to": "Abyss_19[bot1]"
				}
			},
			"area": "Abyss"
		},
		"Abyss_21": {
			"name": "Monarch Wings",
			"items": {
				"Monarch_Wings": {
					"x": 66.31,
					"y": 232.8
				}
			},
			"transitions": {
				"right1": {
					"x": 170.5,
					"y": 247.0,
					"to": "Abyss_19[left1]"
				}
			},
			"area": "Abyss"
		},
		"Abyss_22": {
			"name": "Stag",
			"stag": "HiddenStation",
			"items": {
				"Hidden_Station_Stag": {
					"x": 28.0,
					"y": 6.4
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 7.0,
					"to": "Abyss_05[right1]"
				},
				"door_stagExit": {
					"x": 35.6,
					"y": 5.64,
					"to": null
				}
			},
			"area": "Abyss"
		},
		"Abyss_Lighthouse_room": {
			"name": "Inside Lighthouse",
			"items": {},
			"transitions": {
				"left1": {
					"x": 8.0,
					"y": 8.0,
					"to": "Abyss_09[right2]"
				}
			},
			"area": "Abyss"
		},
		"Cliffs_01": {
			"name": "Cliffs West",
			"items": {
				"Wanderer's_Journal-Cliffs": {
					"x": 120.42,
					"y": 30.31
				},
				"King's_Idol-Cliffs": {
					"x": 36.15,
					"y": 3.23
				},
				"Whispering_Root-Howling_Cliffs": {
					"x": 83.7,
					"y": 15.3
				},
				"Howling_Cliffs_Map": {
					"x": 125.8,
					"y": 91.6
				},
				"Geo_Rock-Cliffs_Main_1": {
					"x": 44.35408,
					"y": 108.5035
				},
				"Geo_Rock-Cliffs_Main_2": {
					"x": 50.76541,
					"y": 68.01698
				},
				"Geo_Rock-Cliffs_Main_3": {
					"x": 124.2772,
					"y": 72.82372
				},
				"Geo_Rock-Cliffs_Main_4": {
					"x": 74.04561,
					"y": 36.77761
				},
				"Soul_Totem-Cliffs_Main": {
					"x": 115.73,
					"y": 23.5
				},
				"Lore_Tablet-Howling_Cliffs": {
					"x": 127.3,
					"y": 57.7
				}
			},
			"transitions": {
				"right1": {
					"x": 140.5,
					"y": 144.0,
					"to": "Cliffs_02[left1]"
				},
				"right3": {
					"x": 140.5,
					"y": 8.0,
					"to": "Fungus1_28[left1]"
				},
				"right4": {
					"x": 140.5,
					"y": 32.0,
					"to": "Cliffs_06[left1]"
				},
				"right2": {
					"x": 140.5,
					"y": 92.0,
					"to": "Cliffs_04[left1]"
				}
			},
			"area": "Cliffs"
		},
		"Cliffs_02": {
			"name": "Cliffs East & Gorb",
			"boss": "Gorb",
			"items": {
				"Geo_Rock-Below_Gorb_Dupe": {
					"x": 50.38511,
					"y": 16.57438
				},
				"Geo_Rock-Below_Gorb": {
					"x": 62.94,
					"y": 16.57438
				},
				"Soul_Totem-Cliffs_Gorb": {
					"x": 12.88,
					"y": 3.85
				}
			},
			"transitions": {
				"bot1": {
					"x": 188.0,
					"y": -0.5,
					"to": "Tutorial_01[top2]"
				},
				"door1": {
					"x": 122.54,
					"y": 5.64,
					"to": "Room_nailmaster[left1]"
				},
				"right1": {
					"x": 241.5,
					"y": 49.5,
					"to": "Town[top1]"
				},
				"bot2": {
					"x": 221.5,
					"y": -2.0,
					"to": "Tutorial_01[top1]"
				},
				"left1": {
					"x": -0.5,
					"y": 25.0,
					"to": "Cliffs_01[right1]"
				},
				"left2": {
					"x": 3.0,
					"y": 54.0,
					"to": "Cliffs_03[right1]"
				}
			},
			"area": "Cliffs"
		},
		"Cliffs_03": {
			"name": "Stag Nest",
			"stag": "StagNest",
			"items": {
				"Vessel_Fragment-Stag_Nest": {
					"x": 80.57,
					"y": 7.7
				},
				"Stag_Nest_Stag": {
					"x": 19.3,
					"y": 6.3
				}
			},
			"transitions": {
				"door_stagExit": {
					"x": 16.13,
					"y": 5.71,
					"to": null
				},
				"right1": {
					"x": 180.5,
					"y": 58.0,
					"to": "Cliffs_02[left2]"
				}
			},
			"area": "Cliffs"
		},
		"Cliffs_04": {
			"name": "Joni's Dark and Spiky Path",
			"items": {
				"Soul_Totem-Cliffs_Joni's": {
					"x": 55.73,
					"y": 52.46
				}
			},
			"transitions": {
				"right1": {
					"x": 85.5,
					"y": 49.0,
					"to": "Cliffs_05[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 44.0,
					"to": "Cliffs_01[right2]"
				}
			},
			"area": "Cliffs"
		},
		"Cliffs_05": {
			"name": "Joni's Blessing",
			"items": {
				"Joni's_Blessing": {
					"x": 68.199,
					"y": 6.462356
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 49.0,
					"to": "Cliffs_04[right1]"
				}
			},
			"area": "Cliffs"
		},
		"Cliffs_06": {
			"name": "Grimm Summon",
			"items": {},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 5.0,
					"to": "Cliffs_01[right4]"
				}
			},
			"area": "Cliffs"
		},
		"Crossroads_01": {
			"name": "Crossroads Entry",
			"items": {
				"Hallownest_Seal-Crossroads_Well": {
					"x": 40.6,
					"y": 30.19
				},
				"Geo_Rock-Crossroads_Well": {
					"x": 46.83,
					"y": 1.57
				}
			},
			"transitions": {
				"top1": {
					"x": 52.5,
					"y": 25.5,
					"to": "Town[bot1]"
				},
				"door1": {
					"x": 52.61,
					"y": 10.69,
					"to": "bot1[Town]"
				},
				"right1": {
					"x": 100.5,
					"y": 18.0,
					"to": "Crossroads_02[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 9.0,
					"to": "Crossroads_07[right1]"
				},
				"top2": {
					"x": 52.5,
					"y": 42.5,
					"to": "Town[bot1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_02": {
			"name": "Outside Black Egg",
			"items": {},
			"transitions": {
				"door1": {
					"x": 46.47,
					"y": 3.77,
					"to": null
				},
				"right1": {
					"x": 90.5,
					"y": 5.0,
					"to": "Crossroads_39[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 7.0,
					"to": "Crossroads_01[right1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_03": {
			"name": "Outside Stag",
			"items": {
				"Grub-Crossroads_Stag": {
					"x": 4.34,
					"y": 41.56556
				}
			},
			"transitions": {
				"left1": {
					"x": 0.5,
					"y": 34.0,
					"to": "Crossroads_21[right1]"
				},
				"bot1": {
					"x": 15.0,
					"y": -0.5,
					"to": "Crossroads_19[top1]"
				},
				"top1": {
					"x": 14.0,
					"y": 72.5,
					"to": "Crossroads_16[bot1]"
				},
				"left2": {
					"x": -0.5,
					"y": 11.0,
					"to": "Crossroads_47[right1]"
				},
				"right2": {
					"x": 30.5,
					"y": 60.0,
					"to": "Mines_33[left1]"
				},
				"right1": {
					"x": 30.5,
					"y": 35.0,
					"to": "Crossroads_15[left1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_04": {
			"name": "Salubra & Gruz Mother",
			"boss": "GruzMother",
			"items": {
				"Boss_Geo-Gruz_Mother": {
					"x": 92.5,
					"y": 15.5
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 17.0,
					"to": "Crossroads_19[right1]"
				},
				"door_charmshop": {
					"x": 144.05999,
					"y": 10.74,
					"to": null
				},
				"right1": {
					"x": 160.49997000000002,
					"y": 25.0,
					"to": "Crossroads_50[left1]"
				},
				"door1": {
					"x": 85.05,
					"y": 2.82,
					"to": "Room_ruinhouse[left1]"
				},
				"top1": {
					"x": 76.0,
					"y": 30.5,
					"to": "Crossroads_27[bot1]"
				},
				"door_Mender_House": {
					"x": 57.099998322,
					"y": 2.6674399300000005,
					"to": null
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_05": {
			"items": {
				"Grub-Crossroads_Center": {
					"x": 56.17426,
					"y": 16.60266
				},
				"Geo_Rock-Crossroads_Center_Grub": {
					"x": 25.55792,
					"y": 15.58733
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 7.0,
					"to": "Crossroads_07[right2]"
				},
				"right1": {
					"x": 75.0,
					"y": 8.0,
					"to": "Crossroads_40[left1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_06": {
			"name": "Outside Ancestral Mound",
			"items": {},
			"transitions": {
				"door1": {
					"x": 28.41,
					"y": 29.66,
					"to": null
				},
				"right1": {
					"x": 60.5,
					"y": 6.0,
					"to": "Crossroads_10[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 6.0,
					"to": "Crossroads_33[right1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_07": {
			"name": "Platforms",
			"items": {
				"Whispering_Root-Crossroads": {
					"x": 6.8,
					"y": 103.2
				},
				"Geo_Rock-Crossroads_Root": {
					"x": 22.29,
					"y": 107.71
				},
				"Geo_Rock-Crossroads_Root_Dupe_1": {
					"x": 18.94,
					"y": 102.63
				},
				"Geo_Rock-Crossroads_Root_Dupe_2": {
					"x": 21.2,
					"y": 102.66
				}
			},
			"transitions": {
				"left3": {
					"x": -0.5,
					"y": 20.0,
					"to": "Crossroads_25[right1]"
				},
				"left2": {
					"x": -0.5,
					"y": 40.5,
					"to": "Crossroads_11_alt[right1]"
				},
				"right1": {
					"x": 43.5,
					"y": 83.0,
					"to": "Crossroads_01[left1]"
				},
				"right2": {
					"x": 43.5,
					"y": 44.0,
					"to": "Crossroads_05[left1]"
				},
				"bot1": {
					"x": 20.0,
					"y": 0.5,
					"to": "Crossroads_33[top1]"
				},
				"left1": {
					"x": 2.5,
					"y": 83.0,
					"to": "Crossroads_38[right1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_08": {
			"name": "Asipid Miniboss",
			"items": {
				"Geo_Rock-Crossroads_Aspid_Arena": {
					"x": 9.07,
					"y": 38.7
				},
				"Geo_Rock-Crossroads_Aspid_Arena_Dupe_1": {
					"x": 12.3835,
					"y": 37.81936
				},
				"Geo_Rock-Crossroads_Aspid_Arena_Dupe_2": {
					"x": 16.02,
					"y": 32.62
				},
				"Geo_Rock-Crossroads_Aspid_Arena_Hidden": {
					"x": 38.52,
					"y": 33.62
				}
			},
			"transitions": {
				"left2": {
					"x": -0.5,
					"y": 6.0,
					"to": "Crossroads_18[right1]"
				},
				"right1": {
					"x": 51.5,
					"y": 24.0,
					"to": "Crossroads_30[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 22.0,
					"to": "Crossroads_33[right2]"
				},
				"right2": {
					"x": 52.5,
					"y": 9.0,
					"to": "Crossroads_13[left1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_09": {
			"name": "Brooding Mawlek",
			"boss": "Brooding Mawlek",
			"items": {
				"Mask_Shard-Brooding_Mawlek": {
					"x": 61.44,
					"y": 9.49
				}
			},
			"transitions": {
				"right1": {
					"x": 86.5,
					"y": 5.0,
					"to": "Crossroads_33[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 9.0,
					"to": "Crossroads_36[right2]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_10": {
			"name": "False Knight",
			"boss": "False Knight, Failed Champion",
			"items": {
				"City_Crest": {
					"x": 38.660000000000004,
					"y": 2.94
				},
				"200_Geo-False_Knight_Chest": {
					"x": 6.7,
					"y": 12.77539
				},
				"Boss_Essence-Failed_Champion": {
					"x": 33.17814,
					"y": 48.26121
				},
				"Geo_Rock-Crossroads_Above_False_Knight": {
					"x": 64.67644,
					"y": 59.53819
				}
			},
			"transitions": {
				"door_dreamReturn": {
					"x": 36.38,
					"y": 47.65,
					"to": null
				},
				"right1": {
					"x": 75.5,
					"y": 4.0,
					"to": "Crossroads_21[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 4.0,
					"to": "Crossroads_06[right1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_11_alt": {
			"name": "Baulder Exit Gate",
			"items": {
				"Lore_Tablet-Pilgrim's_Way_1": {
					"x": 106.0,
					"y": 14.7
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 19.0,
					"to": "Fungus1_01[right1]"
				},
				"right1": {
					"x": 120.5,
					"y": 13.0,
					"to": "Crossroads_07[left2]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_12": {
			"items": {
				"Geo_Rock-Crossroads_Before_Acid_Grub": {
					"x": 41.12111,
					"y": 14.67542
				}
			},
			"transitions": {
				"right1": {
					"x": 70.5,
					"y": 11.0,
					"to": "Crossroads_33[left2]"
				},
				"left1": {
					"x": -0.5,
					"y": 13.0,
					"to": "Crossroads_35[right1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_13": {
			"items": {
				"Mask_Shard-Crossroads_Goam": {
					"x": 6.38,
					"y": 24.18
				},
				"Geo_Rock-Crossroads_Below_Goam_Mask_Shard": {
					"x": 20.27,
					"y": 2.62
				},
				"Geo_Rock-Crossroads_After_Goam_Mask_Shard": {
					"x": 69.68784,
					"y": 2.554631
				}
			},
			"transitions": {
				"right1": {
					"x": 80.5,
					"y": 14.0,
					"to": "Crossroads_42[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 13.0,
					"to": "Crossroads_08[right2]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_14": {
			"items": {},
			"transitions": {
				"right2": {
					"x": 33.5,
					"y": 7.0,
					"to": "Crossroads_45[left1]"
				},
				"right1": {
					"x": 33.5,
					"y": 35.5,
					"to": "Crossroads_48[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 34.0,
					"to": "Crossroads_39[right1]"
				},
				"left2": {
					"x": -0.5,
					"y": 11.0,
					"to": "Crossroads_16[right1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_15": {
			"items": {},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 4.0,
					"to": "Crossroads_03[right1]"
				},
				"right1": {
					"x": 60.5,
					"y": 4.0,
					"to": "Crossroads_27[left1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_16": {
			"items": {
				"Geo_Rock-Crossroads_Above_Lever": {
					"x": 56.97402,
					"y": 14.58
				}
			},
			"transitions": {
				"bot1": {
					"x": 58.0,
					"y": -0.5,
					"to": "Crossroads_03[top1]"
				},
				"left1": {
					"x": -0.5,
					"y": 10.0,
					"to": "Crossroads_40[right1]"
				},
				"right1": {
					"x": 76.5,
					"y": 15.0,
					"to": "Crossroads_14[left2]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_18": {
			"items": {
				"Geo_Rock-Crossroads_Before_Fungal": {
					"x": 34.226,
					"y": 19.288
				},
				"Geo_Rock-Crossroads_Before_Fungal_Dupe_1": {
					"x": 32.09,
					"y": 18.62
				},
				"Geo_Rock-Crossroads_Before_Fungal_Dupe_2": {
					"x": 35.99,
					"y": 23.3
				},
				"Soul_Totem-Crossroads_Goam_Journal": {
					"x": 22.93833,
					"y": 11.36868
				}
			},
			"transitions": {
				"right2": {
					"x": 41.5,
					"y": 9.0,
					"to": "Crossroads_52[left1]"
				},
				"right1": {
					"x": 41.5,
					"y": 37.0,
					"to": "Crossroads_08[left2]"
				},
				"bot1": {
					"x": 21.0,
					"y": -0.5,
					"to": "Fungus2_06[top1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_19": {
			"items": {
				"Geo_Rock-Crossroads_Before_Shops": {
					"x": 39.58519,
					"y": 39.63505
				},
				"Soul_Totem-Crossroads_Shops": {
					"x": 45.675,
					"y": 14.366
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 35.0,
					"to": "Crossroads_42[right1]"
				},
				"left2": {
					"x": -0.5,
					"y": 7.0,
					"to": "Crossroads_43[right1]"
				},
				"right1": {
					"x": 50.5,
					"y": 7.0,
					"to": "Crossroads_04[left1]"
				},
				"top1": {
					"x": 18.0,
					"y": 45.5,
					"to": "Crossroads_03[bot1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_21": {
			"items": {
				"Geo_Rock-Crossroads_Before_Glowing_Womb": {
					"x": 28.69,
					"y": 13.57083
				}
			},
			"transitions": {
				"top1": {
					"x": 9.0,
					"y": 29.5,
					"to": "Crossroads_22[bot1]"
				},
				"left1": {
					"x": -0.5,
					"y": 6.0,
					"to": "Crossroads_10[right1]"
				},
				"top2": {
					"x": 45.0,
					"y": 26.5,
					"to": "Crossroads_22[bot2]"
				},
				"right1": {
					"x": 100.0,
					"y": 17.0,
					"to": "Crossroads_03[left1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_22": {
			"name": "Glowing Womb",
			"items": {
				"Glowing_Womb": {
					"x": 93.83,
					"y": 20.24
				}
			},
			"transitions": {
				"bot1": {
					"x": 8.0,
					"y": -0.5,
					"to": "Crossroads_21[top1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_25": {
			"items": {
				"Soul_Totem-Crossroads_Mawlek_Upper": {
					"x": 25.87,
					"y": 17.606
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 8.0,
					"to": "Crossroads_36[right1]"
				},
				"right1": {
					"x": 70.5,
					"y": 8.0,
					"to": "Crossroads_07[left3]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_27": {
			"name": "Outside Tram",
			"items": {
				"Geo_Rock-Crossroads_Above_Tram": {
					"x": 24.52,
					"y": 64.6
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 66.0,
					"to": "Crossroads_15[right1]"
				},
				"left2": {
					"x": -0.5,
					"y": 39.0,
					"to": "Crossroads_31[right1]"
				},
				"bot1": {
					"x": 15.0,
					"y": -0.5,
					"to": "Crossroads_04[top1]"
				},
				"right1": {
					"x": 30.5,
					"y": 21.0,
					"to": "Crossroads_46[left1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_30": {
			"name": "Spa",
			"items": {},
			"transitions": {
				"left1": {
					"x": 1.5,
					"y": 8.0,
					"to": "Crossroads_08[right1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_31": {
			"name": "Spike Pogo Grub",
			"items": {
				"Grub-Crossroads_Spike": {
					"x": 19.34,
					"y": 13.54
				}
			},
			"transitions": {
				"right1": {
					"x": 69.5,
					"y": 5.0,
					"to": "Crossroads_27[left2]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_33": {
			"name": "Conifer",
			"items": {
				"Crossroads_Map": {
					"x": 36.5,
					"y": 34.0
				}
			},
			"transitions": {
				"right2": {
					"x": 45.5,
					"y": 10.5,
					"to": "Crossroads_08[left1]"
				},
				"left2": {
					"x": -0.5,
					"y": 10.0,
					"to": "Crossroads_12[right1]"
				},
				"left1": {
					"x": -0.5,
					"y": 37.0,
					"to": "Crossroads_09[right1]"
				},
				"top1": {
					"x": 21.0,
					"y": 49.5,
					"to": "Crossroads_07[bot1]"
				},
				"right1": {
					"x": 45.5,
					"y": 35.0,
					"to": "Crossroads_06[left1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_35": {
			"items": {
				"Grub-Crossroads_Acid": {
					"x": 3.988001,
					"y": 44.47979
				},
				"Soul_Totem-Crossroads_Acid": {
					"x": 52.028,
					"y": 11.64
				}
			},
			"transitions": {
				"bot1": {
					"x": 64.0,
					"y": -0.5,
					"to": "Fungus3_26[top1]"
				},
				"right1": {
					"x": 70.5,
					"y": 49.0,
					"to": "Crossroads_12[left1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_36": {
			"items": {
				"Geo_Rock-Crossroads_Above_Mawlek": {
					"x": 53.34,
					"y": 52.59
				},
				"Soul_Totem-Crossroads_Mawlek_Lower": {
					"x": 6.84,
					"y": 32.69
				}
			},
			"transitions": {
				"right2": {
					"x": 60.5,
					"y": 5.0,
					"to": "Crossroads_09[left1]"
				},
				"right1": {
					"x": 60.5,
					"y": 45.0,
					"to": "Crossroads_25[left1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_37": {
			"items": {
				"Vessel_Fragment-Crossroads": {
					"x": 14.97,
					"y": 5.7
				},
				"Geo_Rock-Crossroads_Vessel_Fragment": {
					"x": 90.10766,
					"y": 26.35221
				}
			},
			"transitions": {
				"right1": {
					"x": 110.5,
					"y": 4.0,
					"to": "Crossroads_49[left1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_38": {
			"name": "Grubfather",
			"items": {
				"Grubsong": {
					"x": 51.0,
					"y": 4.0
				},
				"Grubberfly's_Elegy": {
					"x": 36.0,
					"y": 4.0
				},
				"Mask_Shard-5_Grubs": {
					"x": 54.0,
					"y": 4.0
				},
				"Pale_Ore-Grubs": {
					"x": 42.0,
					"y": 4.0
				},
				"Rancid_Egg-Grubs": {
					"x": 48.0,
					"y": 4.0
				},
				"Hallownest_Seal-Grubs": {
					"x": 45.0,
					"y": 4.0
				},
				"King's_Idol-Grubs": {
					"x": 39.0,
					"y": 4.0
				}
			},
			"transitions": {
				"right1": {
					"x": 68.5,
					"y": 4.0,
					"to": "Crossroads_07[left1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_39": {
			"items": {},
			"transitions": {
				"right1": {
					"x": 88.5,
					"y": 7.0,
					"to": "Crossroads_14[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 7.0,
					"to": "Crossroads_02[right1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_40": {
			"items": {},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 4.5,
					"to": "Crossroads_05[right1]"
				},
				"right1": {
					"x": 88.5,
					"y": 4.0,
					"to": "Crossroads_16[left1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_42": {
			"items": {
				"Geo_Rock-Crossroads_Goam_Alcove": {
					"x": 101.0564,
					"y": 18.92869
				},
				"Geo_Rock-Crossroads_Goam_Damage_Boost": {
					"x": 52.79,
					"y": 10.6
				}
			},
			"transitions": {
				"right1": {
					"x": 110.5,
					"y": 5.0,
					"to": "Crossroads_19[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 4.0,
					"to": "Crossroads_13[right1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_43": {
			"items": {},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 10.0,
					"to": "Crossroads_49[right1]"
				},
				"right1": {
					"x": 88.5,
					"y": 4.0,
					"to": "Crossroads_19[left2]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_45": {
			"name": "Myla",
			"items": {
				"Soul_Totem-Crossroads_Myla": {
					"x": 29.77,
					"y": 25.85
				}
			},
			"transitions": {
				"right1": {
					"x": 70.5,
					"y": 41.0,
					"to": "Mines_01[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 9.0,
					"to": "Crossroads_14[right2]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_46": {
			"name": "Crossroads Tram (West)",
			"transitions": {
				"tram": {
					"x": 18.5,
					"y": 10.4,
					"to": "Crossroads_46b[tram]"
				},
				"left1": {
					"x": -0.5,
					"y": 11.0,
					"to": "Crossroads_27[right1]"
				},
				"door_tram": {
					"x": 18.450000000000003,
					"y": 9.989999999999998,
					"to": null
				}
			},
			"items": {
				"Geo_Rock-Crossroads_Tram": {
					"x": 19.32,
					"y": 3.45
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_46b": {
			"name": "Crossroads Tram (East)",
			"transitions": {
				"tram": {
					"x": 33,
					"y": 10.4,
					"to": "Crossroads_46[tram]"
				},
				"right1": {
					"x": 55.5,
					"y": 11.0,
					"to": "RestingGrounds_02[left1]"
				},
				"door_tram": {
					"x": 32.419999999999995,
					"y": 9.989999999999998,
					"to": null
				}
			},
			"items": {},
			"area": "Crossroads"
		},
		"Crossroads_47": {
			"name": "Stag",
			"stag": "Crossroads",
			"items": {
				"Crossroads_Stag": {
					"x": 19.7,
					"y": 6.4
				}
			},
			"transitions": {
				"door_stagExit": {
					"x": 16.2,
					"y": 5.74,
					"to": null
				},
				"right1": {
					"x": 47.5,
					"y": 7.0,
					"to": "Crossroads_03[left2]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_48": {
			"items": {
				"Grub-Crossroads_Guarded": {
					"x": 49.81957,
					"y": 3.477612
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 4.0,
					"to": "Crossroads_14[right1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_49": {
			"name": "West Elevator (Upper)",
			"transitions": {
				"elevator": {
					"x": 15,
					"y": 159,
					"to": "Crossroads_49b[elevator]"
				},
				"elev_entrance": {
					"x": 14.95,
					"y": 158.79,
					"to": null
				},
				"right1": {
					"x": 30.5,
					"y": 161.0,
					"to": "Crossroads_43[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 161.0,
					"to": "Crossroads_37[right1]"
				}
			},
			"items": {},
			"area": "Crossroads"
		},
		"Crossroads_49b": {
			"name": "West Elevator (Lower)",
			"transitions": {
				"elevator": {
					"x": 15,
					"y": 5.4,
					"to": "Crossroads_49[elevator]"
				},
				"elev_entrance": {
					"x": 15.149999999999999,
					"y": 34.220000000000006,
					"to": null
				},
				"right1": {
					"x": 30.5,
					"y": 6.0,
					"to": "Ruins1_28[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 10.0,
					"to": "Fungus2_07[]"
				}
			},
			"items": {},
			"area": "Crossroads"
		},
		"Crossroads_50": {
			"name": "Blue Lake",
			"items": {
				"Rancid_Egg-Blue_Lake": {
					"x": 117.71,
					"y": 43.31
				}
			},
			"transitions": {
				"right1": {
					"x": 260.5,
					"y": 28.0,
					"to": "RestingGrounds_06[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 45.0,
					"to": "Crossroads_04[right1]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_52": {
			"items": {
				"Geo_Rock-Crossroads_Goam_Journal": {
					"x": 36.23855,
					"y": 32.60709
				},
				"Geo_Rock-Crossroads_Goam_Journal_Dupe": {
					"x": 35.24823,
					"y": 36.74561
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 61.0,
					"to": "Crossroads_18[right2]"
				}
			},
			"area": "Crossroads"
		},
		"Crossroads_ShamanTemple": {
			"name": "Ancestral Mound",
			"items": {
				"Vengeful_Spirit": {
					"x": 23.95003,
					"y": 8.933798
				},
				"Soul_Catcher": {
					"x": 37.81,
					"y": 20.32
				},
				"Whispering_Root-Ancestral_Mound": {
					"x": 20.4,
					"y": 60.4
				},
				"Lifeblood_Cocoon-Ancestral_Mound": {
					"x": 39.21193,
					"y": 48.29829
				},
				"Geo_Rock-Ancestral_Mound": {
					"x": 29.28835,
					"y": 45.51902
				},
				"Geo_Rock-Ancestral_Mound_Dupe": {
					"x": 34.41465,
					"y": 45.6059
				},
				"Geo_Rock-Ancestral_Mound_Tree": {
					"x": 28.22,
					"y": 59.67
				},
				"Geo_Rock-Ancestral_Mound_Tree_Dupe": {
					"x": 25.85,
					"y": 59.64
				},
				"Soul_Totem-Ancestral_Mound": {
					"x": 35.01,
					"y": 35.16
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 9.0,
					"to": "Crossroads_06[door1]"
				}
			},
			"area": "Crossroads"
		},
		"Deepnest_01": {
			"name": "Ground Collapse Entrance",
			"items": {
				"Geo_Rock-Moss_Prophet": {
					"x": 22.48,
					"y": 8.66
				},
				"Geo_Rock-Moss_Prophet_Dupe": {
					"x": 21.77924,
					"y": 5.69
				}
			},
			"transitions": {
				"bot1": {
					"x": 9.0,
					"y": -0.5,
					"to": "Deepnest_01b[top1]"
				},
				"bot2": {
					"x": 32.0,
					"y": -0.5,
					"to": "Deepnest_01b[top2]"
				},
				"right1": {
					"x": 60.5,
					"y": 20.0,
					"to": "Fungus2_20[left1]"
				},
				"left1": {
					"x": 1.0,
					"y": 21.0,
					"to": "Fungus3_39[right1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_01b": {
			"items": {
				"Deepnest_Map-Upper": {
					"x": 7.8,
					"y": 4.5
				}
			},
			"transitions": {
				"right2": {
					"x": 60.5,
					"y": 37.0,
					"to": "Deepnest_02[left2]"
				},
				"bot1": {
					"x": 25.0,
					"y": -0.5,
					"to": "Deepnest_17[top1]"
				},
				"right1": {
					"x": 60.5,
					"y": 66.0,
					"to": "Deepnest_02[left1]"
				},
				"top2": {
					"x": 32.0,
					"y": 86.0,
					"to": "Deepnest_01[bot2]"
				},
				"top1": {
					"x": 9.0,
					"y": 83.5,
					"to": "Deepnest_01[bot1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_02": {
			"items": {
				"Geo_Rock-Deepnest_Below_Mimics": {
					"x": 19.48,
					"y": 13.82
				},
				"Geo_Rock-Deepnest_Below_Mimics_Dupe": {
					"x": 17.34,
					"y": 13.85
				}
			},
			"transitions": {
				"right1": {
					"x": 31.5,
					"y": 45.0,
					"to": "Deepnest_36[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 67.0,
					"to": "Deepnest_01b[right1]"
				},
				"left2": {
					"x": -0.5,
					"y": 36.0,
					"to": "Deepnest_01b[right2]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_03": {
			"items": {
				"Grub-Deepnest_Spike": {
					"x": 14.22518,
					"y": 103.5133
				},
				"Geo_Rock-Deepnest_Below_Spike_Grub": {
					"x": 4.52,
					"y": 76.72
				},
				"Geo_Rock-Deepnest_Below_Spike_Grub_Dupe": {
					"x": 4.62826,
					"y": 73.81636
				},
				"Geo_Rock-Deepnest_Spike_Grub_Right": {
					"x": 54.2,
					"y": 107.32
				}
			},
			"transitions": {
				"top1": {
					"x": 48.0,
					"y": 113.5,
					"to": "Deepnest_33[bot1]"
				},
				"right1": {
					"x": 60.5,
					"y": 4.0,
					"to": "Deepnest_30[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 48.0,
					"to": "Deepnest_34[right1]"
				},
				"left2": {
					"x": -0.5,
					"y": 15.0,
					"to": "Deepnest_31[right1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_09": {
			"name": "Stag",
			"stag": "Deepnest",
			"items": {
				"Distant_Village_Stag": {
					"x": 27.6,
					"y": 6.4
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 7.0,
					"to": "Deepnest_10[right1]"
				},
				"door_stagExit": {
					"x": 31.83,
					"y": 5.73,
					"to": null
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_10": {
			"name": "Distant Village",
			"items": {
				"Soul_Totem-Distant_Village": {
					"x": 6.338395,
					"y": 34.73291
				}
			},
			"transitions": {
				"right2": {
					"x": 75.5,
					"y": 89.0,
					"to": "Deepnest_41[left1]"
				},
				"right3": {
					"x": 75.5,
					"y": 14.0,
					"to": "Deepnest_41[left2]"
				},
				"right1": {
					"x": 75.5,
					"y": 139.0,
					"to": "Deepnest_09[left1]"
				},
				"door2": {
					"x": 19.82,
					"y": 94.49,
					"to": "Room_spider_small[left1]"
				},
				"door1": {
					"x": 32.87,
					"y": 117.51,
					"to": null
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_14": {
			"name": "Failed Tramway (East)",
			"items": {},
			"transitions": {
				"left1 (3)": {
					"x": 6.5,
					"y": 54.0,
					"to": "Deepnest_26[right1]"
				},
				"left1 (1)": {
					"x": 6.5,
					"y": 46.0,
					"to": "Deepnest_26[right1]"
				},
				"left1 (2)": {
					"x": 6.5,
					"y": 50.0,
					"to": "Deepnest_26[right1]"
				},
				"left1": {
					"x": 6.5,
					"y": 42.0,
					"to": "Deepnest_26[right1]"
				},
				"bot1": {
					"x": 14.0,
					"y": -0.5,
					"to": "Deepnest_33[top1]"
				},
				"bot2": {
					"x": 63.0,
					"y": -0.5,
					"to": "Deepnest_33[top2]"
				},
				"right1": {
					"x": 80.5,
					"y": 4.0,
					"to": "Deepnest_17[left1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_16": {
			"items": {
				"Hallownest_Seal-Deepnest_By_Mantis_Lords": {
					"x": 77.29805,
					"y": 30.21
				},
				"Geo_Rock-Deepnest_By_Mantis_Lords_Garpede_Pogo": {
					"x": 81.16,
					"y": 23.96
				},
				"Geo_Rock-Deepnest_By_Mantis_Lords_Garpede_Pogo_Dupe": {
					"x": 84.064,
					"y": 23.921
				},
				"Geo_Rock-Deepnest_By_Mantis_Lords_Requires_Claw_1": {
					"x": 60.6,
					"y": 34.92909
				},
				"Geo_Rock-Deepnest_By_Mantis_Lords_Requires_Claw_2": {
					"x": 32.87276,
					"y": 11.76504
				},
				"Geo_Rock-Deepnest_By_Mantis_Lords_Requires_Claw_3": {
					"x": 19.35206,
					"y": 5.775943
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 8.0,
					"to": "Deepnest_17[right1]"
				},
				"bot1": {
					"x": 73.0,
					"y": -0.5,
					"to": "Fungus2_25[top1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_17": {
			"items": {},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 8.0,
					"to": "Deepnest_14[right1]"
				},
				"top1": {
					"x": 16.0,
					"y": 62.5,
					"to": "Deepnest_01b[bot1]"
				},
				"bot1": {
					"x": 14.0,
					"y": -0.5,
					"to": "Deepnest_30[top1]"
				},
				"right1": {
					"x": 31.5,
					"y": 5.0,
					"to": "Deepnest_16[left1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_26": {
			"name": "Failed Tramway (Center)",
			"items": {
				"Lifeblood_Cocoon-Failed_Tramway": {
					"x": 139.07,
					"y": 38.68
				}
			},
			"transitions": {
				"bot1": {
					"x": 224.0,
					"y": -0.5,
					"to": "Deepnest_35[top1]"
				},
				"left2": {
					"x": 121.0,
					"y": 5.0,
					"to": "Deepnest_26b[right2]"
				},
				"left1": {
					"x": 121.0,
					"y": 23.0,
					"to": "Deepnest_26b[right1]"
				},
				"right1": {
					"x": 246.0,
					"y": 18.0,
					"to": "Deepnest_14[left1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_26b": {
			"name": "Failed Tramway (West)",
			"items": {
				"Tram_Pass": {
					"x": 28.6,
					"y": 3.337032
				}
			},
			"transitions": {
				"right1": {
					"x": 128.5,
					"y": 21.0,
					"to": "Deepnest_26[left1]"
				},
				"right2": {
					"x": 128.5,
					"y": 5.0,
					"to": "Deepnest_26[left2]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_30": {
			"name": "Hot Springs",
			"items": {},
			"transitions": {
				"top1": {
					"x": 20.0,
					"y": 159.5,
					"to": "Deepnest_17[bot1]"
				},
				"right1": {
					"x": 120.5,
					"y": 6.0,
					"to": "Deepnest_37[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 6.0,
					"to": "Deepnest_03[right1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_31": {
			"name": "Path to Nosk",
			"items": {
				"Grub-Deepnest_Nosk": {
					"x": 100.17,
					"y": 36.5
				},
				"Geo_Rock-Deepnest_Nosk_1": {
					"x": 45.68001,
					"y": 29.82047
				},
				"Geo_Rock-Deepnest_Nosk_2": {
					"x": 49.45,
					"y": 15.87
				},
				"Geo_Rock-Deepnest_Nosk_3": {
					"x": 30.02,
					"y": 2.87
				}
			},
			"transitions": {
				"right1": {
					"x": 125.5,
					"y": 53.0,
					"to": "Deepnest_03[left2]"
				},
				"right2": {
					"x": 125.5,
					"y": 5.0,
					"to": "Deepnest_32[left1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_32": {
			"name": "Nosk",
			"boss": "Nosk",
			"items": {
				"Pale_Ore-Nosk": {
					"x": 165.4571,
					"y": 3.244924
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 5.0,
					"to": "Deepnest_31[right2]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_33": {
			"name": "Zote is Tied Up",
			"items": {
				"King's_Idol-Deepnest": {
					"x": 5.439302,
					"y": 9.332907
				}
			},
			"transitions": {
				"top1": {
					"x": 14.0,
					"y": 45.5,
					"to": "Deepnest_14[bot1]"
				},
				"bot1": {
					"x": 73.0,
					"y": -0.5,
					"to": "Deepnest_03[top1]"
				},
				"top2": {
					"x": 73.0,
					"y": 45.5,
					"to": "Deepnest_14[bot2]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_34": {
			"items": {},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 16.0,
					"to": "Deepnest_39[right1]"
				},
				"top1": {
					"x": 98.0,
					"y": 50.5,
					"to": "Deepnest_35[bot1]"
				},
				"right1": {
					"x": 150.5,
					"y": 28.0,
					"to": "Deepnest_03[left1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_35": {
			"name": "Outside Galien",
			"items": {
				"Geo_Rock-Deepnest_Above_Galien": {
					"x": 4.450053,
					"y": 78.93091
				},
				"Geo_Rock-Deepnest_Galien_Spike": {
					"x": 27.32206,
					"y": 29.89369
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 53.0,
					"to": "Deepnest_40[right1]"
				},
				"bot1": {
					"x": 17.0,
					"y": -0.5,
					"to": "Deepnest_34[top1]"
				},
				"top1": {
					"x": 35.0,
					"y": 110.5,
					"to": "Deepnest_26[bot1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_36": {
			"name": "Fake Grubs",
			"items": {
				"Grub-Deepnest_Mimic": {
					"x": 65.83134,
					"y": 4.5
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 16.0,
					"to": "Deepnest_02[right1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_37": {
			"items": {
				"Geo_Rock-Deepnest_Garpede_1": {
					"x": 48.36,
					"y": 15.85
				},
				"Geo_Rock-Deepnest_Garpede_2": {
					"x": 32.79752,
					"y": 26.79321
				}
			},
			"transitions": {
				"right1": {
					"x": 82.5,
					"y": 4.0,
					"to": "Abyss_03_b[left1]"
				},
				"bot1": {
					"x": 44.0,
					"y": -0.5,
					"to": "Deepnest_44[top1]"
				},
				"top1": {
					"x": 19.0,
					"y": 32.5,
					"to": "Deepnest_38[bot1]"
				},
				"left1": {
					"x": -0.5,
					"y": 4.0,
					"to": "Deepnest_30[right1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_38": {
			"name": "Garpede Pogo Party",
			"items": {
				"Vessel_Fragment-Deepnest": {
					"x": 134.4872,
					"y": 27.27806
				},
				"Soul_Totem-Deepnest_Vessel": {
					"x": 195.362,
					"y": 11.6
				}
			},
			"transitions": {
				"bot1": {
					"x": 8.0,
					"y": -0.5,
					"to": "Deepnest_37[top1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_39": {
			"name": "Outside Weaver's Den",
			"items": {
				"Rancid_Egg-Dark_Deepnest": {
					"x": 41.85,
					"y": 5.39
				},
				"Whispering_Root-Deepnest": {
					"x": 13.4,
					"y": 36.3
				},
				"Grub-Dark_Deepnest": {
					"x": 122.549,
					"y": 46.57456
				},
				"Geo_Rock-Dark_Deepnest_Above_Grub_1": {
					"x": 129.8224,
					"y": 60.87048
				},
				"Geo_Rock-Dark_Deepnest_Above_Grub_2": {
					"x": 99.62,
					"y": 49.79
				},
				"Geo_Rock-Dark_Deepnest_Bottom_Left": {
					"x": 72.08,
					"y": 4.95
				}
			},
			"transitions": {
				"door1": {
					"x": 195.93,
					"y": 38.72,
					"to": "Deepnest_45_v02[left1]"
				},
				"top1": {
					"x": 73.0,
					"y": 70.5,
					"to": "Deepnest_42[bot1]"
				},
				"right1": {
					"x": 210.5,
					"y": 8.0,
					"to": "Deepnest_34[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 57.0,
					"to": "Deepnest_41[right1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_40": {
			"name": "Galien",
			"boss": "Galien",
			"items": {
				"Boss_Essence-Galien": {
					"x": 52.12,
					"y": 14.32
				},
				"Lifeblood_Cocoon-Galien": {
					"x": 72.47,
					"y": 50.37
				}
			},
			"transitions": {
				"right1": {
					"x": 150.5,
					"y": 17.0,
					"to": "Deepnest_35[left1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_41": {
			"name": "Midwife",
			"items": {},
			"transitions": {
				"right1": {
					"x": 120.5,
					"y": 88.0,
					"to": "Deepnest_39[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 91.0,
					"to": "Deepnest_10[right2]"
				},
				"left2": {
					"x": -0.5,
					"y": 6.0,
					"to": "Deepnest_10[right3]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_42": {
			"name": "Outside Mask Maker",
			"items": {
				"Soul_Totem-Mask_Maker": {
					"x": 8.55,
					"y": 8.48
				}
			},
			"transitions": {
				"bot1": {
					"x": 26.0,
					"y": -0.5,
					"to": "Deepnest_39[top1]"
				},
				"top1": {
					"x": 7.0,
					"y": 146.5,
					"to": "Deepnest_43[bot1]"
				},
				"left1": {
					"x": -0.5,
					"y": 124.0,
					"to": "Room_Mask_Maker[right1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_43": {
			"items": {
				"Geo_Rock-Above_Mask_Maker_1": {
					"x": 5.602245,
					"y": 49.8466
				},
				"Geo_Rock-Above_Mask_Maker_2": {
					"x": 22.28,
					"y": 42.01
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 116.0,
					"to": "Fungus3_50[right1]"
				},
				"right1": {
					"x": 40.5,
					"y": 116.0,
					"to": "Fungus3_08[left1]"
				},
				"bot1": {
					"x": 7.0,
					"y": -0.5,
					"to": "Deepnest_42[top1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_44": {
			"name": "Sharp Shadow",
			"items": {
				"Sharp_Shadow": {
					"x": 60.92,
					"y": 5.35
				}
			},
			"transitions": {
				"top1": {
					"x": 39.0,
					"y": 60.5,
					"to": "Deepnest_37[bot1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_45_v02": {
			"name": "Weaver's Den",
			"items": {
				"Weaversong": {
					"x": 87.4,
					"y": 29.71
				},
				"160_Geo-Weavers_Den_Chest": {
					"x": 46.59,
					"y": 46.71
				},
				"Rancid_Egg-Weaver's_Den": {
					"x": 11.34,
					"y": 3.25
				}
			},
			"transitions": {
				"left1": {
					"x": 18.5,
					"y": 16.0,
					"to": "Deepnest_39[door1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_Spider_Town": {
			"name": "Herrah",
			"items": {
				"Herrah": {
					"x": 68.0,
					"y": 154.0
				},
				"Rancid_Egg-Beast's_Den": {
					"x": 112.28,
					"y": 80.45
				},
				"Hallownest_Seal-Beast's_Den": {
					"x": 38.91,
					"y": 5.39
				},
				"Grub-Beast's_Den": {
					"x": 99.98,
					"y": 119.41
				},
				"Geo_Rock-Beast's_Den_Above_Trilobite": {
					"x": 28.48,
					"y": 120.85
				},
				"Geo_Rock-Beast's_Den_Above_Trilobite_Dupe": {
					"x": 25.92,
					"y": 120.85
				},
				"Geo_Rock-Beast's_Den_Below_Herrah": {
					"x": 95.25016,
					"y": 143.681
				},
				"Geo_Rock-Beast's_Den_Below_Egg": {
					"x": 107.0695,
					"y": 69.82217
				},
				"Geo_Rock-Beast's_Den_Below_Egg_Dupe": {
					"x": 109.01,
					"y": 69.76
				},
				"Geo_Rock-Beast's_Den_Bottom": {
					"x": 102.0259,
					"y": 3.914551
				},
				"Geo_Rock-Beast's_Den_Bottom_Dupe": {
					"x": 104.8039,
					"y": 3.795931
				},
				"Geo_Rock-Beast's_Den_After_Herrah": {
					"x": 94.07,
					"y": 151.88
				},
				"Soul_Totem-Beast's_Den": {
					"x": 57.63425,
					"y": 43.2505
				}
			},
			"transitions": {
				"left1": {
					"x": 5.5,
					"y": 59.0,
					"to": "Deepnest_10[door1]"
				},
				"door_dreamReturn": {
					"x": 65.62,
					"y": 152.42,
					"to": null
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_East_01": {
			"items": {
				"Geo_Rock-Lower_Kingdom's_Edge_1": {
					"x": 9.626259,
					"y": 23.95179
				},
				"Geo_Rock-Lower_Kingdom's_Edge_2": {
					"x": 7.927063,
					"y": 67.8373
				},
				"Soul_Totem-Lower_Kingdom's_Edge_1": {
					"x": 6.06,
					"y": 10.33
				}
			},
			"transitions": {
				"right1": {
					"x": 49.5,
					"y": 37.0,
					"to": "Hive_03_c[left1]"
				},
				"top1": {
					"x": 23.0,
					"y": 85.5,
					"to": "Deepnest_East_02[bot1]"
				},
				"bot1": {
					"x": 36.0,
					"y": -0.5,
					"to": "Abyss_03_c[top1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_East_02": {
			"items": {
				"Geo_Rock-Lower_Kingdom's_Edge_3": {
					"x": 16.27298,
					"y": 11.78421
				},
				"Geo_Rock-Lower_Kingdom's_Edge_Dive": {
					"x": 104.0468,
					"y": 5.83525
				},
				"Soul_Totem-Lower_Kingdom's_Edge_2": {
					"x": 51.04,
					"y": 3.53
				}
			},
			"transitions": {
				"right1": {
					"x": 110.5,
					"y": 17.0,
					"to": "Deepnest_East_03[left2]"
				},
				"bot1": {
					"x": 12.0,
					"y": -0.5,
					"to": "Deepnest_East_01[top1]"
				},
				"top1": {
					"x": 16.0,
					"y": 32.5,
					"to": "Waterways_14[bot2]"
				},
				"bot2": {
					"x": 71.0,
					"y": -0.5,
					"to": "Hive_03[top1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_East_03": {
			"name": "Tall Shaft (lower)",
			"items": {
				"Kingdom's_Edge_Map": {
					"x": 7.5,
					"y": 60.1
				},
				"Grimmkin_Flame-Kingdom's_Edge": {
					"x": 41.51081,
					"y": 72.61646
				}
			},
			"transitions": {
				"right1": {
					"x": 80.5,
					"y": 132.0,
					"to": "Deepnest_East_04[left1]"
				},
				"left2": {
					"x": -0.5,
					"y": 18.0,
					"to": "Deepnest_East_02[right1]"
				},
				"left1": {
					"x": -0.5,
					"y": 101.0,
					"to": "Ruins2_07[right1]"
				},
				"top2": {
					"x": 35.5,
					"y": 150.5,
					"to": "Deepnest_east_07[bot2]"
				},
				"right2": {
					"x": 80.5,
					"y": 17.0,
					"to": "Deepnest_East_06[left1]"
				},
				"top1": {
					"x": 9.0,
					"y": 150.5,
					"to": "Deepnest_East_07[bot1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_East_04": {
			"name": "Bardoon",
			"items": {
				"Geo_Rock-Kingdom's_Edge_Below_Bardoon": {
					"x": 8.1596,
					"y": 44.54
				}
			},
			"transitions": {
				"left2": {
					"x": -0.5,
					"y": 94.0,
					"to": "Deepnest_East_07[right1]"
				},
				"right1": {
					"x": 45.5,
					"y": 7.0,
					"to": "Deepnest_East_11[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 7.0,
					"to": "Deepnest_East_03[right1]"
				},
				"right2": {
					"x": 45.5,
					"y": 127.0,
					"to": "Deepnest_East_15[left1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_East_06": {
			"name": "Path to Oro",
			"items": {
				"Geo_Rock-Kingdom's_Edge_Oro_Far_Left": {
					"x": 14.42,
					"y": 32.5
				},
				"Geo_Rock-Kingdom's_Edge_Oro_Middle_Left": {
					"x": 123.3728,
					"y": 30.6146
				}
			},
			"transitions": {
				"bot1": {
					"x": 219.5,
					"y": 5.0,
					"to": "Deepnest_East_14b[top1]"
				},
				"top1": {
					"x": 134.0,
					"y": 43.5,
					"to": "Deepnest_East_18[bot1]"
				},
				"right1": {
					"x": 351.5,
					"y": 16.0,
					"to": "Deepnest_East_16[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 14.0,
					"to": "Deepnest_East_03[right2]"
				},
				"door1": {
					"x": 329.22,
					"y": 14.71,
					"to": "Room_nailmaster_03[left1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_East_07": {
			"name": "Tall Shaft (upper)",
			"splitRoom": [
				[
					"bot1"
				],
				[
					"bot2",
					"left1",
					"left2",
					"right1"
				]
			],
			"items": {
				"Rancid_Egg-Upper_Kingdom's_Edge": {
					"x": 61.71,
					"y": 140.25
				},
				"Wanderer's_Journal-Kingdom's_Edge_Entrance": {
					"x": 14.74,
					"y": 2.32
				},
				"Whispering_Root-Kingdoms_Edge": {
					"x": 59.6,
					"y": 10.2
				},
				"Geo_Rock-Kingdom's_Edge_Above_Root": {
					"x": 77.7,
					"y": 29.63
				},
				"Geo_Rock-Kingdom's_Edge_Above_Tower": {
					"x": 6.76,
					"y": 57.63944
				},
				"Soul_Totem-Upper_Kingdom's_Edge": {
					"x": 83.22,
					"y": 135.55
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 171.0,
					"to": "Deepnest_East_08[right1]"
				},
				"bot1": {
					"x": 6.0,
					"y": -0.5,
					"to": "Deepnest_East_03[top1]"
				},
				"right1": {
					"x": 90.5,
					"y": 65.0,
					"to": "Deepnest_East_04[left2]"
				},
				"left2": {
					"x": 1.5,
					"y": 32.0,
					"to": "Ruins2_11_b[right1]"
				},
				"bot2": {
					"x": 37.0,
					"y": -0.5,
					"to": "Deepnest_East_03[top2]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_East_08": {
			"items": {
				"King's_Idol-Great_Hopper": {
					"x": 6.69,
					"y": 4.22
				},
				"Geo_Rock-Kingdom's_Edge_Below_Colosseum": {
					"x": 108.55,
					"y": 30.5442
				}
			},
			"transitions": {
				"right1": {
					"x": 120.5,
					"y": 10.0,
					"to": "Deepnest_East_07[left1]"
				},
				"top1": {
					"x": 6.0,
					"y": 40.5,
					"to": "Deepnest_East_09[bot1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_East_09": {
			"name": "Outside Colosseum",
			"items": {},
			"transitions": {
				"bot1": {
					"x": 85.0,
					"y": -0.5,
					"to": "Deepnest_East_08[top1]"
				},
				"right1": {
					"x": 171.5,
					"y": 14.0,
					"to": "Room_Colosseum_01[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 15.0,
					"to": "Ruins2_10b[right1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_East_10": {
			"name": "Markoth",
			"boss": "Markoth",
			"items": {
				"Boss_Essence-Markoth": {
					"x": 25.34,
					"y": 3.299605
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 4.0,
					"to": "Deepnest_East_18[right2]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_East_11": {
			"items": {
				"Grub-Kingdom's_Edge_Camp": {
					"x": 62.85,
					"y": 63.59
				},
				"Soul_Totem-Kingdom's_Edge_Camp": {
					"x": 7.48,
					"y": 100.09
				}
			},
			"transitions": {
				"right1": {
					"x": 110.5,
					"y": 120.0,
					"to": "Deepnest_East_12[left1]"
				},
				"bot1": {
					"x": 37.0,
					"y": 38.5,
					"to": "Deepnest_East_18[top1]"
				},
				"left1": {
					"x": -0.5,
					"y": 87.0,
					"to": "Deepnest_East_04[right1]"
				},
				"top1": {
					"x": 78.0,
					"y": 130.5,
					"to": "Deepnest_East_13[bot1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_East_12": {
			"name": "Outside Hornet 2",
			"items": {},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 12.0,
					"to": "Deepnest_East_11[right1]"
				},
				"right1": {
					"x": 120.5,
					"y": 12.0,
					"to": "Deepnest_East_Hornet[left1]"
				},
				"door_cutsceneReturn": {
					"x": 100.4599,
					"y": 10.721,
					"to": null
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_East_13": {
			"name": "Camp",
			"items": {
				"Wanderer's_Journal-Kingdom's_Edge_Camp": {
					"x": 27.2885,
					"y": 2.226762
				}
			},
			"transitions": {
				"bot1": {
					"x": 19.5,
					"y": -0.5,
					"to": "Deepnest_East_11[top1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_East_14": {
			"items": {
				"Rancid_Egg-Near_Quick_Slash": {
					"x": 75.54,
					"y": 24.35837
				},
				"Grub-Kingdom's_Edge_Oro": {
					"x": 154.35,
					"y": 22.6
				},
				"Soul_Totem-Oro_Dive_2": {
					"x": 113.89,
					"y": 56.38
				},
				"Soul_Totem-Oro_Dive_1": {
					"x": 131.55,
					"y": 53.44
				}
			},
			"transitions": {
				"door1": {
					"x": 136.68,
					"y": 6.86,
					"to": "Deepnest_East_17[left1]"
				},
				"top2": {
					"x": 150.0,
					"y": 70.5,
					"to": "Deepnest_East_16[bot1]"
				},
				"left1": {
					"x": 49.0,
					"y": 8.0,
					"to": "Deepnest_East_14b[right1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_East_14b": {
			"name": "Quick Slash",
			"items": {
				"Quick_Slash": {
					"x": 61.07,
					"y": 47.55
				}
			},
			"transitions": {
				"right1": {
					"x": 61.0,
					"y": 8.0,
					"to": "Deepnest_East_14[left1]"
				},
				"top1": {
					"x": 9.0,
					"y": 70.5,
					"to": "Deepnest_East_06[bot1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_East_15": {
			"name": "Lifeblood",
			"items": {
				"Lifeblood_Cocoon-Kingdom's_Edge": {
					"x": 30.03,
					"y": 16.5
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 5.0,
					"to": "Deepnest_East_04[right2]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_East_16": {
			"items": {
				"Soul_Totem-Oro": {
					"x": 56.23,
					"y": 4.94
				}
			},
			"transitions": {
				"bot1": {
					"x": 42.0,
					"y": 1.5,
					"to": "Deepnest_East_14[top2]"
				},
				"left1": {
					"x": -0.5,
					"y": 4.0,
					"to": "Deepnest_East_06[right1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_East_17": {
			"name": "Very Deep Dive",
			"items": {
				"Geo_Rock-Kingdom's_Edge_Above_420_Geo_Rock": {
					"x": 31.17385,
					"y": 263.5738
				},
				"Geo_Rock-Kingdom's_Edge_420_Geo_Rock": {
					"x": 22.21,
					"y": 9.26
				},
				"Soul_Totem-420_Geo_Rock": {
					"x": 36.16,
					"y": 116.55
				},
				"Lore_Tablet-Kingdom's_Edge": {
					"x": 32.6,
					"y": 210.5
				}
			},
			"transitions": {
				"left1": {
					"x": 19.0,
					"y": 294.0,
					"to": "Deepnest_East_14[door1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_East_18": {
			"items": {
				"Wanderer's_Journal-Kingdom's_Edge_Requires_Dive": {
					"x": 57.07,
					"y": 25.3
				}
			},
			"transitions": {
				"right2": {
					"x": 110.5,
					"y": 15.0,
					"to": "Deepnest_East_10[left1]"
				},
				"top1": {
					"x": 37.0,
					"y": 41.5,
					"to": "Deepnest_East_11[bot1]"
				},
				"bot1": {
					"x": 65.0,
					"y": -0.5,
					"to": "Deepnest_East_06[top1]"
				}
			},
			"area": "Deepnest"
		},
		"Deepnest_East_Hornet": {
			"name": "Hornet Fight 2",
			"boss": "Hornet Sentinel",
			"items": {},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 83.0,
					"to": "Deepnest_East_12[right1]"
				},
				"left2": {
					"x": 16.0,
					"y": 7.5,
					"to": "Room_Wyrm[right1]"
				}
			},
			"area": "Deepnest"
		},
		"Fungus1_01": {
			"items": {
				"Geo_Rock-Greenpath_Entrance": {
					"x": 42.69797,
					"y": 20.73907
				}
			},
			"transitions": {
				"right1": {
					"x": 170.5,
					"y": 9.5,
					"to": "Crossroads_11_alt[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 7.0,
					"to": "Fungus1_01b[right1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_01b": {
			"name": "Bench",
			"items": {
				"Geo_Rock-Greenpath_Waterfall": {
					"x": 4.62,
					"y": 22.16
				}
			},
			"transitions": {
				"right1": {
					"x": 45.5,
					"y": 7.0,
					"to": "Fungus1_01[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 7.0,
					"to": "Fungus1_02[right1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_02": {
			"name": "Fireball Skip to Follow Hornet",
			"items": {
				"Geo_Rock-Greenpath_Below_Skip_Squit": {
					"x": 28.91,
					"y": 21.88
				},
				"Geo_Rock-Greenpath_Skip_Squit": {
					"x": 41.21,
					"y": 44.76
				}
			},
			"transitions": {
				"right2": {
					"x": 46.5,
					"y": 11.0,
					"to": "Fungus1_06[left1]"
				},
				"right1": {
					"x": 46.5,
					"y": 62.0,
					"to": "Fungus1_01b[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 62.0,
					"to": "Fungus1_17[right1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_03": {
			"items": {
				"Geo_Rock-Greenpath_Second_Skip_Fool_Eater": {
					"x": 70.91,
					"y": 25.67
				},
				"Geo_Rock-Greenpath_Second_Skip_Fool_Eater_Dupe": {
					"x": 67.83,
					"y": 25.67
				},
				"Geo_Rock-Greenpath_Second_Skip_Lower": {
					"x": 62.23048,
					"y": 2.854536
				}
			},
			"transitions": {
				"right1": {
					"x": 80.5,
					"y": 18.0,
					"to": "Fungus1_17[left1]"
				},
				"bot1": {
					"x": 45.0,
					"y": -0.5,
					"to": "Fungus1_05[top1]"
				},
				"left1": {
					"x": -0.5,
					"y": 30.0,
					"to": "Fungus1_31[right1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_04": {
			"name": "Hornet Fight 1",
			"boss": "Hornet Protector",
			"items": {
				"Mothwing_Cloak": {
					"x": 23.22,
					"y": 27.23
				},
				"Split_Mothwing_Cloak": {
					"x": 29.5,
					"y": 28.4
				},
				"Geo_Rock-Greenpath_Below_Hornet": {
					"x": 40.29,
					"y": 20.75
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 6.0,
					"to": "Fungus1_25[right1]"
				},
				"right1": {
					"x": 95.5,
					"y": 33.0,
					"to": "Fungus1_21[left1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_05": {
			"items": {
				"Geo_Rock-Greenpath_Above_Thorns": {
					"x": 9.93,
					"y": 64.88
				}
			},
			"transitions": {
				"bot1": {
					"x": 15.0,
					"y": -0.5,
					"to": "Fungus1_10[top1]"
				},
				"top1": {
					"x": 22.0,
					"y": 85.5,
					"to": "Fungus1_03[bot1]"
				},
				"right1": {
					"x": 31.5,
					"y": 13.0,
					"to": "Fungus1_14[left1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_06": {
			"name": "Conifer",
			"items": {
				"Grub-Greenpath_Cornifer": {
					"x": 157.5174,
					"y": 21.55728
				},
				"Greenpath_Map": {
					"x": 160.0,
					"y": 3.3
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 17.0,
					"to": "Fungus1_02[right2]"
				},
				"bot1": {
					"x": 103.0,
					"y": -0.5,
					"to": "Fungus1_07[top1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_07": {
			"items": {
				"Grub-Greenpath_Journal": {
					"x": 55.06,
					"y": 12.46981
				},
				"Geo_Rock-Greenpath_Hunter's_Journal": {
					"x": 2.64,
					"y": 34.95
				},
				"Soul_Totem-Greenpath_Hunter's_Journal": {
					"x": 23.68,
					"y": 28.33
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 14.0,
					"to": "Fungus1_19[right1]"
				},
				"top1": {
					"x": 36.0,
					"y": 58.5,
					"to": "Fungus1_06[bot1]"
				},
				"right1": {
					"x": 70.5,
					"y": 44.0,
					"to": "Fungus1_08[left1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_08": {
			"name": "The Hunter",
			"items": {},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 39.0,
					"to": "Fungus1_07[right1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_09": {
			"name": "Route to Sheo",
			"items": {},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 11.0,
					"to": "Fungus1_15[right1]"
				},
				"right1": {
					"x": 250.5,
					"y": 14.0,
					"to": "Fungus1_30[left1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_10": {
			"name": "Straightaway (Grimmchild)",
			"items": {
				"Hallownest_Seal-Greenpath": {
					"x": 3.89,
					"y": 5.26
				},
				"Grimmkin_Flame-Greenpath": {
					"x": 70.39,
					"y": 8.9
				},
				"Geo_Rock-Greenpath_Acid_Bridge": {
					"x": 136.3295,
					"y": 22.08
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 14.0,
					"to": "Fungus1_30[right1]"
				},
				"top1": {
					"x": 44.0,
					"y": 25.5,
					"to": "Fungus1_05[bot1]"
				},
				"right1": {
					"x": 180.5,
					"y": 13.0,
					"to": "Fungus1_19[left1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_11": {
			"name": "Outside No Eyes",
			"items": {
				"Wanderer's_Journal-Greenpath_Lower": {
					"x": 44.39,
					"y": 31.21
				}
			},
			"transitions": {
				"right2": {
					"x": 55.5,
					"y": 62.0,
					"to": "Fungus1_37[left1]"
				},
				"right1": {
					"x": 55.5,
					"y": 40.0,
					"to": "Fungus1_34[left1]"
				},
				"top1": {
					"x": 41.0,
					"y": 69.0,
					"to": "Fungus1_19[bot1]"
				},
				"left1": {
					"x": -0.5,
					"y": 33.0,
					"to": "Fungus1_29[right1]"
				},
				"bot1": {
					"x": 35.0,
					"y": -0.5,
					"to": "Fungus3_01[top1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_12": {
			"items": {
				"Geo_Rock-Greenpath_After_MMC_Hidden": {
					"x": 24.23,
					"y": 57.72
				},
				"Geo_Rock-Greenpath_After_MMC": {
					"x": 19.23623,
					"y": 19.83935
				},
				"Geo_Rock-Greenpath_After_MMC_Dupe": {
					"x": 16.86,
					"y": 21.8
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 8.0,
					"to": "Fungus1_13[right1]"
				},
				"right1": {
					"x": 32.5,
					"y": 28.0,
					"to": "Fungus1_29[left1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_13": {
			"name": "Durandoo Pogo Party",
			"items": {
				"Vessel_Fragment-Greenpath": {
					"x": 100.95,
					"y": 38.58
				},
				"85_Geo-Greenpath_Chest": {
					"x": 175.85,
					"y": 27.83
				},
				"Whispering_Root-Greenpath": {
					"x": 28.7,
					"y": 23.3
				},
				"Grub-Greenpath_MMC": {
					"x": 135.62,
					"y": 24.41
				},
				"Lore_Tablet-Greenpath_QG": {
					"x": 54.5,
					"y": 10.6
				}
			},
			"transitions": {
				"right1": {
					"x": 220.5,
					"y": 18.0,
					"to": "Fungus1_12[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 23.0,
					"to": "Fungus3_22[right1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_14": {
			"name": "Thorns of Agony",
			"items": {
				"Thorns_of_Agony": {
					"x": 85.01,
					"y": 12.11
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 13.0,
					"to": "Fungus1_05[right1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_15": {
			"name": "Outside Sheo",
			"items": {
				"Rancid_Egg-Sheo": {
					"x": 2.986076,
					"y": 6.283915
				}
			},
			"transitions": {
				"door1": {
					"x": 36.95,
					"y": 33.75,
					"to": "Room_nailmaster_02[left1]"
				},
				"right1": {
					"x": 57.5,
					"y": 8.0,
					"to": "Fungus1_09[left1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_16_alt": {
			"name": "Stag",
			"stag": "Greenpath",
			"items": {
				"Greenpath_Stag": {
					"x": 19.7,
					"y": 6.4
				}
			},
			"transitions": {
				"right1": {
					"x": 47.5,
					"y": 7.0,
					"to": "Fungus1_22[left1]"
				},
				"door_stagExit": {
					"x": 16.09,
					"y": 5.81,
					"to": null
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_17": {
			"items": {
				"Lore_Tablet-Greenpath_Upper_Hidden": {
					"x": 67.3,
					"y": 26.3
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 9.0,
					"to": "Fungus1_03[right1]"
				},
				"right1": {
					"x": 80.5,
					"y": 7.0,
					"to": "Fungus1_02[left1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_19": {
			"items": {
				"Geo_Rock-Greenpath_Obbles_Fool_Eater": {
					"x": 9.554276,
					"y": 7.817104
				},
				"Lore_Tablet-Greenpath_Lower_Hidden": {
					"x": 86.6,
					"y": 3.8
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 14.0,
					"to": "Fungus1_10[right1]"
				},
				"bot1": {
					"x": 67.0,
					"y": -0.5,
					"to": "Fungus1_11[top1]"
				},
				"right1": {
					"x": 90.5,
					"y": 14.0,
					"to": "Fungus1_07[left1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_20_v02": {
			"name": "Vengefly King",
			"boss": "Vengefly King",
			"items": {
				"Boss_Geo-Vengefly_King": {
					"x": 45.0,
					"y": 13.5
				}
			},
			"transitions": {
				"right1": {
					"x": 180.5,
					"y": 13.0,
					"to": "Fungus1_28[left2]"
				},
				"bot1": {
					"x": 7.0,
					"y": -0.5,
					"to": "Fungus1_21[top1]"
				},
				"bot2": {
					"x": 163.0,
					"y": -0.5,
					"to": "Fungus1_32[top1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_21": {
			"name": "Outside Hornet 1",
			"items": {
				"Grub-Greenpath_Stag": {
					"x": 85.65975,
					"y": 24.49149
				},
				"Geo_Rock-Greenpath_Moss_Knights": {
					"x": 12.13,
					"y": 24.76
				},
				"Geo_Rock-Greenpath_Moss_Knights_Dupe_1": {
					"x": 4.59,
					"y": 29.39
				},
				"Geo_Rock-Greenpath_Moss_Knights_Dupe_2": {
					"x": 2.892456,
					"y": 24.89392
				},
				"Lore_Tablet-Greenpath_Stag": {
					"x": 78.1,
					"y": 36.7
				}
			},
			"transitions": {
				"top1": {
					"x": 9.0,
					"y": 50.5,
					"to": "Fungus1_20_v02[bot1]"
				},
				"right1": {
					"x": 90.5,
					"y": 14.0,
					"to": "Fungus1_32[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 14.0,
					"to": "Fungus1_04[right1]"
				},
				"bot1": {
					"x": 21.0,
					"y": -0.5,
					"to": "Fungus1_22[top1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_22": {
			"name": "Outside Stag",
			"items": {
				"Wanderer's_Journal-Greenpath_Stag": {
					"x": 21.89149,
					"y": 108.35
				},
				"Geo_Rock-Greenpath_Below_Stag": {
					"x": 13.21,
					"y": 56.7
				},
				"Geo_Rock-Greenpath_Below_Stag_Fool_Eater": {
					"x": 3.79,
					"y": 4.95
				}
			},
			"transitions": {
				"bot1": {
					"x": 30.0,
					"y": -0.5,
					"to": "Fungus1_30[top1]"
				},
				"left1": {
					"x": -0.5,
					"y": 104.0,
					"to": "Fungus1_16_alt[right1]"
				},
				"top1": {
					"x": 8.0,
					"y": 120.5,
					"to": "Fungus1_21[bot1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_25": {
			"items": {},
			"transitions": {
				"right1": {
					"x": 90.5,
					"y": 11.0,
					"to": "Fungus1_04[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 14.5,
					"to": "Fungus1_26[right1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_26": {
			"name": "Lake of Unn",
			"items": {},
			"transitions": {
				"door_SlugShrine": {
					"x": 77.98,
					"y": 14.76,
					"to": "Room_Slug_Shrine[left1]"
				},
				"right1": {
					"x": 110.5,
					"y": 19.5,
					"to": "Fungus1_25[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 22.0,
					"to": "Fungus1_Slug[right1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_28": {
			"name": "Baulder's Shell",
			"items": {
				"Baldur_Shell": {
					"x": 126.98,
					"y": 2.11
				},
				"Grub-Howling_Cliffs": {
					"x": 87.01,
					"y": 52.53999
				},
				"Geo_Rock-Baldur_Shell_Top_Left": {
					"x": 40.24,
					"y": 22.13
				},
				"Geo_Rock-Baldur_Shell_Alcove": {
					"x": 6.199969,
					"y": 34.27
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 59.0,
					"to": "Cliffs_01[right3]"
				},
				"left2": {
					"x": -0.5,
					"y": 18.0,
					"to": "Fungus1_20_v02[right1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_29": {
			"name": "Moss Charger",
			"boss": "Moss Charger",
			"items": {
				"Geo_Rock-Greenpath_MMC": {
					"x": 5.025553,
					"y": 6.880451
				},
				"Boss_Geo-Massive_Moss_Charger": {
					"x": 49.0,
					"y": 7.8
				},
				"Soul_Totem-Greenpath_MMC": {
					"x": 3.863886,
					"y": 26.44501
				}
			},
			"transitions": {
				"right1": {
					"x": 85.5,
					"y": 15.0,
					"to": "Fungus1_11[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 15.0,
					"to": "Fungus1_12[right1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_30": {
			"items": {
				"Soul_Totem-Greenpath_Below_Toll": {
					"x": 95.84,
					"y": 3.627
				},
				"Lore_Tablet-Greenpath_Below_Toll": {
					"x": 42.1,
					"y": 3.6
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 15.0,
					"to": "Fungus1_09[right1]"
				},
				"top1": {
					"x": 28.0,
					"y": 32.5,
					"to": "Fungus1_22[bot1]"
				},
				"top3": {
					"x": 94.0,
					"y": 32.5,
					"to": "Fungus1_31[bot1]"
				},
				"right1": {
					"x": 100.5,
					"y": 15.0,
					"to": "Fungus1_10[left1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_31": {
			"name": "Toll Bench",
			"items": {
				"Geo_Rock-Greenpath_Below_Toll": {
					"x": 9.3,
					"y": 9.68
				},
				"Geo_Rock-Greenpath_Toll_Hidden": {
					"x": 6.85,
					"y": 86.61
				},
				"Geo_Rock-Greenpath_Toll_Hidden_Dupe": {
					"x": 3.711337,
					"y": 82.74818
				}
			},
			"transitions": {
				"right1": {
					"x": 36.5,
					"y": 116.0,
					"to": "Fungus1_03[left1]"
				},
				"bot1": {
					"x": 21.0,
					"y": -0.5,
					"to": "Fungus1_30[top3]"
				},
				"top1": {
					"x": 14.0,
					"y": 133.5,
					"to": "Fungus1_32[bot1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_32": {
			"name": "Moss Knight Miniboss",
			"items": {
				"Lifeblood_Cocoon-Greenpath": {
					"x": 32.86,
					"y": 26.95
				},
				"Lore_Tablet-Greenpath_Lifeblood": {
					"x": 9.7,
					"y": 34.8
				}
			},
			"transitions": {
				"bot1": {
					"x": 7.0,
					"y": -0.5,
					"to": "Fungus1_31[top1]"
				},
				"top1": {
					"x": 68.0,
					"y": 40.5,
					"to": "Fungus1_20_v02[bot2]"
				},
				"left1": {
					"x": -0.5,
					"y": 4.0,
					"to": "Fungus1_21[right1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_34": {
			"name": "Path to No Eyes",
			"items": {},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 5.0,
					"to": "Fungus1_11[right1]"
				},
				"door1": {
					"x": 103.16,
					"y": 3.73,
					"to": "Fungus1_35[left1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_35": {
			"name": "No Eyes",
			"boss": "No Eyes",
			"items": {
				"Boss_Essence-No_Eyes": {
					"x": 49.72,
					"y": 3.211941
				}
			},
			"transitions": {
				"right1": {
					"x": 120.5,
					"y": 17.0,
					"to": "Fungus1_36[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 4.0,
					"to": "Fungus1_34[door1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_36": {
			"items": {
				"Mask_Shard-Stone_Sanctuary": {
					"x": 18.07,
					"y": 8.02
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 4.0,
					"to": "Fungus1_35[right1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_37": {
			"name": "Dead End Bench",
			"items": {},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 7.0,
					"to": "Fungus1_11[right2]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus1_Slug": {
			"name": "Unn",
			"items": {
				"Shape_of_Unn": {
					"x": 26.40081856,
					"y": 16.58584624
				}
			},
			"transitions": {
				"right1": {
					"x": 70.5,
					"y": 102.0,
					"to": "Fungus1_26[left1]"
				}
			},
			"area": "Fungus1"
		},
		"Fungus2_01": {
			"name": "Queen's Station",
			"items": {
				"Mask_Shard-Queen's_Station": {
					"x": 44.50854,
					"y": 30.56531
				}
			},
			"transitions": {
				"right1": {
					"x": 60.5,
					"y": 42.0,
					"to": "Fungus2_03[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 42.0,
					"to": "Fungus3_02[right2]"
				},
				"left3": {
					"x": -0.5,
					"y": 19.0,
					"to": "Fungus2_34[right1]"
				},
				"left2": {
					"x": -0.5,
					"y": 6.0,
					"to": "Fungus2_02[right1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_02": {
			"name": "Queen's Station Stag",
			"stag": "FungalWastes",
			"items": {
				"Queen's_Station_Stag": {
					"x": 20.3,
					"y": 6.4
				}
			},
			"transitions": {
				"right1": {
					"x": 47.5,
					"y": 7.0,
					"to": "Fungus2_01[left2]"
				},
				"door_stagExit": {
					"x": 16.13,
					"y": 5.8,
					"to": null
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_03": {
			"items": {
				"Hallownest_Seal-Fungal_Wastes_Sporgs": {
					"x": 104.6584,
					"y": 70.27618
				}
			},
			"transitions": {
				"bot1": {
					"x": 57.0,
					"y": -0.5,
					"to": "Fungus2_18[top1]"
				},
				"left1": {
					"x": -0.5,
					"y": 15.0,
					"to": "Fungus2_01[right1]"
				},
				"right1": {
					"x": 130.5,
					"y": 17.0,
					"to": "Fungus2_04[left1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_04": {
			"items": {
				"Wanderer's_Journal-Fungal_Wastes_Thorns_Gauntlet": {
					"x": 21.95,
					"y": 31.28
				},
				"Geo_Rock-Fungal_Below_Shrumal_Ogres": {
					"x": 29.71,
					"y": 63.18
				},
				"Lore_Tablet-Fungal_Wastes_Below_Shrumal_Ogres": {
					"x": 32.4,
					"y": 11.7
				}
			},
			"transitions": {
				"right2": {
					"x": 36.5,
					"y": 55.0,
					"to": "Fungus2_28[left2]"
				},
				"top1": {
					"x": 29.0,
					"y": 76.5,
					"to": "Fungus2_05[bot1]"
				},
				"left1": {
					"x": -0.5,
					"y": 12.0,
					"to": "Fungus2_03[right1]"
				},
				"right1": {
					"x": 36.5,
					"y": 72.0,
					"to": "Fungus2_28[left1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_05": {
			"name": "Shrumal Ogre Miniboss",
			"items": {
				"Charm_Notch-Shrumal_Ogres": {
					"x": 37.47,
					"y": 12.16
				}
			},
			"transitions": {
				"right1": {
					"x": 75.5,
					"y": 14.0,
					"to": "Fungus2_06[left1]"
				},
				"bot1": {
					"x": 8.0,
					"y": -0.5,
					"to": "Fungus2_04[top1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_06": {
			"name": "Acid Climb",
			"items": {},
			"transitions": {
				"right1": {
					"x": 36.5,
					"y": 59.0,
					"to": "Fungus2_26[left1]"
				},
				"top1": {
					"x": 13.0,
					"y": 160.5,
					"to": "Crossroads_18[bot1]"
				},
				"left1": {
					"x": -0.5,
					"y": 10.0,
					"to": "Fungus2_05[right1]"
				},
				"left2": {
					"x": -0.5,
					"y": 59.0,
					"to": "Fungus2_33[right1]"
				},
				"right2": {
					"x": 36.5,
					"y": 10.0,
					"to": "Fungus2_07[left1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_07": {
			"items": {
				"Lore_Tablet-Fungal_Wastes_Hidden": {
					"x": 19.9,
					"y": 30.2
				}
			},
			"transitions": {
				"right1": {
					"x": 70.5,
					"y": 5.0,
					"to": "Fungus2_08[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 14.0,
					"to": "Fungus2_06[right2]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_08": {
			"items": {
				"Geo_Rock-Fungal_Above_Cloth": {
					"x": 3.679914,
					"y": 32.79153
				}
			},
			"transitions": {
				"left2": {
					"x": -0.5,
					"y": 11.0,
					"to": "Fungus2_09[right1]"
				},
				"left1": {
					"x": -0.5,
					"y": 60.0,
					"to": "Fungus2_07[right1]"
				},
				"right1": {
					"x": 30.5,
					"y": 13.0,
					"to": "Fungus2_32[left1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_09": {
			"name": "Meet Cloth",
			"items": {},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 11.0,
					"to": "Fungus2_10[right1]"
				},
				"right1": {
					"x": 70.5,
					"y": 12.0,
					"to": "Fungus2_08[left2]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_10": {
			"name": "Outside City",
			"items": {
				"Geo_Rock-Fungal_After_Cloth": {
					"x": 66.455,
					"y": 66.825
				},
				"Soul_Totem-Before_Pilgrim's_Way": {
					"x": 55.06,
					"y": 24.26
				}
			},
			"transitions": {
				"right1": {
					"x": 70.5,
					"y": 61.0,
					"to": "Fungus2_09[left1]"
				},
				"right2": {
					"x": 70.5,
					"y": 10.0,
					"to": "Fungus2_21[left1]"
				},
				"bot1": {
					"x": 6.0,
					"y": -0.5,
					"to": "Fungus2_11[top1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_11": {
			"name": "Explosion Pogo",
			"items": {
				"Geo_Rock-Fungal_Below_Pilgrim's_Way": {
					"x": 26.56508,
					"y": 61.9495
				},
				"Geo_Rock-Fungal_Below_Pilgrim's_Way_Dupe": {
					"x": 24.17,
					"y": 61.91726
				}
			},
			"transitions": {
				"left2": {
					"x": -0.5,
					"y": 15.0,
					"to": "Fungus2_17[right1]"
				},
				"right1": {
					"x": 31.5,
					"y": 5.0,
					"to": "Fungus2_12[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 41.0,
					"to": "Fungus2_18[right1]"
				},
				"top1": {
					"x": 7.0,
					"y": 70.5,
					"to": "Fungus2_10[bot1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_12": {
			"items": {
				"Lore_Tablet-Mantis_Outskirts": {
					"x": 158.6,
					"y": 11.7
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 8.0,
					"to": "Fungus2_11[right1]"
				},
				"bot1": {
					"x": 91.0,
					"y": -0.5,
					"to": "Fungus2_13[top1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_13": {
			"name": "Outside Mantis Village",
			"items": {
				"Geo_Rock-Mantis_Outskirts_Guarded": {
					"x": 5.865558,
					"y": 44.83987
				},
				"Geo_Rock-Mantis_Outskirts_Guarded_Dupe": {
					"x": 7.85,
					"y": 44.75
				},
				"Geo_Rock-Mantis_Outskirts_Alcove": {
					"x": 21.31,
					"y": 35.79
				}
			},
			"transitions": {
				"left2": {
					"x": 1.5,
					"y": 59.0,
					"to": "Fungus2_14[right1]"
				},
				"left3": {
					"x": -0.5,
					"y": 5.0,
					"to": "Fungus2_23[right1]"
				},
				"top1": {
					"x": 24.0,
					"y": 116.5,
					"to": "Fungus2_12[bot1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_14": {
			"name": "Mantis Village (Upper)",
			"items": {
				"Mantis_Claw": {
					"x": 18.3963,
					"y": 20.29
				},
				"Left_Mantis_Claw": {
					"x": 13.5,
					"y": 20.4
				},
				"Right_Mantis_Claw": {
					"x": 18.5,
					"y": 20.4
				},
				"Geo_Rock-Mantis_Village_After_Lever": {
					"x": 62.70118,
					"y": 21.5454
				},
				"Geo_Rock-Mantis_Village_Above_Claw": {
					"x": 29.43,
					"y": 33.68
				},
				"Geo_Rock-Mantis_Village_Above_Claw_Dupe": {
					"x": 19.34,
					"y": 33.7
				},
				"Geo_Rock-Mantis_Village_Below_Lore": {
					"x": 43.58721,
					"y": 21.61446
				},
				"Geo_Rock-Mantis_Village_Above_Lever": {
					"x": 83.04,
					"y": 31.60717
				},
				"Lore_Tablet-Mantis_Village": {
					"x": 47.2,
					"y": 26.9
				}
			},
			"transitions": {
				"right1": {
					"x": 175.5,
					"y": 10.0,
					"to": "Fungus2_13[left2]"
				},
				"top1": {
					"x": 35.0,
					"y": 41.5,
					"to": "Fungus2_17[bot1]"
				},
				"bot3": {
					"x": 60.0,
					"y": -0.5,
					"to": "Fungus2_15[top2]"
				},
				"bot1": {
					"x": 44.0,
					"y": -0.5,
					"to": "Fungus2_15[top2]"
				},
				"bot2": {
					"x": 52.0,
					"y": -0.5,
					"to": "Fungus2_15[top2]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_15": {
			"name": "Mantis Lords",
			"boss": "Mantis Lords",
			"items": {
				"Lifeblood_Cocoon-Mantis_Village": {
					"x": 4.21,
					"y": 25.92
				},
				"Geo_Rock-Above_Mantis_Lords_1": {
					"x": 25.64955,
					"y": 50.58035
				},
				"Geo_Rock-Above_Mantis_Lords_2": {
					"x": 2.09,
					"y": 36.48
				}
			},
			"transitions": {
				"top1": {
					"x": 29.0,
					"y": 120.5,
					"to": "Fungus2_14[bot1]"
				},
				"top3": {
					"x": 38.0,
					"y": 120.5,
					"to": "Fungus2_14[bot3]"
				},
				"right1": {
					"x": 61.5,
					"y": 88.0,
					"to": "Fungus2_31[left1]"
				},
				"top2": {
					"x": 33.5,
					"y": 120.5,
					"to": "Fungus2_14[bot3]"
				},
				"left1": {
					"x": 7.0,
					"y": 10.0,
					"to": "Fungus2_25[right1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_17": {
			"items": {
				"Wanderer's_Journal-Above_Mantis_Village": {
					"x": 33.52,
					"y": 25.19
				},
				"Whispering_Root-Mantis_Village": {
					"x": 27.7,
					"y": 3.4
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 34.0,
					"to": "Fungus2_29[right1]"
				},
				"right1": {
					"x": 45.5,
					"y": 37.0,
					"to": "Fungus2_11[left2]"
				},
				"bot1": {
					"x": 8.0,
					"y": -0.5,
					"to": "Fungus2_14[top1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_18": {
			"name": "Conifer",
			"items": {
				"Grub-Fungal_Bouncy": {
					"x": 142.77,
					"y": 50.66
				},
				"Fungal_Wastes_Map": {
					"x": 11.0,
					"y": 35.0
				},
				"Geo_Rock-Fungal_After_Bouncy_Grub": {
					"x": 92.42778,
					"y": 34.88834
				},
				"Geo_Rock-Fungal_After_Bouncy_Grub_Dupe": {
					"x": 94.41,
					"y": 34.78756
				},
				"Geo_Rock-Fungal_Bouncy_Grub_Lever": {
					"x": 65.55877,
					"y": 5.008116
				},
				"Geo_Rock-Fungal_After_Cornifer": {
					"x": 74.9469,
					"y": 46.87639
				}
			},
			"transitions": {
				"top1": {
					"x": 40.0,
					"y": 60.5,
					"to": "Fungus2_03[bot1]"
				},
				"bot1": {
					"x": 6.0,
					"y": -0.5,
					"to": "Fungus2_19[top1]"
				},
				"right1": {
					"x": 150.5,
					"y": 8.0,
					"to": "Fungus2_11[left1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_19": {
			"items": {},
			"transitions": {
				"top1": {
					"x": 50.0,
					"y": 25.5,
					"to": "Fungus2_18[bot1]"
				},
				"left1": {
					"x": -0.5,
					"y": 20.0,
					"to": "Fungus2_20[right1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_20": {
			"name": "Room of Three Things",
			"items": {
				"Spore_Shroom": {
					"x": 48.18093,
					"y": 7.93
				},
				"Grub-Fungal_Spore_Shroom": {
					"x": 7.81961,
					"y": 42.50548
				},
				"Lore_Tablet-Spore_Shroom": {
					"x": 56.9,
					"y": 41.5
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 31.0,
					"to": "Deepnest_01[right1]"
				},
				"right1": {
					"x": 63.5,
					"y": 31.0,
					"to": "Fungus2_19[left1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_21": {
			"name": "City Entrance (Platforming)",
			"items": {
				"Geo_Rock-Fungal_Above_City_Entrance": {
					"x": 100.47,
					"y": 40.79
				},
				"Soul_Totem-Pilgrim's_Way": {
					"x": 71.11,
					"y": 37.23
				},
				"Lore_Tablet-Pilgrim's_Way_2": {
					"x": 21.5,
					"y": 15.2
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 11.0,
					"to": "Fungus2_10[right2]"
				},
				"right1": {
					"x": 150.5,
					"y": 13.0,
					"to": "Ruins1_01[left1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_23": {
			"name": "Bretta Rescue",
			"items": {
				"Dashmaster": {
					"x": 54.08734,
					"y": 3.95
				}
			},
			"transitions": {
				"right1": {
					"x": 90.5,
					"y": 63.0,
					"to": "Fungus2_13[left3]"
				},
				"right2": {
					"x": 90.5,
					"y": 27.0,
					"to": "Waterways_09[left1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_25": {
			"name": "Deepnest Entrance",
			"items": {
				"Mask_Shard-Deepnest": {
					"x": 91.67,
					"y": 14.57
				},
				"Deepnest_Map-Right_[Gives_Quill]": {
					"x": 49.5,
					"y": 23.2
				},
				"Geo_Rock-Deepnest_By_Mantis_Lords_1": {
					"x": 4.29,
					"y": 24.845
				},
				"Geo_Rock-Deepnest_By_Mantis_Lords_2": {
					"x": 34.71,
					"y": 24.89
				},
				"Geo_Rock-Depenest_Lower_Cornifer": {
					"x": 72.12656,
					"y": 17.94206
				}
			},
			"transitions": {
				"top2": {
					"x": 95.0,
					"y": 26.0,
					"to": "Fungus2_30[bot1]"
				},
				"right1": {
					"x": 168.5,
					"y": 6.0,
					"to": "Fungus2_15[left1]"
				},
				"top1": {
					"x": 12.0,
					"y": 35.5,
					"to": "Deepnest_16[bot1]"
				},
				"right1 (1)": {
					"x": 168.5,
					"y": 10.0,
					"to": "Fungus2_15[left1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_26": {
			"name": "Leg Eater",
			"items": {
				"Fragile_Heart": {
					"x": 8.53,
					"y": 0.54
				},
				"Fragile_Greed": {
					"x": 8.53,
					"y": 0.54
				},
				"Fragile_Strength": {
					"x": 8.53,
					"y": 0.54
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 8.0,
					"to": "Fungus2_06[right1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_28": {
			"items": {},
			"transitions": {
				"left2": {
					"x": -0.5,
					"y": 5.0,
					"to": "Fungus2_04[right2]"
				},
				"left1": {
					"x": -0.5,
					"y": 20.0,
					"to": "Fungus2_04[right1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_29": {
			"name": "Fungal Core (Upper)",
			"items": {
				"Rancid_Egg-Fungal_Core": {
					"x": 13.39,
					"y": 36.37
				},
				"Geo_Rock-Fungal_Core_Entrance": {
					"x": 61.63,
					"y": 36.89
				},
				"Soul_Totem-Fungal_Core": {
					"x": 9.753107,
					"y": 56.45001
				}
			},
			"transitions": {
				"right1": {
					"x": 94.5,
					"y": 32.0,
					"to": "Fungus2_17[left1]"
				},
				"bot1": {
					"x": 8.0,
					"y": -0.5,
					"to": "Fungus2_30[top1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_30": {
			"name": "Fungal Core (Lower)",
			"items": {
				"Grimmkin_Flame-Fungal_Core": {
					"x": 27.65,
					"y": 34.01
				},
				"Geo_Rock-Fungal_Core_Hidden": {
					"x": 46.09,
					"y": 102.0
				},
				"Geo_Rock-Fungal_Core_Above_Elder": {
					"x": 54.806,
					"y": 46.99926
				},
				"Lore_Tablet-Fungal_Core": {
					"x": 51.8,
					"y": 98.6
				}
			},
			"transitions": {
				"bot1": {
					"x": 17.5,
					"y": -0.5,
					"to": "Fungus2_25[top2]"
				},
				"top1": {
					"x": 20.0,
					"y": 140.5,
					"to": "Fungus2_29[bot1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_31": {
			"name": "Mantis Village (Loot)",
			"items": {
				"Mark_of_Pride": {
					"x": 39.3600006,
					"y": 18.269999300000002
				},
				"620_Geo-Mantis_Lords_Chest": {
					"x": 68.89,
					"y": 19.79
				},
				"Hallownest_Seal-Mantis_Lords": {
					"x": 35.8100006,
					"y": 28.2899993
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 4.0,
					"to": "Fungus2_15[right1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_32": {
			"name": "Elder Hu",
			"boss": "Elder Hu",
			"items": {
				"Boss_Essence-Elder_Hu": {
					"x": 52.29,
					"y": 3.26
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 4.0,
					"to": "Fungus2_08[right1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_33": {
			"items": {
				"Whispering_Root-Leg_Eater": {
					"x": 34.7,
					"y": 7.4
				}
			},
			"transitions": {
				"right1": {
					"x": 60.5,
					"y": 8.0,
					"to": "Fungus2_06[left2]"
				},
				"left1": {
					"x": -0.5,
					"y": 63.0,
					"to": "Fungus3_26[right1]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus2_34": {
			"name": "Willoh",
			"items": {
				"Hallownest_Seal-Queen's_Station": {
					"x": 35.16,
					"y": 14.35783
				}
			},
			"transitions": {
				"right1": {
					"x": 47.5,
					"y": 7.0,
					"to": "Fungus2_01[left3]"
				}
			},
			"area": "Fungus2"
		},
		"Fungus1_24": {
			"name": "Conifer",
			"area": "Fungus3",
			"items": {
				"Queen's_Gardens_Map": {
					"x": 53.7,
					"y": 22.3
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 11.0,
					"to": "Fungus3_05[right1]"
				}
			}
		},
		"Fungus1_23": {
			"area": "Fungus3",
			"items": {},
			"transitions": {
				"right1": {
					"x": 150.5,
					"y": 10.0,
					"to": "Fungus3_13[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 7.0,
					"to": "Fungus3_48[right2]"
				}
			}
		},
		"Fungus3_03": {
			"name": "Acid Entrance",
			"items": {
				"Geo_Rock-Queen's_Gardens_Acid_Entrance": {
					"x": 94.66969,
					"y": 16.87
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 12.0,
					"to": "Fungus3_34[right1]"
				},
				"right1": {
					"x": 100.5,
					"y": 9.0,
					"to": "Fungus3_02[left2]"
				}
			},
			"area": "Fungus3"
		},
		"Fungus3_04": {
			"items": {},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 84.0,
					"to": "Fungus3_21[right1]"
				},
				"right1": {
					"x": 40.5,
					"y": 57.0,
					"to": "Fungus3_34[left1]"
				},
				"right2": {
					"x": 40.5,
					"y": 6.0,
					"to": "Fungus3_05[left1]"
				},
				"left2": {
					"x": -0.5,
					"y": 67.0,
					"to": "Fungus3_13[right1]"
				}
			},
			"area": "Fungus3"
		},
		"Fungus3_05": {
			"name": "Mantis Petra Miniboss",
			"items": {},
			"transitions": {
				"right1": {
					"x": 73.5,
					"y": 60.0,
					"to": "Fungus1_24[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 48.0,
					"to": "Fungus3_04[right2]"
				},
				"right2": {
					"x": 73.5,
					"y": 30.0,
					"to": "Fungus3_11[left1]"
				}
			},
			"area": "Fungus3"
		},
		"Fungus3_08": {
			"items": {},
			"transitions": {
				"right1": {
					"x": 150.5,
					"y": 14.0,
					"to": "Fungus3_11[left2]"
				},
				"left1": {
					"x": -0.5,
					"y": 8.0,
					"to": "Deepnest_43[right1]"
				},
				"top1": {
					"x": 6.0,
					"y": 25.5,
					"to": "Fungus3_10[bot1]"
				}
			},
			"area": "Fungus3"
		},
		"Fungus3_10": {
			"name": "Mantis Traitor Miniboss",
			"items": {
				"Grub-Queen's_Gardens_Stag": {
					"x": 11.82825,
					"y": 35.49953
				},
				"Geo_Rock-Queen's_Gardens_Below_Stag": {
					"x": 30.41,
					"y": 34.8
				}
			},
			"transitions": {
				"bot1": {
					"x": 7.0,
					"y": -0.5,
					"to": "Fungus3_08[top1]"
				},
				"top1": {
					"x": 49.0,
					"y": 44.5,
					"to": "Fungus3_13[bot1]"
				}
			},
			"area": "Fungus3"
		},
		"Fungus3_11": {
			"items": {
				"Whispering_Root-Queens_Gardens": {
					"x": 34.0,
					"y": 8.5
				}
			},
			"transitions": {
				"left2": {
					"x": -0.5,
					"y": 10.0,
					"to": "Fungus3_08[right1]"
				},
				"right1": {
					"x": 52.5,
					"y": 15.0,
					"to": "Fungus3_39[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 62.0,
					"to": "Fungus3_05[right2]"
				}
			},
			"area": "Fungus3"
		},
		"Fungus3_13": {
			"name": "Outside Stag Station",
			"items": {},
			"transitions": {
				"right1": {
					"x": 30.5,
					"y": 64.0,
					"to": "Fungus3_04[left2]"
				},
				"bot1": {
					"x": 7.0,
					"y": -0.5,
					"to": "Fungus3_10[top1]"
				},
				"left2": {
					"x": -0.5,
					"y": 6.0,
					"to": "Fungus3_40[right1]"
				},
				"left1": {
					"x": -0.5,
					"y": 60.0,
					"to": "Fungus1_23[right1]"
				},
				"left3": {
					"x": -0.5,
					"y": 36.0,
					"to": "Fungus3_49[right1]"
				}
			},
			"area": "Fungus3"
		},
		"Fungus3_21": {
			"name": "Path to the Traitor",
			"items": {
				"Soul_Totem-Top_Left_Queen's_Gardens": {
					"x": 67.84,
					"y": 16.71
				}
			},
			"transitions": {
				"top1": {
					"x": 9.0,
					"y": 26.0,
					"to": "Fungus3_22[bot1]"
				},
				"right1": {
					"x": 75.5,
					"y": 7.0,
					"to": "Fungus3_04[left1]"
				}
			},
			"area": "Fungus3"
		},
		"Fungus3_22": {
			"name": "That Really Tall Room With a Grub At the Top",
			"items": {
				"Grub-Queen's_Gardens_Top": {
					"x": 21.28756,
					"y": 134.4546
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 4.0,
					"to": "Fungus3_23[right1]"
				},
				"right1": {
					"x": 31.5,
					"y": 84.0,
					"to": "Fungus1_13[left1]"
				},
				"bot1": {
					"x": 7.0,
					"y": -0.5,
					"to": "Fungus3_21[top1]"
				}
			},
			"area": "Fungus3"
		},
		"Fungus3_23": {
			"name": "Traitor Lord",
			"boss": "Traitor Lord",
			"items": {},
			"transitions": {
				"right1": {
					"x": 100.5,
					"y": 6.0,
					"to": "Fungus3_22[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 28.0,
					"to": "Fungus3_48[right1]"
				}
			},
			"area": "Fungus3"
		},
		"Fungus3_39": {
			"name": "Moss Prophet",
			"items": {
				"Love_Key": {
					"x": 103.827,
					"y": 35.89954
				},
				"Geo_Rock-Love_Key": {
					"x": 34.74,
					"y": 31.02
				},
				"Geo_Rock-Love_Key_Dupe": {
					"x": 3.51,
					"y": 5.838402
				}
			},
			"transitions": {
				"right1": {
					"x": 109.5,
					"y": 7.0,
					"to": "Deepnest_01[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 48.0,
					"to": "Fungus3_11[right1]"
				}
			},
			"area": "Fungus3"
		},
		"Fungus3_40": {
			"name": "Stag & Marmu",
			"boss": "Marmu",
			"stag": "RoyalGardens",
			"items": {
				"Queen's_Gardens_Stag": {
					"x": 159.8,
					"y": 13.4
				},
				"Soul_Totem-Below_Marmu": {
					"x": 59.47,
					"y": 3.43
				}
			},
			"transitions": {
				"top1": {
					"x": 19.0,
					"y": 35.5,
					"to": "Fungus3_48[bot1]"
				},
				"door_stagExit": {
					"x": 156.3,
					"y": 12.63,
					"to": null
				},
				"right1": {
					"x": 187.5,
					"y": 14.0,
					"to": "Fungus3_13[left2]"
				}
			},
			"area": "Fungus3"
		},
		"Fungus3_44": {
			"name": "Outside Howling Wraiths",
			"items": {},
			"transitions": {
				"bot1": {
					"x": 53.0,
					"y": -0.5,
					"to": "Fungus3_34[top1]"
				},
				"door1": {
					"x": 21.74,
					"y": 37.82,
					"to": "Room_Fung_Shaman[left1]"
				},
				"right1": {
					"x": 95.5,
					"y": 41.0,
					"to": "Fungus3_24[left1]"
				}
			},
			"area": "Fungus3"
		},
		"Fungus3_48": {
			"name": "Outside White Lady",
			"splitRoom": [
				[
					"right2",
					"door1"
				],
				[
					"right1",
					"bot1"
				]
			],
			"items": {
				"Hallownest_Seal-Queen's_Gardens": {
					"x": 6.148664,
					"y": 23.28
				},
				"Grub-Queen's_Gardens_Marmu": {
					"x": 16.17832,
					"y": 94.46994
				},
				"Geo_Rock-Queen's_Gardens_Above_Marmu": {
					"x": 41.88,
					"y": 16.6701
				}
			},
			"transitions": {
				"right2": {
					"x": 95.5,
					"y": 28.0,
					"to": "Fungus1_23[left1]"
				},
				"door1": {
					"x": 38.021,
					"y": 93.644,
					"to": null
				},
				"bot1": {
					"x": 62.0,
					"y": -0.5,
					"to": "Fungus3_40[top1]"
				},
				"right1": {
					"x": 95.5,
					"y": 95.0,
					"to": "Fungus3_23[left1]"
				}
			},
			"area": "Fungus3"
		},
		"Fungus3_49": {
			"name": "Traitor's Child's Grave",
			"items": {},
			"transitions": {
				"right1": {
					"x": 87.5,
					"y": 9.0,
					"to": "Fungus3_13[left3]"
				}
			},
			"area": "Fungus3"
		},
		"Fungus3_50": {
			"name": "Toll Bench",
			"items": {},
			"transitions": {
				"right1": {
					"x": 40.5,
					"y": 116.0,
					"to": "Deepnest_43[left1]"
				}
			},
			"area": "Fungus3"
		},
		"Fungus3_34": {
			"items": {
				"Rancid_Egg-Queen's_Gardens": {
					"x": 48.61173,
					"y": 18.38
				}
			},
			"transitions": {
				"top1": {
					"x": 80.0,
					"y": 26.5,
					"to": "Fungus3_44[bot1]"
				},
				"right1": {
					"x": 160.5,
					"y": 14.0,
					"to": "Fungus3_03[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 12.0,
					"to": "Fungus3_04[right1]"
				}
			},
			"area": "Fungus3"
		},
		"Fungus3_01": {
			"area": "FogCanyon",
			"items": {},
			"transitions": {
				"top1": {
					"x": 20.0,
					"y": 80.5,
					"to": "Fungus1_11[bot1]"
				},
				"left1": {
					"x": -0.5,
					"y": 38.0,
					"to": "Fungus3_24[right1]"
				},
				"right1": {
					"x": 33.5,
					"y": 67.0,
					"to": "Fungus3_25[left1]"
				},
				"right2": {
					"x": 33.5,
					"y": 13.0,
					"to": "Fungus3_02[left1]"
				}
			}
		},
		"Fungus3_02": {
			"area": "FogCanyon",
			"items": {},
			"transitions": {
				"left3": {
					"x": -0.5,
					"y": 9.0,
					"to": "Fungus3_35[right1]"
				},
				"left2": {
					"x": -0.5,
					"y": 64.0,
					"to": "Fungus3_03[right1]"
				},
				"right2": {
					"x": 31.5,
					"y": 4.0,
					"to": "Fungus2_01[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 95.0,
					"to": "Fungus3_01[right2]"
				},
				"right1": {
					"x": 30.5,
					"y": 95.0,
					"to": "Fungus3_47[left1]"
				}
			}
		},
		"Fungus3_24": {
			"area": "FogCanyon",
			"items": {},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 13.0,
					"to": "Fungus3_44[right1]"
				},
				"top1": {
					"x": 30.0,
					"y": 30.5,
					"to": "Fungus3_30[bot1]"
				},
				"right1": {
					"x": 100.5,
					"y": 13.0,
					"to": "Fungus3_01[left1]"
				}
			}
		},
		"Fungus3_25": {
			"area": "FogCanyon",
			"name": "Conifer",
			"items": {
				"Fog_Canyon_Map": {
					"x": 36.4,
					"y": 32.0
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 20.0,
					"to": "Fungus3_01[right1]"
				},
				"right1": {
					"x": 100.5,
					"y": 16.0,
					"to": "Fungus3_25b[left1]"
				}
			}
		},
		"Fungus3_25b": {
			"area": "FogCanyon",
			"items": {},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 16.0,
					"to": "Fungus3_25[right1]"
				},
				"right1": {
					"x": 100.5,
					"y": 16.0,
					"to": "Fungus3_26[left2]"
				}
			}
		},
		"Fungus3_26": {
			"name": "Tall Hub",
			"area": "FogCanyon",
			"items": {
				"Hallownest_Seal-Fog_Canyon_East": {
					"x": 7.96,
					"y": 80.56
				},
				"Geo_Rock-Fog_Canyon_East": {
					"x": 27.9938,
					"y": 58.87676
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 62.0,
					"to": "Fungus3_28[right1]"
				},
				"right1": {
					"x": 31.5,
					"y": 67.0,
					"to": "Fungus2_33[left1]"
				},
				"left2": {
					"x": -0.5,
					"y": 38.0,
					"to": "Fungus3_25b[right1]"
				},
				"top1": {
					"x": 21.0,
					"y": 105.5,
					"to": "Crossroads_35[bot1]"
				},
				"left3": {
					"x": -0.5,
					"y": 10.0,
					"to": "Fungus3_27[right1]"
				}
			}
		},
		"Fungus3_27": {
			"area": "FogCanyon",
			"items": {},
			"transitions": {
				"right1": {
					"x": 75.5,
					"y": 9.0,
					"to": "Fungus3_26[left3]"
				},
				"left1": {
					"x": -0.5,
					"y": 4.0,
					"to": "Fungus3_47[right1]"
				}
			}
		},
		"Fungus3_28": {
			"name": "Spicy Charm Notch",
			"area": "FogCanyon",
			"items": {
				"Charm_Notch-Fog_Canyon": {
					"x": 13.05876156,
					"y": 8.90247688
				}
			},
			"transitions": {
				"right1": {
					"x": 75.5,
					"y": 17.0,
					"to": "Fungus3_26[left1]"
				}
			}
		},
		"Fungus3_30": {
			"name": "Life Blood & Seal",
			"area": "FogCanyon",
			"items": {
				"Hallownest_Seal-Fog_Canyon_West": {
					"x": 21.47,
					"y": 15.23
				},
				"Lifeblood_Cocoon-Fog_Canyon_West": {
					"x": 4.85,
					"y": 13.61
				}
			},
			"transitions": {
				"bot1": {
					"x": 32.0,
					"y": -0.5,
					"to": "Fungus3_24[top1]"
				}
			}
		},
		"Fungus3_35": {
			"name": "Millibelle the \"Banker\"",
			"area": "FogCanyon",
			"items": {},
			"transitions": {
				"right1": {
					"x": 65.5,
					"y": 6.0,
					"to": "Fungus3_02[left3]"
				}
			}
		},
		"Fungus3_47": {
			"name": "Outside Teacher's Archives",
			"area": "FogCanyon",
			"items": {
				"Grub-Fog_Canyon": {
					"x": 6.11,
					"y": 22.53
				}
			},
			"transitions": {
				"right1": {
					"x": 80.5,
					"y": 23.0,
					"to": "Fungus3_27[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 8.0,
					"to": "Fungus3_02[right1]"
				},
				"door1": {
					"x": 43.45,
					"y": 6.77,
					"to": "Fungus3_archive[left1]"
				}
			}
		},
		"Fungus3_archive": {
			"name": "Teacher's Archives",
			"area": "FogCanyon",
			"items": {},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 7.0,
					"to": "Fungus3_47[door1]"
				},
				"bot1": {
					"x": 68.0,
					"y": -0.5,
					"to": "Fungus3_archive_02[top1]"
				}
			}
		},
		"Fungus3_archive_02": {
			"name": "Uumuu & Monomon",
			"boss": "Uumuu",
			"area": "FogCanyon",
			"items": {
				"Monomon": {
					"x": 54.0,
					"y": 89.0
				},
				"Lore_Tablet-Archives_Upper": {
					"x": 97.0,
					"y": 162.8
				},
				"Lore_Tablet-Archives_Left": {
					"x": 20.6,
					"y": 88.7
				},
				"Lore_Tablet-Archives_Right": {
					"x": 97.8,
					"y": 78.8
				}
			},
			"transitions": {
				"top1": {
					"x": 51.0,
					"y": 195.5,
					"to": "Fungus3_archive[bot1]"
				},
				"door_dreamReturn": {
					"x": 59.28,
					"y": 80.68,
					"to": null
				}
			}
		},
		"GG_Atrium": {
			"name": "Godhome",
			"items": {},
			"transitions": {
				"top1": {
					"x": 80.5,
					"y": 85.0,
					"to": "GG_Atrium_Roof[bot1]"
				},
				"door_dreamReturnGG": {
					"x": -273.10349664,
					"y": 36.5848064,
					"to": null
				},
				"top2": {
					"x": 132.0,
					"y": 85.0,
					"to": "GG_Atrium_Roof[bot2]"
				},
				"door_dreamEnter_ReturnGGMode": {
					"x": 14.64,
					"y": 35.1,
					"to": null
				},
				"door_dreamEnter": {
					"x": 14.64,
					"y": 35.1,
					"to": null
				},
				"door1_blueRoom": {
					"x": 89.84,
					"y": 13.76,
					"to": "GG_Blue_Room[left1]"
				},
				"Door_Workshop": {
					"x": 111.33,
					"y": 13.76,
					"to": "GG_Workshop[left1]"
				}
			},
			"area": "GG"
		},
		"GG_Lurker": {
			"name": "Pale Lurker",
			"boss": "Pale Lurker",
			"items": {
				"Simple_Key-Lurker": {
					"x": 169.5,
					"y": 52.4
				},
				"King's_Idol-Pale_Lurker": {
					"x": 222.92,
					"y": 51.17
				},
				"Geo_Rock-Pale_Lurker": {
					"x": 123.32,
					"y": 72.52
				},
				"Soul_Totem-Pale_Lurker": {
					"x": 65.76,
					"y": 79.58321
				}
			},
			"transitions": {
				"left1": {
					"x": 66.5,
					"y": 109.0,
					"to": "Room_Colosseum_Spectate[right1]"
				}
			},
			"area": "GG"
		},
		"GG_Pipeway": {
			"name": "Flukemungas",
			"items": {
				"Geo_Rock-Godhome_Pipeway": {
					"x": 27.99,
					"y": 5.46
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 33.0,
					"to": "GG_Waterways[right1]"
				},
				"right1": {
					"x": 149.0,
					"y": 5.0,
					"to": "Waterways_08[left2]"
				}
			},
			"area": "GG"
		},
		"GG_Unn": {
			"name": null,
			"items": {},
			"transitions": {
				"door_dreamEnter": {
					"x": 64.58,
					"y": 15.12,
					"to": null
				},
				"right1": {
					"x": 106.0,
					"y": 18.0,
					"to": "[door_dreamEnter]"
				}
			},
			"area": "GG"
		},
		"GG_Waterways": {
			"name": "Junk Pit",
			"items": {
				"Godtuner": {
					"x": 45.769999999999996,
					"y": 15.1
				}
			},
			"transitions": {
				"door1": {
					"x": 139.71,
					"y": 55.8,
					"to": "Room_GG_Shortcut[left1]"
				},
				"door_dreamReturn": {
					"x": 51.09,
					"y": 15.1,
					"to": null
				},
				"right1": {
					"x": 164.5,
					"y": 88.0,
					"to": "GG_Pipeway[left1]"
				}
			},
			"area": "GG"
		},
		"Grimm_Divine": {
			"name": "Divine",
			"items": {},
			"transitions": {
				"left1": {
					"x": 11.5,
					"y": 7.0,
					"to": "Town[room_divine]"
				}
			},
			"area": "Grimm"
		},
		"Grimm_Main_Tent": {
			"name": "Grimm",
			"boss": "Grimm, Nightmare King Grimm",
			"items": {
				"Grimmchild": {
					"x": 75.0,
					"y": 7.0
				},
				"Charm_Notch-Grimm": {
					"x": 79.05,
					"y": 6.873710000000001
				}
			},
			"transitions": {
				"left1": {
					"x": 11.0,
					"y": 7.0,
					"to": "Town[room_grimm]"
				},
				"door_dreamReturn": {
					"x": 173.06,
					"y": 9.609011,
					"to": null
				}
			},
			"area": "Grimm"
		},
		"Hive_01": {
			"splitRoom": [
				[
					"left1",
					"right2"
				],
				[
					"right1"
				]
			],
			"items": {
				"Geo_Rock-Hive_Entrance": {
					"x": 99.64955,
					"y": 36.20964
				}
			},
			"transitions": {
				"right2": {
					"x": 120.5,
					"y": 9.0,
					"to": "Hive_02[left3]"
				},
				"right1": {
					"x": 120.5,
					"y": 51.0,
					"to": "Hive_02[left2]"
				},
				"left1": {
					"x": -0.5,
					"y": 39.0,
					"to": "Abyss_03_c[right1]"
				}
			},
			"area": "Hive"
		},
		"Hive_02": {
			"items": {
				"Whispering_Root-Hive": {
					"x": 168.7,
					"y": 24.1
				},
				"Geo_Rock-Hive_Outside_Bench": {
					"x": 125.2619,
					"y": 26.20369
				},
				"Geo_Rock-Hive_Below_Root": {
					"x": 191.32,
					"y": 18.04
				},
				"Geo_Rock-Hive_After_Root": {
					"x": 138.29,
					"y": 74.04
				}
			},
			"transitions": {
				"left1": {
					"x": 93.5,
					"y": 74.0,
					"to": "Hive_03_c[right3]"
				},
				"left3": {
					"x": 93.5,
					"y": 9.0,
					"to": "Hive_01[right2]"
				},
				"left2": {
					"x": 93.5,
					"y": 51.0,
					"to": "Hive_01[right1]"
				}
			},
			"area": "Hive"
		},
		"Hive_03": {
			"splitRoom": [
				[
					"top1"
				],
				[
					"bot1",
					"right1"
				]
			],
			"items": {
				"Grub-Hive_External": {
					"x": 20.37036,
					"y": 139.4681
				},
				"Grimmkin_Flame-Hive": {
					"x": 86.0804,
					"y": 123.6802
				},
				"Geo_Rock-Hive_Below_Stash": {
					"x": 105.8294,
					"y": 112.1796
				},
				"Geo_Rock-Hive_Stash": {
					"x": 58.57,
					"y": 130.06
				},
				"Geo_Rock-Hive_Stash_Dupe": {
					"x": 51.0,
					"y": 131.14
				}
			},
			"transitions": {
				"right1": {
					"x": 140.5,
					"y": 144.0,
					"to": "Hive_04[left1]"
				},
				"top1": {
					"x": 41.0,
					"y": 150.5,
					"to": "Deepnest_East_02[bot2]"
				},
				"bot1": {
					"x": 77.0,
					"y": 109.0,
					"to": "Hive_03_c[top1]"
				}
			},
			"area": "Hive"
		},
		"Hive_03_c": {
			"items": {},
			"transitions": {
				"top1": {
					"x": 77.0,
					"y": 110.5,
					"to": "Hive_03[bot1]"
				},
				"right2": {
					"x": 140.5,
					"y": 96.0,
					"to": "Hive_04[left2]"
				},
				"right3": {
					"x": 140.5,
					"y": 73.0,
					"to": "Hive_02[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 101.0,
					"to": "Deepnest_East_01[right1]"
				}
			},
			"area": "Hive"
		},
		"Hive_04": {
			"items": {
				"Mask_Shard-Hive": {
					"x": 130.99,
					"y": 96.33
				},
				"Grub-Hive_Internal": {
					"x": 209.39,
					"y": 126.47
				},
				"Geo_Rock-Hive_Below_Grub": {
					"x": 173.16,
					"y": 121.11
				},
				"Geo_Rock-Hive_Above_Mask": {
					"x": 120.1783,
					"y": 120.0663
				}
			},
			"transitions": {
				"left1": {
					"x": 101.5,
					"y": 144.0,
					"to": "Hive_03[right1]"
				},
				"left2": {
					"x": 100.5,
					"y": 96.0,
					"to": "Hive_03_c[right2]"
				},
				"right1": {
					"x": 220.5,
					"y": 104.0,
					"to": "Hive_05[left1]"
				}
			},
			"area": "Hive"
		},
		"Hive_05": {
			"name": "Hive Knight",
			"boss": "Hive Knight",
			"items": {
				"Hiveblood": {
					"x": 37.8,
					"y": 12.97
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 28.0,
					"to": "Hive_04[right1]"
				}
			},
			"area": "Hive"
		},
		"Mines_01": {
			"name": "Dive Entrance",
			"items": {
				"Rancid_Egg-Crystal_Peak_Dive_Entrance": {
					"x": 28.15,
					"y": 35.28588
				}
			},
			"transitions": {
				"bot1": {
					"x": 14.0,
					"y": -0.5,
					"to": "Mines_02[top1]"
				},
				"left1": {
					"x": -0.5,
					"y": 49.0,
					"to": "Crossroads_45[right1]"
				}
			},
			"area": "Mines"
		},
		"Mines_02": {
			"name": "Entrance Common",
			"items": {
				"Geo_Rock-Crystal_Peak_Lower_Middle": {
					"x": 132.7479,
					"y": 25.77
				},
				"Geo_Rock-Crystal_Peak_Lower_Conveyer_1": {
					"x": 67.78553,
					"y": 9.56019
				},
				"Geo_Rock-Crystal_Peak_Lower_Conveyer_2": {
					"x": 90.02763,
					"y": 5.635585
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 28.0,
					"to": "Mines_33[right1]"
				},
				"top2": {
					"x": 119.0,
					"y": 36.5,
					"to": "Mines_03[bot1]"
				},
				"top1": {
					"x": 20.0,
					"y": 36.5,
					"to": "Mines_01[bot1]"
				},
				"right1": {
					"x": 160.5,
					"y": 4.0,
					"to": "Mines_29[left1]"
				}
			},
			"area": "Mines"
		},
		"Mines_03": {
			"items": {
				"Grub-Crystal_Peak_Spike": {
					"x": 24.47,
					"y": 75.45
				}
			},
			"transitions": {
				"bot1": {
					"x": 16.0,
					"y": 0.0,
					"to": "Mines_02[top2]"
				},
				"top1": {
					"x": 12.0,
					"y": 80.5,
					"to": "Mines_05[bot1]"
				},
				"right1": {
					"x": 45.5,
					"y": 41.0,
					"to": "Mines_17[left1]"
				}
			},
			"area": "Mines"
		},
		"Mines_04": {
			"items": {
				"Grub-Crystal_Peak_Below_Chest": {
					"x": 15.14,
					"y": 77.56
				},
				"Geo_Rock-Crystal_Peak_Before_Dark_Room": {
					"x": 29.70548,
					"y": 33.439
				},
				"Geo_Rock-Crystal_Peak_Before_Dark_Room_Dupe": {
					"x": 31.82,
					"y": 34.47
				}
			},
			"transitions": {
				"left2": {
					"x": -0.5,
					"y": 45.0,
					"to": "Mines_29[right1]"
				},
				"left1": {
					"x": -0.5,
					"y": 67.0,
					"to": "Mines_17[right1]"
				},
				"right1": {
					"x": 36.5,
					"y": 56.0,
					"to": "Mines_07[left1]"
				},
				"top1": {
					"x": 22.0,
					"y": 85.5,
					"to": "Mines_37[bot1]"
				},
				"left3": {
					"x": -0.5,
					"y": 7.0,
					"to": "Mines_29[right2]"
				}
			},
			"area": "Mines"
		},
		"Mines_05": {
			"items": {
				"Geo_Rock-Crystal_Peak_Above_Spike_Grub": {
					"x": 8.510585,
					"y": 13.58
				}
			},
			"transitions": {
				"left2": {
					"x": -0.5,
					"y": 22.0,
					"to": "Mines_06[right1]"
				},
				"left1": {
					"x": -0.5,
					"y": 69.0,
					"to": "Mines_30[right1]"
				},
				"right1": {
					"x": 35.5,
					"y": 33.0,
					"to": "Mines_19[left1]"
				},
				"top1": {
					"x": 15.0,
					"y": 74.5,
					"to": "Mines_11[bot1]"
				},
				"bot1": {
					"x": 7.0,
					"y": -0.5,
					"to": "Mines_03[top1]"
				}
			},
			"area": "Mines"
		},
		"Mines_06": {
			"name": "Path to Deep Focus",
			"items": {},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 16.0,
					"to": "Mines_36[right1]"
				},
				"right1": {
					"x": 150.5,
					"y": 11.0,
					"to": "Mines_05[left2]"
				}
			},
			"area": "Mines"
		},
		"Mines_07": {
			"name": "Dark Path East",
			"items": {},
			"transitions": {
				"right1": {
					"x": 120.5,
					"y": 6.0,
					"to": "Mines_28[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 7.0,
					"to": "Mines_04[right1]"
				}
			},
			"area": "Mines"
		},
		"Mines_10": {
			"items": {
				"Grimmkin_Flame-Crystal_Peak": {
					"x": 110.63,
					"y": 6.9
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 11.0,
					"to": "Town[right1]"
				},
				"right1": {
					"x": 187.5,
					"y": 11.0,
					"to": "Mines_30[left1]"
				},
				"bot1": {
					"x": 32.0,
					"y": -0.5,
					"to": "Mines_16[top1]"
				}
			},
			"area": "Mines"
		},
		"Mines_11": {
			"name": "Shopkeeper's Key",
			"items": {
				"Shopkeeper's_Key": {
					"x": 34.8,
					"y": 40.47
				}
			},
			"transitions": {
				"top1": {
					"x": 17.0,
					"y": 65.5,
					"to": "Mines_13[bot1]"
				},
				"bot1": {
					"x": 13.0,
					"y": -0.5,
					"to": "Mines_05[top1]"
				},
				"right1": {
					"x": 43.5,
					"y": 22.0,
					"to": "Mines_18[left1]"
				}
			},
			"area": "Mines"
		},
		"Mines_13": {
			"name": "Northwest Bench",
			"items": {},
			"transitions": {
				"right1": {
					"x": 100.5,
					"y": 16.0,
					"to": "Mines_20[left1]"
				},
				"top1": {
					"x": 86.5,
					"y": 50.0,
					"to": "Mines_34[left1]"
				},
				"bot1": {
					"x": 31.0,
					"y": -0.5,
					"to": "Mines_11[top1]"
				}
			},
			"area": "Mines"
		},
		"Mines_16": {
			"name": "Fake Grub",
			"items": {
				"Grub-Crystal_Peak_Mimic": {
					"x": 54.57355,
					"y": 22.58792
				},
				"Geo_Rock-Crystal_Peak_Mimic_Grub": {
					"x": 37.44095,
					"y": 20.31845
				}
			},
			"transitions": {
				"top1": {
					"x": 22.0,
					"y": 35.5,
					"to": "Mines_10[bot1]"
				}
			},
			"area": "Mines"
		},
		"Mines_17": {
			"items": {},
			"transitions": {
				"right1": {
					"x": 75.5,
					"y": 12.0,
					"to": "Mines_04[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 12.0,
					"to": "Mines_03[right1]"
				}
			},
			"area": "Mines"
		},
		"Mines_18": {
			"name": "Crystal Guradian",
			"boss": "Crystal Guradian",
			"items": {
				"Boss_Geo-Crystal_Guardian": {
					"x": 34.0,
					"y": 11.5
				}
			},
			"transitions": {
				"top1": {
					"x": 56.0,
					"y": 30.5,
					"to": "Mines_32[bot1]"
				},
				"right1": {
					"x": 65.5,
					"y": 12.0,
					"to": "Mines_20[left2]"
				},
				"left1": {
					"x": -0.5,
					"y": 12.0,
					"to": "Mines_11[right1]"
				}
			},
			"area": "Mines"
		},
		"Mines_19": {
			"name": "Crushers & Grub",
			"items": {
				"Grub-Crystal_Peak_Crushers": {
					"x": 38.85,
					"y": 26.51163
				}
			},
			"transitions": {
				"right1": {
					"x": 60.5,
					"y": 7.0,
					"to": "Mines_20[left3]"
				},
				"left1": {
					"x": -0.5,
					"y": 7.0,
					"to": "Mines_05[right1]"
				}
			},
			"area": "Mines"
		},
		"Mines_20": {
			"items": {
				"Rancid_Egg-Crystal_Peak_Tall_Room": {
					"x": 30.87,
					"y": 149.33
				},
				"Wanderer's_Journal-Crystal_Peak_Crawlers": {
					"x": 47.07985,
					"y": 174.26
				},
				"Geo_Rock-Crystal_Peak_Dive_Egg": {
					"x": 8.27,
					"y": 149.22
				},
				"Geo_Rock-Crystal_Peak_Dive_Egg_Dupe": {
					"x": 23.68,
					"y": 157.0
				},
				"Geo_Rock-Crystal_Peak_Conga_Line": {
					"x": 59.93,
					"y": 163.48
				},
				"Soul_Totem-Upper_Crystal_Peak": {
					"x": 31.26292,
					"y": 76.11015
				}
			},
			"transitions": {
				"left2": {
					"x": -0.5,
					"y": 120.0,
					"to": "Mines_18[right1]"
				},
				"bot1": {
					"x": 39.0,
					"y": 59.5,
					"to": "Mines_37[top1]"
				},
				"left3": {
					"x": -0.5,
					"y": 64.0,
					"to": "Mines_19[right1]"
				},
				"left1": {
					"x": -0.5,
					"y": 187.0,
					"to": "Mines_13[right1]"
				},
				"right2": {
					"x": 75.5,
					"y": 64.0,
					"to": "Mines_31[left1]"
				},
				"right1": {
					"x": 75.5,
					"y": 196.0,
					"to": "Mines_23[left1]"
				}
			},
			"area": "Mines"
		},
		"Mines_23": {
			"items": {
				"Whispering_Root-Crystal_Peak": {
					"x": 91.6,
					"y": 8.0
				}
			},
			"transitions": {
				"right2": {
					"x": 180.5,
					"y": 6.0,
					"to": "Mines_24[left1]"
				},
				"top1": {
					"x": 32.5,
					"y": 40.5,
					"to": "Mines_34[bot2]"
				},
				"right1": {
					"x": 180.5,
					"y": 28.0,
					"to": "Mines_25[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 13.0,
					"to": "Mines_20[right1]"
				}
			},
			"area": "Mines"
		},
		"Mines_24": {
			"name": "Grub Betwixt Spikes",
			"items": {
				"Grub-Hallownest_Crown": {
					"x": 51.14,
					"y": 6.61
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 8.0,
					"to": "Mines_23[right2]"
				}
			},
			"area": "Mines"
		},
		"Mines_25": {
			"name": "Peak Climb",
			"items": {
				"Geo_Rock-Hallownest_Crown_Dive": {
					"x": 14.03,
					"y": 52.63
				},
				"Geo_Rock-Hallownest_Crown_Dive_Dupe": {
					"x": 16.30236,
					"y": 51.62914
				},
				"Geo_Rock-Hallownest_Crown_Hidden": {
					"x": 22.24,
					"y": 100.14
				},
				"Geo_Rock-Hallownest_Crown_Hidden_Dupe_1": {
					"x": 25.68,
					"y": 95.57
				},
				"Geo_Rock-Hallownest_Crown_Hidden_Dupe_2": {
					"x": 35.54,
					"y": 95.6
				},
				"Soul_Totem-Hallownest_Crown": {
					"x": 52.87,
					"y": 35.7
				}
			},
			"transitions": {
				"top1": {
					"x": 6.0,
					"y": 130.5,
					"to": "Mines_34[bot1]"
				},
				"left1": {
					"x": -0.5,
					"y": 21.0,
					"to": "Mines_23[right1]"
				}
			},
			"area": "Mines"
		},
		"Mines_28": {
			"name": "Outside Crystallized Mound",
			"items": {
				"Soul_Totem-Outside_Crystallized_Mound": {
					"x": 90.93,
					"y": 49.31011
				}
			},
			"transitions": {
				"door1": {
					"x": 81.2,
					"y": 47.56,
					"to": "Mines_35[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 49.0,
					"to": "Mines_07[right1]"
				},
				"bot1": {
					"x": 20.0,
					"y": -0.5,
					"to": "RestingGrounds_02[top1]"
				}
			},
			"area": "Mines"
		},
		"Mines_29": {
			"name": "Southeast Bench",
			"items": {
				"Rancid_Egg-Crystal_Peak_Dark_Room": {
					"x": 5.45,
					"y": 58.31
				}
			},
			"transitions": {
				"right2": {
					"x": 45.5,
					"y": 13.0,
					"to": "Mines_04[left3]"
				},
				"right1": {
					"x": 45.5,
					"y": 57.0,
					"to": "Mines_04[left2]"
				},
				"left1": {
					"x": -0.5,
					"y": 4.0,
					"to": "Mines_02[right1]"
				}
			},
			"area": "Mines"
		},
		"Mines_30": {
			"name": "Conifer",
			"items": {
				"King's_Idol-Crystal_Peak": {
					"x": 160.68,
					"y": 16.83706
				},
				"Crystal_Peak_Map": {
					"x": 157.0,
					"y": 8.4
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 9.0,
					"to": "Mines_10[right1]"
				},
				"right1": {
					"x": 180.5,
					"y": 11.0,
					"to": "Mines_05[left1]"
				}
			},
			"area": "Mines"
		},
		"Mines_31": {
			"name": "Superdash",
			"items": {
				"Crystal_Heart": {
					"x": 243.63,
					"y": 9.29
				},
				"Grub-Crystal_Heart": {
					"x": 29.48,
					"y": 33.60351
				},
				"Geo_Rock-Crystal_Peak_Before_Crystal_Heart": {
					"x": 38.1,
					"y": 11.38
				},
				"Soul_Totem-Crystal_Heart_1": {
					"x": 81.141,
					"y": 51.512
				},
				"Soul_Totem-Crystal_Heart_2": {
					"x": 240.6007,
					"y": 41.33
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 20.0,
					"to": "Mines_20[right2]"
				}
			},
			"area": "Mines"
		},
		"Mines_32": {
			"name": "Enraged Guardian",
			"boss": "Enraged Guardian",
			"items": {
				"Mask_Shard-Enraged_Guardian": {
					"x": 8.8,
					"y": 13.11
				},
				"Boss_Geo-Enraged_Guardian": {
					"x": 30.0,
					"y": 11.5
				}
			},
			"transitions": {
				"bot1": {
					"x": 56.0,
					"y": -0.5,
					"to": "Mines_18[top1]"
				}
			},
			"area": "Mines"
		},
		"Mines_33": {
			"name": "Dark Toll Entrance",
			"items": {
				"Geo_Rock-Crystal_Peak_Entrance": {
					"x": 42.5,
					"y": 2.6
				},
				"Geo_Rock-Crystal_Peak_Entrance_Dupe_1": {
					"x": 39.22,
					"y": 2.6
				},
				"Geo_Rock-Crystal_Peak_Entrance_Dupe_2": {
					"x": 70.65,
					"y": 2.6
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 9.0,
					"to": "Crossroads_03[right2]"
				},
				"right1": {
					"x": 100.5,
					"y": 8.0,
					"to": "Mines_02[left1]"
				}
			},
			"area": "Mines"
		},
		"Mines_34": {
			"name": "Hallownest's Crown",
			"items": {
				"Pale_Ore-Crystal_Peak": {
					"x": 43.67134,
					"y": 53.9633
				}
			},
			"transitions": {
				"right1": {
					"x": 193.5,
					"y": 50.0,
					"to": "Mines_13[top1]"
				},
				"bot2": {
					"x": 15.5,
					"y": -2.0,
					"to": "Mines_23[top1]"
				},
				"bot1": {
					"x": 166.0,
					"y": -0.5,
					"to": "Mines_25[top1]"
				},
				"left1": {
					"x": -3.5,
					"y": 40.0,
					"to": "Mines_13[top1]"
				}
			},
			"area": "Mines"
		},
		"Mines_35": {
			"name": "Crystallized Mound",
			"items": {
				"Descending_Dark": {
					"x": 59.62053,
					"y": 51.4621
				},
				"Grub-Crystallized_Mound": {
					"x": 107.0188,
					"y": 69.4743
				},
				"Soul_Totem-Crystallized_Mound": {
					"x": 52.74961,
					"y": 35.24077
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 49.0,
					"to": "Mines_28[door1]"
				}
			},
			"area": "Mines"
		},
		"Mines_36": {
			"name": "Deep Focus",
			"items": {
				"Deep_Focus": {
					"x": 23.86,
					"y": 9.27
				}
			},
			"transitions": {
				"right1": {
					"x": 43.5,
					"y": 23.0,
					"to": "Mines_06[left1]"
				}
			},
			"area": "Mines"
		},
		"Mines_37": {
			"name": "Crushers & Cash",
			"items": {
				"80_Geo-Crystal_Peak_Chest": {
					"x": 28.89,
					"y": 15.79
				},
				"Geo_Rock-Crystal_Peak_Above_Crushers_Lower": {
					"x": 20.62,
					"y": 23.64
				},
				"Geo_Rock-Crystal_Peak_Above_Crushers_Higher": {
					"x": 21.35,
					"y": 46.39
				}
			},
			"transitions": {
				"bot1": {
					"x": 32.0,
					"y": -0.5,
					"to": "Mines_04[top1]"
				},
				"top1": {
					"x": 38.0,
					"y": 65.5,
					"to": "Mines_20[bot1]"
				}
			},
			"area": "Mines"
		},
		"RestingGrounds_02": {
			"name": "Xero",
			"boss": "Xero",
			"items": {},
			"transitions": {
				"top1": {
					"x": 109.0,
					"y": 26.0,
					"to": "Mines_28[bot1]"
				},
				"bot1": {
					"x": 98.0,
					"y": 1.5,
					"to": "RestingGrounds_06[top1]"
				},
				"right1": {
					"x": 129.5,
					"y": 6.0,
					"to": "RestingGrounds_04[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 14.0,
					"to": "Crossroads_46b[right1]"
				}
			},
			"area": "RestingGrounds"
		},
		"RestingGrounds_04": {
			"name": "Dreamer's Interruption",
			"items": {},
			"transitions": {
				"right1": {
					"x": 110.5,
					"y": 6.0,
					"to": "RestingGrounds_05[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 6.0,
					"to": "RestingGrounds_02[right1]"
				}
			},
			"area": "RestingGrounds"
		},
		"RestingGrounds_05": {
			"name": "Hub",
			"items": {
				"Whispering_Root-Resting_Grounds": {
					"x": 15.7,
					"y": 69.4
				},
				"Soul_Totem-Resting_Grounds": {
					"x": 34.48,
					"y": 35.78
				}
			},
			"transitions": {
				"right2": {
					"x": 45.5,
					"y": 55.0,
					"to": "RestingGrounds_09[left1]"
				},
				"right1": {
					"x": 33.5,
					"y": 77.0,
					"to": "RestingGrounds_08[left1]"
				},
				"bot1": {
					"x": 34.5,
					"y": -0.5,
					"to": "RestingGrounds_10[top1]"
				},
				"left3": {
					"x": 1.5,
					"y": 55.0,
					"to": "RestingGrounds_17[right1]"
				},
				"left2": {
					"x": 2.0,
					"y": 79.0,
					"to": "RestingGrounds_07[right1]"
				},
				"left1": {
					"x": -0.5,
					"y": 4.0,
					"to": "RestingGrounds_04[right1]"
				}
			},
			"area": "RestingGrounds"
		},
		"RestingGrounds_06": {
			"name": "Lower West Resting Grounds",
			"items": {
				"Grimmkin_Flame-Resting_Grounds": {
					"x": 31.05,
					"y": 19.96
				},
				"Soul_Totem-Below_Xero": {
					"x": 5.221,
					"y": 15.346
				}
			},
			"transitions": {
				"top1": {
					"x": 8.0,
					"y": 30.5,
					"to": "RestingGrounds_02[bot1]"
				},
				"left1": {
					"x": -0.5,
					"y": 8.0,
					"to": "Crossroads_50[right1]"
				},
				"right1": {
					"x": 110.5,
					"y": 8.0,
					"to": "Ruins2_10[left1]"
				}
			},
			"area": "RestingGrounds"
		},
		"RestingGrounds_07": {
			"name": "Moth Seer",
			"items": {
				"Dream_Gate": {
					"x": 30.0,
					"y": 10.0
				},
				"Awoken_Dream_Nail": {
					"x": 21.0,
					"y": 10.0
				},
				"Dream_Wielder": {
					"x": 36.0,
					"y": 10.0
				},
				"Mask_Shard-Seer": {
					"x": 24.0,
					"y": 10.0
				},
				"Vessel_Fragment-Seer": {
					"x": 33.0,
					"y": 10.0
				},
				"Pale_Ore-Seer": {
					"x": 39.0,
					"y": 10.0
				},
				"Hallownest_Seal-Seer": {
					"x": 42.0,
					"y": 10.0
				},
				"Arcane_Egg-Seer": {
					"x": 27.0,
					"y": 10.0
				}
			},
			"transitions": {
				"right1": {
					"x": 45.0,
					"y": 10.0,
					"to": "RestingGrounds_05[left2]"
				},
				"door_dreamReturn": {
					"x": 25.96,
					"y": 8.71,
					"to": null
				}
			},
			"area": "RestingGrounds"
		},
		"RestingGrounds_08": {
			"name": "Spirit's Glade",
			"items": {
				"King's_Idol-Glade_of_Hope": {
					"x": 196.51,
					"y": 26.2981
				},
				"Whispering_Root-Spirits_Glade": {
					"x": 153.4,
					"y": 56.5
				}
			},
			"transitions": {
				"door_dreamReturn": {
					"x": 192.83,
					"y": 26.63,
					"to": null
				},
				"left1": {
					"x": 13.5,
					"y": 8.0,
					"to": "RestingGrounds_05[right1]"
				}
			},
			"area": "RestingGrounds"
		},
		"RestingGrounds_09": {
			"name": "Stag Station",
			"stag": "RestingGrounds",
			"items": {
				"Resting_Grounds_Map": {
					"x": 8.2,
					"y": 6.1
				},
				"Resting_Grounds_Stag": {
					"x": 27.6,
					"y": 6.4
				}
			},
			"transitions": {
				"door_stagExit": {
					"x": 31.78,
					"y": 5.74,
					"to": null
				},
				"left1": {
					"x": -0.5,
					"y": 7.0,
					"to": "RestingGrounds_05[right2]"
				}
			},
			"area": "RestingGrounds"
		},
		"RestingGrounds_10": {
			"name": "Lower Resting Grounds",
			"items": {
				"Soul_Eater": {
					"x": 216.01,
					"y": 18.13
				},
				"150_Geo-Resting_Grounds_Chest": {
					"x": 142.97,
					"y": 8.822608
				},
				"Wanderer's_Journal-Resting_Grounds_Catacombs": {
					"x": 220.8222,
					"y": 3.300061
				},
				"Hallownest_Seal-Resting_Grounds_Catacombs": {
					"x": 62.42,
					"y": 13.18
				},
				"Grub-Resting_Grounds": {
					"x": 117.5218,
					"y": 17.44987
				},
				"Geo_Rock-Resting_Grounds_Catacombs_Grub": {
					"x": 96.92,
					"y": 17.64
				},
				"Geo_Rock-Resting_Grounds_Catacombs_Left_Dupe": {
					"x": 33.63,
					"y": 14.61942
				},
				"Geo_Rock-Resting_Grounds_Catacombs_Left": {
					"x": 46.55,
					"y": 14.6
				}
			},
			"transitions": {
				"top2": {
					"x": 130.5,
					"y": 30.5,
					"to": "RestingGrounds_12[bot1]"
				},
				"left1": {
					"x": -0.5,
					"y": 12.0,
					"to": "Ruins2_10[right1]"
				},
				"top1": {
					"x": 72.5,
					"y": 30.5,
					"to": "RestingGrounds_05[bot1]"
				}
			},
			"area": "RestingGrounds"
		},
		"RestingGrounds_12": {
			"name": "Outside Grey Mourner",
			"items": {},
			"transitions": {
				"door_Mansion": {
					"x": 62.95,
					"y": 2.74,
					"to": "Room_Mansion[left1]"
				},
				"bot1": {
					"x": 20.5,
					"y": -0.5,
					"to": "RestingGrounds_10[top2]"
				}
			},
			"area": "RestingGrounds"
		},
		"RestingGrounds_17": {
			"name": "Dreamshield",
			"items": {
				"Dreamshield": {
					"x": 15.77643,
					"y": 7.513873
				}
			},
			"transitions": {
				"right1": {
					"x": 70.5,
					"y": 6.0,
					"to": "RestingGrounds_05[left3]"
				}
			},
			"area": "RestingGrounds"
		},
		"Room_Bretta": {
			"name": "Bertta's House",
			"items": {
				"Mask_Shard-Bretta": {
					"x": 19.79,
					"y": 7.674447
				}
			},
			"transitions": {
				"door1": {
					"x": 16.56,
					"y": 5.67,
					"to": null
				},
				"right1": {
					"x": 24.5,
					"y": 7.0,
					"to": "Town[door_bretta]"
				}
			},
			"area": "Room"
		},
		"Room_Bretta_Basement": {
			"name": "Bertta's Basement",
			"boss": "Grey Prince Zote",
			"items": {
				"Boss_Essence-Grey_Prince_Zote": {
					"x": 16.29,
					"y": 7.03
				}
			},
			"transitions": {
				"door_dreamReturn": {
					"x": 17.55,
					"y": 5.63,
					"to": null
				},
				"top1": {
					"x": 20.5,
					"y": 15.0,
					"to": "Room_Bretta[door1]"
				},
				"door1": {
					"x": 20.49,
					"y": 5.52,
					"to": null
				}
			},
			"area": "Room"
		},
		"Room_Charm_Shop": {
			"name": "Salubra's Shop",
			"items": {
				"Quick_Focus": {
					"x": 8.53,
					"y": 0.54
				},
				"Lifeblood_Heart": {
					"x": 8.53,
					"y": 0.54
				},
				"Steady_Body": {
					"x": 8.53,
					"y": 0.54
				},
				"Longnail": {
					"x": 8.53,
					"y": 0.54
				},
				"Shaman_Stone": {
					"x": 8.53,
					"y": 0.54
				}
			},
			"transitions": {
				"left1": {
					"x": 11.5,
					"y": 7.0,
					"to": "Crossroads_04[door_charmshop]"
				}
			},
			"area": "Room"
		},
		"Room_Colosseum_01": {
			"name": "Colosseum Entrance",
			"items": {},
			"transitions": {
				"bot1": {
					"x": 44.0,
					"y": 3.0,
					"to": "Room_Colosseum_02[top1]"
				},
				"left1": {
					"x": 13.5,
					"y": 9.0,
					"to": "Deepnest_East_09[right1]"
				},
				"right1": {
					"x": 60.5,
					"y": 9.0,
					"to": "[left1]"
				}
			},
			"area": "Room"
		},
		"Room_Colosseum_02": {
			"name": "Colosseum Bench",
			"items": {},
			"transitions": {
				"top1": {
					"x": 43.5,
					"y": 56.0,
					"to": "Room_Colosseum_01[bot1]"
				},
				"top2": {
					"x": 135.5,
					"y": 56.0,
					"to": "Room_Colosseum_Spectate[bot1]"
				}
			},
			"area": "Room"
		},
		"Room_Colosseum_Spectate": {
			"name": "Colosseum Spectate",
			"items": {},
			"transitions": {
				"right1": {
					"x": 176.0,
					"y": 9.0,
					"to": "GG_Lurker[left1]"
				},
				"bot1": {
					"x": 135.0,
					"y": 2.5,
					"to": "Room_Colosseum_02[top2]"
				}
			},
			"area": "Room"
		},
		"Room_Fungus_Shaman": {
			"name": "Howling Wraiths",
			"items": {
				"Howling_Wraiths": {
					"x": 132.99,
					"y": 11.83
				},
				"Geo_Rock-Overgrown_Mound": {
					"x": 126.85,
					"y": 29.64
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 11.0,
					"to": "Fungus3_44[door1]"
				}
			},
			"area": "Room"
		},
		"Room_GG_Shortcut": {
			"name": "Junk Pit Shortcut",
			"items": {
				"Geo_Rock-Fluke_Hermit_Dupe": {
					"x": 8.93,
					"y": 74.08
				},
				"Geo_Rock-Fluke_Hermit": {
					"x": 8.394572,
					"y": 85.12244
				}
			},
			"transitions": {
				"top1": {
					"x": 4.5,
					"y": 108.5,
					"to": "Ruins1_04[bot1]"
				},
				"left1": {
					"x": 28.5,
					"y": 5.0,
					"to": "GG_Waterways[door1]"
				}
			},
			"area": "Room"
		},
		"Room_Jinn": {
			"name": "Jiji & Jinn",
			"items": {},
			"transitions": {
				"left1": {
					"x": 10.0,
					"y": 8.0,
					"to": "Town[door_jiji]"
				}
			},
			"area": "Room"
		},
		"Room_Mansion": {
			"name": "Grey Mourner",
			"items": {
				"Mask_Shard-Grey_Mourner": {
					"x": 22.21745,
					"y": 8.223626
				}
			},
			"transitions": {
				"left1": {
					"x": 11.0,
					"y": 7.0,
					"to": "RestingGrounds_12[door_Mansion]"
				}
			},
			"area": "Room"
		},
		"Room_Mask_Maker": {
			"name": "Mask Maker",
			"items": {},
			"transitions": {
				"right1": {
					"x": 60.5,
					"y": 7.0,
					"to": "Deepnest_42[left1]"
				}
			},
			"area": "Room"
		},
		"Room_Mender_House": {
			"name": "Menderbug's House",
			"items": {},
			"transitions": {
				"left1": {
					"x": 11.5,
					"y": 7.0,
					"to": "Crossroads_04[door_Mender_House]"
				}
			},
			"area": "Room"
		},
		"Room_Ouiji": {
			"name": "Jiji & Jinn",
			"items": {},
			"transitions": {
				"left1": {
					"x": 10.0,
					"y": 8.0,
					"to": "Town[door_jiji]"
				}
			},
			"area": "Room"
		},
		"Room_Queen": {
			"name": "White Lady",
			"items": {
				"Queen_Fragment": {
					"x": 70.44,
					"y": 12.33
				}
			},
			"transitions": {
				"left1": {
					"x": 4.5,
					"y": 45.0,
					"to": "Fungus3_48[door1]"
				}
			},
			"area": "Room"
		},
		"Room_Slug_Shrine": {
			"name": "Lake of Unn Bench",
			"items": {},
			"transitions": {
				"left1": {
					"x": 11.5,
					"y": 7.0,
					"to": "Fungus1_26[door_SlugShrine]"
				}
			},
			"area": "Room"
		},
		"Room_Sly_Storeroom": {
			"name": "Sly's Basement",
			"items": {
				"Nailmaster's_Glory": {
					"x": 75.77,
					"y": 4.093942
				}
			},
			"transitions": {
				"top1": {
					"x": 16.0,
					"y": 16.5,
					"to": "Room_shop[door1]"
				},
				"door1": {
					"x": 16.01,
					"y": 3.65,
					"to": null
				}
			},
			"area": "Room"
		},
		"Room_Town_Stag_Station": {
			"name": "Dirtmouth Stag",
			"stag": "Town",
			"items": {
				"Dirtmouth_Stag": {
					"x": 39.4,
					"y": 20.4
				}
			},
			"transitions": {
				"door_stagExit": {
					"x": 55.64,
					"y": 5.74,
					"to": null
				},
				"left1": {
					"x": 23.0,
					"y": 21.0,
					"to": "Town[door_station]"
				}
			},
			"area": "Room"
		},
		"Room_Wyrm": {
			"name": "Cast off Shell",
			"items": {
				"King's_Brand": {
					"x": 15.59,
					"y": 7.92
				}
			},
			"transitions": {
				"right1": {
					"x": 108.5,
					"y": 12.0,
					"to": "Deepnest_East_Hornet[left2]"
				}
			},
			"area": "Room"
		},
		"Room_Final_Boss_Atrium": {
			"name": "Outside Hollow Knight",
			"items": {
				"World_Sense": {
					"x": 202.0,
					"y": 7.0
				},
				"Lore_Tablet-World_Sense": {
					"x": 202.3,
					"y": 7.6
				}
			},
			"transitions": {
				"left1": {
					"x": 6.5,
					"y": 9.0,
					"to": "Room_temple[door1]"
				},
				"right1": {
					"x": 246.0,
					"y": 9.0,
					"to": "Room_Final_Boss_Core[left1]"
				}
			},
			"area": "Room"
		},
		"Room_mapper": {
			"name": "Conifer's Shop",
			"items": {
				"Wayward_Compass": {
					"x": 8.53,
					"y": 0.54
				}
			},
			"transitions": {
				"left1": {
					"x": 11.5,
					"y": 7.0,
					"to": "Town[door_mapper]"
				}
			},
			"area": "Room"
		},
		"Room_nailmaster": {
			"name": "Nailmaster Mato",
			"items": {
				"Cyclone_Slash": {
					"x": 68.33,
					"y": 5.88
				}
			},
			"transitions": {
				"left1": {
					"x": 11.0,
					"y": 5.0,
					"to": "Cliffs_02[door1]"
				}
			},
			"area": "Room"
		},
		"Room_nailmaster_02": {
			"name": "Nailmaster Sheo",
			"items": {
				"Great_Slash": {
					"x": 33.83,
					"y": 5.89
				}
			},
			"transitions": {
				"left1": {
					"x": 10.0,
					"y": 5.0,
					"to": "Fungus1_15[door1]"
				}
			},
			"area": "Room"
		},
		"Room_nailmaster_03": {
			"name": "Nailmaster Oro",
			"items": {
				"Dash_Slash": {
					"x": 30.71,
					"y": 5.86
				}
			},
			"transitions": {
				"left1": {
					"x": 10.0,
					"y": 5.0,
					"to": "Deepnest_East_06[door1]"
				}
			},
			"area": "Room"
		},
		"Room_nailsmith": {
			"name": "Nailsmith",
			"items": {},
			"transitions": {
				"left1": {
					"x": 8.5,
					"y": 5.5,
					"to": "Ruins1_04[door1]"
				}
			},
			"area": "Room"
		},
		"Room_ruinhouse": {
			"name": "Infected Sly",
			"items": {},
			"transitions": {
				"left1": {
					"x": 9.5,
					"y": 7.5,
					"to": "Crossroads_04[door1]"
				}
			},
			"area": "Room"
		},
		"Room_shop": {
			"name": "Sly's Shop",
			"items": {
				"Gathering_Swarm": {
					"x": 8.53,
					"y": 0.54
				},
				"Stalwart_Shell": {
					"x": 8.53,
					"y": 0.54
				},
				"Heavy_Blow": {
					"x": 8.53,
					"y": 0.54
				},
				"Sprintmaster": {
					"x": 8.53,
					"y": 0.54
				},
				"Lumafly_Lantern": {
					"x": 8.53,
					"y": 0.54
				},
				"Simple_Key-Sly": {
					"x": 8.53,
					"y": 0.54
				},
				"Elegant_Key": {
					"x": 8.53,
					"y": 0.54
				},
				"Mask_Shard-Sly1": {
					"x": 8.53,
					"y": 0.54
				},
				"Mask_Shard-Sly2": {
					"x": 8.53,
					"y": 0.54
				},
				"Mask_Shard-Sly3": {
					"x": 8.53,
					"y": 0.54
				},
				"Mask_Shard-Sly4": {
					"x": 8.53,
					"y": 0.54
				},
				"Vessel_Fragment-Sly1": {
					"x": 8.53,
					"y": 0.54
				},
				"Vessel_Fragment-Sly2": {
					"x": 8.53,
					"y": 0.54
				},
				"Rancid_Egg-Sly": {
					"x": 8.53,
					"y": 0.54
				}
			},
			"transitions": {
				"left1": {
					"x": 9.5,
					"y": 7.0,
					"to": "Town[door_sly]"
				},
				"door1": {
					"x": 19.07,
					"y": 5.687180000000001,
					"to": null
				}
			},
			"area": "Room"
		},
		"Room_spider_small": {
			"name": "Brumm's Betrayal",
			"items": {
				"Grimmkin_Flame-Brumm": {
					"x": 25.48,
					"y": 14.58036
				}
			},
			"transitions": {
				"left1": {
					"x": 12.5,
					"y": 14.0,
					"to": "Deepnest_10[door2]"
				}
			},
			"area": "Room"
		},
		"Room_temple": {
			"name": "Black Egg Temple",
			"items": {},
			"transitions": {
				"door1": {
					"x": 35.410000000000004,
					"y": 4.57,
					"to": null
				},
				"left1": {
					"x": 2.0,
					"y": 5.0,
					"to": "Crossroads_02[door1]"
				}
			},
			"area": "Room"
		},
		"Ruins1_01": {
			"items": {},
			"transitions": {
				"bot1": {
					"x": 95.0,
					"y": -0.5,
					"to": "Ruins1_02[top1]"
				},
				"left1": {
					"x": -0.5,
					"y": 18.0,
					"to": "Fungus2_21[right1]"
				},
				"top1": {
					"x": 52.0,
					"y": 35.5,
					"to": "Ruins1_17[bot1]"
				}
			},
			"area": "Ruins1"
		},
		"Ruins1_02": {
			"name": "Early City Bench",
			"items": {
				"Lore_Tablet-City_Entrance": {
					"x": 24.6,
					"y": 27.7
				}
			},
			"transitions": {
				"bot1": {
					"x": 7.0,
					"y": -0.5,
					"to": "Ruins1_03[top1]"
				},
				"top1": {
					"x": 11.0,
					"y": 76.5,
					"to": "Ruins1_01[bot1]"
				}
			},
			"area": "Ruins1"
		},
		"Ruins1_03": {
			"items": {
				"Hallownest_Seal-City_Rafters": {
					"x": 80.63922,
					"y": 57.23
				},
				"Geo_Rock-City_of_Tears_Quirrel": {
					"x": 36.75154,
					"y": 42.44101
				}
			},
			"transitions": {
				"right2": {
					"x": 150.5,
					"y": 10.0,
					"to": "Ruins1_05b[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 11.0,
					"to": "Ruins1_04[right1]"
				},
				"top1": {
					"x": 28.0,
					"y": 70.5,
					"to": "Ruins1_02[bot1]"
				},
				"right1": {
					"x": 148.5,
					"y": 43.0,
					"to": "Ruins1_05c[left2]"
				}
			},
			"area": "Ruins1"
		},
		"Ruins1_04": {
			"name": "Outside Nailsmith",
			"items": {},
			"transitions": {
				"door1": {
					"x": 38.42376,
					"y": 35.69,
					"to": "Room_nailmsith[left1]"
				},
				"right1": {
					"x": 150.5,
					"y": 9.0,
					"to": "Ruins1_03[left1]"
				},
				"bot1": {
					"x": 15.0,
					"y": -0.5,
					"to": "Room_GG_Shortcut[top1]"
				}
			},
			"area": "Ruins1"
		},
		"Ruins1_05": {
			"splitRoom": [
				[
					"bot1",
					"bot2"
				],
				[
					"bot3",
					"right1",
					"right2",
					"top1"
				]
			],
			"items": {
				"Grub-City_of_Tears_Left": {
					"x": 50.89,
					"y": 142.4444
				}
			},
			"transitions": {
				"bot2": {
					"x": 32.0,
					"y": 102.5,
					"to": "Ruins1_05c[top2]"
				},
				"bot3": {
					"x": 55.0,
					"y": 102.5,
					"to": "Ruins1_05c[top3]"
				},
				"right2": {
					"x": 65.5,
					"y": 109.0,
					"to": "Ruins1_18[left1]"
				},
				"top1": {
					"x": 9.0,
					"y": 167.5,
					"to": "Ruins1_31[bot1]"
				},
				"right1": {
					"x": 63.5,
					"y": 153.5,
					"to": "Ruins1_09[left1]"
				},
				"bot1": {
					"x": 20.0,
					"y": 102.5,
					"to": "Ruins1_05c[top1]"
				}
			},
			"area": "Ruins1"
		},
		"Ruins1_05b": {
			"name": "Relic Seeker Lemm",
			"items": {
				"Geo_Rock-City_of_Tears_Lemm": {
					"x": 8.906898,
					"y": 29.40452
				}
			},
			"transitions": {
				"right1": {
					"x": 65.5,
					"y": 9.0,
					"to": "Ruins1_27[left1]"
				},
				"bot1": {
					"x": 32.0,
					"y": 3.0,
					"to": "Waterways_01[top1]"
				},
				"left1": {
					"x": -0.5,
					"y": 9.0,
					"to": "Ruins1_03[right2]"
				},
				"top1": {
					"x": 29.0,
					"y": 35.5,
					"to": "Ruins1_05c[bot1]"
				}
			},
			"area": "Ruins1"
		},
		"Ruins1_05c": {
			"items": {
				"Rancid_Egg-City_of_Tears_Left": {
					"x": 33.99,
					"y": 92.15
				},
				"Geo_Rock-City_of_Tears_Above_Lemm": {
					"x": 34.15294,
					"y": 69.40981
				}
			},
			"transitions": {
				"bot1": {
					"x": 29.0,
					"y": 32.5,
					"to": "Ruins1_05b[top1]"
				},
				"top3": {
					"x": 54.0,
					"y": 113.5,
					"to": "Ruins1_05[bot3]"
				},
				"left2": {
					"x": 1.0,
					"y": 39.0,
					"to": "Ruins1_03[right1]"
				},
				"top1": {
					"x": 20.0,
					"y": 113.5,
					"to": "Ruins1_05[bot1]"
				},
				"top2": {
					"x": 32.0,
					"y": 113.5,
					"to": "Ruins1_05[bot2]"
				}
			},
			"area": "Ruins1"
		},
		"Ruins1_06": {
			"name": "Zote Likes to Hang Out Here",
			"items": {},
			"transitions": {
				"right1": {
					"x": 100.5,
					"y": 19.0,
					"to": "Ruins1_31[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 19.0,
					"to": "Ruins1_17[right1]"
				}
			},
			"area": "Ruins1"
		},
		"Ruins1_09": {
			"name": "Soul Twister Miniboss",
			"items": {},
			"transitions": {
				"left1": {
					"x": 1.0,
					"y": 19.0,
					"to": "Ruins1_05[right1]"
				},
				"top1": {
					"x": 31.0,
					"y": 29.5,
					"to": "Ruins1_23[bot1]"
				}
			},
			"area": "Ruins1"
		},
		"Ruins1_17": {
			"name": "Platforms",
			"items": {
				"Simple_Key-City": {
					"x": 79.14,
					"y": 49.12
				},
				"Whispering_Root-City": {
					"x": 78.0,
					"y": 22.0
				}
			},
			"transitions": {
				"right1": {
					"x": 90.5,
					"y": 4.0,
					"to": "Ruins1_06[left1]"
				},
				"top1": {
					"x": 7.0,
					"y": 70.5,
					"to": "Ruins1_28[bot1]"
				},
				"bot1": {
					"x": 7.0,
					"y": -0.5,
					"to": "Ruins1_01[top1]"
				}
			},
			"area": "Ruins1"
		},
		"Ruins1_18": {
			"name": "Tower Shortcut",
			"splitRoom": [
				[
					"right1"
				],
				[
					"right2",
					"left1"
				]
			],
			"items": {},
			"transitions": {
				"right1": {
					"x": 90.5,
					"y": 23.0,
					"to": "Ruins2_03b[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 23.0,
					"to": "Ruins1_05[right2]"
				},
				"right2": {
					"x": 90.5,
					"y": 10.0,
					"to": "Ruins2_01[left2]"
				}
			},
			"area": "Ruins1"
		},
		"Ruins1_23": {
			"name": "Soul Sanctum Entrance",
			"boss": "Soul Warrior",
			"items": {
				"Boss_Geo-Sanctum_Soul_Warrior": {
					"x": 30.0,
					"y": 75.0
				},
				"Lore_Tablet-Sanctum_Entrance": {
					"x": 41.1,
					"y": 67.9
				}
			},
			"transitions": {
				"bot1": {
					"x": 38.0,
					"y": -0.5,
					"to": "Ruins1_09[top1]"
				},
				"right1": {
					"x": 50.5,
					"y": 75.0,
					"to": "Ruins1_25[left2]"
				},
				"right2": {
					"x": 50.5,
					"y": 29.0,
					"to": "Ruins1_25[left3]"
				},
				"top1": {
					"x": 34.0,
					"y": 86.5,
					"to": "Ruins1_30[bot1]"
				},
				"left1": {
					"x": -0.5,
					"y": 4.0,
					"to": "Ruins1_31[right1]"
				}
			},
			"area": "Ruins1"
		},
		"Ruins1_24": {
			"name": "Soul Master",
			"boss": "Soul Master, Soul Tyrant",
			"splitRoom": [
				[
					"left1",
					"right1"
				],
				[
					"left2",
					"right2"
				]
			],
			"items": {
				"Desolate_Dive": {
					"x": 24.550002,
					"y": 13.53999885
				},
				"Soul_Totem-Sanctum_Below_Soul_Master": {
					"x": 56.9,
					"y": 5.0
				}
			},
			"transitions": {
				"right2": {
					"x": 70.5,
					"y": 9.0,
					"to": "Ruins1_30[left2]"
				},
				"door_dreamReturn": {
					"x": 31.7,
					"y": 9.67,
					"to": null
				},
				"left1": {
					"x": -0.5,
					"y": 19.0,
					"to": "Ruins1_32[right1]"
				},
				"right1": {
					"x": 70.5,
					"y": 43.0,
					"to": "Ruins1_30[left1]"
				},
				"left2": {
					"x": -0.5,
					"y": 4.0,
					"to": "Ruins1_32[right2]"
				}
			},
			"area": "Ruins1"
		},
		"Ruins1_25": {
			"items": {},
			"transitions": {
				"left3": {
					"x": -0.5,
					"y": 4.0,
					"to": "Ruins1_23[right2]"
				},
				"left1": {
					"x": -0.5,
					"y": 99.5,
					"to": "Ruins1_30[right1]"
				},
				"left2": {
					"x": -0.5,
					"y": 49.0,
					"to": "Ruins1_23[right1]"
				}
			},
			"area": "Ruins1"
		},
		"Ruins1_27": {
			"name": "Fountain",
			"items": {},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 8.0,
					"to": "Ruins1_05b[right1]"
				},
				"right1": {
					"x": 80.5,
					"y": 6.0,
					"to": "Ruins2_01_b[left1]"
				}
			},
			"area": "Ruins1"
		},
		"Ruins1_28": {
			"name": "City Storerooms",
			"items": {
				"Wanderer's_Journal-City_Storerooms": {
					"x": 60.17,
					"y": 2.19
				},
				"Grimmkin_Flame-City_Storerooms": {
					"x": 71.09,
					"y": 22.22
				}
			},
			"transitions": {
				"bot1": {
					"x": 78.0,
					"y": -0.5,
					"to": "Ruins1_17[top1]"
				},
				"left1": {
					"x": -0.5,
					"y": 9.0,
					"to": "Crossroads_49b[right1]"
				},
				"right1": {
					"x": 120.5,
					"y": 19.0,
					"to": "Ruins1_29[left1]"
				}
			},
			"area": "Ruins1"
		},
		"Ruins1_29": {
			"name": "City Storerooms Stag",
			"stag": "Ruins1",
			"items": {
				"City_Storerooms_Stag": {
					"x": 28.1,
					"y": 6.4
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 7.0,
					"to": "Ruins1_28[right1]"
				},
				"door_stagExit": {
					"x": 31.83,
					"y": 5.74,
					"to": null
				}
			},
			"area": "Ruins1"
		},
		"Ruins1_30": {
			"items": {
				"Spell_Twister": {
					"x": 71.56,
					"y": 50.26
				}
			},
			"transitions": {
				"bot1": {
					"x": 58.0,
					"y": -0.5,
					"to": "Ruins1_23[top1]"
				},
				"left1": {
					"x": -0.5,
					"y": 41.0,
					"to": "Ruins1_24[right1]"
				},
				"left2": {
					"x": -0.5,
					"y": 4.0,
					"to": "Ruins1_24[right2]"
				},
				"right1": {
					"x": 80.5,
					"y": 41.0,
					"to": "Ruins1_25[left1]"
				}
			},
			"area": "Ruins1"
		},
		"Ruins1_31": {
			"name": "Conifer",
			"items": {
				"City_of_Tears_Map": {
					"x": 35.1,
					"y": 15.3
				}
			},
			"transitions": {
				"bot1": {
					"x": 7.0,
					"y": -0.5,
					"to": "Ruins1_05[top1]"
				},
				"right1": {
					"x": 65.5,
					"y": 4.0,
					"to": "Ruins1_23[left1]"
				},
				"left2": {
					"x": 43.0,
					"y": 57.0,
					"to": "Ruins1_31b[right1]"
				},
				"left1": {
					"x": -0.5,
					"y": 21.0,
					"to": "Ruins1_06[right1]"
				},
				"left3": {
					"x": 43.0,
					"y": 42.0,
					"to": "Ruins1_31b[right2]"
				}
			},
			"area": "Ruins1"
		},
		"Ruins1_31b": {
			"name": "Shade Soul",
			"items": {
				"Shade_Soul": {
					"x": 34.75476,
					"y": 57.22618
				},
				"Boss_Geo-Elegant_Soul_Warrior": {
					"x": 32.0,
					"y": 40.0
				}
			},
			"transitions": {
				"right1": {
					"x": 52.5,
					"y": 59.0,
					"to": "Ruins1_31[left2]"
				},
				"right2": {
					"x": 58.5,
					"y": 40.0,
					"to": "Ruins1_31[left3]"
				}
			},
			"area": "Ruins1"
		},
		"Ruins1_32": {
			"name": "After Soul Master",
			"items": {
				"380_Geo-Soul_Master_Chest": {
					"x": 9.298597,
					"y": 108.8161
				},
				"Hallownest_Seal-Soul_Sanctum": {
					"x": 33.23,
					"y": 35.209
				},
				"Grub-Soul_Sanctum": {
					"x": 5.403263,
					"y": 24.52
				},
				"Geo_Rock-Soul_Sanctum": {
					"x": 32.28,
					"y": 96.44418
				},
				"Soul_Totem-Sanctum_Below_Chest": {
					"x": 9.69,
					"y": 97.31
				},
				"Soul_Totem-Sanctum_Above_Grub": {
					"x": 7.63,
					"y": 48.61
				},
				"Lore_Tablet-Sanctum_Past_Soul_Master": {
					"x": 36.0,
					"y": 99.2
				}
			},
			"transitions": {
				"right2": {
					"x": 52.5,
					"y": 50.0,
					"to": "Ruins1_24[left2]"
				},
				"right1": {
					"x": 52.5,
					"y": 66.0,
					"to": "Ruins1_24[left1]"
				}
			},
			"area": "Ruins1"
		},
		"Ruins2_01": {
			"items": {
				"Geo_Rock-Watcher's_Spire": {
					"x": 5.117435,
					"y": 73.46977
				}
			},
			"transitions": {
				"bot1": {
					"x": 6.0,
					"y": 45.5,
					"to": "Ruins2_01_b[top1]"
				},
				"left2": {
					"x": -0.5,
					"y": 85.0,
					"to": "Ruins1_18[right2]"
				},
				"top1": {
					"x": 70.0,
					"y": 90.5,
					"to": "Ruins2_03b[bot1]"
				}
			},
			"area": "Ruins2"
		},
		"Ruins2_01_b": {
			"name": "Foot of Watcher's Tower",
			"items": {},
			"transitions": {
				"top1": {
					"x": 6.0,
					"y": 48.5,
					"to": "Ruins2_01[bot1]"
				},
				"left1": {
					"x": -0.5,
					"y": 6.0,
					"to": "Ruins1_27[right1]"
				},
				"right1": {
					"x": 78.5,
					"y": 8.0,
					"to": "Ruins2_04[left1]"
				}
			},
			"area": "Ruins2"
		},
		"Ruins2_03": {
			"name": "Watcher Knights",
			"boss": "Watcher Knight",
			"splitRoom": [
				[
					"bot2"
				],
				[
					"bot1",
					"top1"
				]
			],
			"items": {
				"655_Geo-Watcher_Knights_Chest": {
					"x": 11.85,
					"y": 106.72
				},
				"Hallownest_Seal-Watcher_Knight": {
					"x": 26.15,
					"y": 113.18
				},
				"Grub-Watcher's_Spire": {
					"x": 23.18028,
					"y": 50.563011
				}
			},
			"transitions": {
				"top1": {
					"x": 52.0,
					"y": 124.5,
					"to": "Ruins2_Watcher_Room[bot1]"
				},
				"bot2": {
					"x": 72.0,
					"y": 32.5,
					"to": "Ruins2_03b[top2]"
				},
				"bot1": {
					"x": 19.0,
					"y": 32.5,
					"to": "Ruins2_03b[top1]"
				}
			},
			"area": "Ruins2"
		},
		"Ruins2_03b": {
			"items": {},
			"transitions": {
				"top1": {
					"x": 12.0,
					"y": 48.0,
					"to": "Ruins2_03[bot1]"
				},
				"top2": {
					"x": 72.0,
					"y": 48.0,
					"to": "Ruins2_03[bot2]"
				},
				"bot1": {
					"x": 71.0,
					"y": -0.5,
					"to": "Ruins2_01[top1]"
				},
				"left1": {
					"x": -0.5,
					"y": 6.0,
					"to": "Ruins1_18[right1]"
				}
			},
			"area": "Ruins2"
		},
		"Ruins2_04": {
			"name": "Hub Area",
			"items": {},
			"transitions": {
				"door_Ruin_House_03": {
					"x": 80.34,
					"y": 6.62,
					"to": "Ruins_House_03[left1]"
				},
				"right1": {
					"x": 150.5,
					"y": 51.0,
					"to": "Ruins2_06[left1]"
				},
				"door_Ruin_House_02": {
					"x": 83.7,
					"y": 39.63,
					"to": "Ruins_House_02[left1]"
				},
				"right2": {
					"x": 150.5,
					"y": 8.0,
					"to": "Ruins2_06[left2]"
				},
				"door_Ruin_Elevator": {
					"x": 68.70495,
					"y": 32.68663,
					"to": "Ruins_Elevator[left1]"
				},
				"left1": {
					"x": 1.5,
					"y": 18.0,
					"to": "Ruins2_01_b[right1]"
				},
				"left2": {
					"x": -0.5,
					"y": 4.0,
					"to": "Abyss_01[right1]"
				},
				"door_Ruin_House_01": {
					"x": 122.26,
					"y": 24.68,
					"to": "Ruins_House_01[left1]"
				}
			},
			"area": "Ruins2"
		},
		"Ruins2_05": {
			"items": {
				"Wanderer's_Journal-King's_Station": {
					"x": 46.09779,
					"y": 20.24224
				},
				"Geo_Rock-Above_King's_Station": {
					"x": 31.35165,
					"y": 44.43226
				}
			},
			"transitions": {
				"top1": {
					"x": 10.0,
					"y": 84.5,
					"to": "Ruins2_09[bot1]"
				},
				"bot1": {
					"x": 9.0,
					"y": -0.5,
					"to": "Ruins2_06[top1]"
				},
				"left1": {
					"x": -0.5,
					"y": 57.0,
					"to": "Ruins2_10b[right2]"
				}
			},
			"area": "Ruins2"
		},
		"Ruins2_06": {
			"name": "King's Station",
			"items": {
				"Geo_Rock-King's_Station": {
					"x": 43.45423,
					"y": 24.44513
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 42.0,
					"to": "Ruins2_04[right1]"
				},
				"right2": {
					"x": 55.5,
					"y": 6.0,
					"to": "Ruins2_07[left1]"
				},
				"left2": {
					"x": -0.5,
					"y": 6.0,
					"to": "Ruins2_04[right2]"
				},
				"top1": {
					"x": 22.5,
					"y": 49.0,
					"to": "Ruins2_05[bot1]"
				},
				"right1": {
					"x": 55.5,
					"y": 32.0,
					"to": "Ruins2_08[left1]"
				}
			},
			"area": "Ruins2"
		},
		"Ruins2_07": {
			"name": "Swim Bypass",
			"items": {
				"Grub-King's_Station": {
					"x": 70.29,
					"y": 5.547497
				}
			},
			"transitions": {
				"top1": {
					"x": 102.0,
					"y": 20.5,
					"to": "Ruins2_11_b[bot1]"
				},
				"right1": {
					"x": 130.5,
					"y": 10.0,
					"to": "Deepnest_East_03[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 7.0,
					"to": "Ruins2_06[right2]"
				}
			},
			"area": "Ruins2"
		},
		"Ruins2_08": {
			"name": "King's Station Stag",
			"stag": "Ruins2",
			"items": {
				"Hallownest_Seal-King's_Station": {
					"x": 5.14,
					"y": 24.3
				},
				"King's_Station_Stag": {
					"x": 28.1,
					"y": 6.4
				}
			},
			"transitions": {
				"door_stagExit": {
					"x": 31.85,
					"y": 5.64,
					"to": null
				},
				"left1": {
					"x": -0.5,
					"y": 7.0,
					"to": "Ruins2_06[right1]"
				}
			},
			"area": "Ruins2"
		},
		"Ruins2_09": {
			"name": "Vessel Fragment",
			"items": {
				"Vessel_Fragment-City": {
					"x": 70.71581,
					"y": 4.643608
				}
			},
			"transitions": {
				"bot1": {
					"x": 8.0,
					"y": -0.5,
					"to": "Ruins2_05[top1]"
				}
			},
			"area": "Ruins2"
		},
		"Ruins2_10": {
			"name": "East Elevator (Upper)",
			"transitions": {
				"elevator": {
					"x": 15,
					"y": 159,
					"to": "Ruins2_10b[elevator]"
				},
				"elev_entrance": {
					"x": 14.95,
					"y": 159.82,
					"to": null
				},
				"left1": {
					"x": -0.5,
					"y": 161.0,
					"to": "RestingGrounds_06[right1]"
				},
				"right1": {
					"x": 30.5,
					"y": 161.0,
					"to": "RestingGrounds_10[left1]"
				}
			},
			"items": {},
			"area": "Ruins2"
		},
		"Ruins2_10b": {
			"name": "East Elevator (Lower)",
			"transitions": {
				"elevator": {
					"x": 15,
					"y": 10,
					"to": "Ruins2_10[elevator]"
				},
				"right1": {
					"x": 30.5,
					"y": 140.0,
					"to": "Deepnest_East_09[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 93.0,
					"to": "Ruins_Bathhouse[right1]"
				},
				"elev_entrance": {
					"x": 14.95,
					"y": 41.52,
					"to": null
				},
				"right2": {
					"x": 30.5,
					"y": 11.0,
					"to": "Ruins2_05[left1]"
				}
			},
			"items": {},
			"area": "Ruins2"
		},
		"Ruins2_11": {
			"name": "The Collector",
			"boss": "The Collector",
			"items": {
				"Collector's_Map": {
					"x": 23.13,
					"y": 115.34
				},
				"Grub-Collector_1": {
					"x": 64.2,
					"y": 115.4
				},
				"Grub-Collector_2": {
					"x": 55.3,
					"y": 115.4
				},
				"Grub-Collector_3": {
					"x": 38.5,
					"y": 115.4
				}
			},
			"transitions": {
				"right1": {
					"x": 48.5,
					"y": 61.0,
					"to": "Ruins2_11_b[left1]"
				}
			},
			"area": "Ruins2"
		},
		"Ruins2_11_b": {
			"name": "Tower of Love",
			"items": {},
			"transitions": {
				"right1": {
					"x": 78.5,
					"y": 61.0,
					"to": "Deepnest_East_07[left2]"
				},
				"bot1": {
					"x": 55.0,
					"y": -0.5,
					"to": "Ruins2_07[top1]"
				},
				"left1": {
					"x": 43.5,
					"y": 61.0,
					"to": "Ruins2_11[right1]"
				}
			},
			"area": "Ruins2"
		},
		"Ruins2_Watcher_Room": {
			"name": "Lurien's Tower",
			"items": {
				"Lurien": {
					"x": 58.0,
					"y": 136.0
				},
				"Lore_Tablet-Watcher's_Spire": {
					"x": 46.0,
					"y": 118.2
				}
			},
			"transitions": {
				"bot1": {
					"x": 53.0,
					"y": -0.5,
					"to": "Ruins2_03[top1]"
				},
				"door_dreamReturn": {
					"x": 53.34,
					"y": 134.7,
					"to": null
				}
			},
			"area": "Ruins2"
		},
		"Ruins_Bathhouse": {
			"name": "Bathhouse",
			"items": {},
			"transitions": {
				"right1": {
					"x": 80.5,
					"y": 33.0,
					"to": "Ruins2_10b[left1]"
				},
				"door1": {
					"x": 11.75,
					"y": 3.71,
					"to": "Ruins_Elevator[left2]"
				}
			},
			"area": "Ruins"
		},
		"Ruins_Elevator": {
			"name": "Elevator to Bathhouse",
			"items": {
				"Rancid_Egg-City_of_Tears_Pleasure_House": {
					"x": 56.0,
					"y": 95.1
				},
				"Wanderer's_Journal-Pleasure_House": {
					"x": 46.28352,
					"y": 5.184328
				},
				"Geo_Rock-Pleasure_House": {
					"x": 23.6,
					"y": 52.38
				},
				"Lore_Tablet-Pleasure_House": {
					"x": 22.7,
					"y": 7.4
				}
			},
			"transitions": {
				"left1": {
					"x": 10.5,
					"y": 7.0,
					"to": "Ruins2_04[door_Ruin_Elevator]"
				},
				"left2": {
					"x": 21.0,
					"y": 141.0,
					"to": "Ruins_Bathhouse[door1]"
				}
			},
			"area": "Ruins"
		},
		"Ruins_House_01": {
			"name": "Great Husk Sentry Miniboss for Grub",
			"items": {
				"Grub-City_of_Tears_Guarded": {
					"x": 32.50457,
					"y": 6.593936
				}
			},
			"transitions": {
				"left1": {
					"x": 10.5,
					"y": 7.0,
					"to": "Ruins2_04[door_Ruin_House_01]"
				}
			},
			"area": "Ruins"
		},
		"Ruins_House_02": {
			"name": "Gorgeous Husk",
			"items": {
				"Boss_Geo-Gorgeous_Husk": {
					"x": 54.5,
					"y": 6.5
				}
			},
			"transitions": {
				"left1": {
					"x": 10.5,
					"y": 7.0,
					"to": "Ruins2_04[door_Ruin_House_02]"
				}
			},
			"area": "Ruins"
		},
		"Ruins_House_03": {
			"name": "Eternal Emilitia",
			"items": {},
			"transitions": {
				"left2": {
					"x": 38.0,
					"y": 5.0,
					"to": "Waterways_07[door1]"
				},
				"left1": {
					"x": 10.5,
					"y": 52.0,
					"to": "Ruins2_04[door_Ruin_House_03]"
				}
			},
			"area": "Ruins"
		},
		"Town": {
			"name": "Dirtmouth",
			"items": {},
			"transitions": {
				"door_station": {
					"x": 142.5016043229,
					"y": 10.645210062404999,
					"to": null
				},
				"right1": {
					"x": 263.5,
					"y": 53.0,
					"to": "Mines_10[left1]"
				},
				"room_grimm": {
					"x": 82.75712,
					"y": 10.8265,
					"to": "Grimm_Tent[left1]"
				},
				"door_jiji": {
					"x": 252.00000604386742,
					"y": 7.749999998750001,
					"to": "Room_Ouiji[left1]"
				},
				"door_dreamReturn": {
					"x": 82.76,
					"y": 10.64881,
					"to": null
				},
				"bot1": {
					"x": 185.0,
					"y": -1.5,
					"to": "Crossroads_01[top1]"
				},
				"door_sly": {
					"x": 120.85837204913,
					"y": 10.644788846994999,
					"to": null
				},
				"left1": {
					"x": 1.5,
					"y": 49.0,
					"to": "Tutorial_01[right1]"
				},
				"top1": {
					"x": 33.5,
					"y": 72.0,
					"to": "Cliffs_02[right1]"
				},
				"door_mapper": {
					"x": 154.79857981,
					"y": 10.71354861,
					"to": "Room_mapper[left1]"
				},
				"door_bretta": {
					"x": 165.6210056,
					"y": 10.87395055,
					"to": null
				},
				"room_divine": {
					"x": 72.14317,
					"y": 10.8265,
					"to": "Grimm_Divine[left1]"
				}
			},
			"area": "Town"
		},
		"Tutorial_01": {
			"name": "King's Pass",
			"area": "Cliffs",
			"items": {
				"Focus": {
					"x": 111.5,
					"y": 31.4
				},
				"Fury_of_the_Fallen": {
					"x": 179.44,
					"y": 16.97
				},
				"Lifeblood_Cocoon-King's_Pass": {
					"x": 56.97487,
					"y": 62.09032
				},
				"Grimmkin_Flame-King's_Pass": {
					"x": 146.47,
					"y": 5.97
				},
				"Leftslash": {
					"x": 33.0,
					"y": 11.4
				},
				"Rightslash": {
					"x": 38.0,
					"y": 11.4
				},
				"Upslash": {
					"x": 50.0,
					"y": 11.4
				},
				"Geo_Rock-King's_Pass_Left": {
					"x": 9.26,
					"y": 10.577
				},
				"Geo_Rock-King's_Pass_Below_Fury": {
					"x": 162.75,
					"y": 5.67
				},
				"Geo_Rock-King's_Pass_Hidden": {
					"x": 59.5337,
					"y": 45.58482
				},
				"Geo_Rock-King's_Pass_Collapse": {
					"x": 108.0178,
					"y": 54.70111
				},
				"Geo_Rock-King's_Pass_Above_Fury": {
					"x": 164.51,
					"y": 35.71
				},
				"Lore_Tablet-King's_Pass_Focus": {
					"x": 111.5,
					"y": 34.7
				},
				"Lore_Tablet-King's_Pass_Fury": {
					"x": 192.0,
					"y": 24.5
				},
				"Lore_Tablet-King's_Pass_Exit": {
					"x": 170.5,
					"y": 64.6
				}
			},
			"transitions": {
				"top1": {
					"x": 34.5,
					"y": 93.5,
					"to": "Cliffs_02[bot2]"
				},
				"top2": {
					"x": 11.0,
					"y": 80.5,
					"to": "Cliffs_02[bot1]"
				},
				"right1": {
					"x": 193.5,
					"y": 68.0,
					"to": "Town[left1]"
				}
			}
		},
		"Waterways_01": {
			"name": "Top Entrance",
			"items": {
				"Geo_Rock-Waterways_Tuk": {
					"x": 147.4247,
					"y": 40.401
				},
				"Geo_Rock-Waterways_Tuk_Alcove": {
					"x": 108.84,
					"y": 21.46
				},
				"Soul_Totem-Waterways_Entrance": {
					"x": 14.21,
					"y": 34.321
				}
			},
			"transitions": {
				"right1": {
					"x": 152.5,
					"y": 41.0,
					"to": "Waterways_03[left1]"
				},
				"bot1": {
					"x": 54.0,
					"y": -0.5,
					"to": "Waterways_02[top1]"
				},
				"left1": {
					"x": -0.5,
					"y": 14.0,
					"to": "Waterways_04[right1]"
				},
				"top1": {
					"x": 77.0,
					"y": 47.0,
					"to": "Ruins1_05b[bot1]"
				}
			},
			"area": "Waterways"
		},
		"Waterways_02": {
			"name": "Slanted Bench",
			"items": {
				"Rancid_Egg-Waterways_Main": {
					"x": 65.34,
					"y": 18.16
				}
			},
			"transitions": {
				"top2": {
					"x": 171.0,
					"y": 45.5,
					"to": "Waterways_05[bot1]"
				},
				"bot2": {
					"x": 220.0,
					"y": -0.5,
					"to": "Waterways_06[top1]"
				},
				"top3": {
					"x": 10.0,
					"y": 45.5,
					"to": "Waterways_04[bot1]"
				},
				"top1": {
					"x": 65.0,
					"y": 45.5,
					"to": "Waterways_01[bot1]"
				},
				"bot1": {
					"x": 9.0,
					"y": -0.5,
					"to": "Waterways_08[top1]"
				}
			},
			"area": "Waterways"
		},
		"Waterways_03": {
			"name": "Tuk (Egg Seller)",
			"items": {},
			"transitions": {
				"left1": {
					"x": 44.0,
					"y": 5.0,
					"to": "Waterways_01[right1]"
				}
			},
			"area": "Waterways"
		},
		"Waterways_04": {
			"items": {
				"Rancid_Egg-Waterways_West_Bluggsac": {
					"x": 31.59,
					"y": 16.42
				},
				"Grub-Waterways_Main": {
					"x": 126.39,
					"y": 8.487976
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 34.0,
					"to": "Waterways_04b[right1]"
				},
				"bot1": {
					"x": 146.0,
					"y": -0.5,
					"to": "Waterways_02[top3]"
				},
				"left2": {
					"x": -0.5,
					"y": 9.0,
					"to": "Waterways_04b[right2]"
				},
				"right1": {
					"x": 154.5,
					"y": 37.0,
					"to": "Waterways_01[left1]"
				}
			},
			"area": "Waterways"
		},
		"Waterways_04b": {
			"items": {
				"Mask_Shard-Waterways": {
					"x": 11.59,
					"y": 11.27
				},
				"Rancid_Egg-Waterways_West_Pickup": {
					"x": 39.1,
					"y": 43.2
				},
				"Geo_Rock-Waterways_Left": {
					"x": 45.02925,
					"y": 25.36001
				},
				"Soul_Totem-Top_Left_Waterways": {
					"x": 10.62,
					"y": 41.5429
				}
			},
			"transitions": {
				"right2": {
					"x": 130.5,
					"y": 9.0,
					"to": "Waterways_04[left2]"
				},
				"right1": {
					"x": 130.5,
					"y": 34.0,
					"to": "Waterways_04[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 23.0,
					"to": "Waterways_09[right1]"
				}
			},
			"area": "Waterways"
		},
		"Waterways_05": {
			"name": "Dung Defender",
			"boss": "Dung Defender",
			"items": {
				"Defender's_Crest": {
					"x": 82.744444,
					"y": 20.703757
				}
			},
			"transitions": {
				"bot2": {
					"x": 104.0,
					"y": 3.0,
					"to": "Waterways_15[top1]"
				},
				"bot1": {
					"x": 8.0,
					"y": -0.5,
					"to": "Waterways_02[top2]"
				},
				"right1": {
					"x": 120.5,
					"y": 10.0,
					"to": "Abyss_01[left1]"
				}
			},
			"area": "Waterways"
		},
		"Waterways_06": {
			"items": {},
			"transitions": {
				"right1": {
					"x": 140.5,
					"y": 18.0,
					"to": "Abyss_01[left2]"
				},
				"top1": {
					"x": 93.0,
					"y": 50.5,
					"to": "Waterways_02[bot2]"
				}
			},
			"area": "Waterways"
		},
		"Waterways_07": {
			"items": {
				"Rancid_Egg-Waterways_East": {
					"x": 61.83,
					"y": 30.4
				},
				"Geo_Rock-Waterways_East": {
					"x": 15.31712,
					"y": 59.63828
				},
				"Soul_Totem-Waterways_East": {
					"x": 28.76,
					"y": 38.51
				},
				"Lore_Tablet-Dung_Defender": {
					"x": 91.5,
					"y": 56.6
				}
			},
			"transitions": {
				"right2": {
					"x": 110.5,
					"y": 17.0,
					"to": "Waterways_13[left2]"
				},
				"top1": {
					"x": 11.0,
					"y": 100.5,
					"to": "Waterways_14[bot1]"
				},
				"right1": {
					"x": 110.5,
					"y": 50.0,
					"to": "Waterways_13[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 21.0,
					"to": "Abyss_01[right2]"
				},
				"door1": {
					"x": 81.11,
					"y": 86.68,
					"to": "Ruins_House_03[left2]"
				}
			},
			"area": "Waterways"
		},
		"Waterways_08": {
			"name": "Outside Flukemarm",
			"items": {
				"Geo_Rock-Waterways_Flukemarm": {
					"x": 29.25,
					"y": 19.43
				},
				"Soul_Totem-Waterways_Flukemarm": {
					"x": 135.14,
					"y": 7.37
				}
			},
			"transitions": {
				"left2": {
					"x": 0.0,
					"y": 55.0,
					"to": "GG_Pipeway[right1]"
				},
				"top1": {
					"x": 25.0,
					"y": 60.5,
					"to": "Waterways_02[bot1]"
				},
				"left1": {
					"x": -0.5,
					"y": 7.0,
					"to": "Waterways_12[right1]"
				}
			},
			"area": "Waterways"
		},
		"Waterways_09": {
			"name": "Hwurmp Miniboss, Conifer",
			"items": {
				"Royal_Waterways_Map": {
					"x": 25.4,
					"y": 30.5
				}
			},
			"transitions": {
				"right1": {
					"x": 50.5,
					"y": 20.0,
					"to": "Waterways_04b[left1]"
				},
				"left1": {
					"x": 1.0,
					"y": 7.0,
					"to": "Fungus2_23[right2]"
				}
			},
			"area": "Waterways"
		},
		"Waterways_12": {
			"name": "Flukemarm",
			"boss": "Flukemarm",
			"items": {
				"Flukenest": {
					"x": 12.553375999999998,
					"y": 30.19773
				}
			},
			"transitions": {
				"right1": {
					"x": 80.5,
					"y": 6.0,
					"to": "Waterways_08[left1]"
				}
			},
			"area": "Waterways"
		},
		"Waterways_13": {
			"name": "Isma's Tear",
			"items": {
				"Isma's_Tear": {
					"x": 94.01,
					"y": 17.88
				},
				"Grub-Waterways_East": {
					"x": 108.8202,
					"y": 53.51968
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 48.0,
					"to": "Waterways_07[right1]"
				},
				"left2": {
					"x": -0.5,
					"y": 17.0,
					"to": "Waterways_07[right2]"
				}
			},
			"area": "Waterways"
		},
		"Waterways_14": {
			"items": {
				"Grub-Waterways_Requires_Tram": {
					"x": 186.67,
					"y": 37.51
				}
			},
			"transitions": {
				"bot1": {
					"x": 8.0,
					"y": -0.5,
					"to": "Waterways_07[top1]"
				},
				"bot2": {
					"x": 249.0,
					"y": -0.5,
					"to": "Deepnest_East_02[top1]"
				}
			},
			"area": "Waterways"
		},
		"Waterways_15": {
			"name": "White Defender",
			"boss": "White Defender",
			"items": {
				"King's_Idol-Dung_Defender": {
					"x": 52.51466,
					"y": 3.808519
				},
				"Boss_Essence-White_Defender": {
					"x": 13.53,
					"y": 4.0
				}
			},
			"transitions": {
				"door_dreamReturn": {
					"x": 18.79,
					"y": 3.9,
					"to": null
				},
				"top1": {
					"x": 39.0,
					"y": 25.0,
					"to": "Waterways_05[bot2]"
				}
			},
			"area": "Waterways"
		},
		"White_Palace_01": {
			"items": {},
			"transitions": {
				"left1": {
					"x": 0.0,
					"y": 21.0,
					"to": "White_Palace_11[door2]"
				},
				"top1": {
					"x": 107.0,
					"y": 140.0,
					"to": "White_Palace_03_hub[bot1]"
				},
				"right1": {
					"x": 200.5,
					"y": 24.0,
					"to": "White_Palace_02[left1]"
				}
			},
			"area": "White"
		},
		"White_Palace_02": {
			"name": "Kingsmould Miniboss 2",
			"items": {
				"Soul_Totem-White_Palace_Entrance": {
					"x": 14.93283,
					"y": 50.64687
				}
			},
			"transitions": {
				"left1": {
					"x": -0.5,
					"y": 24.0,
					"to": "White_Palace_01[right1]"
				}
			},
			"area": "White"
		},
		"White_Palace_03_hub": {
			"name": "Hub",
			"transitions": {
				"magic_circle": {
					"x": 11.1,
					"y": 43.4,
					"to": "Abyss_05[dream]"
				},
				"left2": {
					"x": -0.5,
					"y": 35.0,
					"to": "White_Palace_04[right2]"
				},
				"right1": {
					"x": 100.5,
					"y": 64.0,
					"to": "White_Palace_15[left1]"
				},
				"top1": {
					"x": 54.0,
					"y": 140.5,
					"to": "White_Palace_06[bot1]"
				},
				"doorWarp": {
					"x": 10.7,
					"y": 42.78,
					"to": null
				},
				"door1": {
					"x": 17.63,
					"y": 42.85,
					"to": null
				},
				"left1": {
					"x": -0.5,
					"y": 98.0,
					"to": "White_Palace_14[right1]"
				},
				"bot1": {
					"x": 10.0,
					"y": -0.5,
					"to": "White_Palace_01[top1]"
				}
			},
			"items": {
				"Soul_Totem-White_Palace_Hub": {
					"x": 5.3,
					"y": 55.67
				}
			},
			"area": "White"
		},
		"White_Palace_04": {
			"items": {
				"Soul_Totem-White_Palace_Left": {
					"x": 68.91,
					"y": 57.65
				}
			},
			"transitions": {
				"right2": {
					"x": 200.5,
					"y": 24.0,
					"to": "White_Palace_03_hub[left2]"
				},
				"top1": {
					"x": 19.0,
					"y": 78.5,
					"to": "White_Palace_14[bot1]"
				}
			},
			"area": "White"
		},
		"White_Palace_05": {
			"splitRoom": [
				[
					"left1",
					"right1"
				],
				[
					"left2",
					"right2"
				]
			],
			"items": {},
			"transitions": {
				"right1": {
					"x": 156.5,
					"y": 115.0,
					"to": "White_Palace_16[left1]"
				},
				"right2": {
					"x": 156.5,
					"y": 19.0,
					"to": "White_Palace_16[left2]"
				},
				"left1": {
					"x": 50.5,
					"y": 115.0,
					"to": "White_Palace_15[right1]"
				},
				"left2": {
					"x": 48.5,
					"y": 19.0,
					"to": "White_Palace_15[right2]"
				}
			},
			"area": "White"
		},
		"White_Palace_06": {
			"name": "Outside PoP",
			"items": {},
			"transitions": {
				"bot1": {
					"x": 19.0,
					"y": -0.5,
					"to": "White_Palace_03_hub[top1]"
				},
				"door_dreamReturn": {
					"x": 24.36,
					"y": 2.73,
					"to": null
				},
				"top1": {
					"x": 19.0,
					"y": 75.5,
					"to": "White_Palace_07[bot1]"
				},
				"left1": {
					"x": -0.5,
					"y": 8.0,
					"to": "White_Palace_18[right1]"
				}
			},
			"area": "White"
		},
		"White_Palace_07": {
			"items": {},
			"transitions": {
				"top1": {
					"x": 31.0,
					"y": 140.5,
					"to": "White_Palace_12[bot1]"
				},
				"bot1": {
					"x": 51.0,
					"y": -0.5,
					"to": "White_Palace_06[top1]"
				}
			},
			"area": "White"
		},
		"White_Palace_08": {
			"name": "Workshop",
			"items": {
				"Lore_Tablet-Palace_Workshop": {
					"x": 101.3,
					"y": 21.6
				}
			},
			"transitions": {
				"right1": {
					"x": 154.0,
					"y": 21.0,
					"to": "White_Palace_13[left3]"
				},
				"left1": {
					"x": -0.5,
					"y": 9.0,
					"to": "White_Palace_13[right1]"
				}
			},
			"area": "White"
		},
		"White_Palace_09": {
			"name": "Throne Room",
			"items": {
				"King_Fragment": {
					"x": 60.78,
					"y": 97.27999999999999
				},
				"Soul_Totem-White_Palace_Final": {
					"x": 60.0,
					"y": 40.89
				},
				"Lore_Tablet-Palace_Throne": {
					"x": 111.7,
					"y": 94.4
				}
			},
			"transitions": {
				"right1": {
					"x": 150.5,
					"y": 10.0,
					"to": "White_Palace_13[left1]"
				}
			},
			"area": "White"
		},
		"White_Palace_11": {
			"name": "Entrance",
			"transitions": {
				"magic_circle": {
					"x": 16.5,
					"y": 17.4,
					"to": "Abyss_05[dream]",
					"oneWay": true
				},
				"doorWarp": {
					"x": 16.49,
					"y": 16.75,
					"to": null
				},
				"door1": {
					"x": 24.64,
					"y": 16.63,
					"to": null
				},
				"door2": {
					"x": 128.81,
					"y": 16.8,
					"to": "White_Palace_01[left1]"
				}
			},
			"items": {},
			"area": "White"
		},
		"White_Palace_12": {
			"items": {},
			"transitions": {
				"bot1": {
					"x": 34.0,
					"y": 132.0,
					"to": "White_Palace_07[top1]"
				},
				"right1": {
					"x": 74.5,
					"y": 136.0,
					"to": "White_Palace_13[left2]"
				}
			},
			"area": "White"
		},
		"White_Palace_13": {
			"items": {},
			"transitions": {
				"left2": {
					"x": -0.5,
					"y": 136.0,
					"to": "White_Palace_12[right1]"
				},
				"left1": {
					"x": -0.5,
					"y": 231.0,
					"to": "White_Palace_09[right1]"
				},
				"right1": {
					"x": 175.5,
					"y": 151.0,
					"to": "White_Palace_08[left1]"
				},
				"left3": {
					"x": 98.5,
					"y": 215.0,
					"to": "White_Palace_08[right1]"
				}
			},
			"area": "White"
		},
		"White_Palace_14": {
			"items": {},
			"transitions": {
				"bot1": {
					"x": 17.0,
					"y": 68.5,
					"to": "White_Palace_04[top1]"
				},
				"right1": {
					"x": 200.5,
					"y": 81.0,
					"to": "White_Palace_03_hub[left1]"
				}
			},
			"area": "White"
		},
		"White_Palace_15": {
			"items": {
				"Soul_Totem-White_Palace_Right": {
					"x": 13.90997,
					"y": 115.7281
				}
			},
			"transitions": {
				"right1": {
					"x": 70.5,
					"y": 115.0,
					"to": "White_Palace_05[left1]"
				},
				"left1": {
					"x": -0.5,
					"y": 19.0,
					"to": "White_Palace_03_hub[right1]"
				},
				"right2": {
					"x": 70.5,
					"y": 19.0,
					"to": "White_Palace_05[left2]"
				}
			},
			"area": "White"
		},
		"White_Palace_16": {
			"items": {},
			"transitions": {
				"left1": {
					"x": 135.5,
					"y": 115.0,
					"to": "White_Palace_05[right1]"
				},
				"left2": {
					"x": 134.5,
					"y": 19.0,
					"to": "White_Palace_05[right2]"
				}
			},
			"area": "White"
		},
		"White_Palace_17": {
			"pain": true,
			"items": {
				"Soul_Totem-Path_of_Pain_Below_Lever": {
					"x": 77.33,
					"y": 34.9
				},
				"Soul_Totem-Path_of_Pain_Left_of_Lever": {
					"x": 53.81,
					"y": 64.78
				}
			},
			"transitions": {
				"bot1": {
					"x": 80.0,
					"y": -0.5,
					"to": "White_Palace_18[top1]"
				},
				"right1": {
					"x": 120.5,
					"y": 34.0,
					"to": "White_Palace_19[left1]"
				}
			},
			"area": "White"
		},
		"White_Palace_18": {
			"name": "Path of Pain Entrance",
			"pain": true,
			"items": {
				"Soul_Totem-Path_of_Pain_Entrance": {
					"x": 230.95,
					"y": 13.9
				},
				"Soul_Totem-Path_of_Pain_Second": {
					"x": 161.97,
					"y": 12.97879
				},
				"Lore_Tablet-Path_of_Pain_Entrance": {
					"x": 263.4,
					"y": 12.5
				}
			},
			"transitions": {
				"top1": {
					"x": 78.0,
					"y": 44.5,
					"to": "White_Palace_17[bot1]"
				},
				"right1": {
					"x": 300.5,
					"y": 13.0,
					"to": "White_Palace_06[left1]"
				}
			},
			"area": "White"
		},
		"White_Palace_19": {
			"pain": true,
			"items": {
				"Soul_Totem-Path_of_Pain_Hidden": {
					"x": 165.47,
					"y": 120.82
				},
				"Soul_Totem-Path_of_Pain_Below_Thornskip": {
					"x": 105.24,
					"y": 34.89
				}
			},
			"transitions": {
				"top1": {
					"x": 18.0,
					"y": 168.5,
					"to": "White_Palace_20[bot1]"
				},
				"left1": {
					"x": 87.0,
					"y": 34.0,
					"to": "White_Palace_17[right1]"
				}
			},
			"area": "White"
		},
		"White_Palace_20": {
			"name": "Path of Pain Finish",
			"pain": true,
			"items": {
				"Soul_Totem-Path_of_Pain_Final": {
					"x": 27.61,
					"y": 170.92
				}
			},
			"transitions": {
				"bot1": {
					"x": 10.0,
					"y": 154.0,
					"to": "White_Palace_19[top1]"
				}
			},
			"area": "White"
		},
		"Dream_Nailcollection": {
			"items": {
				"Dream_Nail": {
					"x": 264.7,
					"y": 52.15
				}
			},
			"transitions": {
				"door_dreamReturn2": {
					"x": 55.5,
					"y": 29.73,
					"to": null
				},
				"door_dreamReturn3": {
					"x": 110.08,
					"y": 35.7,
					"to": null
				},
				"door_dreamReturn4": {
					"x": 184.7,
					"y": 37.7,
					"to": null
				},
				"door_dreamReturn": {
					"x": 14.86,
					"y": 13.7,
					"to": null
				}
			},
			"area": "Dream"
		},
		"Room_Colosseum_Bronze": {
			"items": {
				"Charm_Notch-Colosseum": {
					"x": 103.2545,
					"y": 23.77254
				}
			},
			"transitions": {
				"left1": {
					"x": 1.5,
					"y": 7.0,
					"to": "Room_Colosseum_01[right1]"
				},
				"left1 (1)": {
					"x": 1.5,
					"y": 11.0,
					"to": "Room_Colosseum_01[right1]"
				}
			},
			"area": "Room"
		},
		"Room_Colosseum_Silver": {
			"items": {
				"Pale_Ore-Colosseum": {
					"x": 103.2544,
					"y": 23.77254
				}
			},
			"transitions": {
				"left1 (1)": {
					"x": 1.5,
					"y": 11.0,
					"to": "Room_Colosseum_01[right1]"
				},
				"left1": {
					"x": 1.5,
					"y": 7.0,
					"to": "Room_Colosseum_01[right1]"
				}
			},
			"area": "Room"
		},
		"RestingGrounds_02_boss": {
			"items": {
				"Boss_Essence-Xero": {
					"x": 98.13,
					"y": 11.51
				}
			},
			"transitions": {},
			"area": "RestingGrounds"
		},
		"Cliffs_02_boss": {
			"items": {
				"Boss_Essence-Gorb": {
					"x": 55.19,
					"y": 33.37
				}
			},
			"transitions": {},
			"area": "Cliffs"
		},
		"Fungus3_40_boss": {
			"items": {
				"Boss_Essence-Marmu": {
					"x": 73.42,
					"y": 10.31
				}
			},
			"transitions": {},
			"area": "Fungus3"
		},
		"Ruins1_24_boss_defeated": {
			"items": {
				"Boss_Essence-Soul_Tyrant": {
					"x": 36.09,
					"y": 10.45
				}
			},
			"transitions": {},
			"area": "Ruins1"
		},
		"Room_Colosseum_Gold": {
			"items": {},
			"transitions": {
				"left1": {
					"x": 1.5,
					"y": 7.0,
					"to": "Room_Colosseum_01[right1]"
				},
				"left1 (1)": {
					"x": 1.5,
					"y": 11.0,
					"to": "Room_Colosseum_01[right1]"
				}
			},
			"area": "Room"
		},
		"Room_Final_Boss_Core": {
			"items": {},
			"transitions": {
				"left1": {
					"x": 7.5,
					"y": 9.0,
					"to": "Room_Final_Boss_atrium[right1]"
				}
			},
			"area": "Room"
		},
		"Room_Tram": {
			"items": {},
			"transitions": {
				"door1": {
					"x": 19.59,
					"y": 8.63,
					"to": null
				}
			},
			"area": "Room"
		},
		"Room_Tram_RG": {
			"items": {},
			"transitions": {
				"door1": {
					"x": 19.59,
					"y": 8.63,
					"to": null
				}
			},
			"area": "Room"
		},
		"Ruins1_24_boss": {
			"items": {},
			"transitions": {},
			"area": "Ruins1"
		},
		"Ruins2_03_boss": {
			"items": {},
			"transitions": {},
			"area": "Ruins2"
		},
		"Ruins2_11_boss": {
			"items": {},
			"transitions": {},
			"area": "Ruins2"
		},
		"Crossroads_10_boss": {
			"items": {},
			"transitions": {},
			"area": "Crossroads"
		},
		"Crossroads_10_boss_defeated": {
			"items": {},
			"transitions": {},
			"area": "Crossroads"
		},
		"Crossroads_10_preload": {
			"items": {},
			"transitions": {},
			"area": "Crossroads"
		},
		"Knight_Pickup": {
			"items": {},
			"transitions": {},
			"area": "Knight"
		},
		"PermaDeath": {
			"items": {},
			"transitions": {},
			"area": "PermaDeath"
		},
		"Deepnest_East_Hornet_boss": {
			"items": {},
			"transitions": {},
			"area": "Deepnest"
		},
		"Dream_01_False_Knight": {
			"items": {},
			"transitions": {
				"door1": {
					"x": 144.96,
					"y": 44.74,
					"to": null
				}
			},
			"area": "Dream"
		},
		"Dream_02_Mage_Lord": {
			"items": {},
			"transitions": {
				"door1": {
					"x": 82.17,
					"y": 12.66,
					"to": null
				}
			},
			"area": "Dream"
		},
		"Dream_03_Infected_Knight": {
			"items": {},
			"transitions": {
				"door1": {
					"x": 22.86,
					"y": 83.7,
					"to": null
				}
			},
			"area": "Dream"
		},
		"Dream_04_White_Defender": {
			"items": {},
			"transitions": {
				"door1": {
					"x": 24.66,
					"y": 6.57,
					"to": null
				}
			},
			"area": "Dream"
		},
		"Dream_Abyss": {
			"items": {},
			"transitions": {
				"door1": {
					"x": 27.06,
					"y": 2.68,
					"to": null
				}
			},
			"area": "Dream"
		},
		"Dream_Backer_Shrine": {
			"items": {},
			"transitions": {
				"door2": {
					"x": 76.227,
					"y": 24.74,
					"to": "0.[left1]"
				},
				"door1": {
					"x": 16.92,
					"y": 45.72,
					"to": null
				}
			},
			"area": "Dream"
		},
		"Dream_Final_Boss": {
			"items": {},
			"transitions": {
				"door1": {
					"x": 60.47,
					"y": 20.62,
					"to": null
				}
			},
			"area": "Dream"
		},
		"Dream_Guardian_Hegemol": {
			"items": {},
			"transitions": {
				"door1": {
					"x": 22.5,
					"y": 24.9,
					"to": null
				}
			},
			"area": "Dream"
		},
		"Dream_Guardian_Lurien": {
			"items": {},
			"transitions": {
				"door1": {
					"x": 22.5,
					"y": 24.9,
					"to": null
				}
			},
			"area": "Dream"
		},
		"Dream_Guardian_Monomon": {
			"items": {},
			"transitions": {
				"door1": {
					"x": 22.5,
					"y": 24.9,
					"to": null
				}
			},
			"area": "Dream"
		},
		"Dream_Mighty_Zote": {
			"items": {},
			"transitions": {
				"door1": {
					"x": 26.53,
					"y": 130.57,
					"to": null
				}
			},
			"area": "Dream"
		},
		"Dream_Room_Believer_Shrine": {
			"items": {},
			"transitions": {
				"left1": {
					"x": 5.0,
					"y": 17.0,
					"to": "Dream_Backer_Shrine[door2]"
				}
			},
			"area": "Dream"
		},
		"Fungus1_04_boss": {
			"items": {},
			"transitions": {},
			"area": "Fungus1"
		},
		"Fungus2_15_boss": {
			"items": {},
			"transitions": {},
			"area": "Fungus2"
		},
		"Fungus2_15_boss_defeated": {
			"items": {},
			"transitions": {},
			"area": "Fungus2"
		},
		"Fungus3_23_boss": {
			"items": {},
			"transitions": {},
			"area": "Fungus3"
		},
		"Fungus3_archive_02_boss": {
			"items": {},
			"transitions": {},
			"area": "Fungus3"
		},
		"GG_Atrium_Roof": {
			"items": {},
			"transitions": {
				"door_Land_of_Storms": {
					"x": 68.82924519,
					"y": 18.858484800000003,
					"to": "GG_Land_of_Storms[door1]"
				},
				"door_Land_of_Storms_return": {
					"x": 68.82924146673079,
					"y": 18.858484800000003,
					"to": null
				},
				"door_dreamReturnGG": {
					"x": 97.41100336,
					"y": 72.635807,
					"to": null
				},
				"bot1": {
					"x": 47.5,
					"y": 6.0,
					"to": "GG_Atrium[top1]"
				},
				"bot2": {
					"x": 148.0,
					"y": 6.0,
					"to": "GG_Atrium[top2]"
				}
			},
			"area": "GG"
		},
		"GG_Blue_Room": {
			"items": {},
			"transitions": {
				"left1": {
					"x": 82.0,
					"y": 18.0,
					"to": "GG_Atrium[door1_blueRoom]"
				}
			},
			"area": "GG"
		},
		"GG_Boss_Door_Entrance": {
			"items": {},
			"transitions": {},
			"area": "GG"
		},
		"GG_Door_5_Finale": {
			"items": {},
			"transitions": {},
			"area": "GG"
		},
		"GG_End_Sequence": {
			"items": {},
			"transitions": {},
			"area": "GG"
		},
		"GG_Engine": {
			"items": {},
			"transitions": {
				"right1": {
					"x": 106.0,
					"y": 18.0,
					"to": "[door_dreamEnter]"
				},
				"door_dreamEnter": {
					"x": 89.27,
					"y": 15.12,
					"to": null
				}
			},
			"area": "GG"
		},
		"GG_Engine_Prime": {
			"items": {},
			"transitions": {
				"door_dreamEnter": {
					"x": 89.27,
					"y": 15.12,
					"to": null
				},
				"right1": {
					"x": 106.0,
					"y": 18.0,
					"to": "[door_dreamEnter]"
				}
			},
			"area": "GG"
		},
		"GG_Engine_Root": {
			"items": {},
			"transitions": {
				"right1": {
					"x": 106.0,
					"y": 18.0,
					"to": "[door_dreamEnter]"
				},
				"door_dreamEnter": {
					"x": 65.67,
					"y": 14.78,
					"to": null
				}
			},
			"area": "GG"
		},
		"GG_Entrance_Cutscene": {
			"items": {},
			"transitions": {},
			"area": "GG"
		},
		"GG_Land_of_Storms": {
			"items": {},
			"transitions": {
				"door1": {
					"x": 64.97,
					"y": 13.82,
					"to": "GG_Atrium_Roof[door_Land_of_Storms]"
				}
			},
			"area": "GG"
		},
		"GG_Mage_Knight": {
			"items": {},
			"transitions": {
				"door_dreamEnter": {
					"x": 41.56,
					"y": 5.19,
					"to": null
				}
			},
			"area": "GG"
		},
		"GG_Mage_Knight_V": {
			"items": {},
			"transitions": {
				"door_dreamEnter": {
					"x": 41.56,
					"y": 5.19,
					"to": null
				}
			},
			"area": "GG"
		},
		"GG_Nailmasters": {
			"items": {},
			"transitions": {
				"door_dreamEnter": {
					"x": 41.61,
					"y": 4.88,
					"to": null
				}
			},
			"area": "GG"
		},
		"GG_Painter": {
			"items": {},
			"transitions": {
				"door_dreamEnter": {
					"x": 41.85,
					"y": 4.83,
					"to": null
				}
			},
			"area": "GG"
		},
		"GG_Sly": {
			"items": {},
			"transitions": {
				"door_dreamEnter": {
					"x": 42.26,
					"y": 4.9,
					"to": null
				}
			},
			"area": "GG"
		},
		"GG_Spa": {
			"items": {},
			"transitions": {
				"door_dreamEnter": {
					"x": 87.55,
					"y": 15.69,
					"to": null
				},
				"right1": {
					"x": 122.5,
					"y": 18.0,
					"to": "[door_dreamEnter]"
				}
			},
			"area": "GG"
		},
		"GG_Unlock": {
			"items": {},
			"transitions": {},
			"area": "GG"
		},
		"GG_Unlock_Wastes": {
			"items": {},
			"transitions": {
				"door_dreamEnter": {
					"x": 57.31,
					"y": 4.9,
					"to": null
				}
			},
			"area": "GG"
		},
		"GG_Workshop": {
			"items": {},
			"transitions": {
				"door_dreamReturnGG": {
					"x": 92.89899,
					"y": 35.95,
					"to": null
				},
				"left1": {
					"x": 2.0,
					"y": 9.0,
					"to": "GG_Atrium[Door_Workshop]"
				}
			},
			"area": "GG"
		},
		"GG_Wyrm": {
			"items": {},
			"transitions": {
				"right1": {
					"x": 106.0,
					"y": 18.0,
					"to": "[door_dreamEnter]"
				},
				"door_dreamEnter": {
					"x": 76.53,
					"y": 15.12,
					"to": null
				}
			},
			"area": "GG"
		},
		"Grimm_Main_Tent_boss": {
			"items": {},
			"transitions": {},
			"area": "Grimm"
		},
		"Grimm_Nightmare": {
			"items": {},
			"transitions": {
				"door1": {
					"x": 235.12,
					"y": 9.63,
					"to": null
				}
			},
			"area": "Grimm"
		},
		"Mines_18_boss": {
			"items": {},
			"transitions": {},
			"area": "Mines"
		},
		"Waterways_05_boss": {
			"items": {},
			"transitions": {},
			"area": "Waterways"
		},
		"Waterways_12_boss": {
			"items": {},
			"transitions": {},
			"area": "Waterways"
		}
	}
}