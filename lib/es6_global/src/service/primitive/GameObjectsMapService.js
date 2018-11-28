

import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../state/main/data/StateDataMain.js";
import * as ArrayMapService$Wonderjs from "../atom/ArrayMapService.js";
import * as IsDebugMainService$Wonderjs from "../state/main/state/IsDebugMainService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

var getGameObjects = SparseMapService$WonderCommonlib.get;

function unsafeGetGameObjects(component, gameObjectsMap) {
  return Contract$WonderLog.ensureCheck((function (gameObjectsMap) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("component\'s gameObjectsMap exist", "not"), (function () {
                              return Contract$WonderLog.assertNullableExist(gameObjectsMap);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), SparseMapService$WonderCommonlib.unsafeGet(component, gameObjectsMap));
}

function removeGameObject(gameObject, component, gameObjectsMap) {
  return ArrayMapService$Wonderjs.removeValue(component, gameObject, gameObjectsMap);
}

var removeGameObjects = SparseMapService$WonderCommonlib.deleteVal;

export {
  getGameObjects ,
  unsafeGetGameObjects ,
  removeGameObject ,
  removeGameObjects ,
  
}
/* Log-WonderLog Not a pure module */
