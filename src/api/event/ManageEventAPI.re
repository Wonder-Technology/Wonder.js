let onDomEvent = (eventName, priority, handleFunc, state) =>
  ManageEventMainService.onDomEvent(
    ~eventName,
    ~handleFunc,
    ~state,
    ~priority,
    (),
  );