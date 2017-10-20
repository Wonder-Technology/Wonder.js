open GlType;

open GameObjectType;

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

type gameObjectData = {
  mutable uid: int,
  mutable componentMap: Js.Dict.t gameObjectComponentData,
  mutable parentMap: gameObjectParentMap,
  mutable childMap: gameObjectChildMap
};

type state = {
  viewData,
  initConfigData,
  deviceManagerData,
  directorData,
  gameObjectData
};

type stateData = {mutable state: option state};