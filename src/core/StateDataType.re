open GlType;

open TransformType;

type contextConfig = {
  alpha: bool,
  depth: bool,
  stencil: bool,
  antialias: bool,
  premultipliedAlpha: bool,
  preserveDrawingBuffer: bool
};

type bufferConfig = {mutable transformDataBufferCount: int};

type viewData = {
  canvas: option Dom.htmlElement,
  contextConfig: option contextConfig
};

type initConfigData = {isTest: option bool};

type deviceManagerData = {gl: option webgl1Context};

type gameObjectMap = Js.Dict.t GameObjectType.gameObject;

type gameObjectComponentData = Js.Dict.t ComponentType.component;

type gameObjectTransformMap = Js.Dict.t transform;

type gameObjectData = {
  mutable uid: int,
  mutable transformMap: gameObjectTransformMap
};

type transformParentMap = Js.Dict.t (Js.undefined transform);

type transformChildMap = Js.Dict.t (array transform);

/* type originToMoveIndexMap = Js.Dict.t int; */
/* type moveToOriginIndexMap = Js.Dict.t int; */
type transformDirtyList = array int;

type transformData = {
  mutable count: int,
  mutable index: int,
  /* mutable firstDirtyIndex: int, */
  /* mutable oldIndexListBeforeAddToDirtyList: array int, */
  mutable buffer: Js.Typed_array.array_buffer,
  mutable localToWorldMatrices: Js.Typed_array.Float32Array.t,
  mutable localPositions: Js.Typed_array.Float32Array.t,
  mutable parentMap: transformParentMap,
  mutable childMap: transformChildMap,
  mutable gameObjectMap,
  /* mutable originToMoveIndexMap: originToMoveIndexMap,
     mutable moveToOriginIndexMap: moveToOriginIndexMap */
  mutable dirtyList: transformDirtyList
};

type tempData = {floatArr_1: Js.Array.t float};

type state = {
  bufferConfig: option bufferConfig,
  viewData,
  initConfigData,
  deviceManagerData,
  tempData,
  gameObjectData,
  mutable transformData: option transformData
};

type stateData = {mutable state: option state};