

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as FindDependencyDataSystem$Wonderjs from "../../../../asset_bundle/all/dependency/FindDependencyDataSystem.js";
import * as ImmutableHashMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";
import * as OperateRABAssetBundleMainService$Wonderjs from "./OperateRABAssetBundleMainService.js";
import * as OperateWABAssetBundleMainService$Wonderjs from "./OperateWABAssetBundleMainService.js";

function getLoadedSAB(sabRelativePath, state) {
  return ImmutableHashMapService$WonderCommonlib.get(sabRelativePath, state[/* assetBundleRecord */47][/* assembleSABData */1][/* loadedSABMap */2]);
}

function unsafeGetLoadedSAB(sabRelativePath, state) {
  return OptionService$Wonderjs.unsafeGetWithMessage(Log$WonderLog.buildAssertMessage("sab arrayBuffer in sabRelativePath:" + (String(sabRelativePath) + " loaded"), "not"), getLoadedSAB(sabRelativePath, state));
}

function setLoadedSAB(sabRelativePath, sab, state) {
  var assetBundleRecord = state[/* assetBundleRecord */47];
  var newrecord = Caml_array.caml_array_dup(state);
  var init = assetBundleRecord[/* assembleSABData */1];
  newrecord[/* assetBundleRecord */47] = /* record */[
    /* assembleRABData */assetBundleRecord[/* assembleRABData */0],
    /* assembleSABData : record */[
      /* isLoadedMap */init[/* isLoadedMap */0],
      /* isAssembledMap */init[/* isAssembledMap */1],
      /* loadedSABMap */ImmutableHashMapService$WonderCommonlib.set(sabRelativePath, sab, assetBundleRecord[/* assembleSABData */1][/* loadedSABMap */2])
    ],
    /* wabData */assetBundleRecord[/* wabData */2]
  ];
  return newrecord;
}

function _markIsLoaded(sabRelativePath, isLoaded, state) {
  var assetBundleRecord = state[/* assetBundleRecord */47];
  var newrecord = Caml_array.caml_array_dup(state);
  var init = assetBundleRecord[/* assembleSABData */1];
  newrecord[/* assetBundleRecord */47] = /* record */[
    /* assembleRABData */assetBundleRecord[/* assembleRABData */0],
    /* assembleSABData : record */[
      /* isLoadedMap */ImmutableHashMapService$WonderCommonlib.set(sabRelativePath, isLoaded, assetBundleRecord[/* assembleSABData */1][/* isLoadedMap */0]),
      /* isAssembledMap */init[/* isAssembledMap */1],
      /* loadedSABMap */init[/* loadedSABMap */2]
    ],
    /* wabData */assetBundleRecord[/* wabData */2]
  ];
  return newrecord;
}

function markLoaded(sabRelativePath, state) {
  return _markIsLoaded(sabRelativePath, true, state);
}

function markNotLoaded(sabRelativePath, state) {
  return _markIsLoaded(sabRelativePath, false, state);
}

function isLoaded(sabRelativePath, state) {
  var match = ImmutableHashMapService$WonderCommonlib.get(sabRelativePath, state[/* assetBundleRecord */47][/* assembleSABData */1][/* isLoadedMap */0]);
  if (match !== undefined) {
    return match;
  } else {
    return false;
  }
}

function _markIsAssembled(sabRelativePath, isAssembled, state) {
  var assetBundleRecord = state[/* assetBundleRecord */47];
  var newrecord = Caml_array.caml_array_dup(state);
  var init = assetBundleRecord[/* assembleSABData */1];
  newrecord[/* assetBundleRecord */47] = /* record */[
    /* assembleRABData */assetBundleRecord[/* assembleRABData */0],
    /* assembleSABData : record */[
      /* isLoadedMap */init[/* isLoadedMap */0],
      /* isAssembledMap */ImmutableHashMapService$WonderCommonlib.set(sabRelativePath, isAssembled, assetBundleRecord[/* assembleSABData */1][/* isAssembledMap */1]),
      /* loadedSABMap */init[/* loadedSABMap */2]
    ],
    /* wabData */assetBundleRecord[/* wabData */2]
  ];
  return newrecord;
}

function markAssembled(sabRelativePath, state) {
  return _markIsAssembled(sabRelativePath, true, state);
}

function markNotAssembled(sabRelativePath, state) {
  return _markIsAssembled(sabRelativePath, false, state);
}

function isAssembled(sabRelativePath, state) {
  var match = ImmutableHashMapService$WonderCommonlib.get(sabRelativePath, state[/* assetBundleRecord */47][/* assembleSABData */1][/* isAssembledMap */1]);
  if (match !== undefined) {
    return match;
  } else {
    return false;
  }
}

function canAssemble(sabRelativePath, wabRelativePath, state) {
  if (isLoaded(sabRelativePath, state)) {
    var match = OperateWABAssetBundleMainService$Wonderjs.getWholeDependencyRelationMap(wabRelativePath, state);
    if (match !== undefined) {
      return FindDependencyDataSystem$Wonderjs.findAllDependencyRABRelativePathByDepthSearch(sabRelativePath, Caml_option.valFromOption(match)).filter((function (rabRelativePath) {
                    return !OperateRABAssetBundleMainService$Wonderjs.isAssembled(rabRelativePath, state);
                  })).length === 0;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function releaseLoadedSAB(sabRelativePath, state) {
  var assetBundleRecord = state[/* assetBundleRecord */47];
  var newrecord = Caml_array.caml_array_dup(state);
  var init = assetBundleRecord[/* assembleSABData */1];
  newrecord[/* assetBundleRecord */47] = /* record */[
    /* assembleRABData */assetBundleRecord[/* assembleRABData */0],
    /* assembleSABData : record */[
      /* isLoadedMap */init[/* isLoadedMap */0],
      /* isAssembledMap */init[/* isAssembledMap */1],
      /* loadedSABMap */ImmutableHashMapService$WonderCommonlib.deleteVal(sabRelativePath, assetBundleRecord[/* assembleSABData */1][/* loadedSABMap */2])
    ],
    /* wabData */assetBundleRecord[/* wabData */2]
  ];
  return markNotLoaded(sabRelativePath, newrecord);
}

export {
  getLoadedSAB ,
  unsafeGetLoadedSAB ,
  setLoadedSAB ,
  _markIsLoaded ,
  markLoaded ,
  markNotLoaded ,
  isLoaded ,
  _markIsAssembled ,
  markAssembled ,
  markNotAssembled ,
  isAssembled ,
  canAssemble ,
  releaseLoadedSAB ,
  
}
/* Log-WonderLog Not a pure module */
