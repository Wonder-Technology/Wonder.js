

import * as Contract$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as DisposeComponentService$Wonderjs from "../../../primitive/component/DisposeComponentService.js";
import * as DisposeTypeArrayService$Wonderjs from "../../../primitive/buffer/DisposeTypeArrayService.js";
import * as BufferMeshRendererService$Wonderjs from "./BufferMeshRendererService.js";

var _batchRemoveFromRenderArray = DisposeComponentService$Wonderjs.batchRemoveFromArray;

function isAlive(meshRenderer, param) {
  return DisposeComponentService$Wonderjs.isAlive(meshRenderer, param[/* disposedIndexArray */7]);
}

function _disposeData(meshRenderer, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* drawModes */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(BufferMeshRendererService$Wonderjs.getDrawModeIndex(meshRenderer), BufferMeshRendererService$Wonderjs.getDefaultDrawMode(/* () */0), record[/* drawModes */2]),
          /* isRenders */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(BufferMeshRendererService$Wonderjs.getIsRenderIndex(meshRenderer), BufferMeshRendererService$Wonderjs.getDefaultIsRender(/* () */0), record[/* isRenders */3]),
          /* basicMaterialRenderGameObjectMap */DisposeComponentService$Wonderjs.disposeSparseMapData(meshRenderer, record[/* basicMaterialRenderGameObjectMap */4]),
          /* lightMaterialRenderGameObjectMap */DisposeComponentService$Wonderjs.disposeSparseMapData(meshRenderer, record[/* lightMaterialRenderGameObjectMap */5]),
          /* gameObjectMap */DisposeComponentService$Wonderjs.disposeSparseMapData(meshRenderer, record[/* gameObjectMap */6]),
          /* disposedIndexArray */record[/* disposedIndexArray */7]
        ];
}

function handleBatchDisposeComponent(meshRendererArray, record) {
  Contract$WonderLog.requireCheck((function (param) {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(meshRendererArray, isAlive, record);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var match = meshRendererArray.length;
  if (match !== 0) {
    var record_000 = /* index */record[/* index */0];
    var record_001 = /* buffer */record[/* buffer */1];
    var record_002 = /* drawModes */record[/* drawModes */2];
    var record_003 = /* isRenders */record[/* isRenders */3];
    var record_004 = /* basicMaterialRenderGameObjectMap */record[/* basicMaterialRenderGameObjectMap */4];
    var record_005 = /* lightMaterialRenderGameObjectMap */record[/* lightMaterialRenderGameObjectMap */5];
    var record_006 = /* gameObjectMap */record[/* gameObjectMap */6];
    var record_007 = /* disposedIndexArray */record[/* disposedIndexArray */7].concat(meshRendererArray);
    var record$1 = /* record */[
      record_000,
      record_001,
      record_002,
      record_003,
      record_004,
      record_005,
      record_006,
      record_007
    ];
    return ArrayService$WonderCommonlib.reduceOneParam((function (record, meshRenderer) {
                  return _disposeData(meshRenderer, record);
                }), record$1, meshRendererArray);
  } else {
    return record;
  }
}

export {
  _batchRemoveFromRenderArray ,
  isAlive ,
  _disposeData ,
  handleBatchDisposeComponent ,
  
}
/* Contract-WonderLog Not a pure module */
