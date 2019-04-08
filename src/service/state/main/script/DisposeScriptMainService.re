open StateDataMainType;

let isAlive = (script, {disposedIndexArray}: scriptRecord) =>
  DisposeComponentService.isAlive(script, disposedIndexArray);

let _disposeData = (script, {scriptRecord} as state) => {
  let {gameObjectMap, scriptEventFunctionDataMap, scriptAttributeMap} = scriptRecord;

  {
    ...state,
    scriptRecord: {
      ...scriptRecord,
      gameObjectMap:
        DisposeComponentService.disposeSparseMapData(script, gameObjectMap),
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
       OperateScriptEventFunctionDataMainService.getScriptAllDisposeEventFunctionData(
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
              isAlive,
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