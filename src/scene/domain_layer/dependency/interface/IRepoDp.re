open ScenePOType;

open TransformPOType;

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
};

type repo = {
  sceneRepo,
  gameObjectRepo,
  transformRepo,
};
