

import * as List from "./../../../../../../../../node_modules/bs-platform/lib/es6/list.js";
import * as Curry from "./../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as DomExtend$Wonderjs from "../../../../../external/DomExtend.js";
import * as ViewService$Wonderjs from "../../../../record/main/device/ViewService.js";
import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";
import * as NameEventService$Wonderjs from "../../../../record/main/event/NameEventService.js";
import * as ManageEventMainService$Wonderjs from "../../event/ManageEventMainService.js";
import * as DisposeComponentService$Wonderjs from "../../../../primitive/component/DisposeComponentService.js";
import * as BrowserDetectMainService$Wonderjs from "../../browserDetect/BrowserDetectMainService.js";
import * as HandlePointDomEventMainService$Wonderjs from "../../event/handle/HandlePointDomEventMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as OperateFlyCameraControllerService$Wonderjs from "../../../../record/main/camera_controller/fly/OperateFlyCameraControllerService.js";

function _addEventHandleFunc(cameraController, handleFunc, eventHandleFuncListMap) {
  var match = MutableSparseMapService$WonderCommonlib.get(cameraController, eventHandleFuncListMap);
  if (match !== undefined) {
    return MutableSparseMapService$WonderCommonlib.set(cameraController, /* :: */[
                handleFunc,
                match
              ], eventHandleFuncListMap);
  } else {
    return MutableSparseMapService$WonderCommonlib.set(cameraController, /* :: */[
                handleFunc,
                /* [] */0
              ], eventHandleFuncListMap);
  }
}

function _addPointDragStartEventHandleFunc(cameraController, handleFunc, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncListMap */_addEventHandleFunc(cameraController, handleFunc, record[/* pointDragStartEventHandleFuncListMap */1]),
          /* pointDragDropEventHandleFuncListMap */record[/* pointDragDropEventHandleFuncListMap */2],
          /* pointDragOverEventHandleFuncListMap */record[/* pointDragOverEventHandleFuncListMap */3],
          /* pointScaleEventHandleFuncListMap */record[/* pointScaleEventHandleFuncListMap */4],
          /* keydownEventHandleFuncListMap */record[/* keydownEventHandleFuncListMap */5],
          /* keyupEventHandleFuncListMap */record[/* keyupEventHandleFuncListMap */6],
          /* moveSpeedMap */record[/* moveSpeedMap */7],
          /* wheelSpeedMap */record[/* wheelSpeedMap */8],
          /* rotateSpeedMap */record[/* rotateSpeedMap */9],
          /* eulerAngleDiffMap */record[/* eulerAngleDiffMap */10],
          /* translationDiffMap */record[/* translationDiffMap */11],
          /* gameObjectMap */record[/* gameObjectMap */12],
          /* disposedIndexArray */record[/* disposedIndexArray */13],
          /* directionArrayMap */record[/* directionArrayMap */14],
          /* localEulerAngleMap */record[/* localEulerAngleMap */15]
        ];
}

function _addPointDragDropEventHandleFunc(cameraController, handleFunc, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncListMap */record[/* pointDragStartEventHandleFuncListMap */1],
          /* pointDragDropEventHandleFuncListMap */_addEventHandleFunc(cameraController, handleFunc, record[/* pointDragDropEventHandleFuncListMap */2]),
          /* pointDragOverEventHandleFuncListMap */record[/* pointDragOverEventHandleFuncListMap */3],
          /* pointScaleEventHandleFuncListMap */record[/* pointScaleEventHandleFuncListMap */4],
          /* keydownEventHandleFuncListMap */record[/* keydownEventHandleFuncListMap */5],
          /* keyupEventHandleFuncListMap */record[/* keyupEventHandleFuncListMap */6],
          /* moveSpeedMap */record[/* moveSpeedMap */7],
          /* wheelSpeedMap */record[/* wheelSpeedMap */8],
          /* rotateSpeedMap */record[/* rotateSpeedMap */9],
          /* eulerAngleDiffMap */record[/* eulerAngleDiffMap */10],
          /* translationDiffMap */record[/* translationDiffMap */11],
          /* gameObjectMap */record[/* gameObjectMap */12],
          /* disposedIndexArray */record[/* disposedIndexArray */13],
          /* directionArrayMap */record[/* directionArrayMap */14],
          /* localEulerAngleMap */record[/* localEulerAngleMap */15]
        ];
}

