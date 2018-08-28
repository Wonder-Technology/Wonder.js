open StateDataMainType;

open GameObjectType;

let _disposeNameMap = (uidArray, {gameObjectRecord} as state) => {
  gameObjectRecord.nameMap =
    uidArray
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. nameMap, uid) =>
           nameMap |> DisposeComponentService.disposeSparseMapData(uid),
         gameObjectRecord.nameMap,
       );

  state.gameObjectRecord = gameObjectRecord;

  state;
};

let _setDisposedUidMap = (uidArray, {gameObjectRecord} as state) => {
  ...state,
  gameObjectRecord: {
    ...gameObjectRecord,
    disposedUidMap:
      DisposeECSService.buildMapFromArray(
        uidArray,
        gameObjectRecord.disposedUidMap,
      ),
  },
};

let rec batchDispose =
        (
          (
            batchDisposeBasicMaterialComponentFunc,
            batchDisposeLightMaterialComponentFunc,
          ),
          uidArray: array(int),
          (isKeepOrder, isRemoveGeometry),
          state,
        ) => {
  let state =
    state |> _disposeNameMap(uidArray) |> _setDisposedUidMap(uidArray);

  let {disposeCount} as record = state.gameObjectRecord;

  record.disposeCount = disposeCount + (uidArray |> Js.Array.length);
  let (
    state,
    geometryNeedDisposeVboBufferArr,
    sourceInstanceNeedDisposeVboBufferArr,
  ) =
    state
    |> DisposeGameObjectComponentMainService.batchDispose(
         (uidArray, isKeepOrder, isRemoveGeometry),
         (
           batchDisposeBasicMaterialComponentFunc,
           batchDisposeLightMaterialComponentFunc,
           batchDispose,
         ),
       );
  (
    state,
    geometryNeedDisposeVboBufferArr,
    sourceInstanceNeedDisposeVboBufferArr,
  );
};

let deferBatchDispose = (uidArray: array(int), state) => {
  state.gameObjectRecord.disposedUidArray =
    state.gameObjectRecord.disposedUidArray |> Js.Array.concat(uidArray);
  state;
};

let deferBatchDisposeKeepOrder = (uidArray: array(int), state) => {
  state.gameObjectRecord.disposedUidArrayForKeepOrder =
    state.gameObjectRecord.disposedUidArrayForKeepOrder
    |> Js.Array.concat(uidArray);
  state;
};

let clearDeferDisposeData = state => {
  ...state,
  gameObjectRecord: {
    ...state.gameObjectRecord,
    /* nameMap: WonderCommonlib.ArrayService.createEmpty(), */
    disposedUidArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedUidArrayForKeepOrder: WonderCommonlib.ArrayService.createEmpty(),
    disposedUidArrayForKeepOrderRemoveGeometry:
      WonderCommonlib.ArrayService.createEmpty(),
    disposedBasicCameraViewArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedTransformArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedTransformArrayForKeepOrder:
      WonderCommonlib.ArrayService.createEmpty(),
    disposedPerspectiveCameraProjectionArray:
      WonderCommonlib.ArrayService.createEmpty(),
    disposedArcballCameraControllerArray:
      WonderCommonlib.ArrayService.createEmpty(),
    disposedBasicMaterialArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedLightMaterialArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedGeometryDataArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedSourceInstanceArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedObjectInstanceArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedDirectionLightArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedPointLightArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedMeshRendererComponentArray:
      WonderCommonlib.ArrayService.createEmpty(),
  },
};

let deferDispose = (uid: int, state) => deferBatchDispose([|uid|], state);

let deferDisposeKeepOrder = (uid: int, state) =>
  deferBatchDisposeKeepOrder([|uid|], state);

let _deferBatchDisposeRemoveGeometryKeepOrder = (uidArray: array(int), state) => {
  state.gameObjectRecord.disposedUidArrayForKeepOrderRemoveGeometry =
    state.gameObjectRecord.disposedUidArrayForKeepOrderRemoveGeometry
    |> Js.Array.concat(uidArray);
  state;
};

let deferDisposeKeepOrderRemoveGeometry = (uid: int, state) =>
  _deferBatchDisposeRemoveGeometryKeepOrder([|uid|], state);