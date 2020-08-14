

import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as DisposeComponentService$Wonderjs from "../../../primitive/component/DisposeComponentService.js";

function isAlive(cameraView, param) {
  return DisposeComponentService$Wonderjs.isAlive(cameraView, param[/* disposedIndexArray */3]);
}

function _disposeData(cameraView, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* isActiveMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraView, record[/* isActiveMap */1]),
          /* gameObjectMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraView, record[/* gameObjectMap */2]),
          /* disposedIndexArray */record[/* disposedIndexArray */3]
        ];
}

function handleBatchDisposeComponent(cameraViewArray, record) {
  Contract$WonderLog.requireCheck((function (param) {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(cameraViewArray, isAlive, record);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return ArrayService$WonderCommonlib.reduceOneParam((function (record, cameraView) {
                return _disposeData(cameraView, record);
              }), /* record */[
              /* index */record[/* index */0],
              /* isActiveMap */record[/* isActiveMap */1],
              /* gameObjectMap */record[/* gameObjectMap */2],
              /* disposedIndexArray */record[/* disposedIndexArray */3].concat(cameraViewArray)
            ], cameraViewArray);
}

export {
  isAlive ,
  _disposeData ,
  handleBatchDisposeComponent ,
  
}
/* Contract-WonderLog Not a pure module */
