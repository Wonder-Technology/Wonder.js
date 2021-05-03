

import * as Log$WonderLog from "./../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../../state/main/state/IsDebugMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function _unsafeGetMapUnit(material, unitMap) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("unitMap has unit", "not"), (function (param) {
                        return Contract$WonderLog.assertTrue(MutableSparseMapService$WonderCommonlib.has(material, unitMap));
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return MutableSparseMapService$WonderCommonlib.unsafeGet(material, unitMap);
}

function unsafeGetDiffuseMapUnit(material, lightMaterialRecord) {
  return _unsafeGetMapUnit(material, lightMaterialRecord[/* diffuseMapUnitMap */0]);
}

function unsafeGetSpecularMapUnit(material, lightMaterialRecord) {
  return _unsafeGetMapUnit(material, lightMaterialRecord[/* specularMapUnitMap */1]);
}

export {
  _unsafeGetMapUnit ,
  unsafeGetDiffuseMapUnit ,
  unsafeGetSpecularMapUnit ,
  
}
/* Log-WonderLog Not a pure module */