function _addPointDragOverEventHandleFunc(cameraController, handleFunc, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncListMap */record[/* pointDragStartEventHandleFuncListMap */1],
          /* pointDragDropEventHandleFuncListMap */record[/* pointDragDropEventHandleFuncListMap */2],
          /* pointDragOverEventHandleFuncListMap */_addEventHandleFunc(cameraController, handleFunc, record[/* pointDragOverEventHandleFuncListMap */3]),
          /* pointScaleEventHandleFuncListMap */record[/* pointScaleEventHandleFuncListMap */4],
          /* keydownEventHandleFuncListMap */record[/* keydownEventHandleFuncListMap */5],
          /* keyupEventHandleFuncListMap */record[/* keyupEventHandleFuncListMap */6],
          /* moveSpeedMap */record[/* moveSpeedMap */7],
          /* wheelSpeedMap */record[/* wheelSpeedMap */8],
          /* rotateSpeedMap */record[/* rotateSpeedMap */9],
          /* eulerAngleDiffMap */record[/* eulerAngleDiffMap */10],
          /* translationDiffMap */record[/* translationDiffMap */11],
          /* gameObjectMap */record[/* gameObjectMap */12],
          /* disposedIndexArray */record[/* disposedIndexArray */13],
          /* directionArrayMap */record[/* directionArrayMap */14],
          /* localEulerAngleMap */record[/* localEulerAngleMap */15]
        ];
}

function _addPointScaleEventHandleFunc(cameraController, handleFunc, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncListMap */record[/* pointDragStartEventHandleFuncListMap */1],
          /* pointDragDropEventHandleFuncListMap */record[/* pointDragDropEventHandleFuncListMap */2],
          /* pointDragOverEventHandleFuncListMap */record[/* pointDragOverEventHandleFuncListMap */3],
          /* pointScaleEventHandleFuncListMap */_addEventHandleFunc(cameraController, handleFunc, record[/* pointScaleEventHandleFuncListMap */4]),
          /* keydownEventHandleFuncListMap */record[/* keydownEventHandleFuncListMap */5],
          /* keyupEventHandleFuncListMap */record[/* keyupEventHandleFuncListMap */6],
          /* moveSpeedMap */record[/* moveSpeedMap */7],
          /* wheelSpeedMap */record[/* wheelSpeedMap */8],
          /* rotateSpeedMap */record[/* rotateSpeedMap */9],
          /* eulerAngleDiffMap */record[/* eulerAngleDiffMap */10],
          /* translationDiffMap */record[/* translationDiffMap */11],
          /* gameObjectMap */record[/* gameObjectMap */12],
          /* disposedIndexArray */record[/* disposedIndexArray */13],
          /* directionArrayMap */record[/* directionArrayMap */14],
          /* localEulerAngleMap */record[/* localEulerAngleMap */15]
        ];
}

function _addKeydownEventHandleFunc(cameraController, handleFunc, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncListMap */record[/* pointDragStartEventHandleFuncListMap */1],
          /* pointDragDropEventHandleFuncListMap */record[/* pointDragDropEventHandleFuncListMap */2],
          /* pointDragOverEventHandleFuncListMap */record[/* pointDragOverEventHandleFuncListMap */3],
          /* pointScaleEventHandleFuncListMap */record[/* pointScaleEventHandleFuncListMap */4],
          /* keydownEventHandleFuncListMap */_addEventHandleFunc(cameraController, handleFunc, record[/* keydownEventHandleFuncListMap */5]),
          /* keyupEventHandleFuncListMap */record[/* keyupEventHandleFuncListMap */6],
          /* moveSpeedMap */record[/* moveSpeedMap */7],
          /* wheelSpeedMap */record[/* wheelSpeedMap */8],
          /* rotateSpeedMap */record[/* rotateSpeedMap */9],
          /* eulerAngleDiffMap */record[/* eulerAngleDiffMap */10],
          /* translationDiffMap */record[/* translationDiffMap */11],
          /* gameObjectMap */record[/* gameObjectMap */12],
          /* disposedIndexArray */record[/* disposedIndexArray */13],
          /* directionArrayMap */record[/* directionArrayMap */14],
          /* localEulerAngleMap */record[/* localEulerAngleMap */15]
        ];
}

