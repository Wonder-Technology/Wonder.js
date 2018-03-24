open MainStateDataType;

let create = () => {
  uid: 0,
  disposeCount: 0,
  disposedUidMap: WonderCommonlib.SparseMapService.createEmpty(),
  aliveUidArray: WonderCommonlib.ArrayService.createEmpty(),
  currentGeometryDataMap: WonderCommonlib.SparseMapService.createEmpty(),
  transformMap: WonderCommonlib.SparseMapService.createEmpty(),
  basicCameraViewMap: WonderCommonlib.SparseMapService.createEmpty(),
  perspectiveCameraProjectionMap: WonderCommonlib.SparseMapService.createEmpty(),
  boxGeometryMap: WonderCommonlib.SparseMapService.createEmpty(),
  customGeometryMap: WonderCommonlib.SparseMapService.createEmpty(),
  meshRendererMap: WonderCommonlib.SparseMapService.createEmpty(),
  basicMaterialMap: WonderCommonlib.SparseMapService.createEmpty(),
  lightMaterialMap: WonderCommonlib.SparseMapService.createEmpty(),
  sourceInstanceMap: WonderCommonlib.SparseMapService.createEmpty(),
  objectInstanceMap: WonderCommonlib.SparseMapService.createEmpty(),
  ambientLightMap: WonderCommonlib.SparseMapService.createEmpty(),
  directionLightMap: WonderCommonlib.SparseMapService.createEmpty(),
  pointLightMap: WonderCommonlib.SparseMapService.createEmpty()
};

let deepCopyForRestore =
    (
      {
        uid,
        disposeCount,
        disposedUidMap,
        aliveUidArray,
        currentGeometryDataMap,
        transformMap,
        basicCameraViewMap,
        perspectiveCameraProjectionMap,
        boxGeometryMap,
        customGeometryMap,
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
  currentGeometryDataMap: currentGeometryDataMap |> SparseMapService.copy,
  transformMap: transformMap |> SparseMapService.copy,
  basicCameraViewMap: basicCameraViewMap |> SparseMapService.copy,
  perspectiveCameraProjectionMap: perspectiveCameraProjectionMap |> SparseMapService.copy,
  boxGeometryMap: boxGeometryMap |> SparseMapService.copy,
  customGeometryMap: customGeometryMap |> SparseMapService.copy,
  meshRendererMap: meshRendererMap |> SparseMapService.copy,
  basicMaterialMap: basicMaterialMap |> SparseMapService.copy,
  lightMaterialMap: lightMaterialMap |> SparseMapService.copy,
  sourceInstanceMap: sourceInstanceMap |> SparseMapService.copy,
  objectInstanceMap: objectInstanceMap |> SparseMapService.copy,
  ambientLightMap: ambientLightMap |> SparseMapService.copy,
  directionLightMap: directionLightMap |> SparseMapService.copy,
  pointLightMap: pointLightMap |> SparseMapService.copy
};