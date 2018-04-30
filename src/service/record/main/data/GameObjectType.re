open ComponentType;

open TransformType;

open GeometryType;

open BoxGeometryType;

open MeshRendererType;

open MaterialType;

open InstanceType;

type gameObject = int;

type gameObjectDisposedUidMap = WonderCommonlib.SparseMapService.t(bool);

type gameObjectAliveUidArray = array(gameObject);

type gameObjectComponentData = array(component);

type gameObjectTransformMap = WonderCommonlib.SparseMapService.t(transform);

type gameObjectCameraViewMap = WonderCommonlib.SparseMapService.t(component);

type gameObjectCameraProjectionMap = WonderCommonlib.SparseMapService.t(component);

type gameObjectGeometryMap = WonderCommonlib.SparseMapService.t(geometry);

type gameObjectMeshRendererMap = WonderCommonlib.SparseMapService.t(meshRenderer);

type gameObjectMaterialMap = WonderCommonlib.SparseMapService.t(material);

type gameObjectSourceInstanceMap = WonderCommonlib.SparseMapService.t(sourceInstance);

type gameObjectObjectInstanceMap = WonderCommonlib.SparseMapService.t(objectInstance);

type gameObjectLightMap = WonderCommonlib.SparseMapService.t(int);

type gameObjectCurrentGeometryDataMap = WonderCommonlib.SparseMapService.t((geometry, int));

type gameObjectRecord = {
  mutable uid: int,
  mutable disposeCount: int,
  mutable disposedUidMap: gameObjectDisposedUidMap,
  mutable disposedUidArray: array(int),
  mutable disposedUidArrayForKeepOrder: array(int),
  mutable disposedBasicCameraViewArray: array(int),
  mutable disposedTransformArray: array(int),
  mutable disposedTransformArrayForKeepOrder: array(int),
  mutable disposedPerspectiveCameraProjectionArray: array(int),
  mutable disposedBasicMaterialArray: array(int),
  mutable disposedLightMaterialArray: array(int),
  mutable disposedBoxGeometryArray: array(int),
  mutable disposedCustomGeometryArray: array(int),
  mutable disposedSourceInstanceArray: array(int),
  mutable disposedObjectInstanceArray: array(int),
  mutable disposedAmbientLightArray: array(int),
  mutable disposedDirectionLightArray: array(int),
  mutable disposedPointLightArray: array(int),
  mutable disposedMeshRendererComponentArray: array(int),
  mutable disposedMeshRendererUidArray: array(int),
  mutable aliveUidArray: gameObjectAliveUidArray,
  mutable currentGeometryDataMap: gameObjectCurrentGeometryDataMap,
  mutable transformMap: gameObjectTransformMap,
  mutable basicCameraViewMap: gameObjectCameraViewMap,
  mutable perspectiveCameraProjectionMap: gameObjectCameraProjectionMap,
  mutable meshRendererMap: gameObjectMeshRendererMap,
  mutable basicMaterialMap: gameObjectMaterialMap,
  mutable lightMaterialMap: gameObjectMaterialMap,
  mutable sourceInstanceMap: gameObjectSourceInstanceMap,
  mutable objectInstanceMap: gameObjectObjectInstanceMap,
  mutable ambientLightMap: gameObjectLightMap,
  mutable directionLightMap: gameObjectLightMap,
  mutable pointLightMap: gameObjectLightMap
};