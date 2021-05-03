

import * as Caml_array from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Contract$WonderLog from "./../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as DisposeComponentService$Wonderjs from "../../../../primitive/component/DisposeComponentService.js";
import * as EventFlyCameraControllerMainService$Wonderjs from "./EventFlyCameraControllerMainService.js";

function isAlive(cameraController, param) {
  return DisposeComponentService$Wonderjs.isAlive(cameraController, param[/* disposedIndexArray */13]);
}

function _disposeData(cameraController, state) {
  var state$1 = EventFlyCameraControllerMainService$Wonderjs.unbindEvent(cameraController, state);
  var flyCameraControllerRecord = state$1[/* flyCameraControllerRecord */26];
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* flyCameraControllerRecord */26] = /* record */[
    /* index */flyCameraControllerRecord[/* index */0],
    /* pointDragStartEventHandleFuncListMap */flyCameraControllerRecord[/* pointDragStartEventHandleFuncListMap */1],
    /* pointDragDropEventHandleFuncListMap */flyCameraControllerRecord[/* pointDragDropEventHandleFuncListMap */2],
    /* pointDragOverEventHandleFuncListMap */flyCameraControllerRecord[/* pointDragOverEventHandleFuncListMap */3],
    /* pointScaleEventHandleFuncListMap */flyCameraControllerRecord[/* pointScaleEventHandleFuncListMap */4],
    /* keydownEventHandleFuncListMap */flyCameraControllerRecord[/* keydownEventHandleFuncListMap */5],
    /* keyupEventHandleFuncListMap */flyCameraControllerRecord[/* keyupEventHandleFuncListMap */6],
    /* moveSpeedMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, flyCameraControllerRecord[/* moveSpeedMap */7]),
    /* wheelSpeedMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, flyCameraControllerRecord[/* wheelSpeedMap */8]),
    /* rotateSpeedMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, flyCameraControllerRecord[/* rotateSpeedMap */9]),
    /* eulerAngleDiffMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, flyCameraControllerRecord[/* eulerAngleDiffMap */10]),
    /* translationDiffMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, flyCameraControllerRecord[/* translationDiffMap */11]),
    /* gameObjectMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, flyCameraControllerRecord[/* gameObjectMap */12]),
    /* disposedIndexArray */flyCameraControllerRecord[/* disposedIndexArray */13],
    /* directionArrayMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, flyCameraControllerRecord[/* directionArrayMap */14]),
    /* localEulerAngleMap */flyCameraControllerRecord[/* localEulerAngleMap */15]
  ];
  return newrecord;
}

function handleBatchDisposeComponent(cameraControllerArray, state) {
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  Contract$WonderLog.requireCheck((function (param) {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(cameraControllerArray, isAlive, flyCameraControllerRecord);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* flyCameraControllerRecord */26] = /* record */[
    /* index */flyCameraControllerRecord[/* index */0],
    /* pointDragStartEventHandleFuncListMap */flyCameraControllerRecord[/* pointDragStartEventHandleFuncListMap */1],
    /* pointDragDropEventHandleFuncListMap */flyCameraControllerRecord[/* pointDragDropEventHandleFuncListMap */2],
    /* pointDragOverEventHandleFuncListMap */flyCameraControllerRecord[/* pointDragOverEventHandleFuncListMap */3],
    /* pointScaleEventHandleFuncListMap */flyCameraControllerRecord[/* pointScaleEventHandleFuncListMap */4],
    /* keydownEventHandleFuncListMap */flyCameraControllerRecord[/* keydownEventHandleFuncListMap */5],
    /* keyupEventHandleFuncListMap */flyCameraControllerRecord[/* keyupEventHandleFuncListMap */6],
    /* moveSpeedMap */flyCameraControllerRecord[/* moveSpeedMap */7],
    /* wheelSpeedMap */flyCameraControllerRecord[/* wheelSpeedMap */8],
    /* rotateSpeedMap */flyCameraControllerRecord[/* rotateSpeedMap */9],
    /* eulerAngleDiffMap */flyCameraControllerRecord[/* eulerAngleDiffMap */10],
    /* translationDiffMap */flyCameraControllerRecord[/* translationDiffMap */11],
    /* gameObjectMap */flyCameraControllerRecord[/* gameObjectMap */12],
    /* disposedIndexArray */flyCameraControllerRecord[/* disposedIndexArray */13].concat(cameraControllerArray),
    /* directionArrayMap */flyCameraControllerRecord[/* directionArrayMap */14],
    /* localEulerAngleMap */flyCameraControllerRecord[/* localEulerAngleMap */15]
  ];
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, cameraController) {
                return _disposeData(cameraController, state);
              }), newrecord, cameraControllerArray);
}

export {
  isAlive ,
  _disposeData ,
  handleBatchDisposeComponent ,
  
}
/* Contract-WonderLog Not a pure module */
