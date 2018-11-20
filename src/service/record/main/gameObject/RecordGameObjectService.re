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
  disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial:
    WonderCommonlib.ArrayService.createEmpty(),
  disposedUidArrayForDisposeGeometryRemoveMaterial:
    WonderCommonlib.ArrayService.createEmpty(),
  disposedBasicCameraViewArray: WonderCommonlib.ArrayService.createEmpty(),
  disposedTransformArray: WonderCommonlib.ArrayService.createEmpty(),
  disposedTransformArrayForKeepOrder:
    WonderCommonlib.ArrayService.createEmpty(),
  disposedPerspectiveCameraProjectionArray:
    WonderCommonlib.ArrayService.createEmpty(),
  disposedArcballCameraControllerArray:
    WonderCommonlib.ArrayService.createEmpty(),
  disposedBasicMaterialDataArray: WonderCommonlib.ArrayService.createEmpty(),
  disposedLightMaterialDataArray: WonderCommonlib.ArrayService.createEmpty(),
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
  isAliveUidArrayDirtyForDeepCopy: true,
  isGeometryMapDirtyForDeepCopy: true,
  isTransformMapDirtyForDeepCopy: true,
  isBasicCameraViewMapDirtyForDeepCopy: true,
  isPerspectiveCameraProjectionMapDirtyForDeepCopy: true,
  isArcballCameraControllerMapDirtyForDeepCopy: true,
  isMeshRendererMapDirtyForDeepCopy: true,
  isBasicMaterialMapDirtyForDeepCopy: true,
  isLightMaterialMapDirtyForDeepCopy: true,
  isSourceInstanceMapDirtyForDeepCopy: true,
  isObjectInstanceMapDirtyForDeepCopy: true,
  isDirectionLightMapDirtyForDeepCopy: true,
  isPointLightMapDirtyForDeepCopy: true,
};

let _isGameObjectHasDisposedAtLeastOnce =
    (
      {
        disposedUidArray,
        disposedUidArrayForKeepOrder,
        disposedUidArrayForKeepOrderRemoveGeometry,
        disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial,
        disposedUidArrayForDisposeGeometryRemoveMaterial,
      },
    ) =>
  disposedUidArray
  |> Js.Array.length > 0
  || disposedUidArrayForKeepOrder
  |> Js.Array.length > 0
  || disposedUidArrayForKeepOrderRemoveGeometry
  |> Js.Array.length > 0
  || disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial
  |> Js.Array.length > 0
  || disposedUidArrayForDisposeGeometryRemoveMaterial
  |> Js.Array.length > 0;

let markAllDirtyForRestore = (isDirty, record) => {
  record.isAliveUidArrayDirtyForDeepCopy = isDirty;
  record.isGeometryMapDirtyForDeepCopy = isDirty;
  record.isTransformMapDirtyForDeepCopy = isDirty;
  record.isBasicCameraViewMapDirtyForDeepCopy = isDirty;
  record.isPerspectiveCameraProjectionMapDirtyForDeepCopy = isDirty;
  record.isArcballCameraControllerMapDirtyForDeepCopy = isDirty;
  record.isMeshRendererMapDirtyForDeepCopy = isDirty;
  record.isBasicMaterialMapDirtyForDeepCopy = isDirty;
  record.isLightMaterialMapDirtyForDeepCopy = isDirty;
  record.isSourceInstanceMapDirtyForDeepCopy = isDirty;
  record.isObjectInstanceMapDirtyForDeepCopy = isDirty;
  record.isDirectionLightMapDirtyForDeepCopy = isDirty;
  record.isPointLightMapDirtyForDeepCopy = isDirty;

  record;
};

let _markSourceRecordNotDirty = sourceRecord =>
  markAllDirtyForRestore(false, sourceRecord) |> ignore;

