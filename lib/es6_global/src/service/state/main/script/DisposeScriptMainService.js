

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as DisposeScriptService$Wonderjs from "../../../record/main/script/DisposeScriptService.js";
import * as DisposeComponentService$Wonderjs from "../../../primitive/component/DisposeComponentService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";
import * as OperateScriptEventFunctionDataMainService$Wonderjs from "./OperateScriptEventFunctionDataMainService.js";

function _disposeData(script, state) {
  var scriptRecord = state[/* scriptRecord */25];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* scriptRecord */25] = /* record */[
    /* index */scriptRecord[/* index */0],
    /* isScriptEventFunctionEnable */scriptRecord[/* isScriptEventFunctionEnable */1],
    /* disposedIndexArray */scriptRecord[/* disposedIndexArray */2],
    /* gameObjectMap */DisposeComponentService$Wonderjs.disposeSparseMapData(script, scriptRecord[/* gameObjectMap */3]),
    /* isActiveMap */MutableSparseMapService$WonderCommonlib.deleteVal(script, scriptRecord[/* isActiveMap */4]),
    /* scriptEventFunctionDataMap */ImmutableSparseMapService$WonderCommonlib.deleteVal(script, scriptRecord[/* scriptEventFunctionDataMap */5]),
    /* scriptAttributeMap */ImmutableSparseMapService$WonderCommonlib.deleteVal(script, scriptRecord[/* scriptAttributeMap */6])
  ];
  return newrecord;
}

function _batchExecDisposeEventFunction(scriptArray, state) {
  return OperateScriptEventFunctionDataMainService$Wonderjs.execAllEventFunction(OperateScriptEventFunctionDataMainService$Wonderjs.getActiveScriptAllDisposeEventFunctionData(scriptArray, state), state);
}

function handleBatchDisposeComponent(scriptArray, state) {
  var scriptRecord = state[/* scriptRecord */25];
  Contract$WonderLog.requireCheck((function (param) {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(scriptArray, DisposeScriptService$Wonderjs.isAlive, scriptRecord);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var state$1 = _batchExecDisposeEventFunction(scriptArray, state);
  var scriptRecord$1 = state$1[/* scriptRecord */25];
  var newrecord = Caml_array.caml_array_dup(state$1);
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, script) {
                return _disposeData(script, state);
              }), (newrecord[/* scriptRecord */25] = /* record */[
                /* index */scriptRecord$1[/* index */0],
                /* isScriptEventFunctionEnable */scriptRecord$1[/* isScriptEventFunctionEnable */1],
                /* disposedIndexArray */scriptRecord$1[/* disposedIndexArray */2].concat(scriptArray),
                /* gameObjectMap */scriptRecord$1[/* gameObjectMap */3],
                /* isActiveMap */scriptRecord$1[/* isActiveMap */4],
                /* scriptEventFunctionDataMap */scriptRecord$1[/* scriptEventFunctionDataMap */5],
                /* scriptAttributeMap */scriptRecord$1[/* scriptAttributeMap */6]
              ], newrecord), scriptArray);
}

export {
  _disposeData ,
  _batchExecDisposeEventFunction ,
  handleBatchDisposeComponent ,
  
}
/* Contract-WonderLog Not a pure module */
