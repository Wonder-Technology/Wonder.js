open StateDataMainType;

let getLocationInView = (domEvent, getLocationFunc, {viewRecord} as state) =>
  switch (ViewService.getCanvas(viewRecord)) {
  | None => (0, 0)
  | Some(canvas) =>
    let (offsetX, offsetY) =
      ViewService.getOffset(ViewService.unsafeGetCanvas(viewRecord));

    let (x, y) = getLocationFunc(domEvent, state);

    (x - offsetX, y - offsetY);
  };

let getMovementDelta = (location, lastXYTuple, {eventRecord} as state) => {
  let (x, y) = location;

  switch (lastXYTuple) {
  | (None, None) => (0, 0)
  | (Some(lastX), Some(lastY)) => (x - lastX, y - lastY)
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getMovementDelta",
        ~description={j|lastX, lastY should all be None or all be Some|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };
};

let preventDefault = event =>
  HandleDomEventMainService.preventDefault(
    event |> EventType.pointDomEventToDomEvent,
  );