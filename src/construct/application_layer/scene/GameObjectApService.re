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

let getBSDFMaterial = gameObject => {
  GetComponentGameObjectDoService.getBSDFMaterial(gameObject);
};

let getGeometry = gameObject => {
  GetComponentGameObjectDoService.getGeometry(gameObject);
};

let getAllRenderGameObjects = sceneGameObject => {
  AllRenderGameObjectsDoService.getAllRenderGameObjects(sceneGameObject);
};

let getAllRenderGeometries = sceneGameObject => {
  AllRenderGameObjectsDoService.getAllRenderGeometries(sceneGameObject);
};

let getAllRenderBSDFMaterials = sceneGameObject => {
  AllRenderGameObjectsDoService.getAllRenderBSDFMaterials(sceneGameObject);
};
