let create = () => {
  CreateGameObjectDoService.create();
};

let addTransform = (gameObject, transform) => {
  AddComponentGameObjectDoService.addTransform(gameObject, transform);
};

let getTransform = gameObject => {
  GetComponentGameObjectDoService.getTransform(gameObject);
};

let hasTransform = gameObject => {
  HasComponentGameObjectDoService.hasTransform(gameObject);
};

let addPBRMaterial = (gameObject, material) => {
  AddComponentGameObjectDoService.addPBRMaterial(gameObject, material);
};

let getPBRMaterial = gameObject => {
  GetComponentGameObjectDoService.getPBRMaterial(gameObject);
};

let hasPBRMaterial = gameObject => {
  HasComponentGameObjectDoService.hasPBRMaterial(gameObject);
};

let addGeometry = (gameObject, geometry) => {
  AddComponentGameObjectDoService.addGeometry(gameObject, geometry);
};

let getGeometry = gameObject => {
  GetComponentGameObjectDoService.getGeometry(gameObject);
};

let hasGeometry = gameObject => {
  HasComponentGameObjectDoService.hasGeometry(gameObject);
};

let addDirectionLight = (gameObject, light) => {
  AddComponentGameObjectDoService.addDirectionLight(gameObject, light);
};

let getDirectionLight = gameObject => {
  GetComponentGameObjectDoService.getDirectionLight(gameObject);
};

let hasDirectionLight = gameObject => {
  HasComponentGameObjectDoService.hasDirectionLight(gameObject);
};

let addBasicCameraView = (gameObject, cameraView) => {
  AddComponentGameObjectDoService.addBasicCameraView(gameObject, cameraView);
};

let getBasicCameraView = gameObject => {
  GetComponentGameObjectDoService.getBasicCameraView(gameObject);
};

let hasBasicCameraView = gameObject => {
  HasComponentGameObjectDoService.hasBasicCameraView(gameObject);
};

let addPerspectiveCameraProjection = (gameObject, cameraProjection) => {
  AddComponentGameObjectDoService.addPerspectiveCameraProjection(
    gameObject,
    cameraProjection,
  );
};

let getPerspectiveCameraProjection = gameObject => {
  GetComponentGameObjectDoService.getPerspectiveCameraProjection(gameObject);
};

let hasPerspectiveCameraProjection = gameObject => {
  HasComponentGameObjectDoService.hasPerspectiveCameraProjection(gameObject);
};

let getAllRenderGameObjects = () => {
  AllRenderGameObjectsDoService.getAllRenderGameObjects();
};

let getAllRenderGeometries = () => {
  AllRenderGameObjectsDoService.getAllRenderGeometries();
};

let getAllRenderPBRMaterials = () => {
  AllRenderGameObjectsDoService.getAllRenderPBRMaterials();
};
