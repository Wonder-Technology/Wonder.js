

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as BindDomEventMainService$Wonderjs from "./BindDomEventMainService.js";

function _addToEventArr(eventName, eventData, eventArrMap) {
  return BindDomEventMainService$Wonderjs.addToEventArr(eventName, eventData, (function (param) {
                return param[/* priority */0];
              }), eventArrMap);
}

function _removeFromEventArrMapByHandleFunc(eventName, targetHandleFunc, eventArrMap) {
  return BindDomEventMainService$Wonderjs.removeFromEventArrMapByHandleFunc(eventName, /* tuple */[
              (function (param) {
                  return param[/* handleFunc */1];
                }),
              targetHandleFunc
            ], eventArrMap);
}

function bind(eventName, priority, handleFunc, state) {
  var eventRecord = state[/* eventRecord */43];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* eventRecord */43] = /* record */[
    /* domEventStreamSubscription */eventRecord[/* domEventStreamSubscription */0],
    /* mouseDomEventDataArrMap */eventRecord[/* mouseDomEventDataArrMap */1],
    /* keyboardDomEventDataArrMap */_addToEventArr(eventName, /* record */[
          /* priority */priority,
          /* handleFunc */handleFunc
        ], eventRecord[/* keyboardDomEventDataArrMap */2]),
    /* touchDomEventDataArrMap */eventRecord[/* touchDomEventDataArrMap */3],
    /* customGlobalEventArrMap */eventRecord[/* customGlobalEventArrMap */4],
    /* customGameObjectEventArrMap */eventRecord[/* customGameObjectEventArrMap */5],
    /* mouseEventData */eventRecord[/* mouseEventData */6],
    /* keyboardEventData */eventRecord[/* keyboardEventData */7],
    /* touchEventData */eventRecord[/* touchEventData */8]
  ];
  return newrecord;
}

function unbindByHandleFunc(eventName, handleFunc, state) {
  var eventRecord = state[/* eventRecord */43];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* eventRecord */43] = /* record */[
    /* domEventStreamSubscription */eventRecord[/* domEventStreamSubscription */0],
    /* mouseDomEventDataArrMap */eventRecord[/* mouseDomEventDataArrMap */1],
    /* keyboardDomEventDataArrMap */_removeFromEventArrMapByHandleFunc(eventName, handleFunc, eventRecord[/* keyboardDomEventDataArrMap */2]),
    /* touchDomEventDataArrMap */eventRecord[/* touchDomEventDataArrMap */3],
    /* customGlobalEventArrMap */eventRecord[/* customGlobalEventArrMap */4],
    /* customGameObjectEventArrMap */eventRecord[/* customGameObjectEventArrMap */5],
    /* mouseEventData */eventRecord[/* mouseEventData */6],
    /* keyboardEventData */eventRecord[/* keyboardEventData */7],
    /* touchEventData */eventRecord[/* touchEventData */8]
  ];
  return newrecord;
}

export {
  _addToEventArr ,
  _removeFromEventArrMapByHandleFunc ,
  bind ,
  unbindByHandleFunc ,
  
}
/* BindDomEventMainService-Wonderjs Not a pure module */
