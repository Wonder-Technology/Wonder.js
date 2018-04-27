open StateDataMainType;

open InstanceType;

open SourceInstanceType;

open DisposeComponentService;

let isAlive = (sourceInstance, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(sourceInstance, disposedIndexArray);

let _disposeObjectInstanceGameObject =
    (
      sourceInstance: sourceInstance,
      isKeepOrder,
      batchDisposeGameObjectFunc,
      {sourceInstanceRecord} as state
    ) => {
  let transformRecord = RecordTransformMainService.getRecord(state);
  let objectInstanceGameObjectArr =
    GetObjectInstanceArrayMainService.getObjectInstanceArray(
      sourceInstance,
      sourceInstanceRecord,
      transformRecord
    )
    |> Js.Array.copy;
  batchDisposeGameObjectFunc(objectInstanceGameObjectArr, isKeepOrder, state)
  |> WonderLog.Contract.ensureCheck(
       (
         (
           state,
           boxGeometryNeedDisposeVboBufferArr,
           customGeometryNeedDisposeVboBufferArr,
           sourceInstanceNeedDisposeVboBufferArr
         )
       ) => {
         open WonderLog;
         open Contract;
         open Operators;
         test(
           Log.buildAssertMessage(
             ~expect={j|boxGeometryNeedDisposeVboBufferArr from object instance gameObject should be empty|j},
             ~actual={j|is $boxGeometryNeedDisposeVboBufferArr|j}
           ),
           () => boxGeometryNeedDisposeVboBufferArr |> Js.Array.length == 0
         );
         test(
           Log.buildAssertMessage(
             ~expect={j|customGeometryNeedDisposeVboBufferArr from object instance gameObject should be empty|j},
             ~actual={j|is $customGeometryNeedDisposeVboBufferArr|j}
           ),
           () => customGeometryNeedDisposeVboBufferArr |> Js.Array.length == 0
         );
         test(
           Log.buildAssertMessage(
             ~expect={j|sourceInstanceNeedDisposeVboBufferArr from object instance gameObject should be empty|j},
             ~actual={j|is $sourceInstanceNeedDisposeVboBufferArr|j}
           ),
           () => sourceInstanceNeedDisposeVboBufferArr |> Js.Array.length == 0
         )
       },
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     )
};

let _disposeData = (sourceInstance: sourceInstance, isKeepOrder, batchDisposeGameObjectFunc, state) => {
  let ({sourceInstanceRecord, typeArrayPoolRecord, settingRecord} as state, _, _, _) =
    state
    |> _disposeObjectInstanceGameObject(sourceInstance, isKeepOrder, batchDisposeGameObjectFunc);
  let {
        objectInstanceTransformArrayMap,
        matrixFloat32ArrayMap,
        matrixInstanceBufferCapacityMap,
        isTransformStaticMap,
        isSendTransformMatrixDataMap,
        gameObjectMap
      } as record = sourceInstanceRecord;
  {
    ...state,
    sourceInstanceRecord: {
      ...record,
      objectInstanceTransformArrayMap:
        objectInstanceTransformArrayMap |> disposeSparseMapData(sourceInstance),
      matrixFloat32ArrayMap:
        DisposeSourceInstanceAllService.disposeMatrixFloat32ArrayMap(
          sourceInstance,
          MemorySettingService.getMaxBigTypeArrayPoolSize(state.settingRecord),
          matrixFloat32ArrayMap,
          typeArrayPoolRecord
        ),
      matrixInstanceBufferCapacityMap:
        DisposeSourceInstanceAllService.disposeMatrixInstanceBufferCapacityMap(
          sourceInstance,
          matrixInstanceBufferCapacityMap
        ),
      isSendTransformMatrixDataMap:
        DisposeSourceInstanceAllService.disposeIsSendTransformMatrixDataMap(
          sourceInstance,
          isSendTransformMatrixDataMap
        ),
      isTransformStaticMap: isTransformStaticMap |> disposeSparseMapData(sourceInstance),
      gameObjectMap: gameObjectMap |> disposeSparseMapData(sourceInstance)
    }
  }
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (
      sourceInstanceArray: array(sourceInstance),
      isKeepOrder: bool,
      batchDisposeGameObjectFunc:
        (array(int), bool, StateDataMainType.state) =>
        (StateDataMainType.state, array(int), array(int), array(int)),
      {sourceInstanceRecord} as state
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
        IsDebugMainService.getIsDebug(StateDataMain.stateData)
      );
      let {disposedIndexArray} = sourceInstanceRecord;
      let state = {
        ...state,
        sourceInstanceRecord: {
          ...sourceInstanceRecord,
          disposedIndexArray: disposedIndexArray |> Js.Array.concat(sourceInstanceArray)
        }
      };
      (
        sourceInstanceArray
        |> WonderCommonlib.ArrayService.reduceOneParam(
             [@bs]
             (
               (state, sourceInstance) =>
                 state |> _disposeData(sourceInstance, isKeepOrder, batchDisposeGameObjectFunc)
             ),
             state
           ),
        sourceInstanceArray |> Js.Array.copy
      )
    }
  );