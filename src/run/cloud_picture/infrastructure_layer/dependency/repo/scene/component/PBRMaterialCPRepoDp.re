open PBRMaterialCPPOType;

let getMaxIndex = () => {
  CPRepo.getExnPBRMaterial().maxIndex;
};

let setMaxIndex = maxIndex => {
  CPRepo.setPBRMaterial({...CPRepo.getExnPBRMaterial(), maxIndex});
};

let getGameObjects = material => {
  CPRepo.getExnPBRMaterial().gameObjectsMap
  ->ImmutableSparseMap.get(material);
};

let addGameObject = (material, gameObject) => {
  let {gameObjectsMap} as materialPO = CPRepo.getExnPBRMaterial();

  CPRepo.setPBRMaterial({
    ...materialPO,
    gameObjectsMap:
      gameObjectsMap->ListMapRepoUtils.addValue(material, gameObject),
  });
};

let getDiffuseColor = material => {
  OperateTypeArrayPBRMaterialCPRepoUtils.getDiffuseColor(
    material,
    CPRepo.getExnPBRMaterial().diffuseColors,
  );
};

let setDiffuseColor = (material, diffuse) => {
  OperateTypeArrayPBRMaterialCPRepoUtils.setDiffuseColor(
    material,
    diffuse,
    CPRepo.getExnPBRMaterial().diffuseColors,
  );
};

let getSpecular = material => {
  OperateTypeArrayPBRMaterialCPRepoUtils.getSpecular(
    material,
    CPRepo.getExnPBRMaterial().speculars,
  );
};

let setSpecular = (material, specular) => {
  OperateTypeArrayPBRMaterialCPRepoUtils.setSpecular(
    material,
    specular,
    CPRepo.getExnPBRMaterial().speculars,
  );
};

let getRoughness = material => {
  OperateTypeArrayPBRMaterialCPRepoUtils.getRoughness(
    material,
    CPRepo.getExnPBRMaterial().roughnesses,
  );
};

let setRoughness = (material, roughness) => {
  OperateTypeArrayPBRMaterialCPRepoUtils.setRoughness(
    material,
    roughness,
    CPRepo.getExnPBRMaterial().roughnesses,
  );
};

let getMetalness = material => {
  OperateTypeArrayPBRMaterialCPRepoUtils.getMetalness(
    material,
    CPRepo.getExnPBRMaterial().metalnesses,
  );
};

let setMetalness = (material, metalness) => {
  OperateTypeArrayPBRMaterialCPRepoUtils.setMetalness(
    material,
    metalness,
    CPRepo.getExnPBRMaterial().metalnesses,
  );
};

let getDiffuseMapImageId = material => {
  CPRepo.getExnPBRMaterial().diffuseMapImageIdMap
  ->ImmutableSparseMap.get(material);
};

let setDiffuseMapImageId = (material, id) => {
  let {diffuseMapImageIdMap} as materialPO = CPRepo.getExnPBRMaterial();

  CPRepo.setPBRMaterial({
    ...materialPO,
    diffuseMapImageIdMap:
      diffuseMapImageIdMap->ImmutableSparseMap.set(material, id),
  });
};

let getChannelRoughnessMetallicMapImageId = material => {
  CPRepo.getExnPBRMaterial().channelRoughnessMetallicMapImageIdMap
  ->ImmutableSparseMap.get(material);
};

let setChannelRoughnessMetallicMapImageId = (material, id) => {
  let {channelRoughnessMetallicMapImageIdMap} as materialPO =
    CPRepo.getExnPBRMaterial();

  CPRepo.setPBRMaterial({
    ...materialPO,
    channelRoughnessMetallicMapImageIdMap:
      channelRoughnessMetallicMapImageIdMap->ImmutableSparseMap.set(material, id),
  });
};

let getEmissionMapImageId = material => {
  CPRepo.getExnPBRMaterial().emissionMapImageIdMap
  ->ImmutableSparseMap.get(material);
};

let setEmissionMapImageId = (material, id) => {
  let {emissionMapImageIdMap} as materialPO = CPRepo.getExnPBRMaterial();

  CPRepo.setPBRMaterial({
    ...materialPO,
    emissionMapImageIdMap:
      emissionMapImageIdMap->ImmutableSparseMap.set(material, id),
  });
};

let getNormalMapImageId = material => {
  CPRepo.getExnPBRMaterial().normalMapImageIdMap
  ->ImmutableSparseMap.get(material);
};

let setNormalMapImageId = (material, id) => {
  let {normalMapImageIdMap} as materialPO = CPRepo.getExnPBRMaterial();

  CPRepo.setPBRMaterial({
    ...materialPO,
    normalMapImageIdMap:
      normalMapImageIdMap->ImmutableSparseMap.set(material, id),
  });
};
