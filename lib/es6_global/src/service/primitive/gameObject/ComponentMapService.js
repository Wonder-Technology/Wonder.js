

import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as NullService$Wonderjs from "../../atom/NullService.js";
import * as ArrayService$Wonderjs from "../../atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

var getComponent = MutableSparseMapService$WonderCommonlib.get;

function unsafeGetComponent(uid, componentMap) {
  return Contract$WonderLog.ensureCheck((function (r) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("component exist", "not"), (function (param) {
                              return Contract$WonderLog.assertNullableExist(r);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), MutableSparseMapService$WonderCommonlib.unsafeGet(uid, componentMap));
}

function hasComponent(uid, componentMap) {
  return NullService$Wonderjs.isInMap(MutableSparseMapService$WonderCommonlib.unsafeGet(uid, componentMap));
}

function addComponent(uid, component, componentMap) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("this type of the component shouldn\'t be added before", "not"), (function (param) {
                        return Contract$WonderLog.assertFalse(hasComponent(uid, componentMap));
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  MutableSparseMapService$WonderCommonlib.set(uid, component, componentMap);
  return /* () */0;
}

var removeComponent = MutableSparseMapService$WonderCommonlib.deleteVal;

var hasComponent$1 = hasComponent;

function batchGetComponent(uidArray, componentMap) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (arr, uid) {
                var match = MutableSparseMapService$WonderCommonlib.get(uid, componentMap);
                if (match !== undefined) {
                  return ArrayService$Wonderjs.push(match, arr);
                } else {
                  return arr;
                }
              }), /* array */[], uidArray);
}

function batchDisposeComponentWithUidMap(uidMap, componentRecord, handleFunc, componentArray) {
  return handleFunc(componentArray, uidMap, componentRecord);
}

function batchDisposeComponent(componentRecord, handleFunc, componentArray) {
  return handleFunc(componentArray, componentRecord);
}

export {
  getComponent ,
  unsafeGetComponent ,
  addComponent ,
  removeComponent ,
  hasComponent$1 as hasComponent,
  batchGetComponent ,
  batchDisposeComponentWithUidMap ,
  batchDisposeComponent ,
  
}
/* Log-WonderLog Not a pure module */
