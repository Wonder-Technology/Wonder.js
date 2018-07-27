open StateDataMainType;

open EventType;

let _fromDomEvent = (eventName, state) =>
  WonderBsMost.Most.fromEvent(
    eventName,
    ViewService.unsafeGetCanvas(state.viewRecord) |> canvasToEventTarget,
    false,
  );

let _convertMouseEventToPointEvent =
    (
      eventName,
      {location, locationInView, button, wheel, movementDelta, event}: mouseEvent,
    ) => {
  name: eventName,
  location,
  locationInView,
  button: Some(button),
  wheel: Some(wheel),
  movementDelta,
  event: event |> mouseDomEventToPointDomEvent,
};

let _bindDomEventToTriggerPointEvent =
    (
      (domEventName, customEventName, pointEventName),
      (onDomEventFunc, convertDomEventToPointEventFunc),
      state,
    ) =>
  onDomEventFunc(
    ~eventName=domEventName,
    ~handleFunc=
      (. mouseEvent, state) => {
        let (state, _) =
          ManageEventMainService.triggerCustomGlobalEvent(
            CreateCustomEventMainService.create(
              customEventName,
              convertDomEventToPointEventFunc(pointEventName, mouseEvent)
              |> pointEventToUserData
              |. Some,
            ),
            state,
          );

        state;
      },
    ~state,
    (),
  );

let _bindMouseEventToTriggerPointEvent =
    (mouseEventName, customEventName, pointEventName, state) =>
  _bindDomEventToTriggerPointEvent(
    (mouseEventName, customEventName, pointEventName),
    (
      ManageEventMainService.onMouseEvent(~priority=0),
      _convertMouseEventToPointEvent,
    ),
    state,
  );

let _convertTouchEventToPointEvent =
    (
      eventName,
      {location, locationInView, touchData, movementDelta, event}: touchEvent,
    ) => {
  name: eventName,
  location,
  locationInView,
  button: None,
  wheel: None,
  movementDelta,
  event: event |> touchDomEventToPointDomEvent,
};

let _bindTouchEventToTriggerPointEvent =
    (touchEventName, customEventName, pointEventName, state) =>
  _bindDomEventToTriggerPointEvent(
    (touchEventName, customEventName, pointEventName),
    (
      ManageEventMainService.onTouchEvent(~priority=0),
      _convertTouchEventToPointEvent,
    ),
    state,
  );

let bindDomEventToTriggerPointEvent = ({browserDetectRecord} as state) =>
  switch (browserDetectRecord.browser) {
  | Chrome
  | Firefox =>
    state
    |> _bindMouseEventToTriggerPointEvent(
         Click,
         NameEventService.getPointTapEventName(),
         PointTap,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseUp,
         NameEventService.getPointUpEventName(),
         PointUp,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseDown,
         NameEventService.getPointDownEventName(),
         PointDown,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseWheel,
         NameEventService.getPointScaleEventName(),
         PointScale,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseMove,
         NameEventService.getPointMoveEventName(),
         PointMove,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseDrag,
         NameEventService.getPointDragEventName(),
         PointDrag,
       )
  | Android
  | IOS =>
    state
    |> _bindTouchEventToTriggerPointEvent(
         TouchTap,
         NameEventService.getPointTapEventName(),
         PointTap,
       )
    |> _bindTouchEventToTriggerPointEvent(
         TouchEnd,
         NameEventService.getPointUpEventName(),
         PointUp,
       )
    |> _bindTouchEventToTriggerPointEvent(
         TouchStart,
         NameEventService.getPointDownEventName(),
         PointDown,
       )
    |> _bindTouchEventToTriggerPointEvent(
         TouchMove,
         NameEventService.getPointMoveEventName(),
         PointMove,
       )
    |> _bindTouchEventToTriggerPointEvent(
         TouchDrag,
         NameEventService.getPointDragEventName(),
         PointDrag,
       )
  | browser =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="bindDomEventToTriggerPointEvent",
        ~description={j|unknown browser|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|browser:$browser|j},
      ),
    )
  };

