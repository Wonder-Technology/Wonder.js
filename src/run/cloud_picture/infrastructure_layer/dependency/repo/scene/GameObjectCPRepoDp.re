open GameObjectCPPOType;

let getMaxUID = () => {
  CPRepo.getGameObject().maxUID;
};

let setMaxUID = maxUID => {
  CPRepo.setGameObject({...CPRepo.getGameObject(), maxUID});
};

let addTransform = (gameObject, transform) => {
  let {transformMap} as gameObjectPO = CPRepo.getGameObject();

  CPRepo.setGameObject({
    ...gameObjectPO,
    transformMap: transformMap->ImmutableSparseMap.set(gameObject, transform),
  });
};

let getTransform = gameObject => {
  CPRepo.getGameObject().transformMap
  ->ImmutableSparseMap.get(gameObject);
};

let hasTransform = gameObject => {
  CPRepo.getGameObject().transformMap->ImmutableSparseMap.has(gameObject);
};

let addBSDFMaterial = (gameObject, material) => {
  let {bsdfMaterialMap} as gameObjectPO = CPRepo.getGameObject();

  CPRepo.setGameObject({
    ...gameObjectPO,
    bsdfMaterialMap:
      bsdfMaterialMap->ImmutableSparseMap.set(gameObject, material),
  });
};

let getBSDFMaterial = gameObject => {
  CPRepo.getGameObject().bsdfMaterialMap
  ->ImmutableSparseMap.get(gameObject);
};

let hasBSDFMaterial = gameObject => {
  CPRepo.getGameObject().bsdfMaterialMap->ImmutableSparseMap.has(gameObject);
};

let addGeometry = (gameObject, geometry) => {
  let {geometryMap} as gameObjectPO = CPRepo.getGameObject();

  CPRepo.setGameObject({
    ...gameObjectPO,
    geometryMap: geometryMap->ImmutableSparseMap.set(gameObject, geometry),
  });
};

let getGeometry = gameObject => {
  CPRepo.getGameObject().geometryMap
  ->ImmutableSparseMap.get(gameObject);
};

let hasGeometry = gameObject => {
  CPRepo.getGameObject().geometryMap->ImmutableSparseMap.has(gameObject);
};

let addDirectionLight = (gameObject, directionLight) => {
  let {directionLightMap} as gameObjectPO = CPRepo.getGameObject();

  CPRepo.setGameObject({
    ...gameObjectPO,
    directionLightMap:
      directionLightMap->ImmutableSparseMap.set(gameObject, directionLight),
  });
};

let getDirectionLight = gameObject => {
  CPRepo.getGameObject().directionLightMap
  ->ImmutableSparseMap.get(gameObject);
};

let hasDirectionLight = gameObject => {
  CPRepo.getGameObject().directionLightMap
  ->ImmutableSparseMap.has(gameObject);
};

let addBasicCameraView = (gameObject, basicCameraView) => {
  let {basicCameraViewMap} as gameObjectPO = CPRepo.getGameObject();

  CPRepo.setGameObject({
    ...gameObjectPO,
    basicCameraViewMap:
      basicCameraViewMap->ImmutableSparseMap.set(gameObject, basicCameraView),
  });
};

let getBasicCameraView = gameObject => {
  CPRepo.getGameObject().basicCameraViewMap
  ->ImmutableSparseMap.get(gameObject);
};

let hasBasicCameraView = gameObject => {
  CPRepo.getGameObject().basicCameraViewMap
  ->ImmutableSparseMap.has(gameObject);
};

let addPerspectiveCameraProjection = (gameObject, perspectiveCameraProjection) => {
  let {perspectiveCameraProjectionMap} as gameObjectPO =
    CPRepo.getGameObject();

  CPRepo.setGameObject({
    ...gameObjectPO,
    perspectiveCameraProjectionMap:
      perspectiveCameraProjectionMap->ImmutableSparseMap.set(
        gameObject,
        perspectiveCameraProjection,
      ),
  });
};

let getPerspectiveCameraProjection = gameObject => {
  CPRepo.getGameObject().perspectiveCameraProjectionMap
  ->ImmutableSparseMap.get(gameObject);
};

let hasPerspectiveCameraProjection = gameObject => {
  CPRepo.getGameObject().perspectiveCameraProjectionMap
  ->ImmutableSparseMap.has(gameObject);
};

let getAllGeometryGameObjects = () => {
  CPRepo.getGameObject().geometryMap
  ->ImmutableSparseMap.getKeys
  ->ListSt.fromArray;
};

let getAllGameObjectGeometries = () => {
  CPRepo.getGameObject().geometryMap
  ->ImmutableSparseMap.getValues
  ->ListSt.fromArray;
};

let getAllGameObjectBSDFMaterials = () => {
  CPRepo.getGameObject().bsdfMaterialMap
  ->ImmutableSparseMap.getValues
  ->ListSt.fromArray;
};
