

import * as Log$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../state/main/data/StateDataMain.js";
import * as ArrayMapService$Wonderjs from "../atom/ArrayMapService.js";
import * as IsDebugMainService$Wonderjs from "../state/main/state/IsDebugMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

var getGameObjects = MutableSparseMapService$WonderCommonlib.get;

function unsafeGetGameObjects(component, gameObjectsMap) {
  return Contract$WonderLog.ensureCheck((function (gameObjectsMap) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("component\'s gameObjectsMap exist", "not"), (function (param) {
                              return Contract$WonderLog.assertNullableExist(gameObjectsMap);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), MutableSparseMapService$WonderCommonlib.unsafeGet(component, gameObjectsMap));
}

function removeGameObject(gameObject, component, gameObjectsMap) {
  return ArrayMapService$Wonderjs.removeValue(component, gameObject, gameObjectsMap);
}

var removeGameObjects = MutableSparseMapService$WonderCommonlib.deleteVal;

function batchRemoveGameObjects(gameObjectArr, component, gameObjectsMap) {
  return ArrayMapService$Wonderjs.batchRemoveValueArr(component, gameObjectArr, gameObjectsMap);
}

export {
  getGameObjects ,
  unsafeGetGameObjects ,
  removeGameObject ,
  removeGameObjects ,
  batchRemoveGameObjects ,
  
}
/* Log-WonderLog Not a pure module */
