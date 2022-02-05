'use strict';


function getLastXY(param) {
  var mouseEventData = param.mouseEventData;
  return [
          mouseEventData.lastX,
          mouseEventData.lastY
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
          mouseEventData: {
            lastX: lastX,
            lastY: lastY,
            isDrag: eventRecord.mouseEventData.isDrag
          },
          keyboardEventData: eventRecord.keyboardEventData,
          touchEventData: eventRecord.touchEventData
        };
}

exports.getLastXY = getLastXY;
exports.setLastXY = setLastXY;
/* No side effect */
