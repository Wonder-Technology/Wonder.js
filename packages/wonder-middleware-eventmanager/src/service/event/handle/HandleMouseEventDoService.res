open POType

// open AllBrowserDetectType

open EventType

// let getLocation = (mouseDomEvent, {browserDetectRecord}) => {
let getLocation = (mouseDomEvent, po) => {
  // let {browser} = browserDetectRecord

  // switch browser {
  // | Chrome
  // | Firefox => (mouseDomEvent["pageX"], mouseDomEvent["pageY"])
  // | _ => RecordAllBrowserDetectService.fatalUnknownBrowser("getLocation", browser)
  // }
  (mouseDomEvent["pageX"], mouseDomEvent["pageY"])
}

let getLocationInView = (mouseDomEvent, po) =>
  HandlePointDomEventDoService.getLocationInView(mouseDomEvent, getLocation, po)

let getButton = (mouseDomEvent, po) => {
  // let {browser} = browserDetectRecord

  // switch browser {
  // | Chrome
  // | Firefox =>
  //   switch mouseDomEvent["which"] {
  //   | 0 => NoButton
  //   | 1 => Left
  //   | 2 => Center
  //   | 3 => Right
  //   // | button =>
  //   //   WonderLog.Log.fatal(
  //   //     WonderLog.Log.buildFatalMessage(
  //   //       ~title="getButton",
  //   //       ~description=j`not support multi mouse button`,
  //   //       ~reason="",
  //   //       ~solution=j``,
  //   //       ~params=j`button: $button`,
  //   //     ),
  //   //   )
  //   }
  // | _ => RecordAllBrowserDetectService.fatalUnknownBrowser("getButton", browser)
  // }

  switch mouseDomEvent["which"] {
  | 0 => NoButton
  | 1 => Left
  | 2 => Center
  | 3 => Right
  // | button =>
  //   WonderLog.Log.fatal(
  //     WonderLog.Log.buildFatalMessage(
  //       ~title="getButton",
  //       ~description=j`not support multi mouse button`,
  //       ~reason="",
  //       ~solution=j``,
  //       ~params=j`button: $button`,
  //     ),
  //   )
  }
}

let _getFromWheelDelta = mouseDomEvent =>
  switch Js.toOption(mouseDomEvent["wheelDelta"]) {
  | Some(wheelData) => wheelData / 120
  | None => 0
  }

let getWheel = mouseDomEvent =>
  switch Js.toOption(mouseDomEvent["detail"]) {
  | Some(detail) if detail !== 0 => -1 * detail
  | _ => _getFromWheelDelta(mouseDomEvent)
  }

let _isPointerLocked = %raw(`
  function() {
  return !!(
    document.pointerLockElement
    || document.mozPointerLockElement
    || document.webkitPointerLockElement
  );
  }
    `)

let _getMovementDeltaWhenPointerLocked = mouseDomEvent => (
  switch Js.toOption(mouseDomEvent["movementX"]) {
  | Some(movementX) => movementX
  | None =>
    switch Js.toOption(mouseDomEvent["webkitMovementX"]) {
    | Some(webkitMovementX) => webkitMovementX
    | None =>
      switch Js.toOption(mouseDomEvent["mozMovementX"]) {
      | Some(mozMovementX) => mozMovementX
      | None => 0
      }
    }
  },
  switch Js.toOption(mouseDomEvent["movementY"]) {
  | Some(movementY) => movementY
  | None =>
    switch Js.toOption(mouseDomEvent["webkitMovementY"]) {
    | Some(webkitMovementY) => webkitMovementY
    | None =>
      switch Js.toOption(mouseDomEvent["mozMovementY"]) {
      | Some(mozMovementY) => mozMovementY
      | None => 0
      }
    }
  },
)

let getMovementDelta = (mouseDomEvent, {eventRecord} as po) =>
  _isPointerLocked(.)
    ? _getMovementDeltaWhenPointerLocked(mouseDomEvent)
    : HandlePointDomEventDoService.getMovementDelta(
        getLocation(mouseDomEvent, po),
        MouseEventDoService.getLastXY(eventRecord),
        po,
      )

let convertMouseDomEventToMouseEvent = (eventName, mouseDomEvent, po): mouseEvent => {
  name: eventName,
  location: getLocation(mouseDomEvent, po),
  locationInView: getLocationInView(mouseDomEvent, po),
  button: getButton(mouseDomEvent, po),
  wheel: getWheel(mouseDomEvent),
  movementDelta: getMovementDelta(mouseDomEvent, po),
  event: mouseDomEvent,
}

let execEventHandle = ({eventRecord} as po, mouseEvent: mouseEvent) => {
  let {name} = mouseEvent

  let {mouseDomEventDataArrMap} = eventRecord

  switch mouseDomEventDataArrMap->WonderCommonlib.MutableSparseMap.get(name->domEventNameToInt) {
  | None => po
  | Some(arr) => arr->WonderCommonlib.ArraySt.reduceOneParam((. po, {handleFunc}: mouseDomEventData) =>
      handleFunc(.
        /* convertMouseDomEventToMouseEvent(
                  eventName,
                  mouseDomEvent,
                  po,
                ), */
        mouseEvent,
        po,
      )
    , po)
  }
}

let setLastXY = ({eventRecord} as po, lastX, lastY) => {
  ...po,
  eventRecord: MouseEventDoService.setLastXY(lastX, lastY, eventRecord),
}

let setLastXYByLocation = ({eventRecord} as po, mouseEvent) => {
  let {location}: mouseEvent = mouseEvent

  let (x, y) = location

  setLastXY(po, Some(x), Some(y))
}

let getIsDrag = ({eventRecord} as po) => eventRecord.mouseEventData.isDrag

let setIsDrag = ({eventRecord} as po, isDrag) => {
  ...po,
  eventRecord: {
    ...eventRecord,
    mouseEventData: {
      ...eventRecord.mouseEventData,
      isDrag: isDrag,
    },
  },
}

let setLastXYWhenMouseMove = (po, mouseEvent) =>
  getIsDrag(po) ? po : setLastXYByLocation(po, mouseEvent)
