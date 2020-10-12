open BSDFMaterialCPPOType;

let getMaxIndex = () => {
  CPRepo.getExnBSDFMaterial().maxIndex;
};

let setMaxIndex = maxIndex => {
  CPRepo.setBSDFMaterial({...CPRepo.getExnBSDFMaterial(), maxIndex});
};

let getGameObjects = material => {
  CPRepo.getExnBSDFMaterial().gameObjectsMap
  ->ImmutableSparseMap.get(material);
};

let addGameObject = (material, gameObject) => {
  let {gameObjectsMap} as materialPO = CPRepo.getExnBSDFMaterial();

  CPRepo.setBSDFMaterial({
    ...materialPO,
    gameObjectsMap:
      gameObjectsMap->ListMapRepoUtils.addValue(material, gameObject),
  });
};

let getDiffuseColor = material => {
  OperateTypeArrayBSDFMaterialCPRepoUtils.getDiffuseColor(
    material,
    CPRepo.getExnBSDFMaterial().diffuseColors,
  );
};

let setDiffuseColor = (material, diffuse) => {
  OperateTypeArrayBSDFMaterialCPRepoUtils.setDiffuseColor(
    material,
    diffuse,
    CPRepo.getExnBSDFMaterial().diffuseColors,
  );
};

let getSpecular = material => {
  OperateTypeArrayBSDFMaterialCPRepoUtils.getSpecular(
    material,
    CPRepo.getExnBSDFMaterial().speculars,
  );
};

let setSpecular = (material, specular) => {
  OperateTypeArrayBSDFMaterialCPRepoUtils.setSpecular(
    material,
    specular,
    CPRepo.getExnBSDFMaterial().speculars,
  );
};

let getRoughness = material => {
  OperateTypeArrayBSDFMaterialCPRepoUtils.getRoughness(
    material,
    CPRepo.getExnBSDFMaterial().roughnesses,
  );
};

let setRoughness = (material, roughness) => {
  OperateTypeArrayBSDFMaterialCPRepoUtils.setRoughness(
    material,
    roughness,
    CPRepo.getExnBSDFMaterial().roughnesses,
  );
};

let getMetalness = material => {
  OperateTypeArrayBSDFMaterialCPRepoUtils.getMetalness(
    material,
    CPRepo.getExnBSDFMaterial().metalnesses,
  );
};

let setMetalness = (material, metalness) => {
  OperateTypeArrayBSDFMaterialCPRepoUtils.setMetalness(
    material,
    metalness,
    CPRepo.getExnBSDFMaterial().metalnesses,
  );
};

let getDiffuseMapImageId = material => {
  CPRepo.getExnBSDFMaterial().diffuseMapImageIdMap
  ->ImmutableSparseMap.get(material);
};

let setDiffuseMapImageId = (material, id) => {
  let {diffuseMapImageIdMap} as materialPO = CPRepo.getExnBSDFMaterial();

  CPRepo.setBSDFMaterial({
    ...materialPO,
    diffuseMapImageIdMap:
      diffuseMapImageIdMap->ImmutableSparseMap.set(material, id),
  });
};

let getChannelRoughnessMetallicMapImageId = material => {
  CPRepo.getExnBSDFMaterial().channelRoughnessMetallicMapImageIdMap
  ->ImmutableSparseMap.get(material);
};

let setChannelRoughnessMetallicMapImageId = (material, id) => {
  let {channelRoughnessMetallicMapImageIdMap} as materialPO =
    CPRepo.getExnBSDFMaterial();

  CPRepo.setBSDFMaterial({
    ...materialPO,
    channelRoughnessMetallicMapImageIdMap:
      channelRoughnessMetallicMapImageIdMap->ImmutableSparseMap.set(material, id),
  });
};

let getEmissionMapImageId = material => {
  CPRepo.getExnBSDFMaterial().emissionMapImageIdMap
  ->ImmutableSparseMap.get(material);
};

let setEmissionMapImageId = (material, id) => {
  let {emissionMapImageIdMap} as materialPO = CPRepo.getExnBSDFMaterial();

  CPRepo.setBSDFMaterial({
    ...materialPO,
    emissionMapImageIdMap:
      emissionMapImageIdMap->ImmutableSparseMap.set(material, id),
  });
};

let getNormalMapImageId = material => {
  CPRepo.getExnBSDFMaterial().normalMapImageIdMap
  ->ImmutableSparseMap.get(material);
};

let setNormalMapImageId = (material, id) => {
  let {normalMapImageIdMap} as materialPO = CPRepo.getExnBSDFMaterial();

  CPRepo.setBSDFMaterial({
    ...materialPO,
    normalMapImageIdMap:
      normalMapImageIdMap->ImmutableSparseMap.set(material, id),
  });
};
