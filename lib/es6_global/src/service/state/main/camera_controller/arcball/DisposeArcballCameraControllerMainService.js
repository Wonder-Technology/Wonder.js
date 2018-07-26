

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Js_primitive from "../../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Contract$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../data/StateDataMain.js";
import * as NameEventService$Wonderjs from "../../../../record/main/event/NameEventService.js";
import * as IsDebugMainService$Wonderjs from "../../state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ManageEventMainService$Wonderjs from "../../event/ManageEventMainService.js";
import * as DisposeComponentService$Wonderjs from "../../../../primitive/component/DisposeComponentService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function isAlive(cameraController, param) {
  return DisposeComponentService$Wonderjs.isAlive(cameraController, param[/* disposedIndexArray */16]);
}

var _unbindPointEvent = ManageEventMainService$Wonderjs.offCustomGlobalEventByHandleFunc;

var _unbindKeyboardEvent = ManageEventMainService$Wonderjs.offKeyboardEventByHandleFunc;

function _disposePointDragEventHandleFuncMap(cameraController, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */25];
  var pointDragEventHandleFuncMap = arcballCameraControllerRecord[/* pointDragEventHandleFuncMap */1];
  var match = SparseMapService$WonderCommonlib.get(cameraController, pointDragEventHandleFuncMap);
  if (match !== undefined) {
    var eventName = NameEventService$Wonderjs.getPointDragEventName(/* () */0);
    var state$1 = ManageEventMainService$Wonderjs.offCustomGlobalEventByHandleFunc(eventName, Js_primitive.valFromOption(match), state);
    var newrecord = Caml_array.caml_array_dup(state$1);
    newrecord[/* arcballCameraControllerRecord */25] = /* record */[
      /* index */arcballCameraControllerRecord[/* index */0],
      /* pointDragEventHandleFuncMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, pointDragEventHandleFuncMap),
      /* pointScaleEventHandleFuncMap */arcballCameraControllerRecord[/* pointScaleEventHandleFuncMap */2],
      /* keydownEventHandleFuncMap */arcballCameraControllerRecord[/* keydownEventHandleFuncMap */3],
      /* dirtyArray */arcballCameraControllerRecord[/* dirtyArray */4],
      /* distanceMap */arcballCameraControllerRecord[/* distanceMap */5],
      /* minDistanceMap */arcballCameraControllerRecord[/* minDistanceMap */6],
      /* phiMap */arcballCameraControllerRecord[/* phiMap */7],
      /* thetaMap */arcballCameraControllerRecord[/* thetaMap */8],
      /* thetaMarginMap */arcballCameraControllerRecord[/* thetaMarginMap */9],
      /* targetMap */arcballCameraControllerRecord[/* targetMap */10],
      /* moveSpeedXMap */arcballCameraControllerRecord[/* moveSpeedXMap */11],
      /* moveSpeedYMap */arcballCameraControllerRecord[/* moveSpeedYMap */12],
      /* rotateSpeedMap */arcballCameraControllerRecord[/* rotateSpeedMap */13],
      /* wheelSpeedMap */arcballCameraControllerRecord[/* wheelSpeedMap */14],
      /* gameObjectMap */arcballCameraControllerRecord[/* gameObjectMap */15],
      /* disposedIndexArray */arcballCameraControllerRecord[/* disposedIndexArray */16]
    ];
    return newrecord;
  } else {
    return state;
  }
}

