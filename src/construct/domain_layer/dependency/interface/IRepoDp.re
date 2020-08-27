open ScenePOType;

open TransformPOType;

open PipelinePOType;

type sceneRepo = {setSceneGameObject: gameObject => unit};

type gameObjectRepo = {
  getMaxUID: unit => uid,
  setMaxUID: uid => unit,
  addTransform: (gameObject, transform) => unit,
  getTransform: gameObject => Js.Nullable.t(transform),
  hasTransform: gameObject => bool,
};

type transformRepo = {
  getMaxIndex: unit => ComponentPOType.index,
  setMaxIndex: ComponentPOType.index => unit,
  getIsDirty: transform => Js.Nullable.t(bool),
  setIsDirty: (transform, bool) => unit,
  addGameObject: (transform, gameObject) => unit,
  getGameObject: transform => Js.Nullable.t(gameObject),
  hasParent: transform => bool,
  getParent: transform => Js.Nullable.t(parent),
  setParent: (parent, child) => unit,
  removeParent: transform => unit,
  getChildren: transform => Js.Nullable.t(children),
  setChildren: (parent, children) => unit,
  addChild: (parent, child) => unit,
  removeChild: (parent, child) => unit,
  getLocalToWorldMatrix: transform => Js.Typed_array.Float32Array.t,
  getLocalPosition: transform => position,
  setLocalPosition: (transform, position) => unit,
  getLocalRotation: transform => rotation,
  setLocalRotation: (transform, rotation) => unit,
  getLocalScale: transform => scale,
  setLocalScale: (transform, scale) => unit,
};

type globalTempRepo = {
  getFloat32Array1: unit => Js.Typed_array.Float32Array.t,
};

type pipelineRepo = {
  getJobExecFunc: (pipelineName, jobName) => Js.Nullable.t(execFunc),
  setJobExecFunc: (pipelineName, jobName, execFunc) => unit,
  getPipelineStream: pipelineName => Js.Nullable.t(pipelineStream),
  setPipelineStream: (pipelineName, pipelineStream) => unit,
};

type repo = {
  sceneRepo,
  gameObjectRepo,
  transformRepo,
  globalTempRepo,
  pipelineRepo,
};
