let onDomEvent = (eventName, priority, handleFunc, state) =>
  ManageEventMainService.onDomEvent(
    ~eventName,
    ~handleFunc,
    ~state,
    ~priority,
    (),
  );

let offDomEventByHandleFunc = (eventName, handleFunc, state) =>
  ManageEventMainService.offDomEventByHandleFunc(
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