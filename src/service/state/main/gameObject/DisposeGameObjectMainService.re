open StateDataMainType;

open GameObjectType;

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
          (isKeepOrder, isRemoveGeometry, isRemoveMaterial, isRemoveTexture),
          state,
        ) => {
  let state = state |> _setDisposedUidMap(uidArray);

  let {disposeCount} as record = state.gameObjectRecord;

  record.disposeCount = disposeCount + (uidArray |> Js.Array.length);
  let (
    state,
    geometryNeedDisposeVboBufferArr,
    sourceInstanceNeedDisposeVboBufferArr,
  ) =
    state
    |> DisposeGameObjectComponentMainService.batchDispose(
         (
           uidArray,
           isKeepOrder,
           isRemoveGeometry,
           isRemoveMaterial,
           isRemoveTexture,
         ),
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
    disposedUidArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedUidArrayForKeepOrder: WonderCommonlib.ArrayService.createEmpty(),
    disposedUidArrayForKeepOrderRemoveGeometry:
      WonderCommonlib.ArrayService.createEmpty(),
    disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial:
      WonderCommonlib.ArrayService.createEmpty(),
    disposedUidArrayForDisposeGeometryRemoveMaterial:
      WonderCommonlib.ArrayService.createEmpty(),
    disposedUidArrayForRemoveTexture:
      WonderCommonlib.ArrayService.createEmpty(),
    disposedBasicCameraViewArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedTransformArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedTransformArrayForKeepOrder:
      WonderCommonlib.ArrayService.createEmpty(),
    disposedPerspectiveCameraProjectionArray:
      WonderCommonlib.ArrayService.createEmpty(),
    disposedFlyCameraControllerArray:
      WonderCommonlib.ArrayService.createEmpty(),
    disposedArcballCameraControllerArray:
      WonderCommonlib.ArrayService.createEmpty(),
    disposedBasicMaterialDataMap: WonderCommonlib.ArrayService.createEmpty(),
    disposedLightMaterialDataMap: WonderCommonlib.ArrayService.createEmpty(),
    disposedLightMaterialRemoveTextureDataMap:
      WonderCommonlib.ArrayService.createEmpty(),
    disposedGeometryDataMap: WonderCommonlib.ArrayService.createEmpty(),
    disposedSourceInstanceArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedObjectInstanceArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedDirectionLightArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedPointLightArray: WonderCommonlib.ArrayService.createEmpty(),
    disposedMeshRendererComponentArray:
      WonderCommonlib.ArrayService.createEmpty(),
    disposedScriptArray: WonderCommonlib.ArrayService.createEmpty(),
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

let _deferDisposeKeepOrderRemoveGeometryRemoveMaterial =
    (uidArray: array(int), state) => {
  state.gameObjectRecord.
    disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial =
    state.gameObjectRecord.
      disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial
    |> Js.Array.concat(uidArray);
  state;
};

let deferDisposeKeepOrderRemoveGeometryRemoveMaterial = (uid: int, state) =>
  _deferDisposeKeepOrderRemoveGeometryRemoveMaterial([|uid|], state);

let deferDisposeDisposeGeometryRemoveMaterial = (uid: int, state) => {
  state.gameObjectRecord.disposedUidArrayForDisposeGeometryRemoveMaterial =
    state.gameObjectRecord.disposedUidArrayForDisposeGeometryRemoveMaterial
    |> ArrayService.push(uid);
  state;
};

let deferDisposeRemoveTexture = (uid: int, state) => {
  state.gameObjectRecord.disposedUidArrayForRemoveTexture =
    state.gameObjectRecord.disposedUidArrayForRemoveTexture
    |> ArrayService.push(uid);
  state;
};