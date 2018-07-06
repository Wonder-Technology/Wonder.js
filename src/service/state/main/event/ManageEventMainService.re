open StateDataMainType;

open EventType;

let onDomEvent = (~eventName, ~handleFunc, ~state, ~priority=0, ()) =>
  BindDomEventMainService.bind(eventName, priority, handleFunc, state);

let onCustomGlobalEvent = (~eventName, ~handleFunc, ~state, ~priority=0, ()) =>
  BindCustomEventMainService.bindGlobalEvent(
    eventName,
    priority,
    handleFunc,
    state,
  );

let onCustomGameObjectEvent =
    (~eventName, ~handleFunc, ~target, ~state, ~priority=0, ()) =>
  BindCustomEventMainService.bindGameObjectEvent(
    (eventName, priority, target),
    handleFunc,
    state,
  );

let execDomEventHandle = (eventName, domEvent, state) =>
  switch (eventName) {
  | MouseDown
  | MouseUp =>
    HandleMouseEventMainService.execEventHandle(eventName, domEvent, state)
  };

let triggerCustomGlobalEvent = (customEvent, state) =>
  HandleCustomEventMainService.triggerGlobalEvent(customEvent, state);

let triggerCustomGameObjectEvent = (customEvent, target, state) =>
  HandleCustomEventMainService.triggerGameObjectEvent(
    target,
    customEvent,
    state,
  );

let broadcastCustomGameObjectEvent = (customEvent, target, state) =>
  HandleCustomEventMainService.broadcastGameObjectEvent(
    target,
    customEvent,
    state,
  );

let emitCustomGameObjectEvent = (customEvent, target, state) =>
  HandleCustomEventMainService.emitGameObjectEvent(
    target,
    customEvent,
    state,
  );