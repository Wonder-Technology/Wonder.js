'use strict';

var Caml_option = require("rescript/lib/js/caml_option.js");
var Tuple2$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/tuple/Tuple2.bs.js");
var ContainerManager$WonderMiddlewareEventmanager = require("../data/ContainerManager.bs.js");
var ManageEventDoService$WonderMiddlewareEventmanager = require("../service/event/ManageEventDoService.bs.js");
var CreateCustomEventDoService$WonderMiddlewareEventmanager = require("../service/event/event/CreateCustomEventDoService.bs.js");

function onMouseEvent(eventName, priority, handleFunc) {
  return ContainerManager$WonderMiddlewareEventmanager.setPO(ManageEventDoService$WonderMiddlewareEventmanager.onMouseEvent(eventName, handleFunc, ContainerManager$WonderMiddlewareEventmanager.getPO(undefined), priority, undefined));
}

function onKeyboardEvent(eventName, priority, handleFunc) {
  return ContainerManager$WonderMiddlewareEventmanager.setPO(ManageEventDoService$WonderMiddlewareEventmanager.onKeyboardEvent(eventName, handleFunc, ContainerManager$WonderMiddlewareEventmanager.getPO(undefined), priority, undefined));
}

function onTouchEvent(eventName, priority, handleFunc) {
  return ContainerManager$WonderMiddlewareEventmanager.setPO(ManageEventDoService$WonderMiddlewareEventmanager.onTouchEvent(eventName, handleFunc, ContainerManager$WonderMiddlewareEventmanager.getPO(undefined), priority, undefined));
}

function offMouseEventByHandleFunc(eventName, handleFunc) {
  return ContainerManager$WonderMiddlewareEventmanager.setPO(ManageEventDoService$WonderMiddlewareEventmanager.offMouseEventByHandleFunc(eventName, handleFunc, ContainerManager$WonderMiddlewareEventmanager.getPO(undefined)));
}

function offKeyboardEventByHandleFunc(eventName, handleFunc) {
  return ContainerManager$WonderMiddlewareEventmanager.setPO(ManageEventDoService$WonderMiddlewareEventmanager.offKeyboardEventByHandleFunc(eventName, handleFunc, ContainerManager$WonderMiddlewareEventmanager.getPO(undefined)));
}

function offTouchEventByHandleFunc(eventName, handleFunc) {
  return ContainerManager$WonderMiddlewareEventmanager.setPO(ManageEventDoService$WonderMiddlewareEventmanager.offTouchEventByHandleFunc(eventName, handleFunc, ContainerManager$WonderMiddlewareEventmanager.getPO(undefined)));
}

function onCustomGlobalEvent(eventName, priority, handleFunc) {
  return ContainerManager$WonderMiddlewareEventmanager.setPO(ManageEventDoService$WonderMiddlewareEventmanager.onCustomGlobalEvent(eventName, handleFunc, ContainerManager$WonderMiddlewareEventmanager.getPO(undefined), priority, undefined));
}

function offCustomGlobalEventByEventName(eventName) {
  return ContainerManager$WonderMiddlewareEventmanager.setPO(ManageEventDoService$WonderMiddlewareEventmanager.offCustomGlobalEventByEventName(eventName, ContainerManager$WonderMiddlewareEventmanager.getPO(undefined)));
}

function offCustomGlobalEventByHandleFunc(eventName, handleFunc) {
  return ContainerManager$WonderMiddlewareEventmanager.setPO(ManageEventDoService$WonderMiddlewareEventmanager.offCustomGlobalEventByHandleFunc(eventName, handleFunc, ContainerManager$WonderMiddlewareEventmanager.getPO(undefined)));
}

function triggerCustomGlobalEvent(customEvent) {
  return ContainerManager$WonderMiddlewareEventmanager.setPO(Tuple2$WonderCommonlib.getFirst(ManageEventDoService$WonderMiddlewareEventmanager.triggerCustomGlobalEvent(customEvent, ContainerManager$WonderMiddlewareEventmanager.getPO(undefined))));
}

function createCustomEvent(eventName, userData) {
  return CreateCustomEventDoService$WonderMiddlewareEventmanager.create(eventName, (userData == null) ? undefined : Caml_option.some(userData));
}

var stopPropagationCustomEvent = ManageEventDoService$WonderMiddlewareEventmanager.stopPropagationCustomEvent;

exports.onMouseEvent = onMouseEvent;
exports.onKeyboardEvent = onKeyboardEvent;
exports.onTouchEvent = onTouchEvent;
exports.offMouseEventByHandleFunc = offMouseEventByHandleFunc;
exports.offKeyboardEventByHandleFunc = offKeyboardEventByHandleFunc;
exports.offTouchEventByHandleFunc = offTouchEventByHandleFunc;
exports.onCustomGlobalEvent = onCustomGlobalEvent;
exports.offCustomGlobalEventByEventName = offCustomGlobalEventByEventName;
exports.offCustomGlobalEventByHandleFunc = offCustomGlobalEventByHandleFunc;
exports.stopPropagationCustomEvent = stopPropagationCustomEvent;
exports.triggerCustomGlobalEvent = triggerCustomGlobalEvent;
exports.createCustomEvent = createCustomEvent;
/* ContainerManager-WonderMiddlewareEventmanager Not a pure module */
