open StateDataMainType;

open EventType;

/* TODO move to utils */
let _getDefaultDom = () => Dom.document##body;

let fromDomEvent = eventName =>
  /* TODO use identity */
  Most.fromEvent(eventName, _getDefaultDom() |> Obj.magic, false);

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

let _bindDomEventToTriggerPointEvent = state => {
  let state =
    ManageEventMainService.onDomEvent(
      ~eventName=MouseDown,
      ~handleFunc=
        (mouseEvent, state) =>
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
        (mouseEvent, state) =>
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

let execJob = (_, state) => {
  fromDomEvent("mousedown")
  |> Most.forEach(event =>
  /* TODO remove magic */
       StateDataMainService.unsafeGetState(StateDataMain.stateData)
       |> ManageEventMainService.execDomEventHandle(MouseDown, event |> Obj.magic)
       |> StateDataMainService.setState(StateDataMain.stateData)
       |> ignore
     )
  |> ignore;

  fromDomEvent("mouseup")
  |> Most.forEach(event =>
       StateDataMainService.unsafeGetState(StateDataMain.stateData)
       |> ManageEventMainService.execDomEventHandle(MouseUp, event |> Obj.magic)
       |> StateDataMainService.setState(StateDataMain.stateData)
       |> ignore
     )
  |> ignore;

  _bindDomEventToTriggerPointEvent(state);
};