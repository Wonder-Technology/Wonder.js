open PBRMaterialCPPOType;

let getMaxIndex = () => {
  CPRepo.getExnPBRMaterial().maxIndex;
};

let setMaxIndex = maxIndex => {
  CPRepo.setPBRMaterial({...CPRepo.getExnPBRMaterial(), maxIndex});
};

let getGameObjects = material => {
  CPRepo.getExnPBRMaterial().gameObjectsMap
  ->ImmutableSparseMap.getNullable(material);
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

let getDiffuseMapSourceId = material => {
  CPRepo.getExnPBRMaterial().diffuseMapSourceIdMap
  ->ImmutableSparseMap.getNullable(material);
};

let setDiffuseMapSourceId = (material, id) => {
  let {diffuseMapSourceIdMap} as materialPO = CPRepo.getExnPBRMaterial();

  CPRepo.setPBRMaterial({
    ...materialPO,
    diffuseMapSourceIdMap:
      diffuseMapSourceIdMap->ImmutableSparseMap.set(material, id),
  });
};

let getMetalRoughnessMapSourceId = material => {
  CPRepo.getExnPBRMaterial().metalRoughnessMapSourceIdMap
  ->ImmutableSparseMap.getNullable(material);
};

let setMetalRoughnessMapSourceId = (material, id) => {
  let {metalRoughnessMapSourceIdMap} as materialPO =
    CPRepo.getExnPBRMaterial();

  CPRepo.setPBRMaterial({
    ...materialPO,
    metalRoughnessMapSourceIdMap:
      metalRoughnessMapSourceIdMap->ImmutableSparseMap.set(material, id),
  });
};

let getEmissionMapSourceId = material => {
  CPRepo.getExnPBRMaterial().emissionMapSourceIdMap
  ->ImmutableSparseMap.getNullable(material);
};

let setEmissionMapSourceId = (material, id) => {
  let {emissionMapSourceIdMap} as materialPO = CPRepo.getExnPBRMaterial();

  CPRepo.setPBRMaterial({
    ...materialPO,
    emissionMapSourceIdMap:
      emissionMapSourceIdMap->ImmutableSparseMap.set(material, id),
  });
};

let getNormalMapSourceId = material => {
  CPRepo.getExnPBRMaterial().normalMapSourceIdMap
  ->ImmutableSparseMap.getNullable(material);
};

let setNormalMapSourceId = (material, id) => {
  let {normalMapSourceIdMap} as materialPO = CPRepo.getExnPBRMaterial();

  CPRepo.setPBRMaterial({
    ...materialPO,
    normalMapSourceIdMap:
      normalMapSourceIdMap->ImmutableSparseMap.set(material, id),
  });
};
