open StateDataMainType;

open GameObjectType;

let _handleByDisposeCount = (record, state) =>
  if (QueryCPUMemoryService.isDisposeTooMany(record.disposeCount, state.settingRecord)) {
    record.disposeCount = 0;
    {
      ...state,
      gameObjectRecord: ReallocateGameObjectCPUMemoryService.reAllocate(state.gameObjectRecord)
    }
  } else {
    state
  };

let rec batchDispose =
        (
          (batchDisposeBasicMaterialComponentFunc, batchDisposeLightMaterialComponentFunc),
          uidArray: array(int),
          isKeepOrder,
          state
        ) => {
  let {disposeCount, disposedUidMap} as record = state.gameObjectRecord;
  record.disposeCount = disposeCount + (uidArray |> Js.Array.length);
  let (
    state,
    boxGeometryNeedDisposeVboBufferArr,
    customGeometryNeedDisposeVboBufferArr,
    sourceInstanceNeedDisposeVboBufferArr
  ) =
    state
    |> DisposeGameObjectComponentMainService.batchDispose(
         (uidArray, DisposeECSService.buildMapFromArray(uidArray, disposedUidMap), isKeepOrder),
         (
           batchDisposeBasicMaterialComponentFunc,
           batchDisposeLightMaterialComponentFunc,
           batchDispose
         )
       );
  let state = state |> _handleByDisposeCount(record);
  (
    state,
    boxGeometryNeedDisposeVboBufferArr,
    customGeometryNeedDisposeVboBufferArr,
    sourceInstanceNeedDisposeVboBufferArr
  )
};

let deferBatchDispose = (uidArray: array(int), state) => {
  state.gameObjectRecord.disposedUidArray =
    state.gameObjectRecord.disposedUidArray |> Js.Array.concat(uidArray);
  state
};

let deferBatchDisposeKeepOrder = (uidArray: array(int), state) => {
  state.gameObjectRecord.disposedUidArrayForKeepOrder =
    state.gameObjectRecord.disposedUidArrayForKeepOrder |> Js.Array.concat(uidArray);
  state
};

let clearDeferDisposeData = (state) => {
  ...state,
  gameObjectRecord: {
    ...state.gameObjectRecord,
    disposedUidArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedUidArrayForKeepOrder: WonderCommonlib.ArrayService.createEmpty(),
    disposedBasicCameraViewArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedTransformArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedTransformArrayForKeepOrder: WonderCommonlib.ArrayService.createEmpty(),
    disposedPerspectiveCameraProjectionArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedBasicMaterialArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedLightMaterialArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedBoxGeometryArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedCustomGeometryArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedSourceInstanceArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedObjectInstanceArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedAmbientLightArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedDirectionLightArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedPointLightArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedMeshRendererComponentArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedMeshRendererUidArray: WonderCommonlib.ArrayService.createEmpty()
  }
};

let deferDispose = (uid: int, state) => deferBatchDispose([|uid|], state);

let deferDisposeKeepOrder = (uid: int, state) => deferBatchDisposeKeepOrder([|uid|], state);