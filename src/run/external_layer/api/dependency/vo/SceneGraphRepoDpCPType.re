open SceneGraphType;

type sceneRepo = ISceneGraphRepoDp.sceneRepo;

type gameObjectRepo = {
  getTransform: gameObject => Js.Nullable.t(transform),
  getDirectionLight: gameObject => Js.Nullable.t(directionLight),
  getBasicCameraView: gameObject => Js.Nullable.t(basicCameraView),
  getPerspectiveCameraProjection:
    gameObject => Js.Nullable.t(perspectiveCameraProjection),
  getBSDFMaterial: gameObject => Js.Nullable.t(bsdfMaterial),
  getAllGeometryGameObjects: gameObject => array(gameObject),
  getAllGameObjectBSDFMaterials: gameObject => array(bsdfMaterial),
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

type bsdfMaterialRepo = {
  getDiffuseColor: bsdfMaterial => diffuse,
  getSpecular: bsdfMaterial => float,
  getSpecularColor: bsdfMaterial => specularColor,
  getRoughness: bsdfMaterial => float,
  getMetalness: bsdfMaterial => float,
  getTransmission: bsdfMaterial => float,
  getIOR: bsdfMaterial => float,
  getDiffuseMapImageId: bsdfMaterial => Js.Nullable.t(ImageRepoType.id),
  getChannelRoughnessMetallicMapImageId:
    bsdfMaterial => Js.Nullable.t(ImageRepoType.id),
  getEmissionMapImageId: bsdfMaterial => Js.Nullable.t(ImageRepoType.id),
  getNormalMapImageId: bsdfMaterial => Js.Nullable.t(ImageRepoType.id),
  getTransmissionMapImageId: bsdfMaterial => Js.Nullable.t(ImageRepoType.id),
  getSpecularMapImageId: bsdfMaterial => Js.Nullable.t(ImageRepoType.id),
};

type sceneGraphRepo = {
  sceneRepo,
  gameObjectRepo,
  transformRepo,
  directionLightRepo,
  basicCameraViewRepo,
  perspectiveCameraProjectionRepo,
  bsdfMaterialRepo,
};
