

import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ManageEventMainService$Wonderjs from "../../service/state/main/event/ManageEventMainService.js";
import * as CreateCustomEventMainService$Wonderjs from "../../service/state/main/event/event/CreateCustomEventMainService.js";
import * as HandleCustomEventMainService$Wonderjs from "../../service/state/main/event/handle/HandleCustomEventMainService.js";

function onMouseEvent(eventName, priority, handleFunc, state) {
  return ManageEventMainService$Wonderjs.onMouseEvent(eventName, handleFunc, state, priority, /* () */0);
}

function onKeyboardEvent(eventName, priority, handleFunc, state) {
  return ManageEventMainService$Wonderjs.onKeyboardEvent(eventName, handleFunc, state, priority, /* () */0);
}

function onTouchEvent(eventName, priority, handleFunc, state) {
  return ManageEventMainService$Wonderjs.onTouchEvent(eventName, handleFunc, state, priority, /* () */0);
}

var offMouseEventByHandleFunc = ManageEventMainService$Wonderjs.offMouseEventByHandleFunc;

var offKeyboardEventByHandleFunc = ManageEventMainService$Wonderjs.offKeyboardEventByHandleFunc;

var offTouchEventByHandleFunc = ManageEventMainService$Wonderjs.offTouchEventByHandleFunc;

function onCustomGlobalEvent(eventName, priority, handleFunc, state) {
  return ManageEventMainService$Wonderjs.onCustomGlobalEvent(eventName, handleFunc, state, priority, /* () */0);
}

var offCustomGlobalEventByEventName = ManageEventMainService$Wonderjs.offCustomGlobalEventByEventName;

var offCustomGlobalEventByHandleFunc = ManageEventMainService$Wonderjs.offCustomGlobalEventByHandleFunc;

function onCustomGameObjectEvent(eventName, target, priority, handleFunc, state) {
  return ManageEventMainService$Wonderjs.onCustomGameObjectEvent(eventName, handleFunc, target, state, priority, /* () */0);
}

var offCustomGameObjectEventByTarget = ManageEventMainService$Wonderjs.offCustomGameObjectEventByTarget;

function offCustomGameObjectEventByHandleFunc(eventName, target, handleFunc, state) {
  return ManageEventMainService$Wonderjs.offCustomGameObjectEventByHandleFunc(eventName, handleFunc, target, state);
}

var triggerCustomGlobalEvent = ManageEventMainService$Wonderjs.triggerCustomGlobalEvent;

var triggerCustomGameObjectEvent = ManageEventMainService$Wonderjs.triggerCustomGameObjectEvent;

var broadcastCustomGameObjectEvent = ManageEventMainService$Wonderjs.broadcastCustomGameObjectEvent;

var emitCustomGameObjectEvent = ManageEventMainService$Wonderjs.emitCustomGameObjectEvent;

function createCustomEvent(eventName, userData) {
  return CreateCustomEventMainService$Wonderjs.create(eventName, (userData == null) ? undefined : Caml_option.some(userData));
}

var getCustomEventUserData = HandleCustomEventMainService$Wonderjs.getCustomEventUserData;

function getPointEventLocationInViewOfEvent($$event) {
  return $$event[/* locationInView */2];
}

function getPointEventLocationOfEvent($$event) {
  return $$event[/* location */1];
}

function getPointEventButtonOfEvent($$event) {
  return $$event[/* button */3];
}

function getPointEventWheelOfEvent($$event) {
  return $$event[/* wheel */4];
}

function getPointEventMovementDeltaOfEvent($$event) {
  return $$event[/* movementDelta */5];
}

function getPointEventEventOfEvent($$event) {
  return $$event[/* event */6];
}

var stopPropagationCustomEvent = ManageEventMainService$Wonderjs.stopPropagationCustomEvent;

export {
  onMouseEvent ,
  onKeyboardEvent ,
  onTouchEvent ,
  offMouseEventByHandleFunc ,
  offKeyboardEventByHandleFunc ,
  offTouchEventByHandleFunc ,
  onCustomGlobalEvent ,
  offCustomGlobalEventByEventName ,
  offCustomGlobalEventByHandleFunc ,
  onCustomGameObjectEvent ,
  offCustomGameObjectEventByTarget ,
  offCustomGameObjectEventByHandleFunc ,
  stopPropagationCustomEvent ,
  triggerCustomGlobalEvent ,
  triggerCustomGameObjectEvent ,
  broadcastCustomGameObjectEvent ,
  emitCustomGameObjectEvent ,
  createCustomEvent ,
  getCustomEventUserData ,
  getPointEventLocationInViewOfEvent ,
  getPointEventLocationOfEvent ,
  getPointEventButtonOfEvent ,
  getPointEventWheelOfEvent ,
  getPointEventMovementDeltaOfEvent ,
  getPointEventEventOfEvent ,
  
}
/* ManageEventMainService-Wonderjs Not a pure module */
