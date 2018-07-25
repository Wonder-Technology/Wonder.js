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
  | MouseDrag
  | KeyUp
  | KeyDown
  | KeyPress
  | TouchTap
  | TouchEnd
  | TouchMove
  | TouchStart
  | TouchDrag;

type mouseButton =
  | Left
  | Right
  | Center;

type pointData('a) = ('a, 'a);

type phaseType =
  | Broadcast
  | Emit;

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
  "preventDefault": unit => unit,
};

type keyboardDomEvent = {
  .
  "keyCode": int,
  "ctrlKey": bool,
  "altKey": bool,
  "shiftKey": bool,
  "metaKey": bool,
  "preventDefault": unit => unit,
};

type touchDataJsObj = {
  .
  "clientX": int,
  "clientY": int,
  "pageX": int,
  "pageY": int,
  "identifier": int,
  "screenX": int,
  "screenY": int,
  "radiusX": int,
  "radiusY": int,
  "rotationAngle": int,
  "force": int,
};

type touchDomEvent = {
  .
  "touches": array(touchDataJsObj),
  "changedTouches": array(touchDataJsObj),
  "targetTouches": array(touchDataJsObj),
  "preventDefault": unit => unit,
};

type mouseEvent = {
  name: domEventName,
  location: pointData(int),
  locationInView: pointData(int),
  button: mouseButton,
  wheel: int,
  movementDelta: pointData(int),
  event: mouseDomEvent,
};

type keyboardEvent = {
  name: domEventName,
  keyCode: int,
  ctrlKey: bool,
  altKey: bool,
  shiftKey: bool,
  metaKey: bool,
  key: string,
  event: keyboardDomEvent,
};

type touchData = {
  clientX: int,
  clientY: int,
  pageX: int,
  pageY: int,
  identifier: int,
  screenX: int,
  screenY: int,
  radiusX: int,
  radiusY: int,
  rotationAngle: int,
  force: int,
};

type touchEvent = {
  name: domEventName,
  location: pointData(int),
  locationInView: pointData(int),
  touchData,
  movementDelta: pointData(int),
  event: touchDomEvent,
};

type userData;

type customEvent = {
  name: string,
  target: option(GameObjectType.gameObject),
  /* currentTarget: option(GameObjectType.gameObject), */
  isStopPropagation: bool,
  phase: option(phaseType),
  /* type_: eventType, */
  userData: option(userData),
};

type pointDomEvent = {
  .
  "preventDefault": (. unit) => unit,
  "stopPropagation": (. unit) => unit,
};

type pointEvent = {
  name: pointEventName,
  location: pointData(int),
  locationInView: pointData(int),
  button: option(mouseButton),
  wheel: option(int),
  movementDelta: pointData(int),
  event: pointDomEvent,
};

type mouseEventData = {
  lastX: option(int),
  lastY: option(int),
  isDrag: bool,
};

type keyboardEventData = {
  specialKeyMap: WonderCommonlib.SparseMapService.t(string),
  shiftKeyByKeyCodeMap: WonderCommonlib.SparseMapService.t(string),
  shiftKeyByCharCodeMap: WonderCommonlib.HashMapService.t(string),
};

type touchEventData = {
  lastX: option(int),
  lastY: option(int),
  isDrag: bool,
};
external domEventNameToInt : domEventName => int = "%identity";

external pointEventToUserData : pointEvent => userData = "%identity";

external userDataToPointEvent : userData => pointEvent = "%identity";

external bodyToEventTarget : WonderWebgl.DomExtendType.body => Dom.eventTarget =
  "%identity";

external eventTargetToMouseDomEvent : Dom.event => mouseDomEvent = "%identity";

external eventTargetToKeyboardDomEvent : Dom.event => keyboardDomEvent =
  "%identity";

external eventTargetToTouchDomEvent : Dom.event => touchDomEvent = "%identity";

external mouseDomEventToPointDomEvent : mouseDomEvent => pointDomEvent =
  "%identity";

external touchDomEventToPointDomEvent : touchDomEvent => pointDomEvent =
  "%identity";