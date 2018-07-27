open StateDataMainType;

open EventType;

let _getBody = () => DomExtend.document##body |> bodyToEventTarget;

let _fromPointDomEvent = (eventName, state) =>
  WonderBsMost.Most.fromEvent(
    eventName,
    ViewService.unsafeGetCanvas(state.viewRecord) |> canvasToEventTarget,
    false,
  );

let _fromKeyboardDomEvent = (eventName, state) =>
  WonderBsMost.Most.fromEvent(eventName, _getBody(), false);

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

let _preventContextMenuEvent = (event, state) => {
  HandleDomEventMainService.preventDefault(
    event |> EventType.eventTargetToDomEvent,
  )
  |> ignore;

  ();
};

let _execMouseEventHandle = (mouseEventName, event, state) => {
  StateDataMainService.unsafeGetStateByFunc(state)
  |> HandleMouseEventMainService.execEventHandle(
       mouseEventName,
       event |> eventTargetToMouseDomEvent,
     )
  |> StateDataMainService.setStateByFunc
  |> ignore;

  ();
};

let _execMouseMoveEventHandle = (mouseEventName, event, state) => {
  StateDataMainService.unsafeGetStateByFunc(state)
  |> HandleMouseEventMainService.execEventHandle(
       mouseEventName,
       event |> eventTargetToMouseDomEvent,
     )
  |> HandleMouseEventMainService.setLastXYWhenMouseMove(
       mouseEventName,
       event |> eventTargetToMouseDomEvent,
     )
  |> StateDataMainService.setStateByFunc
  |> ignore;

  ();
};

let _execMouseDragingEventHandle = (mouseEventName, event, state) => {
  StateDataMainService.unsafeGetStateByFunc(state)
  |> HandleMouseEventMainService.execEventHandle(
       mouseEventName,
       event |> eventTargetToMouseDomEvent,
     )
  |> HandleMouseEventMainService.setLastXYByLocation(
       mouseEventName,
       event |> eventTargetToMouseDomEvent,
     )
  |> StateDataMainService.setStateByFunc
  |> ignore;

  ();
};

let _execMouseDragStartEventHandle = state => {
  StateDataMainService.unsafeGetStateByFunc(state)
  |> HandleMouseEventMainService.setIsDrag(true)
  |> HandleMouseEventMainService.setLastXY(None, None)
  |> StateDataMainService.setStateByFunc
  |> ignore;

  ();
};

let _execMouseDragEndEventHandle = state => {
  StateDataMainService.unsafeGetStateByFunc(state)
  |> HandleMouseEventMainService.setIsDrag(false)
  |> StateDataMainService.setStateByFunc
  |> ignore;

  ();
};

let _execTouchEventHandle = (touchEventName, event, state) => {
  StateDataMainService.unsafeGetStateByFunc(state)
  |> HandleTouchEventMainService.execEventHandle(
       touchEventName,
       event |> eventTargetToTouchDomEvent,
     )
  |> StateDataMainService.setStateByFunc
  |> ignore;

  ();
};

let _execTouchMoveEventHandle = (touchEventName, event, state) => {
  StateDataMainService.unsafeGetStateByFunc(state)
  |> HandleTouchEventMainService.execEventHandle(
       touchEventName,
       event |> eventTargetToTouchDomEvent,
     )
  |> HandleTouchEventMainService.setLastXYWhenTouchMove(
       touchEventName,
       event |> eventTargetToTouchDomEvent,
     )
  |> StateDataMainService.setStateByFunc
  |> ignore;

  ();
};

let _execTouchDragingEventHandle = (touchEventName, event, state) => {
  StateDataMainService.unsafeGetStateByFunc(state)
  |> HandleTouchEventMainService.execEventHandle(
       touchEventName,
       event |> eventTargetToTouchDomEvent,
     )
  |> HandleTouchEventMainService.setLastXYByLocation(
       touchEventName,
       event |> eventTargetToTouchDomEvent,
     )
  |> StateDataMainService.setStateByFunc
  |> ignore;

  ();
};

let _execTouchDragStartEventHandle = state => {
  StateDataMainService.unsafeGetStateByFunc(state)
  |> HandleTouchEventMainService.setIsDrag(true)
  |> HandleTouchEventMainService.setLastXY(None, None)
  |> StateDataMainService.setStateByFunc
  |> ignore;

  ();
};

