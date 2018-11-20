open ComponentType;

open TransformType;

open GeometryType;

open MeshRendererType;

open MaterialType;

open InstanceType;

open CameraControllerType;

type gameObject = int;

type gameObjectDisposedUidMap = WonderCommonlib.SparseMapService.t(bool);

type gameObjectAliveUidArray = array(gameObject);

type gameObjectComponentData = array(component);

type gameObjectTransformMap = WonderCommonlib.SparseMapService.t(transform);

type gameObjectCameraViewMap = WonderCommonlib.SparseMapService.t(component);

type gameObjectCameraProjectionMap =
  WonderCommonlib.SparseMapService.t(component);

type gameObjectCameraControllerMap =
  WonderCommonlib.SparseMapService.t(cameraController);

type gameObjectGeometryMap = WonderCommonlib.SparseMapService.t(geometry);

type gameObjectMeshRendererMap =
  WonderCommonlib.SparseMapService.t(meshRenderer);

type gameObjectMaterialMap = WonderCommonlib.SparseMapService.t(material);

type gameObjectSourceInstanceMap =
  WonderCommonlib.SparseMapService.t(sourceInstance);

type gameObjectObjectInstanceMap =
  WonderCommonlib.SparseMapService.t(objectInstance);

type gameObjectLightMap = WonderCommonlib.SparseMapService.t(int);

type basicMaterialData = (gameObject, component);

type lightMaterialData = (gameObject, component);

type geometryData = (gameObject, geometry);

type gameObjectRecord = {
  mutable uid: int,
  nameMap: WonderCommonlib.SparseMapService.t(string),
  mutable disposeCount: int,
  mutable disposedUidMap: gameObjectDisposedUidMap,
  mutable disposedUidArray: array(int),
  mutable disposedUidArrayForKeepOrder: array(int),
  mutable disposedUidArrayForKeepOrderRemoveGeometry: array(int),
  mutable disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial:
    array(int),
  mutable disposedUidArrayForDisposeGeometryRemoveMaterial: array(int),
  mutable disposedBasicCameraViewArray: array(int),
  mutable disposedTransformArray: array(int),
  mutable disposedTransformArrayForKeepOrder: array(int),
  mutable disposedPerspectiveCameraProjectionArray: array(int),
  mutable disposedArcballCameraControllerArray: array(int),
  mutable disposedBasicMaterialDataArray: array(basicMaterialData),
  mutable disposedLightMaterialDataArray: array(lightMaterialData),
  mutable disposedGeometryDataArray: array(geometryData),
  mutable disposedSourceInstanceArray: array(int),
  mutable disposedObjectInstanceArray: array(int),
  mutable disposedDirectionLightArray: array(int),
  mutable disposedPointLightArray: array(int),
  mutable disposedMeshRendererComponentArray: array(int),
  mutable aliveUidArray: gameObjectAliveUidArray,
  mutable geometryMap: gameObjectGeometryMap,
  mutable transformMap: gameObjectTransformMap,
  mutable basicCameraViewMap: gameObjectCameraViewMap,
  mutable perspectiveCameraProjectionMap: gameObjectCameraProjectionMap,
  mutable arcballCameraControllerMap: gameObjectCameraControllerMap,
  mutable meshRendererMap: gameObjectMeshRendererMap,
  mutable basicMaterialMap: gameObjectMaterialMap,
  mutable lightMaterialMap: gameObjectMaterialMap,
  mutable sourceInstanceMap: gameObjectSourceInstanceMap,
  mutable objectInstanceMap: gameObjectObjectInstanceMap,
  mutable directionLightMap: gameObjectLightMap,
  mutable pointLightMap: gameObjectLightMap,
  mutable isAliveUidArrayDirtyForDeepCopy: bool,
  mutable isGeometryMapDirtyForDeepCopy: bool,
  mutable isTransformMapDirtyForDeepCopy: bool,
  mutable isBasicCameraViewMapDirtyForDeepCopy: bool,
  mutable isPerspectiveCameraProjectionMapDirtyForDeepCopy: bool,
  mutable isArcballCameraControllerMapDirtyForDeepCopy: bool,
  mutable isMeshRendererMapDirtyForDeepCopy: bool,
  mutable isBasicMaterialMapDirtyForDeepCopy: bool,
  mutable isLightMaterialMapDirtyForDeepCopy: bool,
  mutable isSourceInstanceMapDirtyForDeepCopy: bool,
  mutable isObjectInstanceMapDirtyForDeepCopy: bool,
  mutable isDirectionLightMapDirtyForDeepCopy: bool,
  mutable isPointLightMapDirtyForDeepCopy: bool,
};