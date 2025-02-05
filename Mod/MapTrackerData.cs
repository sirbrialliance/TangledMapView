using System.Collections.Generic;
using System.Linq;
using RandomizerCore;
using RandomizerCore.Logic;
using RandomizerMod.IC;
using RandomizerMod.Settings;

namespace TangledMapView {

public enum LogicState {
	NOT_RANDOMIZED = 1,
	OUT_OF_LOGIC = 2,
	IN_LOGIC = 3,
	PREVIEWED = 4,
	OBTAINED = 5,
}

public class MapTrackerData {
	private readonly TangledMapViewMod mod;

	public static TrackerData TD => RandomizerMod.RandomizerMod.RS.TrackerData;

	public MapTrackerData(TangledMapViewMod mod) {
		this.mod = mod;

		TrackerUpdate.OnFinishedUpdate += SendUpdate;
	}

	public void SendUpdate() {
		UpdateLocations();
		UpdateTransitions();
	}

	private void UpdateLocations() {
		var locationStates = new Dictionary<string, int>();
		var td = MapTrackerData.TD;

		foreach (var locationId in td.uncheckedReachableLocations) {
			locationStates[locationId] = (int)LogicState.IN_LOGIC;
		}

		foreach (var locationId in td.previewedLocations) {
			locationStates[locationId] = (int)LogicState.PREVIEWED;
		}

		foreach (var locationId in td.clearedLocations) {
			locationStates[locationId] = (int)LogicState.OBTAINED;
		}

		mod.server.Send("logicUpdate", "locations", locationStates);
	}

	/// <summary>
	/// Sends info on what transitions can be reached (though perhaps indirectly) with
	/// the current items.
	/// </summary>
	private void UpdateTransitions() {
		var transitionStates = new Dictionary<string, int>();
		var td = MapTrackerData.TD;

		foreach (var doorId in td.uncheckedReachableTransitions) {
			transitionStates[doorId] = (int)LogicState.IN_LOGIC;
		}

		foreach (var kvp in td.visitedTransitions) {
			transitionStates[kvp.Key] = (int)LogicState.OBTAINED;
		}

		mod.server.Send("logicUpdate", "transitions", transitionStates);

	}

	/// <summary>
	/// Sends info on which transitions can be directly reached from other transitions.
	/// This is complicated by the fact that we only want to indicate what we can directly reach
	/// from the given transition while staying in the room, not what we could potentially
	/// reach from any sort of path through the game to there.
	/// </summary>
	private void UpdatePathing() {
		/*

		var lm = MapTrackerData.TD.lm;
		var pm = MapTrackerData.TD.pm;
		var transitionStates = new Dictionary<string, List<string>>();

		mod.Log("PM state: " + pm.Dump());
		pm.StartTemp();

		//Get a list of only the items we have. (No transitions, but keep rooms.)
		var obtainedItems = new List<LogicItem>();
		foreach (var kvp in lm.ItemLookup) {
			if (kvp.Key.Contains('[')) continue;//quick transition check
			var term = lm.GetTerm(kvp.Key);
			if (term == null) continue;
			if (!pm.Has(term.Id)) continue;

			obtainedItems.Add(kvp.Value);
		}

		foreach (var (transitionId, transition) in lm.TransitionLookup) {
			var canGetTo = new List<string>();
			transitionStates[transitionId] = canGetTo;

			//Need the progression manager to pretend we only have obtainedItems and the door we are checking.
			pm.RestrictTempTo(obtainedItems);
			pm.Add(transition);
			mod.Log("PM temp state: " + pm.Dump());

// 			//check other doors in room
// 			foreach (var door in doors) {
// 				if (door == transitionId) continue;
// Term.GetValue(...)?
// 				if (lm.)
//
// 			}

			if (transitionStates.Count > 5) break;
		}

		pm.RemoveTempItems();

		mod.server.Send("logicUpdate", "paths", transitionStates);
		*/
	}

}
}