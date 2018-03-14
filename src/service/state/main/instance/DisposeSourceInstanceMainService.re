open MainStateDataType;

open SourceInstanceType;

open DisposeComponentService;

let isAlive = (sourceInstance, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(sourceInstance, disposedIndexArray);

let _disposeObjectInstanceGameObject =
    (sourceInstance: sourceInstance, batchDisposeGameObjectFunc, {sourceInstanceRecord} as state) => {
  let objectInstanceGameObjectArr =
    ObjectInstanceArraySourceInstanceService.unsafeGetObjectInstanceArray(
      sourceInstance,
      sourceInstanceRecord.objectInstanceArrayMap
    )
    |> Js.Array.copy;
  batchDisposeGameObjectFunc(objectInstanceGameObjectArr, state)
};

let _disposeData =
    (sourceInstance: sourceInstance, batchDisposeGameObjectFunc, {vboBufferRecord} as state) => {
  let {sourceInstanceRecord, typeArrayPoolRecord, settingRecord} as state =
    {
      ...state,
      vboBufferRecord:
        DisposeVboBufferService.disposeInstanceBufferData(sourceInstance, vboBufferRecord)
    }
    |> _disposeObjectInstanceGameObject(sourceInstance, batchDisposeGameObjectFunc);
  let {
        objectInstanceArrayMap,
        matrixFloat32ArrayMap,
        matrixInstanceBufferCapacityMap,
        isTransformStaticMap,
        isSendTransformMatrixDataMap,
        gameObjectMap
      } as record = sourceInstanceRecord;
  switch (matrixFloat32ArrayMap |> WonderCommonlib.SparseMapSystem.get(sourceInstance)) {
  | Some(typeArr) =>
    [@bs]
    TypeArrayPoolService.addFloat32TypeArrayToPool(
      typeArr,
      MemorySettingService.getMaxBigTypeArrayPoolSize(state.settingRecord),
      TypeArrayPoolService.getFloat32ArrayPoolMap(typeArrayPoolRecord)
    )
    |> ignore
  | None => ()
  };
  {
    ...state,
    sourceInstanceRecord: {
      ...record,
      objectInstanceArrayMap: objectInstanceArrayMap |> disposeSparseMapData(sourceInstance),
      matrixFloat32ArrayMap: matrixFloat32ArrayMap |> disposeSparseMapData(sourceInstance),
      matrixInstanceBufferCapacityMap:
        matrixInstanceBufferCapacityMap |> disposeSparseMapData(sourceInstance),
      isTransformStaticMap: isTransformStaticMap |> disposeSparseMapData(sourceInstance),
      isSendTransformMatrixDataMap:
        isSendTransformMatrixDataMap |> disposeSparseMapData(sourceInstance),
      gameObjectMap: gameObjectMap |> disposeSparseMapData(sourceInstance)
    }
  }
};

let handleDisposeComponent =
  [@bs]
  (
    (
      sourceInstance: sourceInstance,
      batchDisposeGameObjectFunc,
      {vboBufferRecord, typeArrayPoolRecord, sourceInstanceRecord} as state
    ) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                DisposeComponentService.checkComponentShouldAlive(
                  sourceInstance,
                  isAlive,
                  sourceInstanceRecord
                )
              )
            )
          ),
        IsDebugMainService.getIsDebug(MainStateData.stateData)
      );
      let {disposedIndexArray} = sourceInstanceRecord;
      let state = {
        ...state,
        vboBufferRecord:
          PoolVboBufferService.addInstanceBufferToPool(sourceInstance, vboBufferRecord)
      };
      let state = state |> _disposeData(sourceInstance, batchDisposeGameObjectFunc);
      {
        ...state,
        sourceInstanceRecord: {
          ...state.sourceInstanceRecord,
          disposedIndexArray: disposedIndexArray |> ArrayService.push(sourceInstance)
        }
      }
    }
  );

let handleBatchDisposeComponent =
  [@bs]
  (
    (
      sourceInstanceArray: array(sourceInstance),
      gameSourceUidMap: array(bool),
      batchDisposeGameObjectFunc,
      {vboBufferRecord, sourceInstanceRecord} as state
    ) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                  sourceInstanceArray,
                  isAlive,
                  sourceInstanceRecord
                )
              )
            )
          ),
        IsDebugMainService.getIsDebug(MainStateData.stateData)
      );
      let {disposedIndexArray} = sourceInstanceRecord;
      let state = {
        ...state,
        sourceInstanceRecord: {
          ...sourceInstanceRecord,
          disposedIndexArray: disposedIndexArray |> Js.Array.concat(sourceInstanceArray)
        }
      };
      sourceInstanceArray
      |> ReduceStateMainService.reduceState(
           [@bs]
           (
             (state, sourceInstance) =>
               {
                 ...state,
                 vboBufferRecord:
                   vboBufferRecord |> PoolVboBufferService.addInstanceBufferToPool(sourceInstance)
               }
               |> _disposeData(sourceInstance, batchDisposeGameObjectFunc)
           ),
           state
         )
    }
  );