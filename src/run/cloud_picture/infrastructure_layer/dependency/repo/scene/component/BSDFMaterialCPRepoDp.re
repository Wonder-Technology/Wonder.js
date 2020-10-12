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

let setDiffuseColor = (material, color) => {
  OperateTypeArrayBSDFMaterialCPRepoUtils.setDiffuseColor(
    material,
    color,
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

let getSpecularColor = material => {
  OperateTypeArrayBSDFMaterialCPRepoUtils.getSpecularColor(
    material,
    CPRepo.getExnBSDFMaterial().specularColors,
  );
};

let setSpecularColor = (material, color) => {
  OperateTypeArrayBSDFMaterialCPRepoUtils.setSpecularColor(
    material,
    color,
    CPRepo.getExnBSDFMaterial().specularColors,
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

let getTransmission = material => {
  OperateTypeArrayBSDFMaterialCPRepoUtils.getTransmission(
    material,
    CPRepo.getExnBSDFMaterial().transmissions,
  );
};

let setTransmission = (material, transmission) => {
  OperateTypeArrayBSDFMaterialCPRepoUtils.setTransmission(
    material,
    transmission,
    CPRepo.getExnBSDFMaterial().transmissions,
  );
};

let getIOR = material => {
  OperateTypeArrayBSDFMaterialCPRepoUtils.getIOR(
    material,
    CPRepo.getExnBSDFMaterial().iors,
  );
};

let setIOR = (material, ior) => {
  OperateTypeArrayBSDFMaterialCPRepoUtils.setIOR(
    material,
    ior,
    CPRepo.getExnBSDFMaterial().iors,
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
      channelRoughnessMetallicMapImageIdMap->ImmutableSparseMap.set(
        material,
        id,
      ),
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

let getTransmissionMapImageId = material => {
  CPRepo.getExnBSDFMaterial().transmissionMapImageIdMap
  ->ImmutableSparseMap.get(material);
};

let setTransmissionMapImageId = (material, id) => {
  let {transmissionMapImageIdMap} as materialPO = CPRepo.getExnBSDFMaterial();

  CPRepo.setBSDFMaterial({
    ...materialPO,
    transmissionMapImageIdMap:
      transmissionMapImageIdMap->ImmutableSparseMap.set(material, id),
  });
};

let getSpecularMapImageId = material => {
  CPRepo.getExnBSDFMaterial().specularMapImageIdMap
  ->ImmutableSparseMap.get(material);
};

let setSpecularMapImageId = (material, id) => {
  let {specularMapImageIdMap} as materialPO = CPRepo.getExnBSDFMaterial();

  CPRepo.setBSDFMaterial({
    ...materialPO,
    specularMapImageIdMap:
      specularMapImageIdMap->ImmutableSparseMap.set(material, id),
  });
};
