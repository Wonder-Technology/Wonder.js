open GameObjectType;

let create = () => {
  uid: 0,
  nameMap: WonderCommonlib.SparseMapService.createEmpty(),
  disposeCount: 0,
  disposedUidMap: WonderCommonlib.SparseMapService.createEmpty(),
  disposedUidArray: WonderCommonlib.ArrayService.createEmpty(),
  disposedUidArrayForKeepOrder: WonderCommonlib.ArrayService.createEmpty(),
  disposedBasicCameraViewArray: WonderCommonlib.ArrayService.createEmpty(),
  disposedTransformArray: WonderCommonlib.ArrayService.createEmpty(),
  disposedTransformArrayForKeepOrder:
    WonderCommonlib.ArrayService.createEmpty(),
  disposedPerspectiveCameraProjectionArray:
    WonderCommonlib.ArrayService.createEmpty(),
  disposedBasicMaterialArray: WonderCommonlib.ArrayService.createEmpty(),
  disposedLightMaterialArray: WonderCommonlib.ArrayService.createEmpty(),
  disposedBoxGeometryArray: WonderCommonlib.ArrayService.createEmpty(),
  disposedCustomGeometryArray: WonderCommonlib.ArrayService.createEmpty(),
  disposedSourceInstanceArray: WonderCommonlib.ArrayService.createEmpty(),
  disposedObjectInstanceArray: WonderCommonlib.ArrayService.createEmpty(),
  disposedDirectionLightArray: WonderCommonlib.ArrayService.createEmpty(),
  disposedPointLightArray: WonderCommonlib.ArrayService.createEmpty(),
  disposedMeshRendererComponentArray:
    WonderCommonlib.ArrayService.createEmpty(),
  disposedMeshRendererUidArray: WonderCommonlib.ArrayService.createEmpty(),
  aliveUidArray: WonderCommonlib.ArrayService.createEmpty(),
  geometryDataMap: WonderCommonlib.SparseMapService.createEmpty(),
  transformMap: WonderCommonlib.SparseMapService.createEmpty(),
  basicCameraViewMap: WonderCommonlib.SparseMapService.createEmpty(),
  perspectiveCameraProjectionMap:
    WonderCommonlib.SparseMapService.createEmpty(),
  meshRendererMap: WonderCommonlib.SparseMapService.createEmpty(),
  basicMaterialMap: WonderCommonlib.SparseMapService.createEmpty(),
  lightMaterialMap: WonderCommonlib.SparseMapService.createEmpty(),
  sourceInstanceMap: WonderCommonlib.SparseMapService.createEmpty(),
  objectInstanceMap: WonderCommonlib.SparseMapService.createEmpty(),
  directionLightMap: WonderCommonlib.SparseMapService.createEmpty(),
  pointLightMap: WonderCommonlib.SparseMapService.createEmpty(),
};

let deepCopyForRestore =
    (
      {
        uid,
        nameMap,
        disposeCount,
        disposedUidMap,
        disposedUidArray,
        disposedUidArrayForKeepOrder,
        disposedBasicCameraViewArray,
        disposedTransformArray,
        disposedTransformArrayForKeepOrder,
        disposedPerspectiveCameraProjectionArray,
        disposedBasicMaterialArray,
        disposedLightMaterialArray,
        disposedBoxGeometryArray,
        disposedCustomGeometryArray,
        disposedSourceInstanceArray,
        disposedObjectInstanceArray,
        disposedDirectionLightArray,
        disposedPointLightArray,
        disposedMeshRendererComponentArray,
        disposedMeshRendererUidArray,
        aliveUidArray,
        geometryDataMap,
        transformMap,
        basicCameraViewMap,
        perspectiveCameraProjectionMap,
        meshRendererMap,
        basicMaterialMap,
        lightMaterialMap,
        sourceInstanceMap,
        objectInstanceMap,
        directionLightMap,
        pointLightMap,
      } as record,
    ) => {
  ...record,
  uid,
  nameMap: nameMap |> SparseMapService.copy,
  disposeCount,
  disposedUidMap: disposedUidMap |> SparseMapService.copy,
  disposedUidArray: disposedUidArray |> SparseMapService.copy,
  disposedUidArrayForKeepOrder:
    disposedUidArrayForKeepOrder |> SparseMapService.copy,
  disposedBasicCameraViewArray:
    disposedBasicCameraViewArray |> SparseMapService.copy,
  disposedTransformArray: disposedTransformArray |> SparseMapService.copy,
  disposedTransformArrayForKeepOrder:
    disposedTransformArrayForKeepOrder |> SparseMapService.copy,
  disposedPerspectiveCameraProjectionArray:
    disposedPerspectiveCameraProjectionArray |> SparseMapService.copy,
  disposedBasicMaterialArray:
    disposedBasicMaterialArray |> SparseMapService.copy,
  disposedLightMaterialArray:
    disposedLightMaterialArray |> SparseMapService.copy,
  disposedBoxGeometryArray: disposedBoxGeometryArray |> SparseMapService.copy,
  disposedCustomGeometryArray:
    disposedCustomGeometryArray |> SparseMapService.copy,
  disposedSourceInstanceArray:
    disposedSourceInstanceArray |> SparseMapService.copy,
  disposedObjectInstanceArray:
    disposedObjectInstanceArray |> SparseMapService.copy,
  disposedDirectionLightArray:
    disposedDirectionLightArray |> SparseMapService.copy,
  disposedPointLightArray: disposedPointLightArray |> SparseMapService.copy,
  disposedMeshRendererComponentArray:
    disposedMeshRendererComponentArray |> SparseMapService.copy,
  disposedMeshRendererUidArray:
    disposedMeshRendererUidArray |> SparseMapService.copy,
  aliveUidArray: aliveUidArray |> SparseMapService.copy,
  geometryDataMap: geometryDataMap |> SparseMapService.copy,
  transformMap: transformMap |> SparseMapService.copy,
  basicCameraViewMap: basicCameraViewMap |> SparseMapService.copy,
  perspectiveCameraProjectionMap:
    perspectiveCameraProjectionMap |> SparseMapService.copy,
  meshRendererMap: meshRendererMap |> SparseMapService.copy,
  basicMaterialMap: basicMaterialMap |> SparseMapService.copy,
  lightMaterialMap: lightMaterialMap |> SparseMapService.copy,
  sourceInstanceMap: sourceInstanceMap |> SparseMapService.copy,
  objectInstanceMap: objectInstanceMap |> SparseMapService.copy,
  directionLightMap: directionLightMap |> SparseMapService.copy,
  pointLightMap: pointLightMap |> SparseMapService.copy,
};