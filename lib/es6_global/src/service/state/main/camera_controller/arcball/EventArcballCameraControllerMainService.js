

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Js_primitive from "../../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as DomExtend$Wonderjs from "../../../../../external/DomExtend.js";
import * as ViewService$Wonderjs from "../../../../record/main/device/ViewService.js";
import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";
import * as NameEventService$Wonderjs from "../../../../record/main/event/NameEventService.js";
import * as ManageEventMainService$Wonderjs from "../../event/ManageEventMainService.js";
import * as DisposeComponentService$Wonderjs from "../../../../primitive/component/DisposeComponentService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as BrowserDetectMainService$Wonderjs from "../../browserDetect/BrowserDetectMainService.js";
import * as HandlePointDomEventMainService$Wonderjs from "../../event/handle/HandlePointDomEventMainService.js";
import * as OperateArcballCameraControllerService$Wonderjs from "../../../../record/main/camera_controller/arcball/OperateArcballCameraControllerService.js";
import * as TargetArcballCameraControllerMainService$Wonderjs from "./TargetArcballCameraControllerMainService.js";

var _setEventHandleFunc = SparseMapService$WonderCommonlib.set;

function _setPointDownEventHandleFunc(cameraController, handleFunc, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDownEventHandleFuncMap */SparseMapService$WonderCommonlib.set(cameraController, handleFunc, record[/* pointDownEventHandleFuncMap */1]),
          /* pointUpEventHandleFuncMap */record[/* pointUpEventHandleFuncMap */2],
          /* pointDragEventHandleFuncMap */record[/* pointDragEventHandleFuncMap */3],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */4],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */5],
          /* dirtyArray */record[/* dirtyArray */6],
          /* distanceMap */record[/* distanceMap */7],
          /* minDistanceMap */record[/* minDistanceMap */8],
          /* phiMap */record[/* phiMap */9],
          /* thetaMap */record[/* thetaMap */10],
          /* thetaMarginMap */record[/* thetaMarginMap */11],
          /* targetMap */record[/* targetMap */12],
          /* moveSpeedXMap */record[/* moveSpeedXMap */13],
          /* moveSpeedYMap */record[/* moveSpeedYMap */14],
          /* rotateSpeedMap */record[/* rotateSpeedMap */15],
          /* wheelSpeedMap */record[/* wheelSpeedMap */16],
          /* gameObjectMap */record[/* gameObjectMap */17],
          /* disposedIndexArray */record[/* disposedIndexArray */18]
        ];
}

function _setPointUpEventHandleFunc(cameraController, handleFunc, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDownEventHandleFuncMap */record[/* pointDownEventHandleFuncMap */1],
          /* pointUpEventHandleFuncMap */SparseMapService$WonderCommonlib.set(cameraController, handleFunc, record[/* pointUpEventHandleFuncMap */2]),
          /* pointDragEventHandleFuncMap */record[/* pointDragEventHandleFuncMap */3],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */4],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */5],
          /* dirtyArray */record[/* dirtyArray */6],
          /* distanceMap */record[/* distanceMap */7],
          /* minDistanceMap */record[/* minDistanceMap */8],
          /* phiMap */record[/* phiMap */9],
          /* thetaMap */record[/* thetaMap */10],
          /* thetaMarginMap */record[/* thetaMarginMap */11],
          /* targetMap */record[/* targetMap */12],
          /* moveSpeedXMap */record[/* moveSpeedXMap */13],
          /* moveSpeedYMap */record[/* moveSpeedYMap */14],
          /* rotateSpeedMap */record[/* rotateSpeedMap */15],
          /* wheelSpeedMap */record[/* wheelSpeedMap */16],
          /* gameObjectMap */record[/* gameObjectMap */17],
          /* disposedIndexArray */record[/* disposedIndexArray */18]
        ];
}

function _setPointDragEventHandleFunc(cameraController, handleFunc, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDownEventHandleFuncMap */record[/* pointDownEventHandleFuncMap */1],
          /* pointUpEventHandleFuncMap */record[/* pointUpEventHandleFuncMap */2],
          /* pointDragEventHandleFuncMap */SparseMapService$WonderCommonlib.set(cameraController, handleFunc, record[/* pointDragEventHandleFuncMap */3]),
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */4],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */5],
          /* dirtyArray */record[/* dirtyArray */6],
          /* distanceMap */record[/* distanceMap */7],
          /* minDistanceMap */record[/* minDistanceMap */8],
          /* phiMap */record[/* phiMap */9],
          /* thetaMap */record[/* thetaMap */10],
          /* thetaMarginMap */record[/* thetaMarginMap */11],
          /* targetMap */record[/* targetMap */12],
          /* moveSpeedXMap */record[/* moveSpeedXMap */13],
          /* moveSpeedYMap */record[/* moveSpeedYMap */14],
          /* rotateSpeedMap */record[/* rotateSpeedMap */15],
          /* wheelSpeedMap */record[/* wheelSpeedMap */16],
          /* gameObjectMap */record[/* gameObjectMap */17],
          /* disposedIndexArray */record[/* disposedIndexArray */18]
        ];
}

