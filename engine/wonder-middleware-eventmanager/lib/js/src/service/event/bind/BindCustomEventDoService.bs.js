'use strict';

var ArraySt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/ArraySt.bs.js");
var MutableHashMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/hash_map/MutableHashMap.bs.js");

function _addEventDataByPriority(eventData, arr) {
  var __x = ArraySt$WonderCommonlib.push(arr, eventData);
  return __x.sort(function (eventDataA, eventDataB) {
              return eventDataB.priority - eventDataA.priority | 0;
            });
}

function _addToEventArr(eventName, eventData, eventArrMap) {
  var arr = MutableHashMap$WonderCommonlib.get(eventArrMap, eventName);
  if (arr !== undefined) {
    return MutableHashMap$WonderCommonlib.set(eventArrMap, eventName, _addEventDataByPriority(eventData, arr));
  } else {
    return MutableHashMap$WonderCommonlib.set(eventArrMap, eventName, [eventData]);
  }
}

function bindGlobalEvent(eventName, priority, handleFunc, po) {
  var eventRecord = po.eventRecord;
  return {
          eventRecord: {
            domEventStreamSubscription: eventRecord.domEventStreamSubscription,
            mouseDomEventDataArrMap: eventRecord.mouseDomEventDataArrMap,
            keyboardDomEventDataArrMap: eventRecord.keyboardDomEventDataArrMap,
            touchDomEventDataArrMap: eventRecord.touchDomEventDataArrMap,
            customGlobalEventArrMap: _addToEventArr(eventName, {
                  priority: priority,
                  handleFunc: handleFunc
                }, eventRecord.customGlobalEventArrMap),
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

function _removeFromEventArrByHandleFunc(arr, targetHandleFunc) {
  return arr.filter(function (param) {
              return param.handleFunc !== targetHandleFunc;
            });
}

function _removeFromEventArrMapByHandleFunc(eventName, handleFunc, eventArrMap) {
  var arr = MutableHashMap$WonderCommonlib.get(eventArrMap, eventName);
  if (arr !== undefined) {
    return MutableHashMap$WonderCommonlib.set(eventArrMap, eventName, _removeFromEventArrByHandleFunc(arr, handleFunc));
  } else {
    return eventArrMap;
  }
}

function unbindGlobalEventByHandleFunc(eventName, handleFunc, po) {
  var eventRecord = po.eventRecord;
  return {
          eventRecord: {
            domEventStreamSubscription: eventRecord.domEventStreamSubscription,
            mouseDomEventDataArrMap: eventRecord.mouseDomEventDataArrMap,
            keyboardDomEventDataArrMap: eventRecord.keyboardDomEventDataArrMap,
            touchDomEventDataArrMap: eventRecord.touchDomEventDataArrMap,
            customGlobalEventArrMap: _removeFromEventArrMapByHandleFunc(eventName, handleFunc, eventRecord.customGlobalEventArrMap),
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

function _removeFromEventListMapByEventName(eventName, eventArrMap) {
  return MutableHashMap$WonderCommonlib.deleteVal(eventArrMap, eventName);
}

function unbindGlobalEventByEventName(eventName, po) {
  var eventRecord = po.eventRecord;
  return {
          eventRecord: {
            domEventStreamSubscription: eventRecord.domEventStreamSubscription,
            mouseDomEventDataArrMap: eventRecord.mouseDomEventDataArrMap,
            keyboardDomEventDataArrMap: eventRecord.keyboardDomEventDataArrMap,
            touchDomEventDataArrMap: eventRecord.touchDomEventDataArrMap,
            customGlobalEventArrMap: MutableHashMap$WonderCommonlib.deleteVal(eventRecord.customGlobalEventArrMap, eventName),
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

exports._addEventDataByPriority = _addEventDataByPriority;
exports._addToEventArr = _addToEventArr;
exports.bindGlobalEvent = bindGlobalEvent;
exports._removeFromEventArrByHandleFunc = _removeFromEventArrByHandleFunc;
exports._removeFromEventArrMapByHandleFunc = _removeFromEventArrMapByHandleFunc;
exports.unbindGlobalEventByHandleFunc = unbindGlobalEventByHandleFunc;
exports._removeFromEventListMapByEventName = _removeFromEventListMapByEventName;
exports.unbindGlobalEventByEventName = unbindGlobalEventByEventName;
/* No side effect */
