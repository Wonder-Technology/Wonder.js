let getTransform = gameObject => {
  GameObjectApService.getTransform(gameObject);
};

let getDirectionLight = gameObject => {
  GameObjectApService.getDirectionLight(gameObject);
};

let getBasicCameraView = gameObject => {
  GameObjectApService.getBasicCameraView(gameObject);
};

let getPerspectiveCameraProjection = gameObject => {
  GameObjectApService.getPerspectiveCameraProjection(gameObject);
};

let getBSDFMaterial = gameObject => {
  GameObjectApService.getBSDFMaterial(gameObject);
};

let getAllRenderGameObjects = sceneGameObject => {
  GameObjectApService.getAllRenderGameObjects(sceneGameObject);
};

let getAllRenderBSDFMaterials = (sceneGameObject) => {
  GameObjectApService.getAllRenderBSDFMaterials(sceneGameObject);
};
