type pointEventName =
  | PointDown
  | PointUp;

type domEventName =
  | MouseDown
  | MouseUp;

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

/* TODO finish */
type mouseDomEvent = Js.t({. "button": int});

external domEventNameToInt : domEventName => int = "%identity";


external pointEventToUserData : pointEvent => userData = "%identity";


/* external  : pointEvent => userData = "%identity"; */