function _addKeyupEventHandleFunc(cameraController, handleFunc, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncListMap */record[/* pointDragStartEventHandleFuncListMap */1],
          /* pointDragDropEventHandleFuncListMap */record[/* pointDragDropEventHandleFuncListMap */2],
          /* pointDragOverEventHandleFuncListMap */record[/* pointDragOverEventHandleFuncListMap */3],
          /* pointScaleEventHandleFuncListMap */record[/* pointScaleEventHandleFuncListMap */4],
          /* keydownEventHandleFuncListMap */record[/* keydownEventHandleFuncListMap */5],
          /* keyupEventHandleFuncListMap */_addEventHandleFunc(cameraController, handleFunc, record[/* keyupEventHandleFuncListMap */6]),
          /* moveSpeedMap */record[/* moveSpeedMap */7],
          /* wheelSpeedMap */record[/* wheelSpeedMap */8],
          /* rotateSpeedMap */record[/* rotateSpeedMap */9],
          /* eulerAngleDiffMap */record[/* eulerAngleDiffMap */10],
          /* translationDiffMap */record[/* translationDiffMap */11],
          /* gameObjectMap */record[/* gameObjectMap */12],
          /* disposedIndexArray */record[/* disposedIndexArray */13],
          /* directionArrayMap */record[/* directionArrayMap */14],
          /* localEulerAngleMap */record[/* localEulerAngleMap */15]
        ];
}

function _changeOrbit(cameraController, param, state) {
  var movementDelta = param[/* movementDelta */5];
  var viewRecord = state[/* viewRecord */8];
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  var rotateSpeed = OperateFlyCameraControllerService$Wonderjs.unsafeGetRotateSpeed(cameraController, flyCameraControllerRecord);
  var canvasHeight = ViewService$Wonderjs.unsafeGetCanvas(viewRecord).height;
  var match = canvasHeight === 0;
  var factor = match ? 0 : rotateSpeed / canvasHeight;
  return OperateFlyCameraControllerService$Wonderjs.setEulerAngleDiff(cameraController, /* record */[
              /* diffX */factor * movementDelta[1],
              /* diffY */factor * movementDelta[0]
            ], flyCameraControllerRecord);
}

function _handleDirectionArray(key, handleFunc, directionArray) {
  switch (key) {
    case "e" : 
        return Curry._2(handleFunc, /* Down */3, directionArray);
    case "a" : 
    case "left" : 
        return Curry._2(handleFunc, /* Left */0, directionArray);
    case "q" : 
        return Curry._2(handleFunc, /* Up */2, directionArray);
    case "d" : 
    case "right" : 
        return Curry._2(handleFunc, /* Right */1, directionArray);
    case "down" : 
    case "s" : 
        return Curry._2(handleFunc, /* Back */5, directionArray);
    case "up" : 
    case "w" : 
        return Curry._2(handleFunc, /* Front */4, directionArray);
    default:
      return directionArray;
  }
}

function _moveSpecificDirection(cameraController, keyboardEvent, state) {
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  var directionArray = _handleDirectionArray(keyboardEvent[/* key */6], ArrayService$Wonderjs.addUniqueItem, OperateFlyCameraControllerService$Wonderjs.unsafeGetDirectionArray(cameraController, flyCameraControllerRecord));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* flyCameraControllerRecord */26] = OperateFlyCameraControllerService$Wonderjs.setDirectionArray(cameraController, directionArray, flyCameraControllerRecord);
  return newrecord;
}

