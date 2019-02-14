

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Js_primitive from "../../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as DomExtend$Wonderjs from "../../../../../external/DomExtend.js";
import * as ViewService$Wonderjs from "../../../../record/main/device/ViewService.js";
import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";
import * as NameEventService$Wonderjs from "../../../../record/main/event/NameEventService.js";
import * as ManageEventMainService$Wonderjs from "../../event/ManageEventMainService.js";
import * as DisposeComponentService$Wonderjs from "../../../../primitive/component/DisposeComponentService.js";
import * as BrowserDetectMainService$Wonderjs from "../../browserDetect/BrowserDetectMainService.js";
import * as HandlePointDomEventMainService$Wonderjs from "../../event/handle/HandlePointDomEventMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as OperateArcballCameraControllerService$Wonderjs from "../../../../record/main/camera_controller/arcball/OperateArcballCameraControllerService.js";
import * as TargetArcballCameraControllerMainService$Wonderjs from "./TargetArcballCameraControllerMainService.js";

var _setEventHandleFunc = MutableSparseMapService$WonderCommonlib.set;

function _setPointDragStartEventHandleFunc(cameraController, handleFunc, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncMap */MutableSparseMapService$WonderCommonlib.set(cameraController, handleFunc, record[/* pointDragStartEventHandleFuncMap */1]),
          /* pointDragDropEventHandleFuncMap */record[/* pointDragDropEventHandleFuncMap */2],
          /* pointDragOverEventHandleFuncMap */record[/* pointDragOverEventHandleFuncMap */3],
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

function _setPointDragDropEventHandleFunc(cameraController, handleFunc, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncMap */record[/* pointDragStartEventHandleFuncMap */1],
          /* pointDragDropEventHandleFuncMap */MutableSparseMapService$WonderCommonlib.set(cameraController, handleFunc, record[/* pointDragDropEventHandleFuncMap */2]),
          /* pointDragOverEventHandleFuncMap */record[/* pointDragOverEventHandleFuncMap */3],
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

function _setPointDragOverEventHandleFunc(cameraController, handleFunc, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncMap */record[/* pointDragStartEventHandleFuncMap */1],
          /* pointDragDropEventHandleFuncMap */record[/* pointDragDropEventHandleFuncMap */2],
          /* pointDragOverEventHandleFuncMap */MutableSparseMapService$WonderCommonlib.set(cameraController, handleFunc, record[/* pointDragOverEventHandleFuncMap */3]),
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
          /* pointDragStartEventHandleFuncMap */record[/* pointDragStartEventHandleFuncMap */1],
          /* pointDragDropEventHandleFuncMap */record[/* pointDragDropEventHandleFuncMap */2],
          /* pointDragOverEventHandleFuncMap */record[/* pointDragOverEventHandleFuncMap */3],
          /* pointScaleEventHandleFuncMap */MutableSparseMapService$WonderCommonlib.set(cameraController, handleFunc, record[/* pointScaleEventHandleFuncMap */4]),
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
          /* pointDragStartEventHandleFuncMap */record[/* pointDragStartEventHandleFuncMap */1],
          /* pointDragDropEventHandleFuncMap */record[/* pointDragDropEventHandleFuncMap */2],
          /* pointDragOverEventHandleFuncMap */record[/* pointDragOverEventHandleFuncMap */3],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */4],
          /* keydownEventHandleFuncMap */MutableSparseMapService$WonderCommonlib.set(cameraController, handleFunc, record[/* keydownEventHandleFuncMap */5]),
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
  var pointDragStartHandleFunc = function ($$event, state) {
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
  var pointDragDropHandleFunc = function ($$event, state) {
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
  var pointDragOverHandleFunc = function ($$event, state) {
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
  newrecord[/* arcballCameraControllerRecord */24] = _setKeydownEventHandleFunc(cameraController, keydownHandleFunc, _setPointScaleEventHandleFunc(cameraController, pointScaleHandleFunc, _setPointDragOverEventHandleFunc(cameraController, pointDragOverHandleFunc, _setPointDragDropEventHandleFunc(cameraController, pointDragDropHandleFunc, _setPointDragStartEventHandleFunc(cameraController, pointDragStartHandleFunc, state[/* arcballCameraControllerRecord */24])))));
  return /* tuple */[
          newrecord,
          pointDragStartHandleFunc,
          pointDragDropHandleFunc,
          pointDragOverHandleFunc,
          pointScaleHandleFunc,
          keydownHandleFunc
        ];
}

function bindEvent(cameraController, state) {
  var match = prepareBindEvent(cameraController, state);
  var state$1 = ManageEventMainService$Wonderjs.onCustomGlobalEvent(NameEventService$Wonderjs.getPointDragStartEventName(/* () */0), match[1], match[0], undefined, /* () */0);
  var state$2 = ManageEventMainService$Wonderjs.onCustomGlobalEvent(NameEventService$Wonderjs.getPointDragDropEventName(/* () */0), match[2], state$1, undefined, /* () */0);
  var state$3 = ManageEventMainService$Wonderjs.onCustomGlobalEvent(NameEventService$Wonderjs.getPointDragOverEventName(/* () */0), match[3], state$2, undefined, /* () */0);
  var state$4 = ManageEventMainService$Wonderjs.onCustomGlobalEvent(NameEventService$Wonderjs.getPointScaleEventName(/* () */0), match[4], state$3, undefined, /* () */0);
  return ManageEventMainService$Wonderjs.onKeyboardEvent(/* KeyDown */10, match[5], state$4, undefined, /* () */0);
}

var _unbindPointEvent = ManageEventMainService$Wonderjs.offCustomGlobalEventByHandleFunc;

var _unbindKeyboardEvent = ManageEventMainService$Wonderjs.offKeyboardEventByHandleFunc;

function _disposePointDragStartEventHandleFuncMap(cameraController, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */24];
  var pointDragStartEventHandleFuncMap = arcballCameraControllerRecord[/* pointDragStartEventHandleFuncMap */1];
  var match = MutableSparseMapService$WonderCommonlib.get(cameraController, pointDragStartEventHandleFuncMap);
  if (match !== undefined) {
    var eventName = NameEventService$Wonderjs.getPointDownEventName(/* () */0);
    var state$1 = ManageEventMainService$Wonderjs.offCustomGlobalEventByHandleFunc(eventName, Js_primitive.valFromOption(match), state);
    var newrecord = Caml_array.caml_array_dup(state$1);
    newrecord[/* arcballCameraControllerRecord */24] = /* record */[
      /* index */arcballCameraControllerRecord[/* index */0],
      /* pointDragStartEventHandleFuncMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, pointDragStartEventHandleFuncMap),
      /* pointDragDropEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragDropEventHandleFuncMap */2],
      /* pointDragOverEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragOverEventHandleFuncMap */3],
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

function _disposePointDragDropEventHandleFuncMap(cameraController, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */24];
  var pointDragDropEventHandleFuncMap = arcballCameraControllerRecord[/* pointDragDropEventHandleFuncMap */2];
  var match = MutableSparseMapService$WonderCommonlib.get(cameraController, pointDragDropEventHandleFuncMap);
  if (match !== undefined) {
    var eventName = NameEventService$Wonderjs.getPointUpEventName(/* () */0);
    var state$1 = ManageEventMainService$Wonderjs.offCustomGlobalEventByHandleFunc(eventName, Js_primitive.valFromOption(match), state);
    var newrecord = Caml_array.caml_array_dup(state$1);
    newrecord[/* arcballCameraControllerRecord */24] = /* record */[
      /* index */arcballCameraControllerRecord[/* index */0],
      /* pointDragStartEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragStartEventHandleFuncMap */1],
      /* pointDragDropEventHandleFuncMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, pointDragDropEventHandleFuncMap),
      /* pointDragOverEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragOverEventHandleFuncMap */3],
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

function _disposePointDragOverEventHandleFuncMap(cameraController, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */24];
  var pointDragOverEventHandleFuncMap = arcballCameraControllerRecord[/* pointDragOverEventHandleFuncMap */3];
  var match = MutableSparseMapService$WonderCommonlib.get(cameraController, pointDragOverEventHandleFuncMap);
  if (match !== undefined) {
    var eventName = NameEventService$Wonderjs.getPointDragOverEventName(/* () */0);
    var state$1 = ManageEventMainService$Wonderjs.offCustomGlobalEventByHandleFunc(eventName, Js_primitive.valFromOption(match), state);
    var newrecord = Caml_array.caml_array_dup(state$1);
    newrecord[/* arcballCameraControllerRecord */24] = /* record */[
      /* index */arcballCameraControllerRecord[/* index */0],
      /* pointDragStartEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragStartEventHandleFuncMap */1],
      /* pointDragDropEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragDropEventHandleFuncMap */2],
      /* pointDragOverEventHandleFuncMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, pointDragOverEventHandleFuncMap),
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
  var match = MutableSparseMapService$WonderCommonlib.get(cameraController, pointScaleEventHandleFuncMap);
  if (match !== undefined) {
    var eventName = NameEventService$Wonderjs.getPointScaleEventName(/* () */0);
    var state$1 = ManageEventMainService$Wonderjs.offCustomGlobalEventByHandleFunc(eventName, Js_primitive.valFromOption(match), state);
    var newrecord = Caml_array.caml_array_dup(state$1);
    newrecord[/* arcballCameraControllerRecord */24] = /* record */[
      /* index */arcballCameraControllerRecord[/* index */0],
      /* pointDragStartEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragStartEventHandleFuncMap */1],
      /* pointDragDropEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragDropEventHandleFuncMap */2],
      /* pointDragOverEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragOverEventHandleFuncMap */3],
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
  var match = MutableSparseMapService$WonderCommonlib.get(cameraController, keydownEventHandleFuncMap);
  if (match !== undefined) {
    var state$1 = ManageEventMainService$Wonderjs.offKeyboardEventByHandleFunc(/* KeyDown */10, Js_primitive.valFromOption(match), state);
    var newrecord = Caml_array.caml_array_dup(state$1);
    newrecord[/* arcballCameraControllerRecord */24] = /* record */[
      /* index */arcballCameraControllerRecord[/* index */0],
      /* pointDragStartEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragStartEventHandleFuncMap */1],
      /* pointDragDropEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragDropEventHandleFuncMap */2],
      /* pointDragOverEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragOverEventHandleFuncMap */3],
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
  return _disposeKeyDownEventHandleFuncMap(cameraController, _disposePointScaleEventHandleFuncMap(cameraController, _disposePointDragOverEventHandleFuncMap(cameraController, _disposePointDragDropEventHandleFuncMap(cameraController, _disposePointDragStartEventHandleFuncMap(cameraController, state)))));
}

function isBindEvent(cameraController, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */24];
  return MutableSparseMapService$WonderCommonlib.has(cameraController, arcballCameraControllerRecord[/* pointDragStartEventHandleFuncMap */1]);
}

export {
  _setEventHandleFunc ,
  _setPointDragStartEventHandleFunc ,
  _setPointDragDropEventHandleFunc ,
  _setPointDragOverEventHandleFunc ,
  _setPointScaleEventHandleFunc ,
  _setKeydownEventHandleFunc ,
  _changeOrbit ,
  prepareBindEvent ,
  bindEvent ,
  _unbindPointEvent ,
  _unbindKeyboardEvent ,
  _disposePointDragStartEventHandleFuncMap ,
  _disposePointDragDropEventHandleFuncMap ,
  _disposePointDragOverEventHandleFuncMap ,
  _disposePointScaleEventHandleFuncMap ,
  _disposeKeyDownEventHandleFuncMap ,
  unbindEvent ,
  isBindEvent ,
  
}
/* ViewService-Wonderjs Not a pure module */
