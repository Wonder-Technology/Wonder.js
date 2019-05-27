open ComponentType;

open GameObjectPrimitiveType;

open TransformType;

open GeometryType;

open MeshRendererType;

open MaterialType;

open InstanceType;

open CameraControllerType;

type gameObjectDisposedUidMap =
  WonderCommonlib.MutableSparseMapService.t(bool);

type gameObjectAliveUidArray = array(gameObject);

type gameObjectComponentData = array(component);

type gameObjectTransformMap =
  WonderCommonlib.MutableSparseMapService.t(transform);

type gameObjectCameraViewMap =
  WonderCommonlib.MutableSparseMapService.t(component);

type gameObjectCameraProjectionMap =
  WonderCommonlib.MutableSparseMapService.t(component);

type gameObjectCameraControllerMap =
  WonderCommonlib.MutableSparseMapService.t(cameraController);

type gameObjectGeometryMap =
  WonderCommonlib.MutableSparseMapService.t(geometry);

type gameObjectMeshRendererMap =
  WonderCommonlib.MutableSparseMapService.t(meshRenderer);

type gameObjectMaterialMap =
  WonderCommonlib.MutableSparseMapService.t(material);

type gameObjectSourceInstanceMap =
  WonderCommonlib.MutableSparseMapService.t(sourceInstance);

type gameObjectObjectInstanceMap =
  WonderCommonlib.MutableSparseMapService.t(objectInstance);

type gameObjectLightMap = WonderCommonlib.MutableSparseMapService.t(int);

type gameObjectScriptMap = WonderCommonlib.MutableSparseMapService.t(int);

type basicMaterialData = (gameObject, component);

type lightMaterialData = (gameObject, component);

type geometryData = (gameObject, geometry);

type disposedComponentDataMap =
  WonderCommonlib.MutableSparseMapService.t(array(gameObject));

type gameObjectRecord = {
  mutable uid: int,
  mutable nameMap: WonderCommonlib.MutableSparseMapService.t(string),
  mutable isRootMap: WonderCommonlib.MutableSparseMapService.t(bool),
  mutable isActiveMap: WonderCommonlib.MutableSparseMapService.t(bool),
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
  mutable disposedBasicMaterialDataMap: disposedComponentDataMap,
  mutable disposedLightMaterialDataMap: disposedComponentDataMap,
  mutable disposedGeometryDataMap: disposedComponentDataMap,
  mutable disposedSourceInstanceArray: array(int),
  mutable disposedObjectInstanceArray: array(int),
  mutable disposedDirectionLightArray: array(int),
  mutable disposedPointLightArray: array(int),
  mutable disposedMeshRendererComponentArray: array(int),
  mutable disposedScriptArray: array(int),
  mutable aliveUidArray: gameObjectAliveUidArray,
  mutable geometryMap: gameObjectGeometryMap,
  mutable transformMap: gameObjectTransformMap,
  mutable basicCameraViewMap: gameObjectCameraViewMap,
  mutable perspectiveCameraProjectionMap: gameObjectCameraProjectionMap,
  mutable arcballCameraControllerMap: gameObjectCameraControllerMap,
  mutable flyCameraControllerMap: gameObjectCameraControllerMap,
  mutable meshRendererMap: gameObjectMeshRendererMap,
  mutable basicMaterialMap: gameObjectMaterialMap,
  mutable lightMaterialMap: gameObjectMaterialMap,
  mutable sourceInstanceMap: gameObjectSourceInstanceMap,
  mutable objectInstanceMap: gameObjectObjectInstanceMap,
  mutable directionLightMap: gameObjectLightMap,
  mutable pointLightMap: gameObjectLightMap,
  mutable scriptMap: gameObjectScriptMap,
};