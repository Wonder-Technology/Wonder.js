open StateDataMainType;

open EventType;

/* TODO move to utils */
let _getDefaultDom = () => DomExtend.document##body;

let fromDomEvent = eventName =>
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

/* s.t(({.. button: int, detail: Js.nullable(int),
  movementX: Js.nullable(int), movementY: Js.nullable(int),
  mozMovementX: Js.nullable(int), mozMovementY: Js.nullable(int),
  pageX: int, pageY: int, webkitMovementX: Js.nullable(int),
  webkitMovementY: Js.nullable(int), wheelDelta: Js.nullable(int)}
as 'a)) */

let execJob = (_, state) => {
  fromDomEvent("mousedown")
  |> Most.forEach(event
       =>
         StateDataMainService.unsafeGetState(StateDataMain.stateData)
         |> ManageEventMainService.execDomEventHandle(
              MouseDown,
              event |> eventTargetToMouseDomEvent,
            )
         |> StateDataMainService.setState(StateDataMain.stateData)
         |> ignore
       )
  |> ignore;

  fromDomEvent("mouseup")
  |> Most.forEach(event =>
       StateDataMainService.unsafeGetState(StateDataMain.stateData)
       |> ManageEventMainService.execDomEventHandle(
            MouseUp,
            event |> Obj.magic,
          )
       |> StateDataMainService.setState(StateDataMain.stateData)
       |> ignore
     )
  |> ignore;

  _bindDomEventToTriggerPointEvent(state);
};