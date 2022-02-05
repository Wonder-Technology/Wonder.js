'use strict';

var Caml_option = require("rescript/lib/js/caml_option.js");
var BindCustomEventDoService$WonderMiddlewareEventmanager = require("./bind/BindCustomEventDoService.bs.js");
var BindMouseDomEventDoService$WonderMiddlewareEventmanager = require("./bind/BindMouseDomEventDoService.bs.js");
var BindTouchDomEventDoService$WonderMiddlewareEventmanager = require("./bind/BindTouchDomEventDoService.bs.js");
var HandleCustomEventDoService$WonderMiddlewareEventmanager = require("./handle/HandleCustomEventDoService.bs.js");
var BindKeyboardDomEventDoService$WonderMiddlewareEventmanager = require("./bind/BindKeyboardDomEventDoService.bs.js");

function onMouseEvent(eventName, handleFunc, po, priorityOpt, param) {
  var priority = priorityOpt !== undefined ? priorityOpt : 0;
  return BindMouseDomEventDoService$WonderMiddlewareEventmanager.bind(eventName, priority, handleFunc, po);
}

function onKeyboardEvent(eventName, handleFunc, po, priorityOpt, param) {
  var priority = priorityOpt !== undefined ? priorityOpt : 0;
  return BindKeyboardDomEventDoService$WonderMiddlewareEventmanager.bind(eventName, priority, handleFunc, po);
}

function onTouchEvent(eventName, handleFunc, po, priorityOpt, param) {
  var priority = priorityOpt !== undefined ? priorityOpt : 0;
  return BindTouchDomEventDoService$WonderMiddlewareEventmanager.bind(eventName, priority, handleFunc, po);
}

var offMouseEventByHandleFunc = BindMouseDomEventDoService$WonderMiddlewareEventmanager.unbindByHandleFunc;

var offKeyboardEventByHandleFunc = BindKeyboardDomEventDoService$WonderMiddlewareEventmanager.unbindByHandleFunc;

var offTouchEventByHandleFunc = BindTouchDomEventDoService$WonderMiddlewareEventmanager.unbindByHandleFunc;

function onCustomGlobalEvent(eventName, handleFunc, po, priorityOpt, param) {
  var priority = priorityOpt !== undefined ? priorityOpt : 0;
  return BindCustomEventDoService$WonderMiddlewareEventmanager.bindGlobalEvent(eventName, priority, handleFunc, po);
}

var offCustomGlobalEventByEventName = BindCustomEventDoService$WonderMiddlewareEventmanager.unbindGlobalEventByEventName;

var offCustomGlobalEventByHandleFunc = BindCustomEventDoService$WonderMiddlewareEventmanager.unbindGlobalEventByHandleFunc;

var stopPropagationCustomEvent = HandleCustomEventDoService$WonderMiddlewareEventmanager.stopPropagation;

var triggerCustomGlobalEvent = HandleCustomEventDoService$WonderMiddlewareEventmanager.triggerGlobalEvent;

function setDomEventStreamSubscription(po, domEventStreamSubscription) {
  var eventRecord = po.eventRecord;
  return {
          eventRecord: {
            domEventStreamSubscription: Caml_option.some(domEventStreamSubscription),
            mouseDomEventDataArrMap: eventRecord.mouseDomEventDataArrMap,
            keyboardDomEventDataArrMap: eventRecord.keyboardDomEventDataArrMap,
            touchDomEventDataArrMap: eventRecord.touchDomEventDataArrMap,
            customGlobalEventArrMap: eventRecord.customGlobalEventArrMap,
            customGameObjectEventArrMap: eventRecord.customGameObjectEventArrMap,
            mouseEventData: eventRecord.mouseEventData,
            keyboardEventData: eventRecord.keyboardEventData,
            touchEventData: eventRecord.touchEventData
          },
          canvas: po.canvas,
          body: po.body,
          browser: po.browser
        };
}

var _unsubscribeDomEventStream = (function(domEventStreamSubscription){
  domEventStreamSubscription.unsubscribe();
  });

function unsubscribeDomEventStream(po) {
  var domEventStreamSubscription = po.eventRecord.domEventStreamSubscription;
  if (domEventStreamSubscription !== undefined) {
    _unsubscribeDomEventStream(Caml_option.valFromOption(domEventStreamSubscription));
    return po;
  } else {
    return po;
  }
}

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
exports.setDomEventStreamSubscription = setDomEventStreamSubscription;
exports._unsubscribeDomEventStream = _unsubscribeDomEventStream;
exports.unsubscribeDomEventStream = unsubscribeDomEventStream;
/* No side effect */
