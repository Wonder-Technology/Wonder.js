open StateDataMainType;

open EventType;

let _triggerHandleFunc = (customEvent, arr, state) =>
  arr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. (state, customEvent), {handleFunc}) =>
         customEvent.isStopPropagation ?
           (state, customEvent) : handleFunc(. customEvent, state),
       (state, customEvent),
     );

let stopPropagation = customEvent => {
  ...customEvent,
  isStopPropagation: true,
};

let triggerGlobalEvent =
    (({name}: customEvent) as customEvent, {eventRecord} as state) => {
  let {customGlobalEventArrMap} = eventRecord;

  switch (customGlobalEventArrMap |> WonderCommonlib.HashMapService.get(name)) {
  | None => (state, customEvent)
  | Some(arr) => _triggerHandleFunc(customEvent, arr, state)
  };
};

let triggerGameObjectEvent =
    (target, ({name}: customEvent) as customEvent, {eventRecord} as state) => {
  let {customGameObjectEventArrMap} = eventRecord;

  switch (
    customGameObjectEventArrMap |> WonderCommonlib.HashMapService.get(name)
  ) {
  | None => (state, customEvent)
  | Some(gameObjectEventListMap) =>
    switch (
      gameObjectEventListMap |> WonderCommonlib.SparseMapService.get(target)
    ) {
    | None => (state, customEvent)
    | Some(arr) =>
      _triggerHandleFunc({...customEvent, target: Some(target)}, arr, state)
    }
  };
};

let rec _broadcastGameObjectEvent = (eventName, target, customEvent, state) => {
  let (state, customEvent) =
    triggerGameObjectEvent(target, customEvent, state);

  let transformRecord = RecordTransformMainService.getRecord(state);

  HierachyTransformService.unsafeGetChildren(
    GetComponentGameObjectService.unsafeGetTransformComponent(
      target,
      state.gameObjectRecord,
    ),
    transformRecord,
  )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, child) =>
         _broadcastGameObjectEvent(eventName, child, customEvent, state),
       state,
     );
};

let broadcastGameObjectEvent =
    (target, ({name}: customEvent) as customEvent, state) =>
  _broadcastGameObjectEvent(
    name,
    target,
    {...customEvent, phase: Some(Broadcast)},
    state,
  );

let rec _emitGameObjectEvent = (eventName, target, customEvent, state) => {
  let (state, customEvent) =
    triggerGameObjectEvent(target, customEvent, state);

  let transformRecord = RecordTransformMainService.getRecord(state);

  switch (
    HierachyTransformService.getParent(
      GetComponentGameObjectService.unsafeGetTransformComponent(
        target,
        state.gameObjectRecord,
      ),
      transformRecord,
    )
  ) {
  | None => state
  | Some(parent) =>
    _emitGameObjectEvent(eventName, parent, customEvent, state)
  };
};

let emitGameObjectEvent =
    (target, ({name}: customEvent) as customEvent, state) =>
  _emitGameObjectEvent(
    name,
    target,
    {...customEvent, phase: Some(Emit)},
    state,
  );

let getCustomEventUserData = (customEvent: customEvent) =>
  customEvent.userData;