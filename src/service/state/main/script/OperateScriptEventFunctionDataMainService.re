open StateDataMainType;

let _getAllEventFunctionData =
    (mapEventFunctionDataFunc, {scriptRecord} as state) => {
  let {scriptEventFunctionDataMap} = scriptRecord;

  scriptEventFunctionDataMap
  |> WonderCommonlib.ImmutableSparseMapService.reduceiValid(
       (. arr, scriptEventFunctionData, script) =>
         arr
         |> ArrayService.push((
              script,
              scriptEventFunctionData
              |> ImmutableHashMapService.getValues
              |> Js.Array.map(mapEventFunctionDataFunc),
            )),
       WonderCommonlib.ArrayService.createEmpty(),
     );
};

let getAllUpdateEventFunctionData = ({scriptRecord} as state) =>
  _getAllEventFunctionData(({update}) => update, state);

let _mapEventFunctionDataFunc = ({init}) => init;

let getAllInitEventFunctionData = ({scriptRecord} as state) =>
  _getAllEventFunctionData(_mapEventFunctionDataFunc, state);

let execAllEventFunction = (allEventFunctionData, state) => {
  let apiJsObj = OperateScriptAPIMainService.getScriptAPIJsObj(state);

  allEventFunctionData
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, (script, funcArr)) =>
         funcArr
         |> WonderCommonlib.ArrayService.reduceOneParam(
              (. state, func) => func(. script, apiJsObj, state),
              state,
            ),
       state,
     );
};

let getGameObjectAllInitEventFunctionData =
    (gameObject, {scriptRecord, gameObjectRecord} as state) =>
  switch (
    GetComponentGameObjectService.getScriptComponent(.
      gameObject,
      gameObjectRecord,
    )
  ) {
  | None => WonderCommonlib.ArrayService.createEmpty()
  | Some(script) =>
    let {scriptEventFunctionDataMap} = scriptRecord;

    switch (
      scriptEventFunctionDataMap
      |> WonderCommonlib.ImmutableSparseMapService.get(script)
    ) {
    | None => WonderCommonlib.ArrayService.createEmpty()
    | Some(scriptEventFunctionData) =>
      WonderCommonlib.ArrayService.createEmpty()
      |> ArrayService.push((
           script,
           scriptEventFunctionData
           |> ImmutableHashMapService.getValues
           |> Js.Array.map(_mapEventFunctionDataFunc),
         ))
    };
  };