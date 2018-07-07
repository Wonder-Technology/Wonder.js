open StateDataMainType;

open EventType;

let _getDefaultDom = () => DomExtend.document##body;

let _fromDomEvent = eventName =>
  Most.fromEvent(eventName, _getDefaultDom() |> bodyToEventTarget, false);

let _convertMouseEventToPointEvent =
    (
      eventName,
      {location, locationInView, button, wheel, movementDelta}: mouseEvent,
    ) => {
  name: eventName,
  location,
  locationInView,
  button,
  wheel,
  movementDelta,
  /* type_: Point, */
};

let bindDomEventToTriggerPointEvent = state => {
  let state =
    ManageEventMainService.onDomEvent(
      ~eventName=MouseDown,
      ~handleFunc=
        (. mouseEvent, state) =>
          ManageEventMainService.triggerCustomGlobalEvent(
            CreateCustomEventMainService.create(
              NameEventService.getPointDownEventName(),
              _convertMouseEventToPointEvent(PointDown, mouseEvent)
              |> pointEventToUserData
              |. Some,
            ),
            state,
          ),
      ~state,
      (),
    );

  let state =
    ManageEventMainService.onDomEvent(
      ~eventName=MouseUp,
      ~handleFunc=
        (. mouseEvent, state) =>
          ManageEventMainService.triggerCustomGlobalEvent(
            CreateCustomEventMainService.create(
              NameEventService.getPointUpEventName(),
              _convertMouseEventToPointEvent(PointUp, mouseEvent)
              |> pointEventToUserData
              |. Some,
            ),
            state,
          ),
      ~state,
      (),
    );

  state;
};

let fromDomEvent = () =>
  Most.mergeArray([|
    _fromDomEvent("mousedown")
    |> Most.tap(event =>
         StateDataMainService.unsafeGetState(StateDataMain.stateData)
         |> ManageEventMainService.execDomEventHandle(
              MouseDown,
              event |> eventTargetToMouseDomEvent,
            )
         |> StateDataMainService.setState(StateDataMain.stateData)
         |> ignore
       ),
    _fromDomEvent("mouseup")
    |> Most.tap(event =>
         StateDataMainService.unsafeGetState(StateDataMain.stateData)
         |> ManageEventMainService.execDomEventHandle(
              MouseUp,
              event |> eventTargetToMouseDomEvent,
            )
         |> StateDataMainService.setState(StateDataMain.stateData)
         |> ignore
       ),
  |]);