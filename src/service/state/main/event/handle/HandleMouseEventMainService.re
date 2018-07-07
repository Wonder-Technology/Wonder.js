open StateDataMainType;

open BrowserDetectType;

open EventType;

let _getLocation = (mouseDomEvent, {browserDetectRecord}) => {
  let {browser} = browserDetectRecord;

  switch (browser) {
  | Chrome
  | Firefox => (mouseDomEvent##pageX, mouseDomEvent##pageY)
  | _ =>
    RecordBrowserDetectAllService.fatalUnknownBrowser("_getLocation", browser)
  };
};

let _getLocationInView = (mouseDomEvent, {viewRecord} as state) => {
  let (offsetX, offsetY) =
    ViewService.getOffset(ViewService.getCanvas(viewRecord));

  let (x, y) = _getLocation(mouseDomEvent, state);

  (x - offsetX, y - offsetY);
};

let _getButton = (mouseDomEvent, {browserDetectRecord} as state) => {
  let {browser} = browserDetectRecord;

  switch (browser) {
  | Chrome
  | Firefox =>
    switch (mouseDomEvent##button) {
    | 0 => Left
    | 1 => Right
    | 2 => Center
    | button =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="_getButton",
          ~description={j|not support multi mouse button|j},
          ~reason="",
          ~solution={j||j},
          ~params={j|button: $button|j},
        ),
      )
    }
  | _ =>
    RecordBrowserDetectAllService.fatalUnknownBrowser("_getButton", browser)
  };
};

let _getWheel = (mouseDomEvent, state) =>
  switch (Js.toOption(mouseDomEvent##detail)) {
  | Some(detail) => (-1) * detail
  | None =>
    switch (Js.toOption(mouseDomEvent##wheelDelta)) {
    | Some(wheelData) => wheelData / 120
    | None => 0
    }
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

let _getMovementDelta = (mouseDomEvent, {eventRecord} as state) =>
  _isPointerLocked(.) ?
    (
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
    ) :
    {
      let (x, y) = _getLocation(mouseDomEvent, state);

      switch (MouseEventService.getLastXY(eventRecord)) {
      | (None, None) => (0, 0)
      | (Some(lastX), Some(lastY)) => (x - lastX, y - lastY)
      | _ =>
        WonderLog.Log.fatal(
          WonderLog.Log.buildFatalMessage(
            ~title="_getMovementDelta",
            ~description={j|lastX, lastY should all be None or all be Some|j},
            ~reason="",
            ~solution={j||j},
            ~params={j||j},
          ),
        )
      };
    };

let _convertMouseDomEventToMouseEvent =
    (eventName, mouseDomEvent, state)
    : mouseEvent => {
  name: eventName,
  location: _getLocation(mouseDomEvent, state),
  locationInView: _getLocationInView(mouseDomEvent, state),
  button: _getButton(mouseDomEvent, state),
  wheel: _getWheel(mouseDomEvent, state),
  movementDelta: _getMovementDelta(mouseDomEvent, state),
  /* type_: Mouse, */
};

let execEventHandle = (eventName, mouseDomEvent, {eventRecord} as state) => {
  let {mouseDomEventDataArrMap} = eventRecord;

  switch (
    mouseDomEventDataArrMap
    |> WonderCommonlib.SparseMapService.get(eventName |> domEventNameToInt)
  ) {
  | None => state
  | Some(arr) =>
    arr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. state, {handleFunc}: mouseDomEventData) =>
           handleFunc(.
             _convertMouseDomEventToMouseEvent(
               eventName,
               mouseDomEvent,
               state,
             ),
             state,
           ),
         state,
       )
  };
};

let setLastXYWhenMouseMove =
    (eventName, mouseDomEvent, {eventRecord} as state) => {
  let {location}: mouseEvent =
    _convertMouseDomEventToMouseEvent(eventName, mouseDomEvent, state);

  let (x, y) = location;

  {
    ...state,
    eventRecord: MouseEventService.setLastXY(Some(x), Some(y), eventRecord),
  };
};