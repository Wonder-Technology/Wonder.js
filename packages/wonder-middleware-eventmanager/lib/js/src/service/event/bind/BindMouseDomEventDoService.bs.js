'use strict';

var BindDomEventDoService$WonderMiddlewareEventmanager = require("./BindDomEventDoService.bs.js");

function _addToEventArr(eventName, eventData, eventArrMap) {
  return BindDomEventDoService$WonderMiddlewareEventmanager.addToEventArr(eventName, eventData, (function (param) {
                return param.priority;
              }), eventArrMap);
}

function _removeFromEventArrMapByHandleFunc(eventName, targetHandleFunc, eventArrMap) {
  return BindDomEventDoService$WonderMiddlewareEventmanager.removeFromEventArrMapByHandleFunc(eventName, [
              (function (param) {
                  return param.handleFunc;
                }),
              targetHandleFunc
            ], eventArrMap);
}

function bind(eventName, priority, handleFunc, po) {
  var eventRecord = po.eventRecord;
  return {
          eventRecord: {
            domEventStreamSubscription: eventRecord.domEventStreamSubscription,
            mouseDomEventDataArrMap: _addToEventArr(eventName, {
                  priority: priority,
                  handleFunc: handleFunc
                }, eventRecord.mouseDomEventDataArrMap),
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

function unbindByHandleFunc(eventName, handleFunc, po) {
  var eventRecord = po.eventRecord;
  return {
          eventRecord: {
            domEventStreamSubscription: eventRecord.domEventStreamSubscription,
            mouseDomEventDataArrMap: _removeFromEventArrMapByHandleFunc(eventName, handleFunc, eventRecord.mouseDomEventDataArrMap),
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

exports._addToEventArr = _addToEventArr;
exports._removeFromEventArrMapByHandleFunc = _removeFromEventArrMapByHandleFunc;
exports.bind = bind;
exports.unbindByHandleFunc = unbindByHandleFunc;
/* No side effect */
