let onMouseEvent = (eventName, priority, handleFunc, state) =>
  ManageEventMainService.onMouseEvent(
    ~eventName,
    ~handleFunc,
    ~state,
    ~priority,
    (),
  );

let onKeyboardEvent = (eventName, priority, handleFunc, state) =>
  ManageEventMainService.onKeyboardEvent(
    ~eventName,
    ~handleFunc,
    ~state,
    ~priority,
    (),
  );

let onTouchEvent = (eventName, priority, handleFunc, state) =>
  ManageEventMainService.onTouchEvent(
    ~eventName,
    ~handleFunc,
    ~state,
    ~priority,
    (),
  );

let offMouseEventByHandleFunc = (eventName, handleFunc, state) =>
  ManageEventMainService.offMouseEventByHandleFunc(
    ~eventName,
    ~handleFunc,
    ~state,
  );

let offKeyboardEventByHandleFunc = (eventName, handleFunc, state) =>
  ManageEventMainService.offKeyboardEventByHandleFunc(
    ~eventName,
    ~handleFunc,
    ~state,
  );

let offTouchEventByHandleFunc = (eventName, handleFunc, state) =>
  ManageEventMainService.offTouchEventByHandleFunc(
    ~eventName,
    ~handleFunc,
    ~state,
  );

let onCustomGlobalEvent = (eventName, priority, handleFunc, state) =>
  ManageEventMainService.onCustomGlobalEvent(
    ~eventName,
    ~handleFunc,
    ~state,
    ~priority,
    (),
  );

let offCustomGlobalEventByEventName = (eventName, state) =>
  ManageEventMainService.offCustomGlobalEventByEventName(~eventName, ~state);

let offCustomGlobalEventByHandleFunc = (eventName, handleFunc, state) =>
  ManageEventMainService.offCustomGlobalEventByHandleFunc(
    ~eventName,
    ~handleFunc,
    ~state,
  );

let onCustomGameObjectEvent = (eventName, target, priority, handleFunc, state) =>
  ManageEventMainService.onCustomGameObjectEvent(
    ~eventName,
    ~handleFunc,
    ~target,
    ~state,
    ~priority,
    (),
  );

let offCustomGameObjectEventByTarget = (eventName, target, state) =>
  ManageEventMainService.offCustomGameObjectEventByTarget(
    ~eventName,
    ~target,
    ~state,
  );

let offCustomGameObjectEventByHandleFunc =
    (eventName, target, handleFunc, state) =>
  ManageEventMainService.offCustomGameObjectEventByHandleFunc(
    ~eventName,
    ~target,
    ~handleFunc,
    ~state,
  );

let stopPropagationCustomEvent = ManageEventMainService.stopPropagationCustomEvent;

let triggerCustomGlobalEvent = (customEvent, state) =>
  ManageEventMainService.triggerCustomGlobalEvent(customEvent, state);

let triggerCustomGameObjectEvent = (customEvent, target, state) =>
  ManageEventMainService.triggerCustomGameObjectEvent(
    customEvent,
    target,
    state,
  );

let broadcastCustomGameObjectEvent = (customEvent, target, state) =>
  ManageEventMainService.broadcastCustomGameObjectEvent(
    customEvent,
    target,
    state,
  );

let emitCustomGameObjectEvent = (customEvent, target, state) =>
  ManageEventMainService.emitCustomGameObjectEvent(
    customEvent,
    target,
    state,
  );

let createCustomEvent = (eventName, userData) =>
  CreateCustomEventMainService.create(
    eventName,
    Js.Nullable.to_opt(userData),
  );

let getCustomEventUserData = customEvent =>
  HandleCustomEventMainService.getCustomEventUserData(customEvent);

let getPointEventLocationInViewOfEvent = (event: EventType.pointEvent) =>
  event.locationInView;

let getPointEventLocationOfEvent = (event: EventType.pointEvent) =>
  event.location;

let getPointEventButtonOfEvent = (event: EventType.pointEvent) =>
  event.button;

let getPointEventWheelOfEvent = (event: EventType.pointEvent) => event.wheel;

let getPointEventMovementDeltaOfEvent = (event: EventType.pointEvent) =>
  event.movementDelta;

let getPointEventEventOfEvent = (event: EventType.pointEvent) => event.event;