function _setPointScaleEventHandleFunc(cameraController, handleFunc, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDownEventHandleFuncMap */record[/* pointDownEventHandleFuncMap */1],
          /* pointUpEventHandleFuncMap */record[/* pointUpEventHandleFuncMap */2],
          /* pointDragEventHandleFuncMap */record[/* pointDragEventHandleFuncMap */3],
          /* pointScaleEventHandleFuncMap */SparseMapService$WonderCommonlib.set(cameraController, handleFunc, record[/* pointScaleEventHandleFuncMap */4]),
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */5],
          /* dirtyArray */record[/* dirtyArray */6],
          /* distanceMap */record[/* distanceMap */7],
          /* minDistanceMap */record[/* minDistanceMap */8],
          /* phiMap */record[/* phiMap */9],
          /* thetaMap */record[/* thetaMap */10],
          /* thetaMarginMap */record[/* thetaMarginMap */11],
          /* targetMap */record[/* targetMap */12],
          /* moveSpeedXMap */record[/* moveSpeedXMap */13],
          /* moveSpeedYMap */record[/* moveSpeedYMap */14],
          /* rotateSpeedMap */record[/* rotateSpeedMap */15],
          /* wheelSpeedMap */record[/* wheelSpeedMap */16],
          /* gameObjectMap */record[/* gameObjectMap */17],
          /* disposedIndexArray */record[/* disposedIndexArray */18]
        ];
}

function _setKeydownEventHandleFunc(cameraController, handleFunc, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDownEventHandleFuncMap */record[/* pointDownEventHandleFuncMap */1],
          /* pointUpEventHandleFuncMap */record[/* pointUpEventHandleFuncMap */2],
          /* pointDragEventHandleFuncMap */record[/* pointDragEventHandleFuncMap */3],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */4],
          /* keydownEventHandleFuncMap */SparseMapService$WonderCommonlib.set(cameraController, handleFunc, record[/* keydownEventHandleFuncMap */5]),
          /* dirtyArray */record[/* dirtyArray */6],
          /* distanceMap */record[/* distanceMap */7],
          /* minDistanceMap */record[/* minDistanceMap */8],
          /* phiMap */record[/* phiMap */9],
          /* thetaMap */record[/* thetaMap */10],
          /* thetaMarginMap */record[/* thetaMarginMap */11],
          /* targetMap */record[/* targetMap */12],
          /* moveSpeedXMap */record[/* moveSpeedXMap */13],
          /* moveSpeedYMap */record[/* moveSpeedYMap */14],
          /* rotateSpeedMap */record[/* rotateSpeedMap */15],
          /* wheelSpeedMap */record[/* wheelSpeedMap */16],
          /* gameObjectMap */record[/* gameObjectMap */17],
          /* disposedIndexArray */record[/* disposedIndexArray */18]
        ];
}

function _changeOrbit(cameraController, param, arcballCameraControllerRecord) {
  var movementDelta = param[/* movementDelta */5];
  var rotateSpeed = OperateArcballCameraControllerService$Wonderjs.unsafeGetRotateSpeed(cameraController, arcballCameraControllerRecord);
  return OperateArcballCameraControllerService$Wonderjs.setTheta(cameraController, OperateArcballCameraControllerService$Wonderjs.unsafeGetTheta(cameraController, arcballCameraControllerRecord) - movementDelta[1] / (100 / rotateSpeed), OperateArcballCameraControllerService$Wonderjs.setPhi(cameraController, OperateArcballCameraControllerService$Wonderjs.unsafeGetPhi(cameraController, arcballCameraControllerRecord) + movementDelta[0] / (100 / rotateSpeed), arcballCameraControllerRecord));
}

