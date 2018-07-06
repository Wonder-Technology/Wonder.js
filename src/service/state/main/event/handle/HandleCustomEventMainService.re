open StateDataMainType;

open EventType;

let _triggerHandleFunc = (customEvent, list, state) =>
  list
  |> List.fold_left(
       (state, {handleFunc}) => handleFunc(customEvent, state),
       state,
     );

let triggerGlobalEvent =
    (({name}: customEvent) as customEvent, {eventRecord} as state) => {
  let {customGlobalEventListMap} = eventRecord;

  switch (
    customGlobalEventListMap |> WonderCommonlib.HashMapService.get(name)
  ) {
  | None => state
  | Some(list) => _triggerHandleFunc(customEvent, list, state)
  };
};

let triggerGameObjectEvent =
    (target, ({name}: customEvent) as customEvent, {eventRecord} as state) => {
  let {customGameObjectEventListMap} = eventRecord;

  switch (
    customGameObjectEventListMap |> WonderCommonlib.HashMapService.get(name)
  ) {
  | None => state
  | Some(gameObjectEventListMap) =>
    switch (
      gameObjectEventListMap |> WonderCommonlib.SparseMapService.get(target)
    ) {
    | None => state
    | Some(list) =>
      _triggerHandleFunc(
        {...customEvent, target: Some(target)},
        list,
        state,
      )
    }
  };
};

let rec _broadcastGameObjectEvent = (eventName, target, customEvent, state) => {
  let state = triggerGameObjectEvent(target, customEvent, state);

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
  let state = triggerGameObjectEvent(target, customEvent, state);

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