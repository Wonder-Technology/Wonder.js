open SceneGraphType;

type sceneRepo = ISceneGraphRepoDp.sceneRepo;

type gameObjectRepo = {
  getTransform: gameObject => Js.Nullable.t(transform),
  getDirectionLight: gameObject => Js.Nullable.t(directionLight),
  getBasicCameraView: gameObject => Js.Nullable.t(basicCameraView),
  getPerspectiveCameraProjection:
    gameObject => Js.Nullable.t(perspectiveCameraProjection),
  getAllGeometryGameObjects: gameObject => array(gameObject),
};

type transformRepo = ISceneGraphRepoDp.transformRepo;

type directionLightRepo = {
  getColor: directionLight => color3,
  getIntensity: directionLight => intensity,
  getDirection: directionLight => direction,
  getAllLights: gameObject => array(directionLight),
};

type basicCameraViewRepo = {
  getGameObject: basicCameraView => gameObject,
  getViewWorldToCameraMatrix: basicCameraView => viewWorldToCameraMatrix,
  getActiveBasicCameraView: sceneGameObject => Js.Nullable.t(basicCameraView),
};

type perspectiveCameraProjectionRepo = ISceneGraphRepoDp.perspectiveCameraProjectionRepo;

type sceneGraphRepo = {
  sceneRepo,
  gameObjectRepo,
  transformRepo,
  directionLightRepo,
  basicCameraViewRepo,
  perspectiveCameraProjectionRepo,
};
