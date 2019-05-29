open StateDataMainType;

open EventType;

let _getBody = () => DomExtend.document##body |> bodyToEventTarget;

let _fromPointDomEvent = (eventName, state) =>
  WonderBsMost.Most.fromEvent(eventName, _getBody(), false);

let _fromMobilePointDomEvent = eventName => {
  let fromEvent = Obj.magic(WonderBsMost.Most.fromEvent);

  fromEvent(eventName, _getBody(), {"passive": false});
};

let _fromTouchMoveDomEventAndPreventnDefault = state =>
  _fromMobilePointDomEvent("touchmove")
  |> WonderBsMost.Most.tap(event =>
       HandlePointDomEventMainService.preventDefault(
         event |> eventTargetToTouchDomEvent |> touchDomEventToPointDomEvent,
       )
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
              (
                convertDomEventToPointEventFunc(pointEventName, mouseEvent)
                |> pointEventToUserData
              )
              ->Some,
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
         MouseDragStart,
         NameEventService.getPointDragStartEventName(),
         PointDragStart,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseDragOver,
         NameEventService.getPointDragOverEventName(),
         PointDragOver,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseDragDrop,
         NameEventService.getPointDragDropEventName(),
         PointDragDrop,
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
         TouchDragStart,
         NameEventService.getPointDragStartEventName(),
         PointDragStart,
       )
    |> _bindTouchEventToTriggerPointEvent(
         TouchDragOver,
         NameEventService.getPointDragOverEventName(),
         PointDragOver,
       )
    |> _bindTouchEventToTriggerPointEvent(
         TouchDragDrop,
         NameEventService.getPointDragDropEventName(),
         PointDragDrop,
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

let _preventContextMenuEvent = event => {
  HandleDomEventMainService.preventDefault(
    event |> EventType.eventTargetToDomEvent,
  )
  |> ignore;

  ();
};

let _execMouseEventHandle = (eventName, event) => {
  let state = StateDataMainService.unsafeGetState(StateDataMain.stateData);

  state
  |> HandleMouseEventMainService.execEventHandle(
       event
       |> eventTargetToMouseDomEvent
       |> HandleMouseEventMainService.convertMouseDomEventToMouseEvent(
            eventName,
            _,
            state,
          ),
     )
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let _execMouseChangePositionEventHandle =
    (mouseEventName, event, setPositionFunc) => {
  let state = StateDataMainService.unsafeGetState(StateDataMain.stateData);

  let mouseEvent =
    event
    |> eventTargetToMouseDomEvent
    |> HandleMouseEventMainService.convertMouseDomEventToMouseEvent(
         mouseEventName,
         _,
         state,
       );

  state
  |> HandleMouseEventMainService.execEventHandle(mouseEvent)
  |> setPositionFunc(mouseEvent)
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let _execMouseMoveEventHandle = (mouseEventName, event) =>
  _execMouseChangePositionEventHandle(
    mouseEventName,
    event,
    HandleMouseEventMainService.setLastXYWhenMouseMove,
  );

let _execMouseDragingEventHandle = (mouseEventName, event) =>
  _execMouseChangePositionEventHandle(
    mouseEventName,
    event,
    HandleMouseEventMainService.setLastXYByLocation,
  );

let _execMouseDragStartEventHandle = event => {
  let state = StateDataMainService.unsafeGetState(StateDataMain.stateData);

  state
  |> HandleMouseEventMainService.execEventHandle(
       event
       |> eventTargetToMouseDomEvent
       |> HandleMouseEventMainService.convertMouseDomEventToMouseEvent(
            MouseDragStart,
            _,
            state,
          ),
     )
  |> HandleMouseEventMainService.setIsDrag(true)
  |> HandleMouseEventMainService.setLastXY(None, None)
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let _execMouseDragDropEventHandle = event => {
  let state = StateDataMainService.unsafeGetState(StateDataMain.stateData);

  state
  |> HandleMouseEventMainService.execEventHandle(
       event
       |> eventTargetToMouseDomEvent
       |> HandleMouseEventMainService.convertMouseDomEventToMouseEvent(
            MouseDragDrop,
            _,
            state,
          ),
     )
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

let _execTouchChangePositionEventHandle =
    (touchEventName, event, setPositonFunc) => {
  StateDataMainService.unsafeGetState(StateDataMain.stateData)
  |> HandleTouchEventMainService.execEventHandle(
       touchEventName,
       event |> eventTargetToTouchDomEvent,
     )
  |> setPositonFunc(touchEventName, event |> eventTargetToTouchDomEvent)
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let _execTouchMoveEventHandle = (touchEventName, event) =>
  _execTouchChangePositionEventHandle(
    touchEventName,
    event,
    HandleTouchEventMainService.setLastXYWhenTouchMove,
  );

let _execTouchDragingEventHandle = (touchEventName, event) =>
  _execTouchChangePositionEventHandle(
    touchEventName,
    event,
    HandleTouchEventMainService.setLastXYByLocation,
  );

let _execTouchDragStartEventHandle = event => {
  StateDataMainService.unsafeGetState(StateDataMain.stateData)
  |> HandleTouchEventMainService.execEventHandle(
       TouchDragStart,
       event |> eventTargetToTouchDomEvent,
     )
  |> HandleTouchEventMainService.setIsDrag(true)
  |> HandleTouchEventMainService.setLastXY(None, None)
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let _execTouchDragDropEventHandle = event => {
  StateDataMainService.unsafeGetState(StateDataMain.stateData)
  |> HandleTouchEventMainService.execEventHandle(
       TouchDragDrop,
       event |> eventTargetToTouchDomEvent,
     )
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
  WonderBsMost.Most.fromEvent("contextmenu", _getBody(), false)
  |> WonderBsMost.Most.tap(event => _preventContextMenuEvent(event)),
  _fromPointDomEvent("click", state)
  |> WonderBsMost.Most.tap(event => _execMouseEventHandle(Click, event)),
  _fromPointDomEvent("mousedown", state)
  |> WonderBsMost.Most.tap(event => _execMouseEventHandle(MouseDown, event)),
  _fromPointDomEvent("mouseup", state)
  |> WonderBsMost.Most.tap(event => _execMouseEventHandle(MouseUp, event)),
  _fromPointDomEvent("mousemove", state)
  |> WonderBsMost.Most.tap(event =>
       _execMouseMoveEventHandle(MouseMove, event)
     ),
  _fromPointDomEvent("mousewheel", state)
  |> WonderBsMost.Most.tap(event => _execMouseEventHandle(MouseWheel, event)),
  _fromPointDomEvent("mousedown", state)
  |> WonderBsMost.Most.tap(event => _execMouseDragStartEventHandle(event))
  |> WonderBsMost.Most.flatMap(event =>
       _fromPointDomEvent("mousemove", state)
       /*!
         fix chrome bug for getMovementDeltaWhenPointerLocked:
         the first movementDelta->x >100!
                */
       |> WonderBsMost.Most.skip(2)
       |> WonderBsMost.Most.until(
            _fromPointDomEvent("mouseup", state)
            |> WonderBsMost.Most.tap(event =>
                 _execMouseDragDropEventHandle(event)
               ),
          )
     )
  |> WonderBsMost.Most.tap(event =>
       _execMouseDragingEventHandle(MouseDragOver, event)
     ),
  _fromKeyboardDomEvent("keyup", state)
  |> WonderBsMost.Most.tap(event => _execKeyboardEventHandle(KeyUp, event)),
  _fromKeyboardDomEvent("keydown", state)
  |> WonderBsMost.Most.tap(event => _execKeyboardEventHandle(KeyDown, event)),
  _fromKeyboardDomEvent("keypress", state)
  |> WonderBsMost.Most.tap(event => _execKeyboardEventHandle(KeyPress, event)),
|];

let _fromMobileDomEventArr = state => [|
  _fromMobilePointDomEvent("touchend")
  |> WonderBsMost.Most.since(_fromMobilePointDomEvent("touchstart"))
  |> WonderBsMost.Most.tap(event => _execTouchEventHandle(TouchTap, event)),
  _fromMobilePointDomEvent("touchend")
  |> WonderBsMost.Most.tap(event => _execTouchEventHandle(TouchEnd, event)),
  _fromMobilePointDomEvent("touchstart")
  |> WonderBsMost.Most.tap(event => _execTouchEventHandle(TouchStart, event)),
  _fromTouchMoveDomEventAndPreventnDefault(state)
  |> WonderBsMost.Most.tap(event =>
       _execTouchMoveEventHandle(TouchMove, event)
     ),
  _fromMobilePointDomEvent("touchstart")
  |> WonderBsMost.Most.tap(event => _execTouchDragStartEventHandle(event))
  |> WonderBsMost.Most.flatMap(event =>
       _fromTouchMoveDomEventAndPreventnDefault(state)
       |> WonderBsMost.Most.until(
            _fromMobilePointDomEvent("touchend")
            |> WonderBsMost.Most.tap(event =>
                 _execTouchDragDropEventHandle(event)
               ),
          )
     )
  |> WonderBsMost.Most.tap(event =>
       _execTouchDragingEventHandle(TouchDragOver, event)
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