function _staticSpecificDirection(cameraController, keyboardEvent, state) {
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  var directionArray = _handleDirectionArray(keyboardEvent[/* key */6], ArrayService$Wonderjs.removeSpecificItem, OperateFlyCameraControllerService$Wonderjs.unsafeGetDirectionArray(cameraController, flyCameraControllerRecord));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* flyCameraControllerRecord */26] = OperateFlyCameraControllerService$Wonderjs.setDirectionArray(cameraController, directionArray, flyCameraControllerRecord);
  return newrecord;
}

function _translationByPointScale(cameraController, pointEvent, flyCameraControllerRecord) {
  var wheelSpeed = OperateFlyCameraControllerService$Wonderjs.unsafeGetWheelSpeed(cameraController, flyCameraControllerRecord);
  var match = pointEvent[/* wheel */4];
  if (match !== undefined) {
    return OperateFlyCameraControllerService$Wonderjs.setTranslationDiff(cameraController, /* tuple */[
                0,
                0,
                -wheelSpeed * match
              ], flyCameraControllerRecord);
  } else {
    return flyCameraControllerRecord;
  }
}

function _isCombinedKey(param) {
  if (param[/* ctrlKey */2] || param[/* altKey */3] || param[/* shiftKey */4]) {
    return true;
  } else {
    return param[/* metaKey */5];
  }
}

function isTriggerKeydownEventHandler($$event) {
  return !_isCombinedKey($$event);
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
        DomExtend$Wonderjs.exitPointerLock(/* () */0);
      }
      return /* tuple */[
              state,
              $$event
            ];
    }
  };
  var pointDragOverHandleFunc = function ($$event, state) {
    var newrecord = Caml_array.caml_array_dup(state);
    return /* tuple */[
            (newrecord[/* flyCameraControllerRecord */26] = _changeOrbit(cameraController, OptionService$Wonderjs.unsafeGet($$event[/* userData */4]), state), newrecord),
            $$event
          ];
  };
  var pointScaleHandleFunc = function ($$event, state) {
    var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
    var pointEvent = OptionService$Wonderjs.unsafeGet($$event[/* userData */4]);
    HandlePointDomEventMainService$Wonderjs.preventDefault(pointEvent[/* event */6]);
    var newrecord = Caml_array.caml_array_dup(state);
    return /* tuple */[
            (newrecord[/* flyCameraControllerRecord */26] = _translationByPointScale(cameraController, pointEvent, flyCameraControllerRecord), newrecord),
            $$event
          ];
  };
  var keydownHandleFunc = function ($$event, state) {
    var match = !_isCombinedKey($$event);
    if (match) {
      return _moveSpecificDirection(cameraController, $$event, state);
    } else {
      return state;
    }
  };
  var keyupHandleFunc = function ($$event, state) {
    return _staticSpecificDirection(cameraController, $$event, state);
  };
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* flyCameraControllerRecord */26] = _addKeyupEventHandleFunc(cameraController, keyupHandleFunc, _addKeydownEventHandleFunc(cameraController, keydownHandleFunc, _addPointScaleEventHandleFunc(cameraController, pointScaleHandleFunc, _addPointDragOverEventHandleFunc(cameraController, pointDragOverHandleFunc, _addPointDragDropEventHandleFunc(cameraController, pointDragDropHandleFunc, _addPointDragStartEventHandleFunc(cameraController, pointDragStartHandleFunc, state[/* flyCameraControllerRecord */26]))))));
  return /* tuple */[
          newrecord,
          pointDragStartHandleFunc,
          pointDragDropHandleFunc,
          pointDragOverHandleFunc,
          pointScaleHandleFunc,
          keydownHandleFunc,
          keyupHandleFunc
        ];
}

