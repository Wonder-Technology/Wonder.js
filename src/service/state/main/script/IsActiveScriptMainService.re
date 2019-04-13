open StateDataMainType;

let getIsActive = (script, {scriptRecord} as state) =>
  scriptRecord.isActiveMap
  |> WonderCommonlib.MutableSparseMapService.get(script);

let unsafeGetIsActive = (script, state) =>
  switch (getIsActive(script, state)) {
  | None => true
  | Some(isActive) => isActive
  };

let _setIsActive = (script, isActive, {scriptRecord} as state) => {
  ...state,
  scriptRecord: {
    ...scriptRecord,
    isActiveMap:
      scriptRecord.isActiveMap
      |> WonderCommonlib.MutableSparseMapService.set(script, isActive),
  },
};

let setIsActive = (script, isActive, {scriptRecord} as state) =>
  switch (GameObjectScriptMainService.getGameObject(script, scriptRecord)) {
  | Some(gameObject) =>
    !GetIsActiveGameObjectMainService.unsafeGetIsActive(gameObject, state)
    && isActive ?
      {
        WonderLog.Log.warn(
          {j|script:$script -> gameObject:$gameObject isn't active, can't set script to active|j},
        );
        state;
      } :
      _setIsActive(script, isActive, state)
  | None => _setIsActive(script, isActive, state)
  };