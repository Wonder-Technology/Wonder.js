open TransformType;

open CameraControllerType;

open GeometryType;

type gameObjectComponentData = Js.Dict.t(ComponentType.component);

type gameObjectTransformMap = Js.Dict.t(transform);

type gameObjectCameraControllerMap = Js.Dict.t(cameraController);

type gameObjectGeometryMap = Js.Dict.t(geometry);

type gameObjectData = {
  mutable uid: int,
  mutable transformMap: gameObjectTransformMap,
  mutable cameraControllerMap: gameObjectCameraControllerMap,
  mutable geometryMap: gameObjectGeometryMap
};

type gameObject = string;