let _execMouseEventHandle = (mouseEventName, event) => {
  StateDataMainService.unsafeGetState(StateDataMain.stateData)
  |> HandleMouseEventMainService.execEventHandle(
       mouseEventName,
       event |> eventTargetToMouseDomEvent,
     )
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let _execMouseMoveEventHandle = (mouseEventName, event) => {
  StateDataMainService.unsafeGetState(StateDataMain.stateData)
  |> HandleMouseEventMainService.execEventHandle(
       mouseEventName,
       event |> eventTargetToMouseDomEvent,
     )
  |> HandleMouseEventMainService.setLastXYWhenMouseMove(
       mouseEventName,
       event |> eventTargetToMouseDomEvent,
     )
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let _execMouseDragingEventHandle = (mouseEventName, event) => {
  StateDataMainService.unsafeGetState(StateDataMain.stateData)
  |> HandleMouseEventMainService.execEventHandle(
       mouseEventName,
       event |> eventTargetToMouseDomEvent,
     )
  |> HandleMouseEventMainService.setLastXYByLocation(
       mouseEventName,
       event |> eventTargetToMouseDomEvent,
     )
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let _execMouseDragStartEventHandle = () => {
  StateDataMainService.unsafeGetState(StateDataMain.stateData)
  |> HandleMouseEventMainService.setIsDrag(true)
  |> HandleMouseEventMainService.setLastXY(None, None)
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let _execMouseDragEndEventHandle = () => {
  StateDataMainService.unsafeGetState(StateDataMain.stateData)
  |> HandleMouseEventMainService.setIsDrag(false)
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let _execTouchEventHandle = (touchEventName, event) => {
  StateDataMainService.unsafeGetState(StateDataMain.stateData)
  |> HandleTouchEventMainService.execEventHandle(
       touchEventName,
       event |> eventTargetToTouchDomEvent,
     )
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let _execTouchMoveEventHandle = (touchEventName, event) => {
  StateDataMainService.unsafeGetState(StateDataMain.stateData)
  |> HandleTouchEventMainService.execEventHandle(
       touchEventName,
       event |> eventTargetToTouchDomEvent,
     )
  |> HandleTouchEventMainService.setLastXYWhenTouchMove(
       touchEventName,
       event |> eventTargetToTouchDomEvent,
     )
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let _execTouchDragingEventHandle = (touchEventName, event) => {
  StateDataMainService.unsafeGetState(StateDataMain.stateData)
  |> HandleTouchEventMainService.execEventHandle(
       touchEventName,
       event |> eventTargetToTouchDomEvent,
     )
  |> HandleTouchEventMainService.setLastXYByLocation(
       touchEventName,
       event |> eventTargetToTouchDomEvent,
     )
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let _execTouchDragStartEventHandle = () => {
  StateDataMainService.unsafeGetState(StateDataMain.stateData)
  |> HandleTouchEventMainService.setIsDrag(true)
  |> HandleTouchEventMainService.setLastXY(None, None)
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let _execTouchDragEndEventHandle = () => {
  StateDataMainService.unsafeGetState(StateDataMain.stateData)
  |> HandleTouchEventMainService.setIsDrag(false)
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let _execKeyboardEventHandle = (keyboardEventName, event) => {
  StateDataMainService.unsafeGetState(StateDataMain.stateData)
  |> HandleKeyboardEventMainService.execEventHandle(
       keyboardEventName,
       event |> eventTargetToKeyboardDomEvent,
     )
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let _fromPCDomEventArr = state => [|
  _fromDomEvent("click", state)
  |> WonderBsMost.Most.tap(event => _execMouseEventHandle(Click, event)),
  _fromDomEvent("mousedown", state)
  |> WonderBsMost.Most.tap(event => _execMouseEventHandle(MouseDown, event)),
  _fromDomEvent("mouseup", state)
  |> WonderBsMost.Most.tap(event => _execMouseEventHandle(MouseUp, event)),
  _fromDomEvent("mousemove", state)
  |> WonderBsMost.Most.tap(event =>
       _execMouseMoveEventHandle(MouseMove, event)
     ),
  _fromDomEvent("mousewheel", state)
  |> WonderBsMost.Most.tap(event => _execMouseEventHandle(MouseWheel, event)),
  _fromDomEvent("mousedown", state)
  |> WonderBsMost.Most.tap(event => _execMouseDragStartEventHandle())
  |> WonderBsMost.Most.flatMap(event =>
       _fromDomEvent("mousemove", state)
       |> WonderBsMost.Most.until(
            _fromDomEvent("mouseup", state)
            |> WonderBsMost.Most.tap(event => _execMouseDragEndEventHandle()),
          )
     )
  |> WonderBsMost.Most.tap(event =>
       _execMouseDragingEventHandle(MouseDrag, event)
     ),
  _fromDomEvent("keyup", state)
  |> WonderBsMost.Most.tap(event => _execKeyboardEventHandle(KeyUp, event)),
  _fromDomEvent("keydown", state)
  |> WonderBsMost.Most.tap(event => _execKeyboardEventHandle(KeyDown, event)),
  _fromDomEvent("keypress", state)
  |> WonderBsMost.Most.tap(event => _execKeyboardEventHandle(KeyPress, event)),
|];

let _fromMobileDomEventArr = (state) => [|
  _fromDomEvent("touchend", state)
  |> WonderBsMost.Most.since(_fromDomEvent("touchstart", state))
  |> WonderBsMost.Most.tap(event => _execTouchEventHandle(TouchTap, event)),
  _fromDomEvent("touchend", state)
  |> WonderBsMost.Most.tap(event => _execTouchEventHandle(TouchEnd, event)),
  _fromDomEvent("touchstart", state)
  |> WonderBsMost.Most.tap(event => _execTouchEventHandle(TouchStart, event)),
  _fromDomEvent("touchmove", state)
  |> WonderBsMost.Most.tap(event =>
       _execTouchMoveEventHandle(TouchMove, event)
     ),
  _fromDomEvent("touchstart", state)
  |> WonderBsMost.Most.tap(event => _execTouchDragStartEventHandle())
  |> WonderBsMost.Most.flatMap(event =>
       _fromDomEvent("touchmove", state)
       |> WonderBsMost.Most.until(
            _fromDomEvent("touchend", state)
            |> WonderBsMost.Most.tap(event => _execTouchDragEndEventHandle()),
          )
     )
  |> WonderBsMost.Most.tap(event =>
       _execTouchDragingEventHandle(TouchDrag, event)
     ),
|];

let fromDomEvent = ({browserDetectRecord} as state) =>
  WonderBsMost.Most.mergeArray(
    switch (browserDetectRecord.browser) {
    | Chrome
    | Firefox => _fromPCDomEventArr(state)
    | Android
    | IOS => _fromMobileDomEventArr(state)
    | browser =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="fromDomEvent",
          ~description={j|unknown browser|j},
          ~reason="",
          ~solution={j||j},
          ~params={j|browser:$browser|j},
        ),
      )
    },
  );

let handleDomEventStreamError = e => {
  let message = Obj.magic(e)##message;
  let stack = Obj.magic(e)##stack;

  WonderLog.Log.debug(
    WonderLog.Log.buildDebugMessage(
      ~description={j|from dom event stream error|j},
      ~params={j|message:$message\nstack:$stack|j},
    ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  /* WonderLog.Log.fatal(
       WonderLog.Log.buildFatalMessage(
         ~title="InitEventJob",
         ~description={j|from dom event stream error|j},
         ~reason="",
         ~solution={j||j},
         ~params={j|message:$message\nstack:$stack|j},
       ),
     ); */
};

let initEvent = state => {
  let domEventStreamSubscription =
    fromDomEvent(state)
    |> WonderBsMost.Most.subscribe({
         "next": _ => (),
         "error": e => handleDomEventStreamError(e),
         "complete": () => (),
       });

  state
  |> ManageEventMainService.setDomEventStreamSubscription(
       domEventStreamSubscription,
     )
  |> bindDomEventToTriggerPointEvent;
};