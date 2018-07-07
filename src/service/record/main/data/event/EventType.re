type pointEventName =
  | PointTap
  | PointDown
  | PointUp
  | PointMove
  | PointScale
  | PointDrag;

type domEventName =
  | Click
  | MouseDown
  | MouseUp
  | MouseMove
  | MouseWheel
  | MouseDrag;

type mouseButton =
  | Left
  | Right
  | Center;

type pointData('a) = ('a, 'a);

/* type eventType =
   | Point
   | Mouse
   | Custom; */

type phaseType =
  | Broadcast
  | Emit;

type mouseEvent = {
  name: domEventName,
  location: pointData(int),
  locationInView: pointData(int),
  button: mouseButton,
  wheel: int,
  movementDelta: pointData(int),
  /* type_: eventType, */
};

type userData;

type customEvent = {
  name: string,
  target: option(GameObjectType.gameObject),
  /* currentTarget: option(GameObjectType.gameObject), */
  /* isStopPropagation: bool, */
  phase: option(phaseType),
  /* type_: eventType, */
  userData: option(userData),
};

type pointEvent = {
  name: pointEventName,
  location: pointData(int),
  locationInView: pointData(int),
  button: mouseButton,
  wheel: int,
  movementDelta: pointData(int),
  /* type_: eventType, */
};

type mouseEventData = {
  lastX: option(int),
  lastY: option(int),
};

type domEvent;

type mouseDomEvent = {
  .
  "button": int,
  "detail": Js.Nullable.t(int),
  "movementX": Js.Nullable.t(int),
  "movementY": Js.Nullable.t(int),
  "mozMovementX": Js.Nullable.t(int),
  "mozMovementY": Js.Nullable.t(int),
  "webkitMovementX": Js.Nullable.t(int),
  "webkitMovementY": Js.Nullable.t(int),
  "wheelDelta": Js.Nullable.t(int),
  "pageX": int,
  "pageY": int,
};

external domEventNameToInt : domEventName => int = "%identity";

external pointEventToUserData : pointEvent => userData = "%identity";

external bodyToEventTarget : DomExtendType.body => Dom.eventTarget =
  "%identity";

external eventTargetToMouseDomEvent : Dom.event => mouseDomEvent = "%identity";