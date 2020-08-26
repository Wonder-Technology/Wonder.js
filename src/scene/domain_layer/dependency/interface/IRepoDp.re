open ScenePOType;

type sceneRepo = {setSceneGameObject: gameObject => unit};

type gameObjectRepo = {
  getMaxUID: unit => uid,
  setMaxUID: uid => unit,
  addTransform: (gameObject, transform) => unit,
  getTransform: gameObject => Js.Nullable.t(transform),
  hasTransform: gameObject => bool,
};

type transformRepo = {
  getMaxIndex: unit => index,
  setMaxIndex: index => unit,
  setChildren: (transform, list(transform)) => unit,
  setIsDirty: (transform, bool) => unit,
  addGameObject: (transform, gameObject) => unit,
  getGameObject: transform => Js.Nullable.t(gameObject)
};

type repo = {
  sceneRepo,
  gameObjectRepo,
  transformRepo,
};
