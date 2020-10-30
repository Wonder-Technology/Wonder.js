open SceneGraphType;

type sceneRepo = ISceneGraphRepoDp.sceneRepo;

type gameObjectRepo = {
  getTransform: gameObject => Js.Nullable.t(transform),
  getDirectionLight: gameObject => Js.Nullable.t(directionLight),
  getAllGeometryGameObjects: gameObject => array(gameObject),
};

type transformRepo = ISceneGraphRepoDp.transformRepo;

type directionLightRepo = {
  getColor: directionLight => color3,
  getIntensity: directionLight => intensity,
  getDirection: directionLight => direction,
  getAllLights: gameObject => array(directionLight),
};

type sceneGraphRepo = {
  sceneRepo,
  transformRepo,
  directionLightRepo,
  gameObjectRepo,
};
