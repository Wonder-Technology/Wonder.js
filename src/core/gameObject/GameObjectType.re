open TransformType;

type gameObjectComponentData = Js.Dict.t ComponentType.component;

type gameObjectTransformMap = Js.Dict.t transform;

type gameObjectData = {
  mutable uid: int,
  mutable transformMap: gameObjectTransformMap
};

type gameObject = string;