let create = () => {
  GameObjectApService.create();
};

let addTransform = (gameObject, transform) => {
  GameObjectApService.addTransform(gameObject, transform);
};

let getTransform = gameObject => {
  GameObjectApService.getTransform(gameObject);
};

let hasTransform = gameObject => {
  GameObjectApService.hasTransform(gameObject);
};

let addBSDFMaterial = (gameObject, material) => {
  GameObjectApService.addBSDFMaterial(gameObject, material);
};

let getBSDFMaterial = gameObject => {
  GameObjectApService.getBSDFMaterial(gameObject);
};

let hasBSDFMaterial = gameObject => {
  GameObjectApService.hasBSDFMaterial(gameObject);
};

let addGeometry = (gameObject, geometry) => {
  GameObjectApService.addGeometry(gameObject, geometry);
};

let getGeometry = gameObject => {
  GameObjectApService.getGeometry(gameObject);
};

let hasGeometry = gameObject => {
  GameObjectApService.hasGeometry(gameObject);
};

let addDirectionLight = (gameObject, light) => {
  GameObjectApService.addDirectionLight(gameObject, light);
};

let getDirectionLight = gameObject => {
  GameObjectApService.getDirectionLight(gameObject);
};

let hasDirectionLight = gameObject => {
  GameObjectApService.hasDirectionLight(gameObject);
};

let addBasicCameraView = (gameObject, cameraView) => {
  GameObjectApService.addBasicCameraView(gameObject, cameraView);
};

let getBasicCameraView = gameObject => {
  GameObjectApService.getBasicCameraView(gameObject);
};

let hasBasicCameraView = gameObject => {
  GameObjectApService.hasBasicCameraView(gameObject);
};

let addPerspectiveCameraProjection = (gameObject, cameraProjection) => {
  GameObjectApService.addPerspectiveCameraProjection(
    gameObject,
    cameraProjection,
  );
};

let getPerspectiveCameraProjection = gameObject => {
  GameObjectApService.getPerspectiveCameraProjection(gameObject);
};

let hasPerspectiveCameraProjection = gameObject => {
  GameObjectApService.hasPerspectiveCameraProjection(gameObject);
};

let getAllRenderGameObjects = () => {
  GameObjectApService.getAllRenderGameObjects();
};

let getAllRenderGeometries = () => {
  GameObjectApService.getAllRenderGeometries();
};

let getAllRenderBSDFMaterials = () => {
  GameObjectApService.getAllRenderBSDFMaterials();
};
