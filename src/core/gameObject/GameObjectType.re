open TransformType;

open CameraControllerType;

open GeometryType;

open MeshRendererType;

open MaterialType;

type gameObject = string;

type gameObjectDisposedUidMap = Js.Dict.t(bool);

type gameObjectAliveUidArray = array(gameObject);

type gameObjectComponentData = Js.Dict.t(ComponentType.component);

type gameObjectTransformMap = Js.Dict.t(transform);

type gameObjectCameraControllerMap = Js.Dict.t(cameraController);

type gameObjectGeometryMap = Js.Dict.t(geometry);

type gameObjectMeshRendererMap = Js.Dict.t(meshRenderer);

type gameObjectMaterialMap = Js.Dict.t(material);

type gameObjectData = {
  mutable uid: int,
  mutable disposeCount: int,
  mutable disposedUidMap: gameObjectDisposedUidMap,
  mutable aliveUidArray: gameObjectAliveUidArray,
  mutable transformMap: gameObjectTransformMap,
  mutable cameraControllerMap: gameObjectCameraControllerMap,
  mutable geometryMap: gameObjectGeometryMap,
  mutable meshRendererMap: gameObjectMeshRendererMap,
  mutable materialMap: gameObjectMaterialMap
};