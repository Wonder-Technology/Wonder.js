

import * as Caml_array from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as MutableHashMapService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function _addEventDataByPriority(eventData, arr) {
  return ArrayService$Wonderjs.push(eventData, arr).sort((function (eventDataA, eventDataB) {
                return eventDataB[/* priority */0] - eventDataA[/* priority */0] | 0;
              }));
}

function _addToEventArr(eventName, eventData, eventArrMap) {
  var match = MutableHashMapService$WonderCommonlib.get(eventName, eventArrMap);
  if (match !== undefined) {
    return MutableHashMapService$WonderCommonlib.set(eventName, _addEventDataByPriority(eventData, match), eventArrMap);
  } else {
    return MutableHashMapService$WonderCommonlib.set(eventName, /* array */[eventData], eventArrMap);
  }
}

function bindGlobalEvent(eventName, priority, handleFunc, state) {
  var eventRecord = state[/* eventRecord */43];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* eventRecord */43] = /* record */[
    /* domEventStreamSubscription */eventRecord[/* domEventStreamSubscription */0],
    /* mouseDomEventDataArrMap */eventRecord[/* mouseDomEventDataArrMap */1],
    /* keyboardDomEventDataArrMap */eventRecord[/* keyboardDomEventDataArrMap */2],
    /* touchDomEventDataArrMap */eventRecord[/* touchDomEventDataArrMap */3],
    /* customGlobalEventArrMap */_addToEventArr(eventName, /* record */[
          /* priority */priority,
          /* handleFunc */handleFunc
        ], eventRecord[/* customGlobalEventArrMap */4]),
    /* customGameObjectEventArrMap */eventRecord[/* customGameObjectEventArrMap */5],
    /* mouseEventData */eventRecord[/* mouseEventData */6],
    /* keyboardEventData */eventRecord[/* keyboardEventData */7],
    /* touchEventData */eventRecord[/* touchEventData */8]
  ];
  return newrecord;
}

function _removeFromEventArrByHandleFunc(arr, targetHandleFunc) {
  return arr.filter((function (param) {
                return param[/* handleFunc */1] !== targetHandleFunc;
              }));
}

function _removeFromEventArrMapByHandleFunc(eventName, handleFunc, eventArrMap) {
  var match = MutableHashMapService$WonderCommonlib.get(eventName, eventArrMap);
  if (match !== undefined) {
    return MutableHashMapService$WonderCommonlib.set(eventName, _removeFromEventArrByHandleFunc(match, handleFunc), eventArrMap);
  } else {
    return eventArrMap;
  }
}

function unbindGlobalEventByHandleFunc(eventName, handleFunc, state) {
  var eventRecord = state[/* eventRecord */43];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* eventRecord */43] = /* record */[
    /* domEventStreamSubscription */eventRecord[/* domEventStreamSubscription */0],
    /* mouseDomEventDataArrMap */eventRecord[/* mouseDomEventDataArrMap */1],
    /* keyboardDomEventDataArrMap */eventRecord[/* keyboardDomEventDataArrMap */2],
    /* touchDomEventDataArrMap */eventRecord[/* touchDomEventDataArrMap */3],
    /* customGlobalEventArrMap */_removeFromEventArrMapByHandleFunc(eventName, handleFunc, eventRecord[/* customGlobalEventArrMap */4]),
    /* customGameObjectEventArrMap */eventRecord[/* customGameObjectEventArrMap */5],
    /* mouseEventData */eventRecord[/* mouseEventData */6],
    /* keyboardEventData */eventRecord[/* keyboardEventData */7],
    /* touchEventData */eventRecord[/* touchEventData */8]
  ];
  return newrecord;
}

var _removeFromEventListMapByEventName = MutableHashMapService$WonderCommonlib.deleteVal;

function unbindGlobalEventByEventName(eventName, state) {
  var eventRecord = state[/* eventRecord */43];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* eventRecord */43] = /* record */[
    /* domEventStreamSubscription */eventRecord[/* domEventStreamSubscription */0],
    /* mouseDomEventDataArrMap */eventRecord[/* mouseDomEventDataArrMap */1],
    /* keyboardDomEventDataArrMap */eventRecord[/* keyboardDomEventDataArrMap */2],
    /* touchDomEventDataArrMap */eventRecord[/* touchDomEventDataArrMap */3],
    /* customGlobalEventArrMap */_removeFromEventListMapByEventName(eventName, eventRecord[/* customGlobalEventArrMap */4]),
    /* customGameObjectEventArrMap */eventRecord[/* customGameObjectEventArrMap */5],
    /* mouseEventData */eventRecord[/* mouseEventData */6],
    /* keyboardEventData */eventRecord[/* keyboardEventData */7],
    /* touchEventData */eventRecord[/* touchEventData */8]
  ];
  return newrecord;
}