let _execTouchDragEndEventHandle = state => {
  StateDataMainService.unsafeGetStateByFunc(state)
  |> HandleTouchEventMainService.setIsDrag(false)
  |> StateDataMainService.setStateByFunc
  |> ignore;

  ();
};

let _execKeyboardEventHandle = (keyboardEventName, event, state) => {
  StateDataMainService.unsafeGetStateByFunc(state)
  |> HandleKeyboardEventMainService.execEventHandle(
       keyboardEventName,
       event |> eventTargetToKeyboardDomEvent,
     )
  |> StateDataMainService.setStateByFunc
  |> ignore;

  ();
};

let _fromPCDomEventArr = state => [|
  WonderBsMost.Most.fromEvent("contextmenu", _getBody(), false)
  |> WonderBsMost.Most.tap(event => _preventContextMenuEvent(event, state)),
  _fromPointDomEvent("click", state)
  |> WonderBsMost.Most.tap(event =>
       _execMouseEventHandle(Click, event, state)
     ),
  _fromPointDomEvent("mousedown", state)
  |> WonderBsMost.Most.tap(event =>
       _execMouseEventHandle(MouseDown, event, state)
     ),
  _fromPointDomEvent("mouseup", state)
  |> WonderBsMost.Most.tap(event =>
       _execMouseEventHandle(MouseUp, event, state)
     ),
  _fromPointDomEvent("mousemove", state)
  |> WonderBsMost.Most.tap(event =>
       _execMouseMoveEventHandle(MouseMove, event, state)
     ),
  _fromPointDomEvent("mousewheel", state)
  |> WonderBsMost.Most.tap(event =>
       _execMouseEventHandle(MouseWheel, event, state)
     ),
  _fromPointDomEvent("mousedown", state)
  |> WonderBsMost.Most.tap(event => _execMouseDragStartEventHandle(state))
  |> WonderBsMost.Most.flatMap(event =>
       _fromPointDomEvent("mousemove", state)
       |> WonderBsMost.Most.until(
            _fromPointDomEvent("mouseup", state)
            |> WonderBsMost.Most.tap(event =>
                 _execMouseDragEndEventHandle(state)
               ),
          )
     )
  |> WonderBsMost.Most.tap(event =>
       _execMouseDragingEventHandle(MouseDrag, event, state)
     ),
  _fromKeyboardDomEvent("keyup", state)
  |> WonderBsMost.Most.tap(event =>
       _execKeyboardEventHandle(KeyUp, event, state)
     ),
  _fromKeyboardDomEvent("keydown", state)
  |> WonderBsMost.Most.tap(event =>
       _execKeyboardEventHandle(KeyDown, event, state)
     ),
  _fromKeyboardDomEvent("keypress", state)
  |> WonderBsMost.Most.tap(event =>
       _execKeyboardEventHandle(KeyPress, event, state)
     ),
|];

let _fromMobileDomEventArr = state => [|
  _fromPointDomEvent("touchend", state)
  |> WonderBsMost.Most.since(_fromPointDomEvent("touchstart", state))
  |> WonderBsMost.Most.tap(event =>
       _execTouchEventHandle(TouchTap, event, state)
     ),
  _fromPointDomEvent("touchend", state)
  |> WonderBsMost.Most.tap(event =>
       _execTouchEventHandle(TouchEnd, event, state)
     ),
  _fromPointDomEvent("touchstart", state)
  |> WonderBsMost.Most.tap(event =>
       _execTouchEventHandle(TouchStart, event, state)
     ),
  _fromPointDomEvent("touchmove", state)
  |> WonderBsMost.Most.tap(event =>
       _execTouchMoveEventHandle(TouchMove, event, state)
     ),
  _fromPointDomEvent("touchstart", state)
  |> WonderBsMost.Most.tap(event => _execTouchDragStartEventHandle(state))
  |> WonderBsMost.Most.flatMap(event =>
       _fromPointDomEvent("touchmove", state)
       |> WonderBsMost.Most.until(
            _fromPointDomEvent("touchend", state)
            |> WonderBsMost.Most.tap(event =>
                 _execTouchDragEndEventHandle(state)
               ),
          )
     )
  |> WonderBsMost.Most.tap(event =>
       _execTouchDragingEventHandle(TouchDrag, event, state)
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