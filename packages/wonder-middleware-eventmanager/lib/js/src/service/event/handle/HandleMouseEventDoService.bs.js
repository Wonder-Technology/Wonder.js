'use strict';

var ArraySt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/ArraySt.bs.js");
var MutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var MouseEventDoService$WonderMiddlewareEventmanager = require("../MouseEventDoService.bs.js");
var HandlePointDomEventDoService$WonderMiddlewareEventmanager = require("./HandlePointDomEventDoService.bs.js");

function getLocation(mouseDomEvent, po) {
  return [
          mouseDomEvent.pageX,
          mouseDomEvent.pageY
        ];
}

function getLocationInView(mouseDomEvent, po) {
  return HandlePointDomEventDoService$WonderMiddlewareEventmanager.getLocationInView(mouseDomEvent, getLocation, po);
}

function getButton(mouseDomEvent, po) {
  var match = mouseDomEvent.which;
  switch (match) {
    case 0 :
        return /* NoButton */0;
    case 1 :
        return /* Left */1;
    case 2 :
        return /* Center */3;
    case 3 :
        return /* Right */2;
    default:
      throw {
            RE_EXN_ID: "Match_failure",
            _1: [
              "HandleMouseEventDoService.res",
              47,
              2
            ],
            Error: new Error()
          };
  }
}

function _getFromWheelDelta(mouseDomEvent) {
  var wheelData = mouseDomEvent.wheelDelta;
  if (!(wheelData == null)) {
    return wheelData / 120 | 0;
  } else {
    return 0;
  }
}

function getWheel(mouseDomEvent) {
  var detail = mouseDomEvent.detail;
  if (!(detail == null) && detail !== 0) {
    return Math.imul(-1, detail);
  } else {
    return _getFromWheelDelta(mouseDomEvent);
  }
}

var _isPointerLocked = (function() {
  return !!(
    document.pointerLockElement
    || document.mozPointerLockElement
    || document.webkitPointerLockElement
  );
  });

function _getMovementDeltaWhenPointerLocked(mouseDomEvent) {
  var movementX = mouseDomEvent.movementX;
  var tmp;
  if (movementX == null) {
    var webkitMovementX = mouseDomEvent.webkitMovementX;
    if (webkitMovementX == null) {
      var mozMovementX = mouseDomEvent.mozMovementX;
      tmp = (mozMovementX == null) ? 0 : mozMovementX;
    } else {
      tmp = webkitMovementX;
    }
  } else {
    tmp = movementX;
  }
  var movementY = mouseDomEvent.movementY;
  var tmp$1;
  if (movementY == null) {
    var webkitMovementY = mouseDomEvent.webkitMovementY;
    if (webkitMovementY == null) {
      var mozMovementY = mouseDomEvent.mozMovementY;
      tmp$1 = (mozMovementY == null) ? 0 : mozMovementY;
    } else {
      tmp$1 = webkitMovementY;
    }
  } else {
    tmp$1 = movementY;
  }
  return [
          tmp,
          tmp$1
        ];
}

function getMovementDelta(mouseDomEvent, po) {
  if (_isPointerLocked()) {
    return _getMovementDeltaWhenPointerLocked(mouseDomEvent);
  } else {
    return HandlePointDomEventDoService$WonderMiddlewareEventmanager.getMovementDelta(getLocation(mouseDomEvent, po), MouseEventDoService$WonderMiddlewareEventmanager.getLastXY(po.eventRecord), po);
  }
}

function convertMouseDomEventToMouseEvent(eventName, mouseDomEvent, po) {
  return {
          name: eventName,
          location: getLocation(mouseDomEvent, po),
          locationInView: HandlePointDomEventDoService$WonderMiddlewareEventmanager.getLocationInView(mouseDomEvent, getLocation, po),
          button: getButton(mouseDomEvent, po),
          wheel: getWheel(mouseDomEvent),
          movementDelta: getMovementDelta(mouseDomEvent, po),
          event: mouseDomEvent
        };
}

function execEventHandle(po, mouseEvent) {
  var arr = MutableSparseMap$WonderCommonlib.get(po.eventRecord.mouseDomEventDataArrMap, mouseEvent.name);
  if (arr !== undefined) {
    return ArraySt$WonderCommonlib.reduceOneParam(arr, (function (po, param) {
                  return param.handleFunc(mouseEvent, po);
                }), po);
  } else {
    return po;
  }
}

function setLastXY(po, lastX, lastY) {
  return {
          eventRecord: MouseEventDoService$WonderMiddlewareEventmanager.setLastXY(lastX, lastY, po.eventRecord),
          canvas: po.canvas,
          body: po.body,
          browser: po.browser
        };
}

function setLastXYByLocation(po, mouseEvent) {
  var $$location = mouseEvent.location;
  return setLastXY(po, $$location[0], $$location[1]);
}

function getIsDrag(po) {
  return po.eventRecord.mouseEventData.isDrag;
}

function setIsDrag(po, isDrag) {
  var eventRecord = po.eventRecord;
  var init = eventRecord.mouseEventData;
  return {
          eventRecord: {
            domEventStreamSubscription: eventRecord.domEventStreamSubscription,
            mouseDomEventDataArrMap: eventRecord.mouseDomEventDataArrMap,
            keyboardDomEventDataArrMap: eventRecord.keyboardDomEventDataArrMap,
            touchDomEventDataArrMap: eventRecord.touchDomEventDataArrMap,
            customGlobalEventArrMap: eventRecord.customGlobalEventArrMap,
            customGameObjectEventArrMap: eventRecord.customGameObjectEventArrMap,
            mouseEventData: {
              lastX: init.lastX,
              lastY: init.lastY,
              isDrag: isDrag
            },
            keyboardEventData: eventRecord.keyboardEventData,
            touchEventData: eventRecord.touchEventData
          },
          canvas: po.canvas,
          body: po.body,
          browser: po.browser
        };
}

function setLastXYWhenMouseMove(po, mouseEvent) {
  if (getIsDrag(po)) {
    return po;
  } else {
    return setLastXYByLocation(po, mouseEvent);
  }
}

exports.getLocation = getLocation;
exports.getLocationInView = getLocationInView;
exports.getButton = getButton;
exports._getFromWheelDelta = _getFromWheelDelta;
exports.getWheel = getWheel;
exports._isPointerLocked = _isPointerLocked;
exports._getMovementDeltaWhenPointerLocked = _getMovementDeltaWhenPointerLocked;
exports.getMovementDelta = getMovementDelta;
exports.convertMouseDomEventToMouseEvent = convertMouseDomEventToMouseEvent;
exports.execEventHandle = execEventHandle;
exports.setLastXY = setLastXY;
exports.setLastXYByLocation = setLastXYByLocation;
exports.getIsDrag = getIsDrag;
exports.setIsDrag = setIsDrag;
exports.setLastXYWhenMouseMove = setLastXYWhenMouseMove;
/* No side effect */
