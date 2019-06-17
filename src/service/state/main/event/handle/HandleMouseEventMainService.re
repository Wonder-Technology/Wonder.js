open StateDataMainType;

open BrowserDetectType;

open EventType;

let getLocation = (mouseDomEvent, {browserDetectRecord}) => {
  let {browser} = browserDetectRecord;

  switch (browser) {
  | Chrome
  | Firefox => (mouseDomEvent##pageX, mouseDomEvent##pageY)
  | _ =>
    RecordBrowserDetectAllService.fatalUnknownBrowser("getLocation", browser)
  };
};

let getLocationInView = (mouseDomEvent, {viewRecord} as state) =>
  HandlePointDomEventMainService.getLocationInView(
    mouseDomEvent,
    getLocation,
    state,
  );

let getButton = (mouseDomEvent, {browserDetectRecord} as state) => {
  let {browser} = browserDetectRecord;

  switch (browser) {
  | Chrome
  | Firefox =>
    switch (mouseDomEvent##which) {
    | 0 => NoButton
    | 1 => Left
    | 2 => Center
    | 3 => Right
    | button =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="getButton",
          ~description={j|not support multi mouse button|j},
          ~reason="",
          ~solution={j||j},
          ~params={j|button: $button|j},
        ),
      )
    }
  | _ =>
    RecordBrowserDetectAllService.fatalUnknownBrowser("getButton", browser)
  };
};

let _getFromWheelDelta = mouseDomEvent =>
  switch (Js.toOption(mouseDomEvent##wheelDelta)) {
  | Some(wheelData) => wheelData / 120
  | None => 0
  };

let getWheel = mouseDomEvent =>
  switch (Js.toOption(mouseDomEvent##detail)) {
  | Some(detail) when detail !== 0 => (-1) * detail
  | _ => _getFromWheelDelta(mouseDomEvent)
  };

let _isPointerLocked = [%raw
  () => {|
  return !!(
    document.pointerLockElement
    || document.mozPointerLockElement
    || document.webkitPointerLockElement
  );
    |}
];

let _getMovementDeltaWhenPointerLocked = mouseDomEvent => (
  switch (Js.toOption(mouseDomEvent##movementX)) {
  | Some(movementX) => movementX
  | None =>
    switch (Js.toOption(mouseDomEvent##webkitMovementX)) {
    | Some(webkitMovementX) => webkitMovementX
    | None =>
      switch (Js.toOption(mouseDomEvent##mozMovementX)) {
      | Some(mozMovementX) => mozMovementX
      | None => 0
      }
    }
  },
  switch (Js.toOption(mouseDomEvent##movementY)) {
  | Some(movementY) => movementY
  | None =>
    switch (Js.toOption(mouseDomEvent##webkitMovementY)) {
    | Some(webkitMovementY) => webkitMovementY
    | None =>
      switch (Js.toOption(mouseDomEvent##mozMovementY)) {
      | Some(mozMovementY) => mozMovementY
      | None => 0
      }
    }
  },
);

let getMovementDelta = (mouseDomEvent, {eventRecord} as state) =>
  _isPointerLocked(.) ?
    _getMovementDeltaWhenPointerLocked(mouseDomEvent) :
    HandlePointDomEventMainService.getMovementDelta(
      getLocation(mouseDomEvent, state),
      MouseEventService.getLastXY(eventRecord),
      state,
    );

let convertMouseDomEventToMouseEvent =
    (eventName, mouseDomEvent, state): mouseEvent => {
  name: eventName,
  location: getLocation(mouseDomEvent, state),
  locationInView: getLocationInView(mouseDomEvent, state),
  button: getButton(mouseDomEvent, state),
  wheel: getWheel(mouseDomEvent),
  movementDelta: getMovementDelta(mouseDomEvent, state),
  event: mouseDomEvent,
};

let execEventHandle =
    (({name}: mouseEvent) as mouseEvent, {eventRecord} as state) => {
  let {mouseDomEventDataArrMap} = eventRecord;

  switch (
    mouseDomEventDataArrMap
    |> WonderCommonlib.MutableSparseMapService.get(name |> domEventNameToInt)
  ) {
  | None => state
  | Some(arr) =>
    arr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. state, {handleFunc}: mouseDomEventData) =>
           handleFunc(.
             /* convertMouseDomEventToMouseEvent(
                  eventName,
                  mouseDomEvent,
                  state,
                ), */
             mouseEvent,
             state,
           ),
         state,
       )
  };
};

let setLastXY = (lastX, lastY, {eventRecord} as state) => {
  ...state,
  eventRecord: MouseEventService.setLastXY(lastX, lastY, eventRecord),
};

let setLastXYByLocation = (mouseEvent, {eventRecord} as state) => {
  let {location}: mouseEvent = mouseEvent;

  let (x, y) = location;

  setLastXY(Some(x), Some(y), state);
};

let getIsDrag = ({eventRecord} as state) =>
  eventRecord.mouseEventData.isDrag;

let setIsDrag = (isDrag, {eventRecord} as state) => {
  ...state,
  eventRecord: {
    ...eventRecord,
    mouseEventData: {
      ...eventRecord.mouseEventData,
      isDrag,
    },
  },
};

let setLastXYWhenMouseMove = (mouseEvent, state) =>
  getIsDrag(state) ? state : setLastXYByLocation(mouseEvent, state);