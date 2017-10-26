open TransformType;

open CameraControllerType;

type gameObjectComponentData = Js.Dict.t ComponentType.component;

type gameObjectTransformMap = Js.Dict.t transform;

type gameObjectCameraControllerMap = Js.Dict.t cameraController;

type gameObjectData = {
  mutable uid: int,
  mutable transformMap: gameObjectTransformMap,
  mutable cameraControllerMap: gameObjectCameraControllerMap
};

type gameObject = string;