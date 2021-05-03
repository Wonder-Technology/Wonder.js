

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as ImmutableHashMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";

function getWholeDependencyRelationMap(wabRelativePath, state) {
  return ImmutableHashMapService$WonderCommonlib.get(wabRelativePath, state[/* assetBundleRecord */47][/* wabData */2][/* wholeDependencyRelationMap */2]);
}

function unsafeGetWholeDependencyRelationMap(wabRelativePath, state) {
  return OptionService$Wonderjs.unsafeGet(getWholeDependencyRelationMap(wabRelativePath, state));
}

function setWholeDependencyRelationMap(wabRelativePath, wholeDependencyRelation, state) {
  var assetBundleRecord = state[/* assetBundleRecord */47];
  var newrecord = Caml_array.caml_array_dup(state);
  var init = assetBundleRecord[/* wabData */2];
  newrecord[/* assetBundleRecord */47] = /* record */[
    /* assembleRABData */assetBundleRecord[/* assembleRABData */0],
    /* assembleSABData */assetBundleRecord[/* assembleSABData */1],
    /* wabData : record */[
      /* isLoadedMap */init[/* isLoadedMap */0],
      /* loadedWABMap */init[/* loadedWABMap */1],
      /* wholeDependencyRelationMap */ImmutableHashMapService$WonderCommonlib.set(wabRelativePath, wholeDependencyRelation, assetBundleRecord[/* wabData */2][/* wholeDependencyRelationMap */2])
    ]
  ];
  return newrecord;
}

function _markIsLoaded(wabRelativePath, isLoaded, state) {
  var assetBundleRecord = state[/* assetBundleRecord */47];
  var newrecord = Caml_array.caml_array_dup(state);
  var init = assetBundleRecord[/* wabData */2];
  newrecord[/* assetBundleRecord */47] = /* record */[
    /* assembleRABData */assetBundleRecord[/* assembleRABData */0],
    /* assembleSABData */assetBundleRecord[/* assembleSABData */1],
    /* wabData : record */[
      /* isLoadedMap */ImmutableHashMapService$WonderCommonlib.set(wabRelativePath, isLoaded, assetBundleRecord[/* wabData */2][/* isLoadedMap */0]),
      /* loadedWABMap */init[/* loadedWABMap */1],
      /* wholeDependencyRelationMap */init[/* wholeDependencyRelationMap */2]
    ]
  ];
  return newrecord;
}

function getLoadedWAB(wabRelativePath, state) {
  return ImmutableHashMapService$WonderCommonlib.get(wabRelativePath, state[/* assetBundleRecord */47][/* wabData */2][/* loadedWABMap */1]);
}

function unsafeGetLoadedWAB(wabRelativePath, state) {
  return OptionService$Wonderjs.unsafeGetWithMessage(Log$WonderLog.buildAssertMessage("wab arrayBuffer in wabRelativePath:" + (String(wabRelativePath) + " loaded"), "not"), getLoadedWAB(wabRelativePath, state));
}

function setLoadedWAB(wabRelativePath, wab, state) {
  var assetBundleRecord = state[/* assetBundleRecord */47];
  var newrecord = Caml_array.caml_array_dup(state);
  var init = assetBundleRecord[/* wabData */2];
  newrecord[/* assetBundleRecord */47] = /* record */[
    /* assembleRABData */assetBundleRecord[/* assembleRABData */0],
    /* assembleSABData */assetBundleRecord[/* assembleSABData */1],
    /* wabData : record */[
      /* isLoadedMap */init[/* isLoadedMap */0],
      /* loadedWABMap */ImmutableHashMapService$WonderCommonlib.set(wabRelativePath, wab, assetBundleRecord[/* wabData */2][/* loadedWABMap */1]),
      /* wholeDependencyRelationMap */init[/* wholeDependencyRelationMap */2]
    ]
  ];
  return newrecord;
}

function markLoaded(wabRelativePath, state) {
  return _markIsLoaded(wabRelativePath, true, state);
}

function markNotLoaded(wabRelativePath, state) {
  return _markIsLoaded(wabRelativePath, false, state);
}

function isLoaded(wabRelativePath, state) {
  var match = ImmutableHashMapService$WonderCommonlib.get(wabRelativePath, state[/* assetBundleRecord */47][/* wabData */2][/* isLoadedMap */0]);
  if (match !== undefined) {
    return match;
  } else {
    return false;
  }
}

export {
  getWholeDependencyRelationMap ,
  unsafeGetWholeDependencyRelationMap ,
  setWholeDependencyRelationMap ,
  _markIsLoaded ,
  getLoadedWAB ,
  unsafeGetLoadedWAB ,
  setLoadedWAB ,
  markLoaded ,
  markNotLoaded ,
  isLoaded ,
  
}
/* Log-WonderLog Not a pure module */