function bindEvent(cameraController, state) {
  var match = prepareBindEvent(cameraController, state);
  var state$1 = ManageEventMainService$Wonderjs.onCustomGlobalEvent(NameEventService$Wonderjs.getPointDragStartEventName(/* () */0), match[1], match[0], undefined, /* () */0);
  var state$2 = ManageEventMainService$Wonderjs.onCustomGlobalEvent(NameEventService$Wonderjs.getPointDragDropEventName(/* () */0), match[2], state$1, undefined, /* () */0);
  var state$3 = ManageEventMainService$Wonderjs.onCustomGlobalEvent(NameEventService$Wonderjs.getPointDragOverEventName(/* () */0), match[3], state$2, undefined, /* () */0);
  var state$4 = ManageEventMainService$Wonderjs.onCustomGlobalEvent(NameEventService$Wonderjs.getPointScaleEventName(/* () */0), match[4], state$3, undefined, /* () */0);
  var state$5 = ManageEventMainService$Wonderjs.onKeyboardEvent(/* KeyDown */10, match[5], state$4, undefined, /* () */0);
  return ManageEventMainService$Wonderjs.onKeyboardEvent(/* KeyUp */9, match[6], state$5, undefined, /* () */0);
}

var _unbindPointEvent = ManageEventMainService$Wonderjs.offCustomGlobalEventByHandleFunc;

var _unbindKeyboardEvent = ManageEventMainService$Wonderjs.offKeyboardEventByHandleFunc;

function _disposePointDragStartEventHandleFuncListMap(cameraController, state) {
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  var pointDragStartEventHandleFuncListMap = flyCameraControllerRecord[/* pointDragStartEventHandleFuncListMap */1];
  var match = MutableSparseMapService$WonderCommonlib.get(cameraController, pointDragStartEventHandleFuncListMap);
  if (match !== undefined) {
    var state$1 = List.fold_left((function (state, func) {
            var eventName = NameEventService$Wonderjs.getPointDragStartEventName(/* () */0);
            return ManageEventMainService$Wonderjs.offCustomGlobalEventByHandleFunc(eventName, func, state);
          }), state, match);
    var newrecord = Caml_array.caml_array_dup(state$1);
    newrecord[/* flyCameraControllerRecord */26] = /* record */[
      /* index */flyCameraControllerRecord[/* index */0],
      /* pointDragStartEventHandleFuncListMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, pointDragStartEventHandleFuncListMap),
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
      /* disposedIndexArray */flyCameraControllerRecord[/* disposedIndexArray */13],
      /* directionArrayMap */flyCameraControllerRecord[/* directionArrayMap */14],
      /* localEulerAngleMap */flyCameraControllerRecord[/* localEulerAngleMap */15]
    ];
    return newrecord;
  } else {
    return state;
  }
}

function _disposePointDragDropEventHandleFuncListMap(cameraController, state) {
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  var pointDragDropEventHandleFuncListMap = flyCameraControllerRecord[/* pointDragDropEventHandleFuncListMap */2];
  var match = MutableSparseMapService$WonderCommonlib.get(cameraController, pointDragDropEventHandleFuncListMap);
  if (match !== undefined) {
    var state$1 = List.fold_left((function (state, func) {
            var eventName = NameEventService$Wonderjs.getPointDragDropEventName(/* () */0);
            return ManageEventMainService$Wonderjs.offCustomGlobalEventByHandleFunc(eventName, func, state);
          }), state, match);
    var newrecord = Caml_array.caml_array_dup(state$1);
    newrecord[/* flyCameraControllerRecord */26] = /* record */[
      /* index */flyCameraControllerRecord[/* index */0],
      /* pointDragStartEventHandleFuncListMap */flyCameraControllerRecord[/* pointDragStartEventHandleFuncListMap */1],
      /* pointDragDropEventHandleFuncListMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, pointDragDropEventHandleFuncListMap),
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
      /* disposedIndexArray */flyCameraControllerRecord[/* disposedIndexArray */13],
      /* directionArrayMap */flyCameraControllerRecord[/* directionArrayMap */14],
      /* localEulerAngleMap */flyCameraControllerRecord[/* localEulerAngleMap */15]
    ];
    return newrecord;
  } else {
    return state;
  }
}