function prepareBindEvent(cameraController, state) {
  var pointDownHandleFunc = function ($$event, state) {
    var viewRecord = state[/* viewRecord */8];
    var match = BrowserDetectMainService$Wonderjs.isMobile(state);
    if (match) {
      return /* tuple */[
              state,
              $$event
            ];
    } else {
      var canvas = ViewService$Wonderjs.unsafeGetCanvas(viewRecord);
      DomExtend$Wonderjs.requestPointerLock(canvas);
      return /* tuple */[
              state,
              $$event
            ];
    }
  };
  var pointUpHandleFunc = function ($$event, state) {
    var viewRecord = state[/* viewRecord */8];
    var match = BrowserDetectMainService$Wonderjs.isMobile(state);
    if (match) {
      return /* tuple */[
              state,
              $$event
            ];
    } else {
      var canvas = ViewService$Wonderjs.unsafeGetCanvas(viewRecord);
      var $$document$1 = document;
      var match$1 = $$document$1.pointerLockElement === canvas;
      if (match$1) {
        Curry._1(DomExtend$Wonderjs.exitPointerLock, /* () */0);
      }
      return /* tuple */[
              state,
              $$event
            ];
    }
  };
  var pointDragHandleFunc = function ($$event, state) {
    var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */24];
    var newrecord = Caml_array.caml_array_dup(state);
    return /* tuple */[
            (newrecord[/* arcballCameraControllerRecord */24] = _changeOrbit(cameraController, OptionService$Wonderjs.unsafeGet($$event[/* userData */4]), arcballCameraControllerRecord), newrecord),
            $$event
          ];
  };
  var pointScaleHandleFunc = function ($$event, state) {
    var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */24];
    var pointEvent = OptionService$Wonderjs.unsafeGet($$event[/* userData */4]);
    HandlePointDomEventMainService$Wonderjs.preventDefault(pointEvent[/* event */6]);
    var newrecord = Caml_array.caml_array_dup(state);
    return /* tuple */[
            (newrecord[/* arcballCameraControllerRecord */24] = OperateArcballCameraControllerService$Wonderjs.setDistanceByEvent(cameraController, pointEvent, arcballCameraControllerRecord), newrecord),
            $$event
          ];
  };
  var keydownHandleFunc = function ($$event, state) {
    return TargetArcballCameraControllerMainService$Wonderjs.setTargetByKeyboardEvent(cameraController, $$event, state);
  };
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */24] = _setKeydownEventHandleFunc(cameraController, keydownHandleFunc, _setPointScaleEventHandleFunc(cameraController, pointScaleHandleFunc, _setPointDragEventHandleFunc(cameraController, pointDragHandleFunc, _setPointUpEventHandleFunc(cameraController, pointUpHandleFunc, _setPointDownEventHandleFunc(cameraController, pointDownHandleFunc, state[/* arcballCameraControllerRecord */24])))));
  return /* tuple */[
          newrecord,
          pointDownHandleFunc,
          pointUpHandleFunc,
          pointDragHandleFunc,
          pointScaleHandleFunc,
          keydownHandleFunc
        ];
}

function bindEvent(cameraController, state) {
  var match = prepareBindEvent(cameraController, state);
  var state$1 = ManageEventMainService$Wonderjs.onCustomGlobalEvent(NameEventService$Wonderjs.getPointDownEventName(/* () */0), match[1], match[0], undefined, /* () */0);
  var state$2 = ManageEventMainService$Wonderjs.onCustomGlobalEvent(NameEventService$Wonderjs.getPointUpEventName(/* () */0), match[2], state$1, undefined, /* () */0);
  var state$3 = ManageEventMainService$Wonderjs.onCustomGlobalEvent(NameEventService$Wonderjs.getPointDragEventName(/* () */0), match[3], state$2, undefined, /* () */0);
  var state$4 = ManageEventMainService$Wonderjs.onCustomGlobalEvent(NameEventService$Wonderjs.getPointScaleEventName(/* () */0), match[4], state$3, undefined, /* () */0);
  return ManageEventMainService$Wonderjs.onKeyboardEvent(/* KeyDown */8, match[5], state$4, undefined, /* () */0);
}

var _unbindPointEvent = ManageEventMainService$Wonderjs.offCustomGlobalEventByHandleFunc;

var _unbindKeyboardEvent = ManageEventMainService$Wonderjs.offKeyboardEventByHandleFunc;

