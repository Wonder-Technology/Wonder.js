open StateDataMainType;

open InstanceType;

open SourceInstanceType;

open DisposeComponentService;

let isAlive = (sourceInstance, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(sourceInstance, disposedIndexArray);

let _disposeObjectInstanceGameObject =
    (objectInstanceGameObjectArr, isKeepOrder, batchDisposeGameObjectFunc, state) =>
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
     );

let _disposeData =
    (
      sourceInstance: sourceInstance,
      isKeepOrder,
      batchDisposeGameObjectFunc,
      {typeArrayPoolRecord, settingRecord} as state
    ) => {
  let {
        objectInstanceTransformIndexMap,
        matrixFloat32ArrayMap,
        matrixInstanceBufferCapacityMap,
        isTransformStatics,
        isSendTransformMatrixDataMap,
        gameObjectMap
      } as record =
    RecordSourceInstanceMainService.getRecord(state);
  let objectInstanceGameObjectArr =
    GetObjectInstanceArrayMainService.getObjectInstanceArray(sourceInstance, state);
  let state = {
    ...state,
    sourceInstanceRecord:
      Some({
        ...record,
        objectInstanceTransformIndexMap:
          ObjectInstanceCollectionService.resetObjectInstanceTransformIndexMap(
            sourceInstance,
            objectInstanceTransformIndexMap
          ),
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
        isTransformStatics:
          [@bs]
          DisposeTypeArrayService.deleteAndResetUint8(
            sourceInstance,
            StaticTransformService.getDefault(),
            isTransformStatics
          ),
        gameObjectMap: gameObjectMap |> disposeSparseMapData(sourceInstance)
      })
  };
  let (state, _, _, _) =
    state
    |> _disposeObjectInstanceGameObject(
         objectInstanceGameObjectArr,
         isKeepOrder,
         batchDisposeGameObjectFunc
       );
  state
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
      state
    ) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                  sourceInstanceArray,
                  isAlive,
                  RecordSourceInstanceMainService.getRecord(state)
                )
              )
            )
          ),
        IsDebugMainService.getIsDebug(StateDataMain.stateData)
      );
      let {disposedIndexArray} as sourceInstanceRecord =
        RecordSourceInstanceMainService.getRecord(state);
      let state = {
        ...state,
        sourceInstanceRecord:
          Some({
            ...sourceInstanceRecord,
            disposedIndexArray: disposedIndexArray |> Js.Array.concat(sourceInstanceArray)
          })
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