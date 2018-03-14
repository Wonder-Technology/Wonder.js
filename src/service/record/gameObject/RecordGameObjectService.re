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
  disposedUidMap: disposedUidMap |> SparseMapService.copy,
  aliveUidArray: aliveUidArray |> SparseMapService.copy,
  transformMap: transformMap |> SparseMapService.copy,
  basicCameraViewMap: basicCameraViewMap |> SparseMapService.copy,
  perspectiveCameraProjectionMap: perspectiveCameraProjectionMap |> SparseMapService.copy,
  boxGeometryMap: boxGeometryMap |> SparseMapService.copy,
  meshRendererMap: meshRendererMap |> SparseMapService.copy,
  basicMaterialMap: basicMaterialMap |> SparseMapService.copy,
  lightMaterialMap: lightMaterialMap |> SparseMapService.copy,
  sourceInstanceMap: sourceInstanceMap |> SparseMapService.copy,
  objectInstanceMap: objectInstanceMap |> SparseMapService.copy,
  ambientLightMap: ambientLightMap |> SparseMapService.copy,
  directionLightMap: directionLightMap |> SparseMapService.copy,
  pointLightMap: pointLightMap |> SparseMapService.copy
};