function _disposePointDragOverEventHandleFuncListMap(cameraController, state) {
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  var pointDragOverEventHandleFuncListMap = flyCameraControllerRecord[/* pointDragOverEventHandleFuncListMap */3];
  var match = MutableSparseMapService$WonderCommonlib.get(cameraController, pointDragOverEventHandleFuncListMap);
  if (match !== undefined) {
    var state$1 = List.fold_left((function (state, func) {
            var eventName = NameEventService$Wonderjs.getPointDragOverEventName(/* () */0);
            return ManageEventMainService$Wonderjs.offCustomGlobalEventByHandleFunc(eventName, func, state);
          }), state, match);
    var newrecord = Caml_array.caml_array_dup(state$1);
    newrecord[/* flyCameraControllerRecord */26] = /* record */[
      /* index */flyCameraControllerRecord[/* index */0],
      /* pointDragStartEventHandleFuncListMap */flyCameraControllerRecord[/* pointDragStartEventHandleFuncListMap */1],
      /* pointDragDropEventHandleFuncListMap */flyCameraControllerRecord[/* pointDragDropEventHandleFuncListMap */2],
      /* pointDragOverEventHandleFuncListMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, pointDragOverEventHandleFuncListMap),
      /* pointScaleEventHandleFuncListMap */flyCameraControllerRecord[/* pointScaleEventHandleFuncListMap */4],
      /* keydownEventHandleFuncListMap */flyCameraControllerRecord[/* keydownEventHandleFuncListMap */5],
      /* keyupEventHandleFuncListMap */flyCameraControllerRecord[/* keyupEventHandleFuncListMap */6],
      /* moveSpeedMap */flyCameraControllerRecord[/* moveSpeedMap */7],
      /* wheelSpeedMap */flyCameraControllerRecord[/* wheelSpeedMap */8],
      /* rotateSpeedMap */flyCameraControllerRecord[/* rotateSpeedMap */9],
      /* eulerAngleDiffMap */flyCameraControllerRecord[/* eulerAngleDiffMap */10],
      /* translationDiffMap */flyCameraControllerRecord[/* translationDiffMap */11],
      /* gameObjectMap */flyCameraControllerRecord[/* gameObjectMap */12],
      /* disposedIndexArray */flyCameraControllerRecord[/* disposedIndexArray */13],
      /* directionArrayMap */flyCameraControllerRecord[/* directionArrayMap */14],
      /* localEulerAngleMap */flyCameraControllerRecord[/* localEulerAngleMap */15]
    ];
    return newrecord;
  } else {
    return state;
  }
}

function _disposePointScaleEventHandleFuncListMap(cameraController, state) {
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  var pointScaleEventHandleFuncListMap = flyCameraControllerRecord[/* pointScaleEventHandleFuncListMap */4];
  var match = MutableSparseMapService$WonderCommonlib.get(cameraController, pointScaleEventHandleFuncListMap);
  if (match !== undefined) {
    var state$1 = List.fold_left((function (state, func) {
            var eventName = NameEventService$Wonderjs.getPointScaleEventName(/* () */0);
            return ManageEventMainService$Wonderjs.offCustomGlobalEventByHandleFunc(eventName, func, state);
          }), state, match);
    var newrecord = Caml_array.caml_array_dup(state$1);
    newrecord[/* flyCameraControllerRecord */26] = /* record */[
      /* index */flyCameraControllerRecord[/* index */0],
      /* pointDragStartEventHandleFuncListMap */flyCameraControllerRecord[/* pointDragStartEventHandleFuncListMap */1],
      /* pointDragDropEventHandleFuncListMap */flyCameraControllerRecord[/* pointDragDropEventHandleFuncListMap */2],
      /* pointDragOverEventHandleFuncListMap */flyCameraControllerRecord[/* pointDragOverEventHandleFuncListMap */3],
      /* pointScaleEventHandleFuncListMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, pointScaleEventHandleFuncListMap),
      /* keydownEventHandleFuncListMap */flyCameraControllerRecord[/* keydownEventHandleFuncListMap */5],
      /* keyupEventHandleFuncListMap */flyCameraControllerRecord[/* keyupEventHandleFuncListMap */6],
      /* moveSpeedMap */flyCameraControllerRecord[/* moveSpeedMap */7],
      /* wheelSpeedMap */flyCameraControllerRecord[/* wheelSpeedMap */8],
      /* rotateSpeedMap */flyCameraControllerRecord[/* rotateSpeedMap */9],
      /* eulerAngleDiffMap */flyCameraControllerRecord[/* eulerAngleDiffMap */10],
      /* translationDiffMap */flyCameraControllerRecord[/* translationDiffMap */11],
      /* gameObjectMap */flyCameraControllerRecord[/* gameObjectMap */12],
      /* disposedIndexArray */flyCameraControllerRecord[/* disposedIndexArray */13],
      /* directionArrayMap */flyCameraControllerRecord[/* directionArrayMap */14],
      /* localEulerAngleMap */flyCameraControllerRecord[/* localEulerAngleMap */15]
    ];
    return newrecord;
  } else {
    return state;
  }
}

