open StateDataMainType;

open AllBrowserDetectType;

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

  /* HandlePointDomEventMainService.preventDefault(
    touchDomEvent |> touchDomEventToPointDomEvent,
  ); */

  switch (
    touchDomEventDataArrMap
    |> WonderCommonlib.MutableSparseMapService.get(eventName |> domEventNameToInt)
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

let setLastXY = (lastX, lastY, {eventRecord} as state) => {
  ...state,
  eventRecord: TouchEventService.setLastXY(lastX, lastY, eventRecord),
};

let setLastXYByLocation = (eventName, touchDomEvent, {eventRecord} as state) => {
  let {location}: touchEvent =
    _convertTouchDomEventToTouchEvent(eventName, touchDomEvent, state);

  let (x, y) = location;

  setLastXY(Some(x), Some(y), state);
};

let getIsDrag = ({eventRecord} as state) =>
  eventRecord.touchEventData.isDrag;

let setIsDrag = (isDrag, {eventRecord} as state) => {
  ...state,
  eventRecord: {
    ...eventRecord,
    touchEventData: {
      ...eventRecord.touchEventData,
      isDrag,
    },
  },
};

let setLastXYWhenTouchMove = (eventName, touchDomEvent, state) =>
  getIsDrag(state) ?
    state : setLastXYByLocation(eventName, touchDomEvent, state);