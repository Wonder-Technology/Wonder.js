open GlType;

open GameObjectType;

open TransformType;

type contextConfigData = {
  alpha: bool,
  depth: bool,
  stencil: bool,
  antialias: bool,
  premultipliedAlpha: bool,
  preserveDrawingBuffer: bool
};

type viewData = {
  canvas: option Dom.htmlElement,
  contextConfig: option contextConfigData
};

type initConfigData = {isTest: option bool};

type deviceManagerData = {gl: option webgl1Context};

type directorData = {scene: option SceneType.scene};

type gameObjectComponentData = Js.Dict.t ComponentType.component;

type gameObjectParentMap = Js.Dict.t (Js.undefined gameObject);

type gameObjectChildMap = Js.Dict.t (array gameObject);

type gameObjectTransformMap = Js.Dict.t transform;

type gameObjectData = {
  mutable uid: int,
  mutable transformMap: gameObjectTransformMap,
  mutable parentMap: gameObjectParentMap,
  mutable childMap: gameObjectChildMap
};


type transformParentMap = Js.Dict.t (Js.undefined transform);

type transformChildMap = Js.Dict.t (array transform);

type transformData = {
  mutable count: int,
  mutable index: int,
  mutable firstDirtyIndex: int,
  mutable oldIndexListBeforeAddToDirtyList: array int,
  mutable buffer: Js.Typed_array.array_buffer,
  mutable localToWorldMatrices: Js.Typed_array.Float32Array.t,
  mutable localPositions: Js.Typed_array.Float32Array.t,
  mutable parentMap: transformParentMap,
  mutable childMap: transformChildMap
};

type state = {
  viewData,
  initConfigData,
  deviceManagerData,
  directorData,
  gameObjectData,
  transformData
};

type stateData = {mutable state: option state};