function _disposeKeyDownEventHandleFuncListMap(cameraController, state) {
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  var keydownEventHandleFuncListMap = flyCameraControllerRecord[/* keydownEventHandleFuncListMap */5];
  var match = MutableSparseMapService$WonderCommonlib.get(cameraController, keydownEventHandleFuncListMap);
  if (match !== undefined) {
    var state$1 = List.fold_left((function (state, func) {
            return ManageEventMainService$Wonderjs.offKeyboardEventByHandleFunc(/* KeyDown */10, func, state);
          }), state, match);
    var newrecord = Caml_array.caml_array_dup(state$1);
    newrecord[/* flyCameraControllerRecord */26] = /* record */[
      /* index */flyCameraControllerRecord[/* index */0],
      /* pointDragStartEventHandleFuncListMap */flyCameraControllerRecord[/* pointDragStartEventHandleFuncListMap */1],
      /* pointDragDropEventHandleFuncListMap */flyCameraControllerRecord[/* pointDragDropEventHandleFuncListMap */2],
      /* pointDragOverEventHandleFuncListMap */flyCameraControllerRecord[/* pointDragOverEventHandleFuncListMap */3],
      /* pointScaleEventHandleFuncListMap */flyCameraControllerRecord[/* pointScaleEventHandleFuncListMap */4],
      /* keydownEventHandleFuncListMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, keydownEventHandleFuncListMap),
      /* keyupEventHandleFuncListMap */flyCameraControllerRecord[/* keyupEventHandleFuncListMap */6],
      /* moveSpeedMap */flyCameraControllerRecord[/* moveSpeedMap */7],
      /* wheelSpeedMap */flyCameraControllerRecord[/* wheelSpeedMap */8],
      /* rotateSpeedMap */flyCameraControllerRecord[/* rotateSpeedMap */9],
      /* eulerAngleDiffMap */flyCameraControllerRecord[/* eulerAngleDiffMap */10],
      /* translationDiffMap */flyCameraControllerRecord[/* translationDiffMap */11],
      /* gameObjectMap */flyCameraControllerRecord[/* gameObjectMap */12],
      /* disposedIndexArray */flyCameraControllerRecord[/* disposedIndexArray */13],
      /* directionArrayMap */flyCameraControllerRecord[/* directionArrayMap */14],
      /* localEulerAngleMap */flyCameraControllerRecord[/* localEulerAngleMap */15]
    ];
    return newrecord;
  } else {
    return state;
  }
}

