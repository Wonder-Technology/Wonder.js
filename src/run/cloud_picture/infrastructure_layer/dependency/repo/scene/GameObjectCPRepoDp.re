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
  ->ImmutableSparseMap.getNullable(gameObject);
};

let hasTransform = gameObject => {
  CPRepo.getGameObject().transformMap->ImmutableSparseMap.has(gameObject);
};
