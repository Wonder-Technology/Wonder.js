let getAllRenderGameObjects = sceneGameObject => {
  GameObjectApService.getAllRenderGameObjects(sceneGameObject);
};

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
