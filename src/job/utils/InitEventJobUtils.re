open StateDataMainType;

open EventType;

let _getDefaultDom = () => DomExtend.document##body;

let _fromDomEvent = eventName =>
  Most.fromEvent(eventName, _getDefaultDom() |> bodyToEventTarget, false);

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

let _bindMouseEventToTriggerPointEvent =
    (mouseEventName, customEventName, pointEventName, state) =>
  ManageEventMainService.onMouseEvent(
    ~eventName=mouseEventName,
    ~handleFunc=
      (. mouseEvent, state) =>
        ManageEventMainService.triggerCustomGlobalEvent(
          CreateCustomEventMainService.create(
            customEventName,
            _convertMouseEventToPointEvent(pointEventName, mouseEvent)
            |> pointEventToUserData
            |. Some,
          ),
          state,
        ),
    ~state,
    (),
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
  ManageEventMainService.onTouchEvent(
    ~eventName=touchEventName,
    ~handleFunc=
      (. touchEvent, state) =>
        ManageEventMainService.triggerCustomGlobalEvent(
          CreateCustomEventMainService.create(
            customEventName,
            _convertTouchEventToPointEvent(pointEventName, touchEvent)
            |> pointEventToUserData
            |. Some,
          ),
          state,
        ),
    ~state,
    (),
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

let fromDomEvent = ({browserDetectRecord}) =>
  Most.mergeArray(
    switch (browserDetectRecord.browser) {
    | Chrome
    | Firefox => [|
        _fromDomEvent("click")
        |> Most.tap(event => _execMouseEventHandle(Click, event)),
        _fromDomEvent("mousedown")
        |> Most.tap(event => _execMouseEventHandle(MouseDown, event)),
        _fromDomEvent("mouseup")
        |> Most.tap(event => _execMouseEventHandle(MouseUp, event)),
        _fromDomEvent("mousemove")
        |> Most.tap(event => _execMouseMoveEventHandle(MouseMove, event)),
        _fromDomEvent("mousewheel")
        |> Most.tap(event => _execMouseEventHandle(MouseWheel, event)),
        _fromDomEvent("mousedown")
        |> Most.flatMap(event =>
             _fromDomEvent("mousemove")
             |> Most.until(_fromDomEvent("mouseup"))
           )
        |> Most.tap(event => _execMouseEventHandle(MouseDrag, event)),
        _fromDomEvent("keyup")
        |> Most.tap(event => _execKeyboardEventHandle(KeyUp, event)),
        _fromDomEvent("keydown")
        |> Most.tap(event => _execKeyboardEventHandle(KeyDown, event)),
        _fromDomEvent("keypress")
        |> Most.tap(event => _execKeyboardEventHandle(KeyPress, event)),
      |]
    | Android
    | IOS => [|
        _fromDomEvent("touchend")
        |> Most.since(_fromDomEvent("touchstart"))
        |> Most.tap(event => _execTouchEventHandle(TouchTap, event)),
        _fromDomEvent("touchend")
        |> Most.tap(event => _execTouchEventHandle(TouchEnd, event)),
        _fromDomEvent("touchstart")
        |> Most.tap(event => _execTouchEventHandle(TouchStart, event)),
        _fromDomEvent("touchmove")
        |> Most.tap(event => _execTouchMoveEventHandle(TouchMove, event)),
        _fromDomEvent("touchstart")
        |> Most.flatMap(event =>
             _fromDomEvent("touchmove")
             |> Most.until(_fromDomEvent("touchend"))
           )
        |> Most.tap(event => _execTouchEventHandle(TouchDrag, event)),
      |]
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
    |> Most.subscribe({
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