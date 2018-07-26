


function getLastXY(param) {
  var touchEventData = param[/* touchEventData */8];
  return /* tuple */[
          touchEventData[/* lastX */0],
          touchEventData[/* lastY */1]
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
          /* mouseEventData */eventRecord[/* mouseEventData */6],
          /* keyboardEventData */eventRecord[/* keyboardEventData */7],
          /* touchEventData : record */[
            /* lastX */lastX,
            /* lastY */lastY,
            /* isDrag */eventRecord[/* touchEventData */8][/* isDrag */2]
          ]
        ];
}

export {
  getLastXY ,
  setLastXY ,
  
}
/* No side effect */
