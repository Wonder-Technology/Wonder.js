open StateDataMainType;

let _disposeData = (script, {scriptRecord} as state) => {
  let {
    gameObjectMap,
    isActiveMap,
    scriptEventFunctionDataMap,
    scriptAttributeMap,
  } = scriptRecord;

  {
    ...state,
    scriptRecord: {
      ...scriptRecord,
      gameObjectMap:
        DisposeComponentService.disposeSparseMapData(script, gameObjectMap),
      isActiveMap:
        isActiveMap
        |> WonderCommonlib.MutableSparseMapService.deleteVal(script),
      scriptEventFunctionDataMap:
        scriptEventFunctionDataMap
        |> WonderCommonlib.ImmutableSparseMapService.deleteVal(script),
      scriptAttributeMap:
        scriptAttributeMap
        |> WonderCommonlib.ImmutableSparseMapService.deleteVal(script),
    },
  };
};

let _batchExecDisposeEventFunction = (scriptArray, {scriptRecord} as state) =>
  state
  |> OperateScriptEventFunctionDataMainService.execAllEventFunction(
       OperateScriptEventFunctionDataMainService.getActiveScriptAllDisposeEventFunctionData(
         scriptArray,
         state,
       ),
     );

let handleBatchDisposeComponent =
    (scriptArray: array(ComponentType.component), {scriptRecord} as state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
              scriptArray,
              DisposeScriptService.isAlive,
              scriptRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let {scriptRecord} as state =
    _batchExecDisposeEventFunction(scriptArray, state);

  let {disposedIndexArray} = scriptRecord;

  scriptArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, script) => state |> _disposeData(script),
       {
         ...state,
         scriptRecord: {
           ...scriptRecord,
           disposedIndexArray:
             disposedIndexArray |> Js.Array.concat(scriptArray),
         },
       },
     );
};