let deepCopyForRestore = record => {
  let {
        uid,
        disposeCount,
        disposedUidMap,
        disposedUidArray,
        disposedUidArrayForKeepOrder,
        disposedUidArrayForKeepOrderRemoveGeometry,
        disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial,
        disposedUidArrayForDisposeGeometryRemoveMaterial,
        disposedBasicCameraViewArray,
        disposedTransformArray,
        disposedTransformArrayForKeepOrder,
        disposedPerspectiveCameraProjectionArray,
        disposedArcballCameraControllerArray,
        disposedBasicMaterialDataArray,
        disposedLightMaterialDataArray,
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
        isAliveUidArrayDirtyForDeepCopy,
        isGeometryMapDirtyForDeepCopy,
        isTransformMapDirtyForDeepCopy,
        isBasicCameraViewMapDirtyForDeepCopy,
        isPerspectiveCameraProjectionMapDirtyForDeepCopy,
        isArcballCameraControllerMapDirtyForDeepCopy,
        isMeshRendererMapDirtyForDeepCopy,
        isBasicMaterialMapDirtyForDeepCopy,
        isLightMaterialMapDirtyForDeepCopy,
        isSourceInstanceMapDirtyForDeepCopy,
        isObjectInstanceMapDirtyForDeepCopy,
        isDirectionLightMapDirtyForDeepCopy,
        isPointLightMapDirtyForDeepCopy,
      } as record =
    _isGameObjectHasDisposedAtLeastOnce(record) ?
      markAllDirtyForRestore(true, record) : record;

  _markSourceRecordNotDirty(record);

  {
    ...record,
    uid,
    disposeCount,
    disposedUidMap: disposedUidMap |> SparseMapService.copy,
    disposedUidArray: disposedUidArray |> SparseMapService.copy,
    disposedUidArrayForKeepOrder:
      disposedUidArrayForKeepOrder |> SparseMapService.copy,
    disposedUidArrayForKeepOrderRemoveGeometry:
      disposedUidArrayForKeepOrderRemoveGeometry |> SparseMapService.copy,
    disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial:
      disposedUidArrayForKeepOrderRemoveGeometry |> SparseMapService.copy,
    disposedUidArrayForDisposeGeometryRemoveMaterial:
      disposedUidArrayForDisposeGeometryRemoveMaterial |> SparseMapService.copy,
    disposedBasicCameraViewArray:
      disposedBasicCameraViewArray |> SparseMapService.copy,
    disposedTransformArray: disposedTransformArray |> SparseMapService.copy,
    disposedTransformArrayForKeepOrder:
      disposedTransformArrayForKeepOrder |> SparseMapService.copy,
    disposedPerspectiveCameraProjectionArray:
      disposedPerspectiveCameraProjectionArray |> SparseMapService.copy,
    disposedArcballCameraControllerArray:
      disposedPerspectiveCameraProjectionArray |> SparseMapService.copy,
    disposedBasicMaterialDataArray:
      disposedBasicMaterialDataArray |> SparseMapService.copy,
    disposedLightMaterialDataArray:
      disposedLightMaterialDataArray |> SparseMapService.copy,
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
    aliveUidArray:
      isAliveUidArrayDirtyForDeepCopy ?
        aliveUidArray |> SparseMapService.copy : aliveUidArray,
    geometryMap:
      isGeometryMapDirtyForDeepCopy ?
        geometryMap |> SparseMapService.copy : geometryMap,
    transformMap:
      isTransformMapDirtyForDeepCopy ?
        transformMap |> SparseMapService.copy : transformMap,
    basicCameraViewMap:
      isBasicCameraViewMapDirtyForDeepCopy ?
        basicCameraViewMap |> SparseMapService.copy : basicCameraViewMap,
    perspectiveCameraProjectionMap:
      isPerspectiveCameraProjectionMapDirtyForDeepCopy ?
        perspectiveCameraProjectionMap |> SparseMapService.copy :
        perspectiveCameraProjectionMap,
    arcballCameraControllerMap:
      isArcballCameraControllerMapDirtyForDeepCopy ?
        arcballCameraControllerMap |> SparseMapService.copy :
        arcballCameraControllerMap,
    meshRendererMap:
      isMeshRendererMapDirtyForDeepCopy ?
        meshRendererMap |> SparseMapService.copy : meshRendererMap,
    basicMaterialMap:
      isBasicMaterialMapDirtyForDeepCopy ?
        basicMaterialMap |> SparseMapService.copy : basicMaterialMap,
    lightMaterialMap:
      isLightMaterialMapDirtyForDeepCopy ?
        lightMaterialMap |> SparseMapService.copy : lightMaterialMap,
    sourceInstanceMap:
      isSourceInstanceMapDirtyForDeepCopy ?
        sourceInstanceMap |> SparseMapService.copy : sourceInstanceMap,
    objectInstanceMap:
      isObjectInstanceMapDirtyForDeepCopy ?
        objectInstanceMap |> SparseMapService.copy : objectInstanceMap,
    directionLightMap:
      isDirectionLightMapDirtyForDeepCopy ?
        directionLightMap |> SparseMapService.copy : directionLightMap,
    pointLightMap:
      isPointLightMapDirtyForDeepCopy ?
        pointLightMap |> SparseMapService.copy : pointLightMap,
  }
  |> markAllDirtyForRestore(false);
};