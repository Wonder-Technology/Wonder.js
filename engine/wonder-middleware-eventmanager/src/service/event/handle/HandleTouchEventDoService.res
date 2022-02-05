open POType

open EventType

let _getTouchData = touchDomEvent => {
  let changedTouches = touchDomEvent["changedTouches"]
  let touchDataJsObj = Array.unsafe_get(changedTouches, 0)

  {
    clientX: touchDataJsObj["clientX"],
    clientY: touchDataJsObj["clientY"],
    pageX: touchDataJsObj["pageX"],
    pageY: touchDataJsObj["pageY"],
    identifier: touchDataJsObj["identifier"],
    screenX: touchDataJsObj["screenX"],
    screenY: touchDataJsObj["screenY"],
    radiusX: touchDataJsObj["radiusX"],
    radiusY: touchDataJsObj["radiusY"],
    rotationAngle: touchDataJsObj["rotationAngle"],
    force: touchDataJsObj["force"],
  }
}

let _getLocation = (touchDomEvent, po) => {
  let {pageX, pageY} = _getTouchData(touchDomEvent)

  (pageX, pageY)
}

let _getLocationInView = (touchDomEvent, po) =>
  HandlePointDomEventDoService.getLocationInView(touchDomEvent, _getLocation, po)

let _getMovementDelta = (touchDomEvent, {eventRecord} as po) =>
  HandlePointDomEventDoService.getMovementDelta(
    _getLocation(touchDomEvent, po),
    TouchEventDoService.getLastXY(eventRecord),
    po,
  )

let _convertTouchDomEventToTouchEvent = (eventName, touchDomEvent, po): touchEvent => {
  name: eventName,
  location: _getLocation(touchDomEvent, po),
  locationInView: _getLocationInView(touchDomEvent, po),
  touchData: _getTouchData(touchDomEvent),
  movementDelta: _getMovementDelta(touchDomEvent, po),
  event: touchDomEvent,
}

let execEventHandle = ({eventRecord} as po, eventName, touchDomEvent) => {
  let {touchDomEventDataArrMap} = eventRecord

  /* HandlePointDomEventDoService.preventDefault(
    touchDomEvent -> touchDomEventToPointDomEvent,
  ); */

  switch touchDomEventDataArrMap->WonderCommonlib.MutableSparseMap.get(eventName->domEventNameToInt) {
  | None => po
  | Some(arr) =>
    arr->WonderCommonlib.ArraySt.reduceOneParam(
      (. po, {handleFunc}: touchDomEventData) =>
        handleFunc(. _convertTouchDomEventToTouchEvent(eventName, touchDomEvent, po), po),
      po,
    )
  }
}

let setLastXY = ({eventRecord} as po, lastX, lastY) => {
  ...po,
  eventRecord: TouchEventDoService.setLastXY(lastX, lastY, eventRecord),
}

let setLastXYByLocation = ({eventRecord} as po, eventName, touchDomEvent) => {
  let {location}: touchEvent = _convertTouchDomEventToTouchEvent(eventName, touchDomEvent, po)

  let (x, y) = location

  setLastXY(po, Some(x), Some(y))
}

let getIsDrag = ({eventRecord} as po) => eventRecord.touchEventData.isDrag

let setIsDrag = ({eventRecord} as po, isDrag) => {
  ...po,
  eventRecord: {
    ...eventRecord,
    touchEventData: {
      ...eventRecord.touchEventData,
      isDrag: isDrag,
    },
  },
}

let setLastXYWhenTouchMove = (po, eventName, touchDomEvent) =>
  getIsDrag(po) ? po : setLastXYByLocation(po, eventName, touchDomEvent)
