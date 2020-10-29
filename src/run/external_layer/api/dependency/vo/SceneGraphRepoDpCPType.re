open SceneGraphType;

type sceneRepo = ISceneGraphRepoDp.sceneRepo;

type gameObjectRepo = {
  getTransform: gameObject => Js.Nullable.t(transform),
  getAllGeometryGameObjects: gameObject => array(gameObject),
};

type transformRepo = ISceneGraphRepoDp.transformRepo;

type sceneGraphRepo = {
  sceneRepo,
  transformRepo,
  gameObjectRepo,
};
