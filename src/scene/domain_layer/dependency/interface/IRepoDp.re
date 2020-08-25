open ScenePOType;

type sceneRepo = {setSceneGameObject: gameObject => unit};

type gameObjectRepo = {
  getMaxUID: unit => uid,
  setMaxUID: uid => unit,
};

type transformRepo = {
  getMaxIndex: unit => index,
  setMaxIndex: index => unit,
  setChildren: (transform, list(transform)) => unit,
  setIsDirty: (transform, bool) => unit,
};

type repo = {
  sceneRepo,
  gameObjectRepo,
  transformRepo,
};
