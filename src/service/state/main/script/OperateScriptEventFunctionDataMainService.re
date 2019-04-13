open StateDataMainType;

let _pushEventFunctionData =
    (script, scriptEventFunctionData, mapEventFunctionDataFunc, arr) =>
  arr
  |> ArrayService.push((
       script,
       scriptEventFunctionData
       |> WonderCommonlib.ImmutableHashMapService.getValidValues
       |> Js.Array.map(mapEventFunctionDataFunc)
       |> Js.Array.filter(func => func |> Js.Option.isSome)
       |> Js.Array.map(func => func |> OptionService.unsafeGet),
     ));

let _getAllEventFunctionData =
    (mapEventFunctionDataFunc, {scriptRecord} as state) => {
  let {scriptEventFunctionDataMap} = scriptRecord;

  scriptEventFunctionDataMap
  |> WonderCommonlib.ImmutableSparseMapService.reduceiValid(
       (. arr, scriptEventFunctionData, script) =>
         IsActiveScriptMainService.unsafeGetIsActive(script, state) ?
           _pushEventFunctionData(
             script,
             scriptEventFunctionData,
             mapEventFunctionDataFunc,
             arr,
           ) :
           arr,
       WonderCommonlib.ArrayService.createEmpty(),
     );
};

let getAllActiveUpdateEventFunctionData = ({scriptRecord} as state) =>
  _getAllEventFunctionData(({update}) => update, state);

let _mapInitEventFunctionDataFunc = ({init}) => init;

let getAllActiveInitEventFunctionData = ({scriptRecord} as state) =>
  _getAllEventFunctionData(_mapInitEventFunctionDataFunc, state);

let enableScriptEventFunction = ({scriptRecord} as state) => {
  ...state,
  scriptRecord: {
    ...scriptRecord,
    isScriptEventFunctionEnable: true,
  },
};

let disableScriptEventFunction = ({scriptRecord} as state) => {
  ...state,
  scriptRecord: {
    ...scriptRecord,
    isScriptEventFunctionEnable: false,
  },
};

let isScriptEventFunctionEnable = ({scriptRecord} as state) =>
  scriptRecord.isScriptEventFunctionEnable;

let execAllEventFunction = (allEventFunctionData, state) =>
  isScriptEventFunctionEnable(state) ?
    {
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
    } :
    state;

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
      _pushEventFunctionData(
        script,
        scriptEventFunctionData,
        _mapInitEventFunctionDataFunc,
        WonderCommonlib.ArrayService.createEmpty(),
      )
    };
  };

let _mapDisposeEventFunctionDataFunc = ({dispose}) => dispose;

let getActiveScriptAllDisposeEventFunctionData =
    (scriptArray, {scriptRecord} as state) => {
  let {scriptEventFunctionDataMap} = scriptRecord;

  scriptArray
  |> Js.Array.filter(script =>
       IsActiveScriptMainService.unsafeGetIsActive(script, state)
     )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. arr, script) =>
         switch (
           scriptEventFunctionDataMap
           |> WonderCommonlib.ImmutableSparseMapService.get(script)
         ) {
         | None => arr
         | Some(scriptEventFunctionData) =>
           _pushEventFunctionData(
             script,
             scriptEventFunctionData,
             _mapDisposeEventFunctionDataFunc,
             arr,
           )
         },
       WonderCommonlib.ArrayService.createEmpty(),
     );
};