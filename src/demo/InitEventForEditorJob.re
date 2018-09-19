open StateDataMainType;

open EventType;

open EditorType;

let _getBody = () => DomExtend.document##body |> bodyToEventTarget;

let _isTriggerGameViewEvent = () => {
  let {eventTarget} as editorState = Editor.getEditorState();

  /* TODO judge is run */
  switch (eventTarget) {
  | Scene => false
  | Game => true
  };
};

let _isTriggerSceneViewEvent = () => {
  let {eventTarget} as editorState = Editor.getEditorState();

  /* TODO judge is run */
  switch (eventTarget) {
  | Scene => true
  | Game => false
  };
};

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
      (
        onDomEventFunc,
        convertDomEventToPointEventFunc,
        isTriggerCustomGlobalEventFunc,
      ),
      state,
    ) =>
  onDomEventFunc(
    ~eventName=domEventName,
    ~handleFunc=
      (. mouseEvent, state) =>
        isTriggerCustomGlobalEventFunc() ?
          {
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
          } :
          state,
    ~state,
    (),
  );

let _bindMouseEventToTriggerPointEvent =
    (
      mouseEventName,
      customEventName,
      pointEventName,
      isTriggerCustomGlobalEventFunc,
      state,
    ) =>
  _bindDomEventToTriggerPointEvent(
    (mouseEventName, customEventName, pointEventName),
    (
      ManageEventMainService.onMouseEvent(~priority=0),
      _convertMouseEventToPointEvent,
      isTriggerCustomGlobalEventFunc,
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
         _isTriggerGameViewEvent,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseUp,
         NameEventService.getPointUpEventName(),
         PointUp,
         _isTriggerGameViewEvent,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseDown,
         NameEventService.getPointDownEventName(),
         PointDown,
         _isTriggerGameViewEvent,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseWheel,
         NameEventService.getPointScaleEventName(),
         PointScale,
         _isTriggerGameViewEvent,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseMove,
         NameEventService.getPointMoveEventName(),
         PointMove,
         _isTriggerGameViewEvent,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseDrag,
         NameEventService.getPointDragEventName(),
         PointDrag,
         _isTriggerGameViewEvent,
       )
    |> _bindMouseEventToTriggerPointEvent(
         Click,
         Editor.getPointTapEventName(),
         PointTap,
         _isTriggerSceneViewEvent,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseUp,
         Editor.getPointUpEventName(),
         PointUp,
         _isTriggerSceneViewEvent,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseDown,
         Editor.getPointDownEventName(),
         PointDown,
         _isTriggerSceneViewEvent,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseWheel,
         Editor.getPointScaleEventName(),
         PointScale,
         _isTriggerSceneViewEvent,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseMove,
         Editor.getPointMoveEventName(),
         PointMove,
         _isTriggerSceneViewEvent,
       )
    |> _bindMouseEventToTriggerPointEvent(
         MouseDrag,
         Editor.getPointDragEventName(),
         PointDrag,
         _isTriggerSceneViewEvent,
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

let _execMouseEventHandle = (mouseEvent, state) => {
  StateDataMainService.unsafeGetState(StateDataMain.stateData)
  |> HandleMouseEventMainService.execEventHandle(
       /* TODO fix engine->_execMouseEventHandle */
       /* event |> eventTargetToMouseDomEvent, */
       mouseEvent,
     )
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let _execMouseMoveEventHandle = (mouseEventName, event, state) => {
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
  |> HandleMouseEventMainService.setLastXYWhenMouseMove(mouseEvent)
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let _execMouseDragingEventHandle = (mouseEvent, state) => {
  StateDataMainService.unsafeGetState(StateDataMain.stateData)
  |> HandleMouseEventMainService.execEventHandle(mouseEvent)
  |> HandleMouseEventMainService.setLastXYByLocation(mouseEvent)
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let _execMouseDragStartEventHandle = state => {
  StateDataMainService.unsafeGetState(StateDataMain.stateData)
  |> HandleMouseEventMainService.setIsDrag(true)
  |> HandleMouseEventMainService.setLastXY(None, None)
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let _execMouseDragEndEventHandle = state => {
  StateDataMainService.unsafeGetState(StateDataMain.stateData)
  |> HandleMouseEventMainService.setIsDrag(false)
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let _execKeyboardEventHandle = (keyboardEventName, event, state) => {
  StateDataMainService.unsafeGetState(StateDataMain.stateData)
  |> HandleKeyboardEventMainService.execEventHandle(
       keyboardEventName,
       event |> eventTargetToKeyboardDomEvent,
     )
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

  ();
};

let _isMouseInView = ((mouseX, mouseY), (x, y, width, height)) =>
  mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height;

let _setEventTarget = (({locationInView}: mouseEvent) as mouseEvent) => {
  let {sceneViewRect, gameViewRect, eventTarget} as editorState =
    Editor.getEditorState();

  /* {
       name: eventName,
       location,
       locationInView,
       button: Some(button),
       wheel: Some(wheel),
       movementDelta,
       event: event |> mouseDomEventToPointDomEvent,
     } */

  let eventTarget =
    _isMouseInView(locationInView, sceneViewRect) ?
      Scene :
      _isMouseInView(locationInView, gameViewRect) ? Game : eventTarget;

  editorState.eventTarget = eventTarget;

  mouseEvent;
};

let _mapMouseEventToView =
    (({location, locationInView}: mouseEvent) as mouseEvent) => {
  let {gameViewRect, eventTarget} as editorState = Editor.getEditorState();

  let (gx, gy, _, _) = gameViewRect;

  let (locationInViewX, locationInViewY) = locationInView;

  switch (eventTarget) {
  | Scene => mouseEvent
  | Game => {
      ...mouseEvent,
      locationInView: (locationInViewX - gx, locationInViewY - gy),
    }
  };
};

let _convertDomEventToMouseEvent = (eventName, event, state) => {
  let state = StateDataMainService.unsafeGetState(StateDataMain.stateData);

  event
  |> eventTargetToMouseDomEvent
  |> HandleMouseEventMainService.convertMouseDomEventToMouseEvent(
       eventName,
       _,
       state,
     );
};
let _mapAndExecMouseEventHandle = (eventName, event, state) =>
  _convertDomEventToMouseEvent(eventName, event, state)
  |> _mapMouseEventToView
  |> _execMouseEventHandle(_, state);

let _execViewKeyboardEventHandle =
    (sceneViewEventName, gameViewEventName, event, state) =>
  _isTriggerGameViewEvent() ?
    _execKeyboardEventHandle(gameViewEventName, event, state) :
    _execKeyboardEventHandle(sceneViewEventName |> Obj.magic, event, state);

let _fromPCDomEventArr = state => [|
  /* TODO refactor: duplicate with initEventJobUtils */
  WonderBsMost.Most.fromEvent("contextmenu", _getBody(), false)
  |> WonderBsMost.Most.tap(event => _preventContextMenuEvent(event)),
  _fromPointDomEvent("click", state)
  |> WonderBsMost.Most.tap(event =>
       _setEventTarget(_convertDomEventToMouseEvent(Click, event, state))
       |> _mapMouseEventToView
       |> _execMouseEventHandle(_, state)
     ),
  _fromPointDomEvent("mousedown", state)
  |> WonderBsMost.Most.tap(event =>
       _mapAndExecMouseEventHandle(MouseDown, event, state)
     ),
  _fromPointDomEvent("mouseup", state)
  |> WonderBsMost.Most.tap(event =>
       _mapAndExecMouseEventHandle(MouseUp, event, state)
     ),
  _fromPointDomEvent("mousemove", state)
  |> WonderBsMost.Most.tap(event =>
       _mapAndExecMouseEventHandle(MouseMove, event, state)
     ),
  _fromPointDomEvent("mousewheel", state)
  |> WonderBsMost.Most.tap(event =>
       _mapAndExecMouseEventHandle(MouseWheel, event, state)
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
       _convertDomEventToMouseEvent(MouseDrag, event, state)
       |> _mapMouseEventToView
       |> _execMouseDragingEventHandle(_, state)
     ),
  _fromKeyboardDomEvent("keyup", state)
  |> WonderBsMost.Most.tap(event =>
       _execViewKeyboardEventHandle(KeyUp_editor, KeyUp, event, state)
     ),
  _fromKeyboardDomEvent("keydown", state)
  |> WonderBsMost.Most.tap(event =>
       _execViewKeyboardEventHandle(KeyDown_editor, KeyDown, event, state)
     ),
  _fromKeyboardDomEvent("keypress", state)
  |> WonderBsMost.Most.tap(event =>
       _execViewKeyboardEventHandle(KeyPress_editor, KeyPress, event, state)
     ),
|];

let fromDomEvent = ({browserDetectRecord} as state) =>
  WonderBsMost.Most.mergeArray(
    switch (browserDetectRecord.browser) {
    | Chrome
    | Firefox => _fromPCDomEventArr(state)
    /* | Android
       | IOS => _fromMobileDomEventArr(state) */
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

let initEventForEditorJob = (_, state) => {
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