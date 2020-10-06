open BRDFMaterialCPPOType;

let getMaxIndex = () => {
  CPRepo.getExnBRDFMaterial().maxIndex;
};

let setMaxIndex = maxIndex => {
  CPRepo.setBRDFMaterial({...CPRepo.getExnBRDFMaterial(), maxIndex});
};

let getGameObjects = material => {
  CPRepo.getExnBRDFMaterial().gameObjectsMap
  ->ImmutableSparseMap.get(material);
};

let addGameObject = (material, gameObject) => {
  let {gameObjectsMap} as materialPO = CPRepo.getExnBRDFMaterial();

  CPRepo.setBRDFMaterial({
    ...materialPO,
    gameObjectsMap:
      gameObjectsMap->ListMapRepoUtils.addValue(material, gameObject),
  });
};

let getDiffuseColor = material => {
  OperateTypeArrayBRDFMaterialCPRepoUtils.getDiffuseColor(
    material,
    CPRepo.getExnBRDFMaterial().diffuseColors,
  );
};

let setDiffuseColor = (material, diffuse) => {
  OperateTypeArrayBRDFMaterialCPRepoUtils.setDiffuseColor(
    material,
    diffuse,
    CPRepo.getExnBRDFMaterial().diffuseColors,
  );
};

let getSpecular = material => {
  OperateTypeArrayBRDFMaterialCPRepoUtils.getSpecular(
    material,
    CPRepo.getExnBRDFMaterial().speculars,
  );
};

let setSpecular = (material, specular) => {
  OperateTypeArrayBRDFMaterialCPRepoUtils.setSpecular(
    material,
    specular,
    CPRepo.getExnBRDFMaterial().speculars,
  );
};

let getRoughness = material => {
  OperateTypeArrayBRDFMaterialCPRepoUtils.getRoughness(
    material,
    CPRepo.getExnBRDFMaterial().roughnesses,
  );
};

let setRoughness = (material, roughness) => {
  OperateTypeArrayBRDFMaterialCPRepoUtils.setRoughness(
    material,
    roughness,
    CPRepo.getExnBRDFMaterial().roughnesses,
  );
};

let getMetalness = material => {
  OperateTypeArrayBRDFMaterialCPRepoUtils.getMetalness(
    material,
    CPRepo.getExnBRDFMaterial().metalnesses,
  );
};

let setMetalness = (material, metalness) => {
  OperateTypeArrayBRDFMaterialCPRepoUtils.setMetalness(
    material,
    metalness,
    CPRepo.getExnBRDFMaterial().metalnesses,
  );
};

let getDiffuseMapImageId = material => {
  CPRepo.getExnBRDFMaterial().diffuseMapImageIdMap
  ->ImmutableSparseMap.get(material);
};

let setDiffuseMapImageId = (material, id) => {
  let {diffuseMapImageIdMap} as materialPO = CPRepo.getExnBRDFMaterial();

  CPRepo.setBRDFMaterial({
    ...materialPO,
    diffuseMapImageIdMap:
      diffuseMapImageIdMap->ImmutableSparseMap.set(material, id),
  });
};

let getChannelRoughnessMetallicMapImageId = material => {
  CPRepo.getExnBRDFMaterial().channelRoughnessMetallicMapImageIdMap
  ->ImmutableSparseMap.get(material);
};

let setChannelRoughnessMetallicMapImageId = (material, id) => {
  let {channelRoughnessMetallicMapImageIdMap} as materialPO =
    CPRepo.getExnBRDFMaterial();

  CPRepo.setBRDFMaterial({
    ...materialPO,
    channelRoughnessMetallicMapImageIdMap:
      channelRoughnessMetallicMapImageIdMap->ImmutableSparseMap.set(material, id),
  });
};

let getEmissionMapImageId = material => {
  CPRepo.getExnBRDFMaterial().emissionMapImageIdMap
  ->ImmutableSparseMap.get(material);
};

let setEmissionMapImageId = (material, id) => {
  let {emissionMapImageIdMap} as materialPO = CPRepo.getExnBRDFMaterial();

  CPRepo.setBRDFMaterial({
    ...materialPO,
    emissionMapImageIdMap:
      emissionMapImageIdMap->ImmutableSparseMap.set(material, id),
  });
};

let getNormalMapImageId = material => {
  CPRepo.getExnBRDFMaterial().normalMapImageIdMap
  ->ImmutableSparseMap.get(material);
};

let setNormalMapImageId = (material, id) => {
  let {normalMapImageIdMap} as materialPO = CPRepo.getExnBRDFMaterial();

  CPRepo.setBRDFMaterial({
    ...materialPO,
    normalMapImageIdMap:
      normalMapImageIdMap->ImmutableSparseMap.set(material, id),
  });
};
