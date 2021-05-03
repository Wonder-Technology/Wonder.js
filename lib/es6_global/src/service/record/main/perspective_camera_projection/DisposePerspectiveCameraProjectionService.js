

import * as Contract$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as DisposeComponentService$Wonderjs from "../../../primitive/component/DisposeComponentService.js";

function isAlive(cameraProjection, param) {
  return DisposeComponentService$Wonderjs.isAlive(cameraProjection, param[/* disposedIndexArray */8]);
}

function _disposeData(cameraProjection, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* dirtyArray */record[/* dirtyArray */1].filter((function (dirtyIndex) {
                  return dirtyIndex !== cameraProjection;
                })),
          /* pMatrixMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraProjection, record[/* pMatrixMap */2]),
          /* nearMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraProjection, record[/* nearMap */3]),
          /* farMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraProjection, record[/* farMap */4]),
          /* fovyMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraProjection, record[/* fovyMap */5]),
          /* aspectMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraProjection, record[/* aspectMap */6]),
          /* gameObjectMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraProjection, record[/* gameObjectMap */7]),
          /* disposedIndexArray */record[/* disposedIndexArray */8]
        ];
}

function handleBatchDisposeComponent(cameraProjectionArray, record) {
  Contract$WonderLog.requireCheck((function (param) {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(cameraProjectionArray, isAlive, record);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return ArrayService$WonderCommonlib.reduceOneParam((function (record, cameraProjection) {
                return _disposeData(cameraProjection, record);
              }), /* record */[
              /* index */record[/* index */0],
              /* dirtyArray */record[/* dirtyArray */1],
              /* pMatrixMap */record[/* pMatrixMap */2],
              /* nearMap */record[/* nearMap */3],
              /* farMap */record[/* farMap */4],
              /* fovyMap */record[/* fovyMap */5],
              /* aspectMap */record[/* aspectMap */6],
              /* gameObjectMap */record[/* gameObjectMap */7],
              /* disposedIndexArray */record[/* disposedIndexArray */8].concat(cameraProjectionArray)
            ], cameraProjectionArray);
}

export {
  isAlive ,
  _disposeData ,
  handleBatchDisposeComponent ,
  
}
/* Contract-WonderLog Not a pure module */
