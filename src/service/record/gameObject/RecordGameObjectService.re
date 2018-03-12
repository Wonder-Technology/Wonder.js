open GameObjectType;

let create = () => {
  uid: 0,
  disposeCount: 0,
  disposedUidMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  aliveUidArray: WonderCommonlib.ArraySystem.createEmpty(),
  transformMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  basicCameraViewMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  perspectiveCameraProjectionMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  boxGeometryMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  meshRendererMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  basicMaterialMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  lightMaterialMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  sourceInstanceMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  objectInstanceMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  ambientLightMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  directionLightMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  pointLightMap: WonderCommonlib.SparseMapSystem.createEmpty()
};

let deepCopyForRestore =
    (
      {
        uid,
        disposeCount,
        disposedUidMap,
        aliveUidArray,
        transformMap,
        basicCameraViewMap,
        perspectiveCameraProjectionMap,
        boxGeometryMap,
        meshRendererMap,
        basicMaterialMap,
        lightMaterialMap,
        sourceInstanceMap,
        objectInstanceMap,
        ambientLightMap,
        directionLightMap,
        pointLightMap
      } as record
    ) => {
  ...record,
  uid,
  disposeCount,
  disposedUidMap: disposedUidMap |> SparseMapSystem.copy,
  aliveUidArray: aliveUidArray |> SparseMapSystem.copy,
  transformMap: transformMap |> SparseMapSystem.copy,
  basicCameraViewMap: basicCameraViewMap |> SparseMapSystem.copy,
  perspectiveCameraProjectionMap: perspectiveCameraProjectionMap |> SparseMapSystem.copy,
  boxGeometryMap: boxGeometryMap |> SparseMapSystem.copy,
  meshRendererMap: meshRendererMap |> SparseMapSystem.copy,
  basicMaterialMap: basicMaterialMap |> SparseMapSystem.copy,
  lightMaterialMap: lightMaterialMap |> SparseMapSystem.copy,
  sourceInstanceMap: sourceInstanceMap |> SparseMapSystem.copy,
  objectInstanceMap: objectInstanceMap |> SparseMapSystem.copy,
  ambientLightMap: ambientLightMap |> SparseMapSystem.copy,
  directionLightMap: directionLightMap |> SparseMapSystem.copy,
  pointLightMap: pointLightMap |> SparseMapSystem.copy
};