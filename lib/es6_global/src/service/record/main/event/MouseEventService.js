


function getLastXY(param) {
  var mouseEventData = param[/* mouseEventData */6];
  return /* tuple */[
          mouseEventData[/* lastX */0],
          mouseEventData[/* lastY */1]
        ];
}

function setLastXY(lastX, lastY, eventRecord) {
  return /* record */[
          /* domEventStreamSubscription */eventRecord[/* domEventStreamSubscription */0],
          /* mouseDomEventDataArrMap */eventRecord[/* mouseDomEventDataArrMap */1],
          /* keyboardDomEventDataArrMap */eventRecord[/* keyboardDomEventDataArrMap */2],
          /* touchDomEventDataArrMap */eventRecord[/* touchDomEventDataArrMap */3],
          /* customGlobalEventArrMap */eventRecord[/* customGlobalEventArrMap */4],
          /* customGameObjectEventArrMap */eventRecord[/* customGameObjectEventArrMap */5],
          /* mouseEventData : record */[
            /* lastX */lastX,
            /* lastY */lastY,
            /* isDrag */eventRecord[/* mouseEventData */6][/* isDrag */2]
          ],
          /* keyboardEventData */eventRecord[/* keyboardEventData */7],
          /* touchEventData */eventRecord[/* touchEventData */8]
        ];
}

export {
  getLastXY ,
  setLastXY ,
  
}
/* No side effect */
