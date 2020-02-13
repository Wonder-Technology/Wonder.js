

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as MouseEventService$Wonderjs from "../../../../record/main/event/MouseEventService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as RecordBrowserDetectAllService$Wonderjs from "../../../../record/all/browserDetect/RecordBrowserDetectAllService.js";
import * as HandlePointDomEventMainService$Wonderjs from "./HandlePointDomEventMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function getLocation(mouseDomEvent, param) {
  var browser = param[/* browserDetectRecord */40][/* browser */0];
  if (browser >= 2) {
    return RecordBrowserDetectAllService$Wonderjs.fatalUnknownBrowser("getLocation", browser);
  } else {
    return /* tuple */[
            mouseDomEvent.pageX,
            mouseDomEvent.pageY
          ];
  }
}

function getLocationInView(mouseDomEvent, state) {
  return HandlePointDomEventMainService$Wonderjs.getLocationInView(mouseDomEvent, getLocation, state);
}

function getButton(mouseDomEvent, state) {
  var browser = state[/* browserDetectRecord */40][/* browser */0];
  if (browser >= 2) {
    return RecordBrowserDetectAllService$Wonderjs.fatalUnknownBrowser("getButton", browser);
  } else {
    var button = mouseDomEvent.which;
    switch (button) {
      case 0 : 
          return /* NoButton */0;
      case 1 : 
          return /* Left */1;
      case 2 : 
          return /* Center */3;
      case 3 : 
          return /* Right */2;
      default:
        return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getButton", "not support multi mouse button", "", "", "button: " + (String(button) + "")));
    }
  }
}

function _getFromWheelDelta(mouseDomEvent) {
  var match = mouseDomEvent.wheelDelta;
  if (match == null) {
    return 0;
  } else {
    return match / 120 | 0;
  }
}

function getWheel(mouseDomEvent) {
  var match = mouseDomEvent.detail;
  if (!(match == null) && match !== 0) {
    return Caml_int32.imul(-1, match);
  } else {
    return _getFromWheelDelta(mouseDomEvent);
  }
}

function _isPointerLocked (){
  return !!(
    document.pointerLockElement
    || document.mozPointerLockElement
    || document.webkitPointerLockElement
  );
    };

function _getMovementDeltaWhenPointerLocked(mouseDomEvent) {
  var match = mouseDomEvent.movementX;
  var tmp;
  if (match == null) {
    var match$1 = mouseDomEvent.webkitMovementX;
    if (match$1 == null) {
      var match$2 = mouseDomEvent.mozMovementX;
      tmp = (match$2 == null) ? 0 : match$2;
    } else {
      tmp = match$1;
    }
  } else {
    tmp = match;
  }
  var match$3 = mouseDomEvent.movementY;
  var tmp$1;
  if (match$3 == null) {
    var match$4 = mouseDomEvent.webkitMovementY;
    if (match$4 == null) {
      var match$5 = mouseDomEvent.mozMovementY;
      tmp$1 = (match$5 == null) ? 0 : match$5;
    } else {
      tmp$1 = match$4;
    }
  } else {
    tmp$1 = match$3;
  }
  return /* tuple */[
          tmp,
          tmp$1
        ];
}

function getMovementDelta(mouseDomEvent, state) {
  var match = _isPointerLocked();
  if (match) {
    return _getMovementDeltaWhenPointerLocked(mouseDomEvent);
  } else {
    return HandlePointDomEventMainService$Wonderjs.getMovementDelta(getLocation(mouseDomEvent, state), MouseEventService$Wonderjs.getLastXY(state[/* eventRecord */41]), state);
  }
}

function convertMouseDomEventToMouseEvent(eventName, mouseDomEvent, state) {
  return /* record */[
          /* name */eventName,
          /* location */getLocation(mouseDomEvent, state),
          /* locationInView */getLocationInView(mouseDomEvent, state),
          /* button */getButton(mouseDomEvent, state),
          /* wheel */getWheel(mouseDomEvent),
          /* movementDelta */getMovementDelta(mouseDomEvent, state),
          /* event */mouseDomEvent
        ];
}

function execEventHandle(mouseEvent, state) {
  var match = MutableSparseMapService$WonderCommonlib.get(mouseEvent[/* name */0], state[/* eventRecord */41][/* mouseDomEventDataArrMap */1]);
  if (match !== undefined) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (state, param) {
                  return param[/* handleFunc */1](mouseEvent, state);
                }), state, match);
  } else {
    return state;
  }
}

function setLastXY(lastX, lastY, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* eventRecord */41] = MouseEventService$Wonderjs.setLastXY(lastX, lastY, state[/* eventRecord */41]);
  return newrecord;
}

function setLastXYByLocation(mouseEvent, state) {
  var $$location = mouseEvent[/* location */1];
  return setLastXY($$location[0], $$location[1], state);
}

function getIsDrag(state) {
  return state[/* eventRecord */41][/* mouseEventData */6][/* isDrag */2];
}

function setIsDrag(isDrag, state) {
  var eventRecord = state[/* eventRecord */41];
  var newrecord = Caml_array.caml_array_dup(state);
  var init = eventRecord[/* mouseEventData */6];
  newrecord[/* eventRecord */41] = /* record */[
    /* domEventStreamSubscription */eventRecord[/* domEventStreamSubscription */0],
    /* mouseDomEventDataArrMap */eventRecord[/* mouseDomEventDataArrMap */1],
    /* keyboardDomEventDataArrMap */eventRecord[/* keyboardDomEventDataArrMap */2],
    /* touchDomEventDataArrMap */eventRecord[/* touchDomEventDataArrMap */3],
    /* customGlobalEventArrMap */eventRecord[/* customGlobalEventArrMap */4],
    /* customGameObjectEventArrMap */eventRecord[/* customGameObjectEventArrMap */5],
    /* mouseEventData : record */[
      /* lastX */init[/* lastX */0],
      /* lastY */init[/* lastY */1],
      /* isDrag */isDrag
    ],
    /* keyboardEventData */eventRecord[/* keyboardEventData */7],
    /* touchEventData */eventRecord[/* touchEventData */8]
  ];
  return newrecord;
}

function setLastXYWhenMouseMove(mouseEvent, state) {
  var match = getIsDrag(state);
  if (match) {
    return state;
  } else {
    return setLastXYByLocation(mouseEvent, state);
  }
}

export {
  getLocation ,
  getLocationInView ,
  getButton ,
  _getFromWheelDelta ,
  getWheel ,
  _isPointerLocked ,
  _getMovementDeltaWhenPointerLocked ,
  getMovementDelta ,
  convertMouseDomEventToMouseEvent ,
  execEventHandle ,
  setLastXY ,
  setLastXYByLocation ,
  getIsDrag ,
  setIsDrag ,
  setLastXYWhenMouseMove ,
  
}
/* Log-WonderLog Not a pure module */
