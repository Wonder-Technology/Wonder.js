open POType

let getLocationInView = (domEvent, getLocationFunc, po) =>
  switch CanvasDoService.getCanvas(po) {
  | None => (0, 0)
  | Some(canvas) =>
    let (offsetX, offsetY) = CanvasDoService.getOffset(canvas)

    let (x, y) = getLocationFunc(domEvent, po)

    (x - offsetX, y - offsetY)
  }

let getMovementDelta = (location, lastXYTuple, {eventRecord} as po) => {
  let (x, y) = location

  switch lastXYTuple {
  | (None, None) => (0, 0)
  | (Some(lastX), Some(lastY)) => (x - lastX, y - lastY)
  // | _ =>
  //   WonderLog.Log.fatal(
  //     WonderLog.Log.buildFatalMessage(
  //       ~title="getMovementDelta",
  //       ~description=j`lastX, lastY should all be None or all be Some`,
  //       ~reason="",
  //       ~solution=j``,
  //       ~params=j``,
  //     ),
  //   )
  }
}

let preventDefault = event =>
  HandleDomEventDoService.preventDefault(event->EventType.pointDomEventToDomEvent)
