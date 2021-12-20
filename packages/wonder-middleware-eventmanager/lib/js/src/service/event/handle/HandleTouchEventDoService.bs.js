'use strict';

var ArraySt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/ArraySt.bs.js");
var MutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var TouchEventDoService$WonderMiddlewareEventmanager = require("../TouchEventDoService.bs.js");
var HandlePointDomEventDoService$WonderMiddlewareEventmanager = require("./HandlePointDomEventDoService.bs.js");

function _getTouchData(touchDomEvent) {
  var changedTouches = touchDomEvent.changedTouches;
  var touchDataJsObj = changedTouches[0];
  return {
          clientX: touchDataJsObj.clientX,
          clientY: touchDataJsObj.clientY,
          pageX: touchDataJsObj.pageX,
          pageY: touchDataJsObj.pageY,
          identifier: touchDataJsObj.identifier,
          screenX: touchDataJsObj.screenX,
          screenY: touchDataJsObj.screenY,
          radiusX: touchDataJsObj.radiusX,
          radiusY: touchDataJsObj.radiusY,
          rotationAngle: touchDataJsObj.rotationAngle,
          force: touchDataJsObj.force
        };
}

function _getLocation(touchDomEvent, po) {
  var match = _getTouchData(touchDomEvent);
  return [
          match.pageX,
          match.pageY
        ];
}

function _getLocationInView(touchDomEvent, po) {
  return HandlePointDomEventDoService$WonderMiddlewareEventmanager.getLocationInView(touchDomEvent, _getLocation, po);
}

function _getMovementDelta(touchDomEvent, po) {
  return HandlePointDomEventDoService$WonderMiddlewareEventmanager.getMovementDelta(_getLocation(touchDomEvent, po), TouchEventDoService$WonderMiddlewareEventmanager.getLastXY(po.eventRecord), po);
}

function _convertTouchDomEventToTouchEvent(eventName, touchDomEvent, po) {
  return {
          name: eventName,
          location: _getLocation(touchDomEvent, po),
          locationInView: HandlePointDomEventDoService$WonderMiddlewareEventmanager.getLocationInView(touchDomEvent, _getLocation, po),
          touchData: _getTouchData(touchDomEvent),
          movementDelta: _getMovementDelta(touchDomEvent, po),
          event: touchDomEvent
        };
}

function execEventHandle(po, eventName, touchDomEvent) {
  var arr = MutableSparseMap$WonderCommonlib.get(po.eventRecord.touchDomEventDataArrMap, eventName);
  if (arr !== undefined) {
    return ArraySt$WonderCommonlib.reduceOneParam(arr, (function (po, param) {
                  return param.handleFunc(_convertTouchDomEventToTouchEvent(eventName, touchDomEvent, po), po);
                }), po);
  } else {
    return po;
  }
}

function setLastXY(po, lastX, lastY) {
  return {
          eventRecord: TouchEventDoService$WonderMiddlewareEventmanager.setLastXY(lastX, lastY, po.eventRecord),
          canvas: po.canvas,
          body: po.body,
          browser: po.browser
        };
}

function setLastXYByLocation(po, eventName, touchDomEvent) {
  var match = _convertTouchDomEventToTouchEvent(eventName, touchDomEvent, po);
  var $$location = match.location;
  return setLastXY(po, $$location[0], $$location[1]);
}

function getIsDrag(po) {
  return po.eventRecord.touchEventData.isDrag;
}

function setIsDrag(po, isDrag) {
  var eventRecord = po.eventRecord;
  var init = eventRecord.touchEventData;
  return {
          eventRecord: {
            domEventStreamSubscription: eventRecord.domEventStreamSubscription,
            mouseDomEventDataArrMap: eventRecord.mouseDomEventDataArrMap,
            keyboardDomEventDataArrMap: eventRecord.keyboardDomEventDataArrMap,
            touchDomEventDataArrMap: eventRecord.touchDomEventDataArrMap,
            customGlobalEventArrMap: eventRecord.customGlobalEventArrMap,
            customGameObjectEventArrMap: eventRecord.customGameObjectEventArrMap,
            mouseEventData: eventRecord.mouseEventData,
            keyboardEventData: eventRecord.keyboardEventData,
            touchEventData: {
              lastX: init.lastX,
              lastY: init.lastY,
              isDrag: isDrag
            }
          },
          canvas: po.canvas,
          body: po.body,
          browser: po.browser
        };
}

function setLastXYWhenTouchMove(po, eventName, touchDomEvent) {
  if (getIsDrag(po)) {
    return po;
  } else {
    return setLastXYByLocation(po, eventName, touchDomEvent);
  }
}

exports._getTouchData = _getTouchData;
exports._getLocation = _getLocation;
exports._getLocationInView = _getLocationInView;
exports._getMovementDelta = _getMovementDelta;
exports._convertTouchDomEventToTouchEvent = _convertTouchDomEventToTouchEvent;
exports.execEventHandle = execEventHandle;
exports.setLastXY = setLastXY;
exports.setLastXYByLocation = setLastXYByLocation;
exports.getIsDrag = getIsDrag;
exports.setIsDrag = setIsDrag;
exports.setLastXYWhenTouchMove = setLastXYWhenTouchMove;
/* No side effect */
