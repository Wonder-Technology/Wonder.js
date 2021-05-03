

import * as Caml_array from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Contract$WonderLog from "./../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as DisposeComponentService$Wonderjs from "../../../../primitive/component/DisposeComponentService.js";
import * as EventArcballCameraControllerMainService$Wonderjs from "./EventArcballCameraControllerMainService.js";

function isAlive(cameraController, param) {
  return DisposeComponentService$Wonderjs.isAlive(cameraController, param[/* disposedIndexArray */19]);
}

function _disposeData(cameraController, state) {
  var state$1 = EventArcballCameraControllerMainService$Wonderjs.unbindEvent(cameraController, state);
  var arcballCameraControllerRecord = state$1[/* arcballCameraControllerRecord */25];
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* arcballCameraControllerRecord */25] = /* record */[
    /* index */arcballCameraControllerRecord[/* index */0],
    /* pointDragStartEventHandleFuncListMap */arcballCameraControllerRecord[/* pointDragStartEventHandleFuncListMap */1],
    /* pointDragDropEventHandleFuncListMap */arcballCameraControllerRecord[/* pointDragDropEventHandleFuncListMap */2],
    /* pointDragOverEventHandleFuncListMap */arcballCameraControllerRecord[/* pointDragOverEventHandleFuncListMap */3],
    /* pointScaleEventHandleFuncListMap */arcballCameraControllerRecord[/* pointScaleEventHandleFuncListMap */4],
    /* keydownEventHandleFuncListMap */arcballCameraControllerRecord[/* keydownEventHandleFuncListMap */5],
    /* keyupEventHandleFuncListMap */arcballCameraControllerRecord[/* keyupEventHandleFuncListMap */6],
    /* distanceMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* distanceMap */7]),
    /* minDistanceMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* minDistanceMap */8]),
    /* phiMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* phiMap */9]),
    /* thetaMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* thetaMap */10]),
    /* thetaMarginMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* thetaMarginMap */11]),
    /* targetMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* targetMap */12]),
    /* moveSpeedXMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* moveSpeedXMap */13]),
    /* moveSpeedYMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* moveSpeedYMap */14]),
    /* rotateSpeedMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* rotateSpeedMap */15]),
    /* wheelSpeedMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* wheelSpeedMap */16]),
    /* directionArrayMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* directionArrayMap */17]),
    /* gameObjectMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* gameObjectMap */18]),
    /* disposedIndexArray */arcballCameraControllerRecord[/* disposedIndexArray */19]
  ];
  return newrecord;
}

function handleBatchDisposeComponent(cameraControllerArray, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */25];
  Contract$WonderLog.requireCheck((function (param) {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(cameraControllerArray, isAlive, arcballCameraControllerRecord);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = /* record */[
    /* index */arcballCameraControllerRecord[/* index */0],
    /* pointDragStartEventHandleFuncListMap */arcballCameraControllerRecord[/* pointDragStartEventHandleFuncListMap */1],
    /* pointDragDropEventHandleFuncListMap */arcballCameraControllerRecord[/* pointDragDropEventHandleFuncListMap */2],
    /* pointDragOverEventHandleFuncListMap */arcballCameraControllerRecord[/* pointDragOverEventHandleFuncListMap */3],
    /* pointScaleEventHandleFuncListMap */arcballCameraControllerRecord[/* pointScaleEventHandleFuncListMap */4],
    /* keydownEventHandleFuncListMap */arcballCameraControllerRecord[/* keydownEventHandleFuncListMap */5],
    /* keyupEventHandleFuncListMap */arcballCameraControllerRecord[/* keyupEventHandleFuncListMap */6],
    /* distanceMap */arcballCameraControllerRecord[/* distanceMap */7],
    /* minDistanceMap */arcballCameraControllerRecord[/* minDistanceMap */8],
    /* phiMap */arcballCameraControllerRecord[/* phiMap */9],
    /* thetaMap */arcballCameraControllerRecord[/* thetaMap */10],
    /* thetaMarginMap */arcballCameraControllerRecord[/* thetaMarginMap */11],
    /* targetMap */arcballCameraControllerRecord[/* targetMap */12],
    /* moveSpeedXMap */arcballCameraControllerRecord[/* moveSpeedXMap */13],
    /* moveSpeedYMap */arcballCameraControllerRecord[/* moveSpeedYMap */14],
    /* rotateSpeedMap */arcballCameraControllerRecord[/* rotateSpeedMap */15],
    /* wheelSpeedMap */arcballCameraControllerRecord[/* wheelSpeedMap */16],
    /* directionArrayMap */arcballCameraControllerRecord[/* directionArrayMap */17],
    /* gameObjectMap */arcballCameraControllerRecord[/* gameObjectMap */18],
    /* disposedIndexArray */arcballCameraControllerRecord[/* disposedIndexArray */19].concat(cameraControllerArray)
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
