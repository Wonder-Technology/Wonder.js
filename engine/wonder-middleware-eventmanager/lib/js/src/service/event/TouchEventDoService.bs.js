'use strict';


function getLastXY(param) {
  var touchEventData = param.touchEventData;
  return [
          touchEventData.lastX,
          touchEventData.lastY
        ];
}

function setLastXY(lastX, lastY, eventRecord) {
  return {
          domEventStreamSubscription: eventRecord.domEventStreamSubscription,
          mouseDomEventDataArrMap: eventRecord.mouseDomEventDataArrMap,
          keyboardDomEventDataArrMap: eventRecord.keyboardDomEventDataArrMap,
          touchDomEventDataArrMap: eventRecord.touchDomEventDataArrMap,
          customGlobalEventArrMap: eventRecord.customGlobalEventArrMap,
          customGameObjectEventArrMap: eventRecord.customGameObjectEventArrMap,
          mouseEventData: eventRecord.mouseEventData,
          keyboardEventData: eventRecord.keyboardEventData,
          touchEventData: {
            lastX: lastX,
            lastY: lastY,
            isDrag: eventRecord.touchEventData.isDrag
          }
        };
}

exports.getLastXY = getLastXY;
exports.setLastXY = setLastXY;
/* No side effect */
