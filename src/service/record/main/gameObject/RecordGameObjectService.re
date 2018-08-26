open GameObjectType;

let create = () => {
  uid: 0,
  nameMap: WonderCommonlib.SparseMapService.createEmpty(),
  disposeCount: 0,
  disposedUidMap: WonderCommonlib.SparseMapService.createEmpty(),
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
  aliveUidArray: WonderCommonlib.ArrayService.createEmpty(),
  geometryMap: WonderCommonlib.SparseMapService.createEmpty(),
  transformMap: WonderCommonlib.SparseMapService.createEmpty(),
  basicCameraViewMap: WonderCommonlib.SparseMapService.createEmpty(),
  perspectiveCameraProjectionMap:
    WonderCommonlib.SparseMapService.createEmpty(),
  arcballCameraControllerMap: WonderCommonlib.SparseMapService.createEmpty(),
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
        disposedUidArrayForKeepOrderRemoveGeometry,
        disposedBasicCameraViewArray,
        disposedTransformArray,
        disposedTransformArrayForKeepOrder,
        disposedPerspectiveCameraProjectionArray,
        disposedArcballCameraControllerArray,
        disposedBasicMaterialArray,
        disposedLightMaterialArray,
        disposedGeometryDataArray,
        disposedSourceInstanceArray,
        disposedObjectInstanceArray,
        disposedDirectionLightArray,
        disposedPointLightArray,
        disposedMeshRendererComponentArray,
        aliveUidArray,
        geometryMap,
        transformMap,
        basicCameraViewMap,
        perspectiveCameraProjectionMap,
        arcballCameraControllerMap,
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
  disposedUidArrayForKeepOrderRemoveGeometry:
    disposedUidArrayForKeepOrderRemoveGeometry |> SparseMapService.copy,
  disposedBasicCameraViewArray:
    disposedBasicCameraViewArray |> SparseMapService.copy,
  disposedTransformArray: disposedTransformArray |> SparseMapService.copy,
  disposedTransformArrayForKeepOrder:
    disposedTransformArrayForKeepOrder |> SparseMapService.copy,
  disposedPerspectiveCameraProjectionArray:
    disposedPerspectiveCameraProjectionArray |> SparseMapService.copy,
  disposedArcballCameraControllerArray:
    disposedPerspectiveCameraProjectionArray |> SparseMapService.copy,
  disposedBasicMaterialArray:
    disposedBasicMaterialArray |> SparseMapService.copy,
  disposedLightMaterialArray:
    disposedLightMaterialArray |> SparseMapService.copy,
  disposedGeometryDataArray:
    disposedGeometryDataArray |> SparseMapService.copy,
  disposedSourceInstanceArray:
    disposedSourceInstanceArray |> SparseMapService.copy,
  disposedObjectInstanceArray:
    disposedObjectInstanceArray |> SparseMapService.copy,
  disposedDirectionLightArray:
    disposedDirectionLightArray |> SparseMapService.copy,
  disposedPointLightArray: disposedPointLightArray |> SparseMapService.copy,
  disposedMeshRendererComponentArray:
    disposedMeshRendererComponentArray |> SparseMapService.copy,
  aliveUidArray: aliveUidArray |> SparseMapService.copy,
  geometryMap: geometryMap |> SparseMapService.copy,
  transformMap: transformMap |> SparseMapService.copy,
  basicCameraViewMap: basicCameraViewMap |> SparseMapService.copy,
  perspectiveCameraProjectionMap:
    perspectiveCameraProjectionMap |> SparseMapService.copy,
  arcballCameraControllerMap:
    arcballCameraControllerMap |> SparseMapService.copy,
  meshRendererMap: meshRendererMap |> SparseMapService.copy,
  basicMaterialMap: basicMaterialMap |> SparseMapService.copy,
  lightMaterialMap: lightMaterialMap |> SparseMapService.copy,
  sourceInstanceMap: sourceInstanceMap |> SparseMapService.copy,
  objectInstanceMap: objectInstanceMap |> SparseMapService.copy,
  directionLightMap: directionLightMap |> SparseMapService.copy,
  pointLightMap: pointLightMap |> SparseMapService.copy,
};