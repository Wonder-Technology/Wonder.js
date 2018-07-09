open StateDataMainType;

open BrowserDetectType;

open EventType;

let _getTouchData = touchDomEvent => {
  let changedTouches = touchDomEvent##changedTouches;
  let touchDataJsObj = Array.unsafe_get(changedTouches, 0);

  {
    clientX: touchDataJsObj##clientX,
    clientY: touchDataJsObj##clientY,
    pageX: touchDataJsObj##pageX,
    pageY: touchDataJsObj##pageY,
    identifier: touchDataJsObj##identifier,
    screenX: touchDataJsObj##screenX,
    screenY: touchDataJsObj##screenY,
    radiusX: touchDataJsObj##radiusX,
    radiusY: touchDataJsObj##radiusY,
    rotationAngle: touchDataJsObj##rotationAngle,
    force: touchDataJsObj##force,
  };
};

let _getLocation = (touchDomEvent, state) => {
  let {pageX, pageY} = _getTouchData(touchDomEvent);

  (pageX, pageY);
};

let _getLocationInView = (touchDomEvent, state) =>
  HandlePointDomEventMainService.getLocationInView(
    touchDomEvent,
    _getLocation,
    state,
  );

let _getMovementDelta = (touchDomEvent, {eventRecord} as state) =>
  HandlePointDomEventMainService.getMovementDelta(
    _getLocation(touchDomEvent, state),
    TouchEventService.getLastXY(eventRecord),
    state,
  );

let _convertTouchDomEventToTouchEvent =
    (eventName, touchDomEvent, state)
    : touchEvent => {
  name: eventName,
  location: _getLocation(touchDomEvent, state),
  locationInView: _getLocationInView(touchDomEvent, state),
  touchData: _getTouchData(touchDomEvent),
  movementDelta: _getMovementDelta(touchDomEvent, state),
  event: touchDomEvent,
};

let execEventHandle = (eventName, touchDomEvent, {eventRecord} as state) => {
  let {touchDomEventDataArrMap} = eventRecord;

  switch (
    touchDomEventDataArrMap
    |> WonderCommonlib.SparseMapService.get(eventName |> domEventNameToInt)
  ) {
  | None => state
  | Some(arr) =>
    arr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. state, {handleFunc}: touchDomEventData) =>
           handleFunc(.
             _convertTouchDomEventToTouchEvent(
               eventName,
               touchDomEvent,
               state,
             ),
             state,
           ),
         state,
       )
  };
};

let setLastXYWhenTouchMove =
    (eventName, touchDomEvent, {eventRecord} as state) => {
  let {location}: touchEvent =
    _convertTouchDomEventToTouchEvent(eventName, touchDomEvent, state);

  let (x, y) = location;

  {
    ...state,
    eventRecord: TouchEventService.setLastXY(Some(x), Some(y), eventRecord),
  };
};