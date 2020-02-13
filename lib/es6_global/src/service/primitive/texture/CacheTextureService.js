

import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../state/main/state/IsDebugMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function isCached(unit, texture, bindTextureUnitCacheMap) {
  var match = MutableSparseMapService$WonderCommonlib.get(unit, bindTextureUnitCacheMap);
  if (match !== undefined) {
    return Caml_option.valFromOption(match) === texture;
  } else {
    return false;
  }
}

function addActiveTexture(unit, texture, bindTextureUnitCacheMap) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("not cached", ""), (function (param) {
                        return Contract$WonderLog.assertFalse(isCached(unit, texture, bindTextureUnitCacheMap));
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return MutableSparseMapService$WonderCommonlib.set(unit, texture, bindTextureUnitCacheMap);
}

export {
  isCached ,
  addActiveTexture ,
  
}
/* Log-WonderLog Not a pure module */
