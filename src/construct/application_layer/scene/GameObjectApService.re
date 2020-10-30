let getAllRenderGameObjects = sceneGameObject => {
  AllRenderGameObjectsDoService.getAllRenderGameObjects(sceneGameObject);
};

let getTransform = gameObject => {
  GetComponentGameObjectDoService.getTransform(gameObject);
};

let getDirectionLight = gameObject => {
  GetComponentGameObjectDoService.getDirectionLight(gameObject);
};

let getBasicCameraView = gameObject => {
  GetComponentGameObjectDoService.getBasicCameraView(gameObject);
};

let getPerspectiveCameraProjection = gameObject => {
  GetComponentGameObjectDoService.getPerspectiveCameraProjection(gameObject);
};