function _disposeKeyUpEventHandleFuncListMap(cameraController, state) {
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  var keyupEventHandleFuncListMap = flyCameraControllerRecord[/* keyupEventHandleFuncListMap */6];
  var match = MutableSparseMapService$WonderCommonlib.get(cameraController, keyupEventHandleFuncListMap);
  if (match !== undefined) {
    var state$1 = List.fold_left((function (state, func) {
            return ManageEventMainService$Wonderjs.offKeyboardEventByHandleFunc(/* KeyUp */9, func, state);
          }), state, match);
    var newrecord = Caml_array.caml_array_dup(state$1);
    newrecord[/* flyCameraControllerRecord */26] = /* record */[
      /* index */flyCameraControllerRecord[/* index */0],
      /* pointDragStartEventHandleFuncListMap */flyCameraControllerRecord[/* pointDragStartEventHandleFuncListMap */1],
      /* pointDragDropEventHandleFuncListMap */flyCameraControllerRecord[/* pointDragDropEventHandleFuncListMap */2],
      /* pointDragOverEventHandleFuncListMap */flyCameraControllerRecord[/* pointDragOverEventHandleFuncListMap */3],
      /* pointScaleEventHandleFuncListMap */flyCameraControllerRecord[/* pointScaleEventHandleFuncListMap */4],
      /* keydownEventHandleFuncListMap */flyCameraControllerRecord[/* keydownEventHandleFuncListMap */5],
      /* keyupEventHandleFuncListMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraController, keyupEventHandleFuncListMap),
      /* moveSpeedMap */flyCameraControllerRecord[/* moveSpeedMap */7],
      /* wheelSpeedMap */flyCameraControllerRecord[/* wheelSpeedMap */8],
      /* rotateSpeedMap */flyCameraControllerRecord[/* rotateSpeedMap */9],
      /* eulerAngleDiffMap */flyCameraControllerRecord[/* eulerAngleDiffMap */10],
      /* translationDiffMap */flyCameraControllerRecord[/* translationDiffMap */11],
      /* gameObjectMap */flyCameraControllerRecord[/* gameObjectMap */12],
      /* disposedIndexArray */flyCameraControllerRecord[/* disposedIndexArray */13],
      /* directionArrayMap */flyCameraControllerRecord[/* directionArrayMap */14],
      /* localEulerAngleMap */flyCameraControllerRecord[/* localEulerAngleMap */15]
    ];
    return newrecord;
  } else {
    return state;
  }
}

function unbindEvent(cameraController, state) {
  return _disposeKeyUpEventHandleFuncListMap(cameraController, _disposeKeyDownEventHandleFuncListMap(cameraController, _disposePointScaleEventHandleFuncListMap(cameraController, _disposePointDragOverEventHandleFuncListMap(cameraController, _disposePointDragDropEventHandleFuncListMap(cameraController, _disposePointDragStartEventHandleFuncListMap(cameraController, state))))));
}

var unbindPointScaleEvent = _disposePointScaleEventHandleFuncListMap;

function isBindEvent(cameraController, state) {
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  return MutableSparseMapService$WonderCommonlib.has(cameraController, flyCameraControllerRecord[/* pointDragStartEventHandleFuncListMap */1]);
}

export {
  _addEventHandleFunc ,
  _addPointDragStartEventHandleFunc ,
  _addPointDragDropEventHandleFunc ,
  _addPointDragOverEventHandleFunc ,
  _addPointScaleEventHandleFunc ,
  _addKeydownEventHandleFunc ,
  _addKeyupEventHandleFunc ,
  _changeOrbit ,
  _handleDirectionArray ,
  _moveSpecificDirection ,
  _staticSpecificDirection ,
  _translationByPointScale ,
  _isCombinedKey ,
  isTriggerKeydownEventHandler ,
  prepareBindEvent ,
  bindEvent ,
  _unbindPointEvent ,
  _unbindKeyboardEvent ,
  _disposePointDragStartEventHandleFuncListMap ,
  _disposePointDragDropEventHandleFuncListMap ,
  _disposePointDragOverEventHandleFuncListMap ,
  _disposePointScaleEventHandleFuncListMap ,
  _disposeKeyDownEventHandleFuncListMap ,
  _disposeKeyUpEventHandleFuncListMap ,
  unbindEvent ,
  unbindPointScaleEvent ,
  isBindEvent ,
  
}
/* ViewService-Wonderjs Not a pure module */
