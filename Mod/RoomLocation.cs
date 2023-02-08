using System;
using System.Linq;
using System.Reflection;
using ItemChanger;
using ItemChanger.Extensions;
using ItemChanger.Locations;
using ItemChanger.Locations.SpecialLocations;
using Newtonsoft.Json;
using UnityEngine;

namespace TangledMapView {
/// <summary>
/// Same as an itemchanger placement, but with the info we care about.
/// </summary>
[Serializable]
public class RoomLocation {
	public string id;

	public float x, y, z;

	[JsonIgnore]
	public Vector3 Position {
		get => new Vector3(x, y, z);
		set {
			x = value.x;
			y = value.y;
			z = value.z;
		}
	}

	public static Vector3 ByObject(string objectName) {
		var hasPath = false;
		if (objectName.Contains("\\") || objectName.Contains("/")) {
			objectName = objectName.Replace("\\", "/");
			hasPath = true;
		}

		var obj = GameObject.Find(objectName);
		if (obj) return obj.transform.position;

		//maybe it's disabled?
		if (!hasPath) {
			foreach (var go in GameObject.FindObjectsOfType<GameObject>(true)) {
				if (go.name == objectName) return go.transform.position;
			}
		} else {
			var parts = objectName.Split('/');
			if (parts.Length != 2) throw new ArgumentException("Unsupported path type");
			foreach (var go in GameObject.FindObjectsOfType<GameObject>(true)) {
				if (go.name == parts[1] && go.transform.parent && go.transform.parent.name == parts[0]) {
					return go.transform.position;
				}
			}
		}

		throw new Exception("Failed to find object " + objectName);
	}

	public static Vector3 ByFSM(FsmID id) {
		//this logic don't fully match ItemChanger.Events.FsmHook() (weakID/id/strongID), but should be good enough
		foreach (var fsm in GameObject.FindObjectsOfType<PlayMakerFSM>(true)) {
			if (fsm.FsmName != id.FsmName) continue;

			if (id.ObjectName != null && id.ObjectName.StartsWith("/")) {
				//strict path check
				if ("/" + fsm.transform.GetPathInHierarchy() != id.ObjectName) continue;
			} else if (!string.IsNullOrEmpty(id.ObjectName)) {
				//basic object name check
				if (id.ObjectName != fsm.name) continue;
			}


			return fsm.transform.position;
		}

		Debug.LogWarning("FSM Candidates: " + string.Join(", ", GameObject.FindObjectsOfType<PlayMakerFSM>().Select(x =>
			$"{x.name} -> {x.FsmName}"
		)));

		throw new Exception($"Failed to find anything to match FsmID \"{id}\"");
	}

	public static Vector3 ResolveLocation(AbstractLocation icLocation) {
		//Ugly "data fix" hacks:
		switch (icLocation.name) {
			case "Sly_(Key)": return ByObject("Sly Shop");
			case "Leg_Eater": return ByObject("Leg Eater");
		}


		//A million ways to grab data:
		if (icLocation is ObjectLocation ol) {
			return ByObject(ol.objectName);
		} else if (icLocation is CoordinateLocation cl) {
			return new Vector3(cl.x, cl.y, 0);
		} else if (icLocation is DualLocation dl) {
			return ResolveLocation(dl.trueLocation);
		} else if (icLocation is ExistingFsmContainerLocation efcl) {
			return ByFSM(new FsmID(efcl.objectName, efcl.fsmName));
		} else if (icLocation is ShopLocation sl) {
			return ByFSM(new FsmID(sl.objectName, sl.fsmName));
		} else if (icLocation is BossEssenceLocation bel) {
			return ByFSM(new FsmID(bel.objName, bel.fsmName));
		} else if (icLocation is EggShopLocation esl) {
			return ResolveLocation(esl.location);
		} else if (icLocation is WhisperingRootLocation wrl) {
			return GameObject.FindObjectOfType<DreamPlant>().transform.position;
		} else if (icLocation is CorniferLocation corn) {
			try {
				return ByObject(corn.objectName);
			} catch {
				return ByFSM(new FsmID("Cornifer Card", "FSM"));
			}
		} else if (icLocation is CostChestLocation ccl) {
			return ResolveLocation(ccl.chestLocation);
		}

		switch (icLocation.GetType().Name) {
			// case "ShadeSoulLocation": return ByFSM(new FsmID("Ruins Shaman", "Ruins Shaman"));
			// case "GrimmkinLocation": return ByObject("Flamebearer Spawn");//return ByFSM(new FsmID("Flamebearer Spawn", "Spawn Control"));

			case "DescendingDarkLocation":
			case "DivineLocation":
			case "NailmasterLocation":
			case "EnemyLocation":
			case "SealOfBindingLocation": {
				//has an "objectName" property
				var objNameField = icLocation.GetType().GetField("objectName", BindingFlags.Public | BindingFlags.Instance);
				return ByObject((string)objNameField.GetValue(icLocation));
			}
			case "AbyssShriekLocation": return ByFSM(new FsmID("Scream 2 Get", "Scream Get"));
			case "BrummFlameLocation": return ByFSM(new FsmID("Brumm Torch NPC", "Conversation Control"));
			case "GrimmkinLocation": return ByFSM(new FsmID("Flamebearer Spawn", "Spawn Control"));
			case "GruzMotherDropLocation": return ByObject("Corpse Big Fly Burster");
			case "NailmastersGloryLocation": return ByFSM(new FsmID("Sly Basement NPC", "Conversation Control"));
			case "ShadeCloakLocation": return ByFSM(new FsmID("Dish Plat", "Get Shadow Dash"));
			case "ShadeSoulLocation": return ByFSM(new FsmID("Ruins Shaman", "Ruins Shaman"));
			case "TukDefendersCrestLocation": return ByObject("Alive_Tuk");
			case "VoidHeartLocation": return ByFSM(new FsmID("End Cutscene", "Control"));
		}

		throw new Exception($"Don't know how to find location of type {icLocation.GetType().FullName} for {icLocation.name}");
	}



	/// <summary>
	/// Given that the location's scene is loaded, fills our fields with the appropriate
	/// info.
	/// </summary>
	public static RoomLocation From(AbstractLocation icLocation) {
		try {
			var ret = new RoomLocation {id = icLocation.name};
			ret.Position = ResolveLocation(icLocation);

			return ret;
		} catch (Exception ex) {
			throw new Exception($"Failed to locate {icLocation.name} in {icLocation.sceneName} ({icLocation.GetType().FullName})", ex);
		}
	}
}
}
