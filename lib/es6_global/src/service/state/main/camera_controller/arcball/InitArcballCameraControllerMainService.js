

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";
import * as NameEventService$Wonderjs from "../../../../record/main/event/NameEventService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ManageEventMainService$Wonderjs from "../../event/ManageEventMainService.js";
import * as HandlePointDomEventMainService$Wonderjs from "../../event/handle/HandlePointDomEventMainService.js";
import * as OperateArcballCameraControllerService$Wonderjs from "../../../../record/main/camera_controller/arcball/OperateArcballCameraControllerService.js";
import * as EventArcballCameraControllerMainService$Wonderjs from "./EventArcballCameraControllerMainService.js";
import * as TargetArcballCameraControllerMainService$Wonderjs from "./TargetArcballCameraControllerMainService.js";

function _changeOrbit(cameraController, param, arcballCameraControllerRecord) {
  var movementDelta = param[/* movementDelta */5];
  var rotateSpeed = OperateArcballCameraControllerService$Wonderjs.unsafeGetRotateSpeed(cameraController, arcballCameraControllerRecord);
  return OperateArcballCameraControllerService$Wonderjs.setTheta(cameraController, OperateArcballCameraControllerService$Wonderjs.unsafeGetTheta(cameraController, arcballCameraControllerRecord) - movementDelta[1] / (100 / rotateSpeed), OperateArcballCameraControllerService$Wonderjs.setPhi(cameraController, OperateArcballCameraControllerService$Wonderjs.unsafeGetPhi(cameraController, arcballCameraControllerRecord) + movementDelta[0] / (100 / rotateSpeed), arcballCameraControllerRecord));
}

function initArcballCameraController(cameraController, state) {
  var pointDragHandleFunc = function ($$event, state) {
    var newrecord = Caml_array.caml_array_dup(state);
    return /* tuple */[
            (newrecord[/* arcballCameraControllerRecord */25] = _changeOrbit(cameraController, OptionService$Wonderjs.unsafeGet($$event[/* userData */4]), state[/* arcballCameraControllerRecord */25]), newrecord),
            $$event
          ];
  };
  var pointScaleHandleFunc = function ($$event, state) {
    var pointEvent = OptionService$Wonderjs.unsafeGet($$event[/* userData */4]);
    HandlePointDomEventMainService$Wonderjs.preventDefault(pointEvent[/* event */6]);
    var newrecord = Caml_array.caml_array_dup(state);
    return /* tuple */[
            (newrecord[/* arcballCameraControllerRecord */25] = OperateArcballCameraControllerService$Wonderjs.setDistanceByEvent(cameraController, pointEvent, state[/* arcballCameraControllerRecord */25]), newrecord),
            $$event
          ];
  };
  var keydownHandleFunc = function ($$event, state) {
    return TargetArcballCameraControllerMainService$Wonderjs.setTargetByKeyboardEvent(cameraController, $$event, state);
  };
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = EventArcballCameraControllerMainService$Wonderjs.setKeydownEventHandleFunc(cameraController, keydownHandleFunc, EventArcballCameraControllerMainService$Wonderjs.setPointScaleEventHandleFunc(cameraController, pointScaleHandleFunc, EventArcballCameraControllerMainService$Wonderjs.setPointDragEventHandleFunc(cameraController, pointDragHandleFunc, state[/* arcballCameraControllerRecord */25])));
  var state$1 = ManageEventMainService$Wonderjs.onCustomGlobalEvent(NameEventService$Wonderjs.getPointDragEventName(/* () */0), pointDragHandleFunc, newrecord, undefined, /* () */0);
  var state$2 = ManageEventMainService$Wonderjs.onCustomGlobalEvent(NameEventService$Wonderjs.getPointScaleEventName(/* () */0), pointScaleHandleFunc, state$1, undefined, /* () */0);
  return ManageEventMainService$Wonderjs.onKeyboardEvent(/* KeyDown */7, keydownHandleFunc, state$2, undefined, /* () */0);
}

function init(state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, dirtyIndex) {
                return initArcballCameraController(dirtyIndex, state);
              }), state, ArrayService$WonderCommonlib.removeDuplicateItems(state[/* arcballCameraControllerRecord */25][/* dirtyArray */4]));
}

export {
  _changeOrbit ,
  initArcballCameraController ,
  init ,
  
}
/* OptionService-Wonderjs Not a pure module */