function _disposePointScaleEventHandleFuncMap(cameraController, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */25];
  var pointScaleEventHandleFuncMap = arcballCameraControllerRecord[/* pointScaleEventHandleFuncMap */2];
  var match = SparseMapService$WonderCommonlib.get(cameraController, pointScaleEventHandleFuncMap);
  if (match !== undefined) {
    var eventName = NameEventService$Wonderjs.getPointScaleEventName(/* () */0);
    var state$1 = ManageEventMainService$Wonderjs.offCustomGlobalEventByHandleFunc(eventName, Js_primitive.valFromOption(match), state);
    var newrecord = Caml_array.caml_array_dup(state$1);
    newrecord[/* arcballCameraControllerRecord */25] = /* record */[
      /* index */arcballCameraControllerRecord[/* index */0],
      /* pointDragEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragEventHandleFuncMap */1],
      /* pointScaleEventHandleFuncMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, pointScaleEventHandleFuncMap),
      /* keydownEventHandleFuncMap */arcballCameraControllerRecord[/* keydownEventHandleFuncMap */3],
      /* dirtyArray */arcballCameraControllerRecord[/* dirtyArray */4],
      /* distanceMap */arcballCameraControllerRecord[/* distanceMap */5],
      /* minDistanceMap */arcballCameraControllerRecord[/* minDistanceMap */6],
      /* phiMap */arcballCameraControllerRecord[/* phiMap */7],
      /* thetaMap */arcballCameraControllerRecord[/* thetaMap */8],
      /* thetaMarginMap */arcballCameraControllerRecord[/* thetaMarginMap */9],
      /* targetMap */arcballCameraControllerRecord[/* targetMap */10],
      /* moveSpeedXMap */arcballCameraControllerRecord[/* moveSpeedXMap */11],
      /* moveSpeedYMap */arcballCameraControllerRecord[/* moveSpeedYMap */12],
      /* rotateSpeedMap */arcballCameraControllerRecord[/* rotateSpeedMap */13],
      /* wheelSpeedMap */arcballCameraControllerRecord[/* wheelSpeedMap */14],
      /* gameObjectMap */arcballCameraControllerRecord[/* gameObjectMap */15],
      /* disposedIndexArray */arcballCameraControllerRecord[/* disposedIndexArray */16]
    ];
    return newrecord;
  } else {
    return state;
  }
}

function _disposeKeyDownEventHandleFuncMap(cameraController, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */25];
  var keydownEventHandleFuncMap = arcballCameraControllerRecord[/* keydownEventHandleFuncMap */3];
  var match = SparseMapService$WonderCommonlib.get(cameraController, keydownEventHandleFuncMap);
  if (match !== undefined) {
    var state$1 = ManageEventMainService$Wonderjs.offKeyboardEventByHandleFunc(/* KeyDown */7, Js_primitive.valFromOption(match), state);
    var newrecord = Caml_array.caml_array_dup(state$1);
    newrecord[/* arcballCameraControllerRecord */25] = /* record */[
      /* index */arcballCameraControllerRecord[/* index */0],
      /* pointDragEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragEventHandleFuncMap */1],
      /* pointScaleEventHandleFuncMap */arcballCameraControllerRecord[/* pointScaleEventHandleFuncMap */2],
      /* keydownEventHandleFuncMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, keydownEventHandleFuncMap),
      /* dirtyArray */arcballCameraControllerRecord[/* dirtyArray */4],
      /* distanceMap */arcballCameraControllerRecord[/* distanceMap */5],
      /* minDistanceMap */arcballCameraControllerRecord[/* minDistanceMap */6],
      /* phiMap */arcballCameraControllerRecord[/* phiMap */7],
      /* thetaMap */arcballCameraControllerRecord[/* thetaMap */8],
      /* thetaMarginMap */arcballCameraControllerRecord[/* thetaMarginMap */9],
      /* targetMap */arcballCameraControllerRecord[/* targetMap */10],
      /* moveSpeedXMap */arcballCameraControllerRecord[/* moveSpeedXMap */11],
      /* moveSpeedYMap */arcballCameraControllerRecord[/* moveSpeedYMap */12],
      /* rotateSpeedMap */arcballCameraControllerRecord[/* rotateSpeedMap */13],
      /* wheelSpeedMap */arcballCameraControllerRecord[/* wheelSpeedMap */14],
      /* gameObjectMap */arcballCameraControllerRecord[/* gameObjectMap */15],
      /* disposedIndexArray */arcballCameraControllerRecord[/* disposedIndexArray */16]
    ];
    return newrecord;
  } else {
    return state;
  }
}

