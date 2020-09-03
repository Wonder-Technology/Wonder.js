open ScenePOType;

open TransformPOType;

open PBRMaterialPOType;

open GeometryPOType;

open DirectionLightPOType;

open BasicCameraViewPOType;

open PerspectiveCameraProjectionPOType;

open PipelinePOType;

type sceneRepo = {
  getSceneGameObject: unit => Js.Nullable.t(gameObject),
  setSceneGameObject: gameObject => unit,
};

type gameObjectRepo = {
  getMaxUID: unit => uid,
  setMaxUID: uid => unit,
  addTransform: (gameObject, transform) => unit,
  getTransform: gameObject => Js.Nullable.t(transform),
  hasTransform: gameObject => bool,
  addPBRMaterial: (gameObject, pbrMaterial) => unit,
  getPBRMaterial: gameObject => Js.Nullable.t(pbrMaterial),
  hasPBRMaterial: gameObject => bool,
  addGeometry: (gameObject, geometry) => unit,
  getGeometry: gameObject => Js.Nullable.t(geometry),
  hasGeometry: gameObject => bool,
  addDirectionLight: (gameObject, directionLight) => unit,
  getDirectionLight: gameObject => Js.Nullable.t(directionLight),
  hasDirectionLight: gameObject => bool,
  addBasicCameraView: (gameObject, basicCameraView) => unit,
  getBasicCameraView: gameObject => Js.Nullable.t(basicCameraView),
  hasBasicCameraView: gameObject => bool,
  addPerspectiveCameraProjection:
    (gameObject, perspectiveCameraProjection) => unit,
  getPerspectiveCameraProjection:
    gameObject => Js.Nullable.t(perspectiveCameraProjection),
  hasPerspectiveCameraProjection: gameObject => bool,
};

type transformRepo = {
  getMaxIndex: unit => ComponentPOType.index,
  setMaxIndex: ComponentPOType.index => unit,
  getIsDirty: transform => Js.Nullable.t(bool),
  setIsDirty: (transform, bool) => unit,
  setGameObject: (transform, gameObject) => unit,
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
  setLocalPosition: (transform, position) => Result.t2(unit),
  getLocalRotation: transform => rotation,
  setLocalRotation: (transform, rotation) => Result.t2(unit),
  getLocalScale: transform => scale,
  setLocalScale: (transform, scale) => Result.t2(unit),
};

type pbrMaterialRepo = {
  getMaxIndex: unit => ComponentPOType.index,
  setMaxIndex: ComponentPOType.index => unit,
  getGameObjects: pbrMaterial => Js.Nullable.t(list(gameObject)),
  addGameObject: (pbrMaterial, gameObject) => unit,
  getDiffuseColor: pbrMaterial => diffuse,
  setDiffuseColor: (pbrMaterial, diffuse) => Result.t2(unit),
  getSpecular: pbrMaterial => float,
  setSpecular: (pbrMaterial, float) => Result.t2(unit),
  getRoughness: pbrMaterial => float,
  setRoughness: (pbrMaterial, float) => Result.t2(unit),
  getMetalness: pbrMaterial => float,
  setMetalness: (pbrMaterial, float) => Result.t2(unit),
};

type geometryRepo = {
  getMaxIndex: unit => ComponentPOType.index,
  setMaxIndex: ComponentPOType.index => unit,
  getGameObjects: geometry => Js.Nullable.t(list(gameObject)),
  addGameObject: (geometry, gameObject) => unit,
  getVertices: geometry => Result.t2(Js.Typed_array.Float32Array.t),
  setVertices: (geometry, Js.Typed_array.Float32Array.t) => Result.t2(unit),
  getNormals: geometry => Result.t2(Js.Typed_array.Float32Array.t),
  setNormals: (geometry, Js.Typed_array.Float32Array.t) => Result.t2(unit),
  getIndices: geometry => Result.t2(Js.Typed_array.Uint32Array.t),
  setIndices: (geometry, Js.Typed_array.Uint32Array.t) => Result.t2(unit),
  hasVertices: geometry => Result.t2(bool),
  hasNormals: geometry => Result.t2(bool),
  hasIndices: geometry => Result.t2(bool),
  getIndicesCount: geometry => Result.t2(int),
};

type directionLightRepo = {
  getMaxIndex: unit => ComponentPOType.index,
  setMaxIndex: ComponentPOType.index => unit,
  getGameObject: directionLight => Js.Nullable.t(gameObject),
  setGameObject: (directionLight, gameObject) => unit,
  getColor: geometry => (float, float, float),
  setColor: (geometry, (float, float, float)) => Result.t2(unit),
  getIntensity: geometry => float,
  setIntensity: (geometry, float) => Result.t2(unit),
};

type basicCameraViewRepo = {
  getMaxIndex: unit => ComponentPOType.index,
  setMaxIndex: ComponentPOType.index => unit,
  getGameObject: basicCameraView => Js.Nullable.t(gameObject),
  setGameObject: (basicCameraView, gameObject) => unit,
  isActive: basicCameraView => bool,
  setAllNotActive: unit => unit,
  setActive: (basicCameraView, bool) => unit,
  getActiveBasicCameraViews: unit => Result.t2(list(basicCameraView)),
};

type perspectiveCameraProjectionRepo = {
  getMaxIndex: unit => ComponentPOType.index,
  setMaxIndex: ComponentPOType.index => unit,
  getGameObject: perspectiveCameraProjection => Js.Nullable.t(gameObject),
  setGameObject: (perspectiveCameraProjection, gameObject) => unit,
  getPMatrix:
    perspectiveCameraProjection => option(Js.Typed_array.Float32Array.t),
  setPMatrix:
    (perspectiveCameraProjection, Js.Typed_array.Float32Array.t) => unit,
  addToDirtyList: perspectiveCameraProjection => unit,
  getDirtyList: unit => list(perspectiveCameraProjection),
  clearDirtyList: unit => unit,
  getFovy: perspectiveCameraProjection => option(float),
  setFovy: (perspectiveCameraProjection, float) => unit,
  getAspect: perspectiveCameraProjection => option(float),
  setAspect: (perspectiveCameraProjection, float) => unit,
  getNear: perspectiveCameraProjection => option(float),
  setNear: (perspectiveCameraProjection, float) => unit,
  getFar: perspectiveCameraProjection => option(float),
  setFar: (perspectiveCameraProjection, float) => unit,
  markDirty: perspectiveCameraProjection => unit,
  markNotDirty: perspectiveCameraProjection => unit,
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

type timeRepo = {
  getElapsed: unit => TimePOType.time,
  start: TimePOType.time => unit,
};

type repo = {
  sceneRepo,
  gameObjectRepo,
  transformRepo,
  pbrMaterialRepo,
  geometryRepo,
  directionLightRepo,
  basicCameraViewRepo,
  perspectiveCameraProjectionRepo,
  globalTempRepo,
  pipelineRepo,
  timeRepo,
};
