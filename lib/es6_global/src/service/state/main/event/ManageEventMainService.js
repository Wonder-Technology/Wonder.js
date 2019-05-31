

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as BindCustomEventMainService$Wonderjs from "./bind/BindCustomEventMainService.js";
import * as BindMouseDomEventMainService$Wonderjs from "./bind/BindMouseDomEventMainService.js";
import * as BindTouchDomEventMainService$Wonderjs from "./bind/BindTouchDomEventMainService.js";
import * as HandleCustomEventMainService$Wonderjs from "./handle/HandleCustomEventMainService.js";
import * as BindKeyboardDomEventMainService$Wonderjs from "./bind/BindKeyboardDomEventMainService.js";

function onMouseEvent(eventName, handleFunc, state, $staropt$star, param) {
  var priority = $staropt$star !== undefined ? $staropt$star : 0;
  return BindMouseDomEventMainService$Wonderjs.bind(eventName, priority, handleFunc, state);
}

function onKeyboardEvent(eventName, handleFunc, state, $staropt$star, param) {
  var priority = $staropt$star !== undefined ? $staropt$star : 0;
  return BindKeyboardDomEventMainService$Wonderjs.bind(eventName, priority, handleFunc, state);
}

function onTouchEvent(eventName, handleFunc, state, $staropt$star, param) {
  var priority = $staropt$star !== undefined ? $staropt$star : 0;
  return BindTouchDomEventMainService$Wonderjs.bind(eventName, priority, handleFunc, state);
}

var offMouseEventByHandleFunc = BindMouseDomEventMainService$Wonderjs.unbindByHandleFunc;

var offKeyboardEventByHandleFunc = BindKeyboardDomEventMainService$Wonderjs.unbindByHandleFunc;

var offTouchEventByHandleFunc = BindTouchDomEventMainService$Wonderjs.unbindByHandleFunc;

function onCustomGlobalEvent(eventName, handleFunc, state, $staropt$star, param) {
  var priority = $staropt$star !== undefined ? $staropt$star : 0;
  return BindCustomEventMainService$Wonderjs.bindGlobalEvent(eventName, priority, handleFunc, state);
}

var offCustomGlobalEventByEventName = BindCustomEventMainService$Wonderjs.unbindGlobalEventByEventName;

var offCustomGlobalEventByHandleFunc = BindCustomEventMainService$Wonderjs.unbindGlobalEventByHandleFunc;

function onCustomGameObjectEvent(eventName, handleFunc, target, state, $staropt$star, param) {
  var priority = $staropt$star !== undefined ? $staropt$star : 0;
  return BindCustomEventMainService$Wonderjs.bindGameObjectEvent(/* tuple */[
              eventName,
              priority,
              target
            ], handleFunc, state);
}

function offCustomGameObjectEventByTarget(eventName, target, state) {
  return BindCustomEventMainService$Wonderjs.unbindGameObjectEventByTarget(/* tuple */[
              eventName,
              target
            ], state);
}

function offCustomGameObjectEventByHandleFunc(eventName, handleFunc, target, state) {
  return BindCustomEventMainService$Wonderjs.unbindGameObjectEventByHandleFunc(/* tuple */[
              eventName,
              target
            ], handleFunc, state);
}

var stopPropagationCustomEvent = HandleCustomEventMainService$Wonderjs.stopPropagation;

var triggerCustomGlobalEvent = HandleCustomEventMainService$Wonderjs.triggerGlobalEvent;

function triggerCustomGameObjectEvent(customEvent, target, state) {
  return HandleCustomEventMainService$Wonderjs.triggerGameObjectEvent(target, customEvent, state);
}

function broadcastCustomGameObjectEvent(customEvent, target, state) {
  return HandleCustomEventMainService$Wonderjs.broadcastGameObjectEvent(target, customEvent, state);
}

function emitCustomGameObjectEvent(customEvent, target, state) {
  return HandleCustomEventMainService$Wonderjs.emitGameObjectEvent(target, customEvent, state);
}

function setDomEventStreamSubscription(domEventStreamSubscription, state) {
  var eventRecord = state[/* eventRecord */41];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* eventRecord */41] = /* record */[
    /* domEventStreamSubscription */Caml_option.some(domEventStreamSubscription),
    /* mouseDomEventDataArrMap */eventRecord[/* mouseDomEventDataArrMap */1],
    /* keyboardDomEventDataArrMap */eventRecord[/* keyboardDomEventDataArrMap */2],
    /* touchDomEventDataArrMap */eventRecord[/* touchDomEventDataArrMap */3],
    /* customGlobalEventArrMap */eventRecord[/* customGlobalEventArrMap */4],
    /* customGameObjectEventArrMap */eventRecord[/* customGameObjectEventArrMap */5],
    /* mouseEventData */eventRecord[/* mouseEventData */6],
    /* keyboardEventData */eventRecord[/* keyboardEventData */7],
    /* touchEventData */eventRecord[/* touchEventData */8]
  ];
  return newrecord;
}

function _unsubscribeDomEventStream (domEventStreamSubscription){
  domEventStreamSubscription.unsubscribe();
  };

function unsubscribeDomEventStream(state) {
  var match = state[/* eventRecord */41][/* domEventStreamSubscription */0];
  if (match !== undefined) {
    _unsubscribeDomEventStream(Caml_option.valFromOption(match));
    return state;
  } else {
    return state;
  }
}

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
  setDomEventStreamSubscription ,
  _unsubscribeDomEventStream ,
  unsubscribeDomEventStream ,
  
}
/* BindCustomEventMainService-Wonderjs Not a pure module */