function _disposeData(cameraController, state) {
  var state$1 = _disposeKeyDownEventHandleFuncMap(cameraController, _disposePointScaleEventHandleFuncMap(cameraController, _disposePointDragEventHandleFuncMap(cameraController, state)));
  var arcballCameraControllerRecord = state$1[/* arcballCameraControllerRecord */25];
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* arcballCameraControllerRecord */25] = /* record */[
    /* index */arcballCameraControllerRecord[/* index */0],
    /* pointDragEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragEventHandleFuncMap */1],
    /* pointScaleEventHandleFuncMap */arcballCameraControllerRecord[/* pointScaleEventHandleFuncMap */2],
    /* keydownEventHandleFuncMap */arcballCameraControllerRecord[/* keydownEventHandleFuncMap */3],
    /* dirtyArray */DisposeComponentService$Wonderjs.removeFromArray(cameraController, arcballCameraControllerRecord[/* dirtyArray */4]),
    /* distanceMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* distanceMap */5]),
    /* minDistanceMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* minDistanceMap */6]),
    /* phiMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* phiMap */7]),
    /* thetaMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* thetaMap */8]),
    /* thetaMarginMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* thetaMarginMap */9]),
    /* targetMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* targetMap */10]),
    /* moveSpeedXMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* moveSpeedXMap */11]),
    /* moveSpeedYMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* moveSpeedYMap */12]),
    /* rotateSpeedMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* rotateSpeedMap */13]),
    /* wheelSpeedMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* wheelSpeedMap */14]),
    /* gameObjectMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, arcballCameraControllerRecord[/* gameObjectMap */15]),
    /* disposedIndexArray */arcballCameraControllerRecord[/* disposedIndexArray */16]
  ];
  return newrecord;
}

function handleBatchDisposeComponent(cameraControllerArray, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */25];
  Contract$WonderLog.requireCheck((function () {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(cameraControllerArray, isAlive, arcballCameraControllerRecord);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = /* record */[
    /* index */arcballCameraControllerRecord[/* index */0],
    /* pointDragEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragEventHandleFuncMap */1],
    /* pointScaleEventHandleFuncMap */arcballCameraControllerRecord[/* pointScaleEventHandleFuncMap */2],
    /* keydownEventHandleFuncMap */arcballCameraControllerRecord[/* keydownEventHandleFuncMap */3],
    /* dirtyArray */arcballCameraControllerRecord[/* dirtyArray */4],
    /* distanceMap */arcballCameraControllerRecord[/* distanceMap */5],
    /* minDistanceMap */arcballCameraControllerRecord[/* minDistanceMap */6],
    /* phiMap */arcballCameraControllerRecord[/* phiMap */7],
    /* thetaMap */arcballCameraControllerRecord[/* thetaMap */8],
    /* thetaMarginMap */arcballCameraControllerRecord[/* thetaMarginMap */9],
    /* targetMap */arcballCameraControllerRecord[/* targetMap */10],
    /* moveSpeedXMap */arcballCameraControllerRecord[/* moveSpeedXMap */11],
    /* moveSpeedYMap */arcballCameraControllerRecord[/* moveSpeedYMap */12],
    /* rotateSpeedMap */arcballCameraControllerRecord[/* rotateSpeedMap */13],
    /* wheelSpeedMap */arcballCameraControllerRecord[/* wheelSpeedMap */14],
    /* gameObjectMap */arcballCameraControllerRecord[/* gameObjectMap */15],
    /* disposedIndexArray */arcballCameraControllerRecord[/* disposedIndexArray */16].concat(cameraControllerArray)
  ];
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, cameraController) {
                return _disposeData(cameraController, state);
              }), newrecord, cameraControllerArray);
}

export {
  isAlive ,
  _unbindPointEvent ,
  _unbindKeyboardEvent ,
  _disposePointDragEventHandleFuncMap ,
  _disposePointScaleEventHandleFuncMap ,
  _disposeKeyDownEventHandleFuncMap ,
  _disposeData ,
  handleBatchDisposeComponent ,
  
}
/* Contract-WonderLog Not a pure module */