function _disposePointDownEventHandleFuncMap(cameraController, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */24];
  var pointDownEventHandleFuncMap = arcballCameraControllerRecord[/* pointDownEventHandleFuncMap */1];
  var match = SparseMapService$WonderCommonlib.get(cameraController, pointDownEventHandleFuncMap);
  if (match !== undefined) {
    var eventName = NameEventService$Wonderjs.getPointDownEventName(/* () */0);
    var state$1 = ManageEventMainService$Wonderjs.offCustomGlobalEventByHandleFunc(eventName, Js_primitive.valFromOption(match), state);
    var newrecord = Caml_array.caml_array_dup(state$1);
    newrecord[/* arcballCameraControllerRecord */24] = /* record */[
      /* index */arcballCameraControllerRecord[/* index */0],
      /* pointDownEventHandleFuncMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, pointDownEventHandleFuncMap),
      /* pointUpEventHandleFuncMap */arcballCameraControllerRecord[/* pointUpEventHandleFuncMap */2],
      /* pointDragEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragEventHandleFuncMap */3],
      /* pointScaleEventHandleFuncMap */arcballCameraControllerRecord[/* pointScaleEventHandleFuncMap */4],
      /* keydownEventHandleFuncMap */arcballCameraControllerRecord[/* keydownEventHandleFuncMap */5],
      /* dirtyArray */arcballCameraControllerRecord[/* dirtyArray */6],
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
      /* gameObjectMap */arcballCameraControllerRecord[/* gameObjectMap */17],
      /* disposedIndexArray */arcballCameraControllerRecord[/* disposedIndexArray */18]
    ];
    return newrecord;
  } else {
    return state;
  }
}

function _disposePointUpEventHandleFuncMap(cameraController, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */24];
  var pointUpEventHandleFuncMap = arcballCameraControllerRecord[/* pointUpEventHandleFuncMap */2];
  var match = SparseMapService$WonderCommonlib.get(cameraController, pointUpEventHandleFuncMap);
  if (match !== undefined) {
    var eventName = NameEventService$Wonderjs.getPointUpEventName(/* () */0);
    var state$1 = ManageEventMainService$Wonderjs.offCustomGlobalEventByHandleFunc(eventName, Js_primitive.valFromOption(match), state);
    var newrecord = Caml_array.caml_array_dup(state$1);
    newrecord[/* arcballCameraControllerRecord */24] = /* record */[
      /* index */arcballCameraControllerRecord[/* index */0],
      /* pointDownEventHandleFuncMap */arcballCameraControllerRecord[/* pointDownEventHandleFuncMap */1],
      /* pointUpEventHandleFuncMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, pointUpEventHandleFuncMap),
      /* pointDragEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragEventHandleFuncMap */3],
      /* pointScaleEventHandleFuncMap */arcballCameraControllerRecord[/* pointScaleEventHandleFuncMap */4],
      /* keydownEventHandleFuncMap */arcballCameraControllerRecord[/* keydownEventHandleFuncMap */5],
      /* dirtyArray */arcballCameraControllerRecord[/* dirtyArray */6],
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
      /* gameObjectMap */arcballCameraControllerRecord[/* gameObjectMap */17],
      /* disposedIndexArray */arcballCameraControllerRecord[/* disposedIndexArray */18]
    ];
    return newrecord;
  } else {
    return state;
  }
}

function _disposePointDragEventHandleFuncMap(cameraController, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */24];
  var pointDragEventHandleFuncMap = arcballCameraControllerRecord[/* pointDragEventHandleFuncMap */3];
  var match = SparseMapService$WonderCommonlib.get(cameraController, pointDragEventHandleFuncMap);
  if (match !== undefined) {
    var eventName = NameEventService$Wonderjs.getPointDragEventName(/* () */0);
    var state$1 = ManageEventMainService$Wonderjs.offCustomGlobalEventByHandleFunc(eventName, Js_primitive.valFromOption(match), state);
    var newrecord = Caml_array.caml_array_dup(state$1);
    newrecord[/* arcballCameraControllerRecord */24] = /* record */[
      /* index */arcballCameraControllerRecord[/* index */0],
      /* pointDownEventHandleFuncMap */arcballCameraControllerRecord[/* pointDownEventHandleFuncMap */1],
      /* pointUpEventHandleFuncMap */arcballCameraControllerRecord[/* pointUpEventHandleFuncMap */2],
      /* pointDragEventHandleFuncMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, pointDragEventHandleFuncMap),
      /* pointScaleEventHandleFuncMap */arcballCameraControllerRecord[/* pointScaleEventHandleFuncMap */4],
      /* keydownEventHandleFuncMap */arcballCameraControllerRecord[/* keydownEventHandleFuncMap */5],
      /* dirtyArray */arcballCameraControllerRecord[/* dirtyArray */6],
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
      /* gameObjectMap */arcballCameraControllerRecord[/* gameObjectMap */17],
      /* disposedIndexArray */arcballCameraControllerRecord[/* disposedIndexArray */18]
    ];
    return newrecord;
  } else {
    return state;
  }
}