function bindGameObjectEvent(param, handleFunc, state) {
  var target = param[2];
  var eventName = param[0];
  var eventRecord = state[/* eventRecord */43];
  var customGameObjectEventArrMap = eventRecord[/* customGameObjectEventArrMap */5];
  var eventData_000 = /* priority */param[1];
  var eventData = /* record */[
    eventData_000,
    /* handleFunc */handleFunc
  ];
  var newrecord = Caml_array.caml_array_dup(state);
  var match = MutableHashMapService$WonderCommonlib.get(eventName, customGameObjectEventArrMap);
  var tmp;
  if (match !== undefined) {
    var targetEventArrMap = match;
    var match$1 = MutableSparseMapService$WonderCommonlib.get(target, targetEventArrMap);
    tmp = match$1 !== undefined ? MutableHashMapService$WonderCommonlib.set(eventName, MutableSparseMapService$WonderCommonlib.set(target, _addEventDataByPriority(eventData, match$1), targetEventArrMap), customGameObjectEventArrMap) : MutableHashMapService$WonderCommonlib.set(eventName, MutableSparseMapService$WonderCommonlib.set(target, /* array */[eventData], targetEventArrMap), customGameObjectEventArrMap);
  } else {
    tmp = MutableHashMapService$WonderCommonlib.set(eventName, MutableSparseMapService$WonderCommonlib.set(target, /* array */[eventData], MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)), customGameObjectEventArrMap);
  }
  newrecord[/* eventRecord */43] = /* record */[
    /* domEventStreamSubscription */eventRecord[/* domEventStreamSubscription */0],
    /* mouseDomEventDataArrMap */eventRecord[/* mouseDomEventDataArrMap */1],
    /* keyboardDomEventDataArrMap */eventRecord[/* keyboardDomEventDataArrMap */2],
    /* touchDomEventDataArrMap */eventRecord[/* touchDomEventDataArrMap */3],
    /* customGlobalEventArrMap */eventRecord[/* customGlobalEventArrMap */4],
    /* customGameObjectEventArrMap */tmp,
    /* mouseEventData */eventRecord[/* mouseEventData */6],
    /* keyboardEventData */eventRecord[/* keyboardEventData */7],
    /* touchEventData */eventRecord[/* touchEventData */8]
  ];
  return newrecord;
}

function unbindGameObjectEventByTarget(param, state) {
  var eventName = param[0];
  var eventRecord = state[/* eventRecord */43];
  var customGameObjectEventArrMap = eventRecord[/* customGameObjectEventArrMap */5];
  var newrecord = Caml_array.caml_array_dup(state);
  var match = MutableHashMapService$WonderCommonlib.get(eventName, customGameObjectEventArrMap);
  newrecord[/* eventRecord */43] = /* record */[
    /* domEventStreamSubscription */eventRecord[/* domEventStreamSubscription */0],
    /* mouseDomEventDataArrMap */eventRecord[/* mouseDomEventDataArrMap */1],
    /* keyboardDomEventDataArrMap */eventRecord[/* keyboardDomEventDataArrMap */2],
    /* touchDomEventDataArrMap */eventRecord[/* touchDomEventDataArrMap */3],
    /* customGlobalEventArrMap */eventRecord[/* customGlobalEventArrMap */4],
    /* customGameObjectEventArrMap */match !== undefined ? MutableHashMapService$WonderCommonlib.set(eventName, MutableSparseMapService$WonderCommonlib.deleteVal(param[1], match), customGameObjectEventArrMap) : customGameObjectEventArrMap,
    /* mouseEventData */eventRecord[/* mouseEventData */6],
    /* keyboardEventData */eventRecord[/* keyboardEventData */7],
    /* touchEventData */eventRecord[/* touchEventData */8]
  ];
  return newrecord;
}

function unbindGameObjectEventByHandleFunc(param, handleFunc, state) {
  var target = param[1];
  var eventName = param[0];
  var eventRecord = state[/* eventRecord */43];
  var customGameObjectEventArrMap = eventRecord[/* customGameObjectEventArrMap */5];
  var newrecord = Caml_array.caml_array_dup(state);
  var match = MutableHashMapService$WonderCommonlib.get(eventName, customGameObjectEventArrMap);
  var tmp;
  if (match !== undefined) {
    var targetEventArrMap = match;
    var match$1 = MutableSparseMapService$WonderCommonlib.get(target, targetEventArrMap);
    tmp = match$1 !== undefined ? MutableHashMapService$WonderCommonlib.set(eventName, MutableSparseMapService$WonderCommonlib.set(target, _removeFromEventArrByHandleFunc(match$1, handleFunc), targetEventArrMap), customGameObjectEventArrMap) : customGameObjectEventArrMap;
  } else {
    tmp = customGameObjectEventArrMap;
  }
  newrecord[/* eventRecord */43] = /* record */[
    /* domEventStreamSubscription */eventRecord[/* domEventStreamSubscription */0],
    /* mouseDomEventDataArrMap */eventRecord[/* mouseDomEventDataArrMap */1],
    /* keyboardDomEventDataArrMap */eventRecord[/* keyboardDomEventDataArrMap */2],
    /* touchDomEventDataArrMap */eventRecord[/* touchDomEventDataArrMap */3],
    /* customGlobalEventArrMap */eventRecord[/* customGlobalEventArrMap */4],
    /* customGameObjectEventArrMap */tmp,
    /* mouseEventData */eventRecord[/* mouseEventData */6],
    /* keyboardEventData */eventRecord[/* keyboardEventData */7],
    /* touchEventData */eventRecord[/* touchEventData */8]
  ];
  return newrecord;
}

export {
  _addEventDataByPriority ,
  _addToEventArr ,
  bindGlobalEvent ,
  _removeFromEventArrByHandleFunc ,
  _removeFromEventArrMapByHandleFunc ,
  unbindGlobalEventByHandleFunc ,
  _removeFromEventListMapByEventName ,
  unbindGlobalEventByEventName ,
  bindGameObjectEvent ,
  unbindGameObjectEventByTarget ,
  unbindGameObjectEventByHandleFunc ,
  
}
/* ArrayService-Wonderjs Not a pure module */