function _disposePointScaleEventHandleFuncMap(cameraController, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */24];
  var pointScaleEventHandleFuncMap = arcballCameraControllerRecord[/* pointScaleEventHandleFuncMap */4];
  var match = SparseMapService$WonderCommonlib.get(cameraController, pointScaleEventHandleFuncMap);
  if (match !== undefined) {
    var eventName = NameEventService$Wonderjs.getPointScaleEventName(/* () */0);
    var state$1 = ManageEventMainService$Wonderjs.offCustomGlobalEventByHandleFunc(eventName, Js_primitive.valFromOption(match), state);
    var newrecord = Caml_array.caml_array_dup(state$1);
    newrecord[/* arcballCameraControllerRecord */24] = /* record */[
      /* index */arcballCameraControllerRecord[/* index */0],
      /* pointDownEventHandleFuncMap */arcballCameraControllerRecord[/* pointDownEventHandleFuncMap */1],
      /* pointUpEventHandleFuncMap */arcballCameraControllerRecord[/* pointUpEventHandleFuncMap */2],
      /* pointDragEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragEventHandleFuncMap */3],
      /* pointScaleEventHandleFuncMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, pointScaleEventHandleFuncMap),
      /* keydownEventHandleFuncMap */arcballCameraControllerRecord[/* keydownEventHandleFuncMap */5],
      /* dirtyArray */arcballCameraControllerRecord[/* dirtyArray */6],
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
      /* gameObjectMap */arcballCameraControllerRecord[/* gameObjectMap */17],
      /* disposedIndexArray */arcballCameraControllerRecord[/* disposedIndexArray */18]
    ];
    return newrecord;
  } else {
    return state;
  }
}

function _disposeKeyDownEventHandleFuncMap(cameraController, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */24];
  var keydownEventHandleFuncMap = arcballCameraControllerRecord[/* keydownEventHandleFuncMap */5];
  var match = SparseMapService$WonderCommonlib.get(cameraController, keydownEventHandleFuncMap);
  if (match !== undefined) {
    var state$1 = ManageEventMainService$Wonderjs.offKeyboardEventByHandleFunc(/* KeyDown */8, Js_primitive.valFromOption(match), state);
    var newrecord = Caml_array.caml_array_dup(state$1);
    newrecord[/* arcballCameraControllerRecord */24] = /* record */[
      /* index */arcballCameraControllerRecord[/* index */0],
      /* pointDownEventHandleFuncMap */arcballCameraControllerRecord[/* pointDownEventHandleFuncMap */1],
      /* pointUpEventHandleFuncMap */arcballCameraControllerRecord[/* pointUpEventHandleFuncMap */2],
      /* pointDragEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragEventHandleFuncMap */3],
      /* pointScaleEventHandleFuncMap */arcballCameraControllerRecord[/* pointScaleEventHandleFuncMap */4],
      /* keydownEventHandleFuncMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, keydownEventHandleFuncMap),
      /* dirtyArray */arcballCameraControllerRecord[/* dirtyArray */6],
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
      /* gameObjectMap */arcballCameraControllerRecord[/* gameObjectMap */17],
      /* disposedIndexArray */arcballCameraControllerRecord[/* disposedIndexArray */18]
    ];
    return newrecord;
  } else {
    return state;
  }
}

function unbindEvent(cameraController, state) {
  return _disposeKeyDownEventHandleFuncMap(cameraController, _disposePointScaleEventHandleFuncMap(cameraController, _disposePointDragEventHandleFuncMap(cameraController, _disposePointUpEventHandleFuncMap(cameraController, _disposePointDownEventHandleFuncMap(cameraController, state)))));
}

function isBindEvent(cameraController, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */24];
  return SparseMapService$WonderCommonlib.has(cameraController, arcballCameraControllerRecord[/* pointDownEventHandleFuncMap */1]);
}

export {
  _setEventHandleFunc ,
  _setPointDownEventHandleFunc ,
  _setPointUpEventHandleFunc ,
  _setPointDragEventHandleFunc ,
  _setPointScaleEventHandleFunc ,
  _setKeydownEventHandleFunc ,
  _changeOrbit ,
  prepareBindEvent ,
  bindEvent ,
  _unbindPointEvent ,
  _unbindKeyboardEvent ,
  _disposePointDownEventHandleFuncMap ,
  _disposePointUpEventHandleFuncMap ,
  _disposePointDragEventHandleFuncMap ,
  _disposePointScaleEventHandleFuncMap ,
  _disposeKeyDownEventHandleFuncMap ,
  unbindEvent ,
  isBindEvent ,
  
}
/* ViewService-Wonderjs Not a pure module */
