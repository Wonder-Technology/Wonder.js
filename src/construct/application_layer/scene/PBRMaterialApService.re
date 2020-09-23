let create = () => {
  CreatePBRMaterialDoService.create();
};

let getGameObjects = material => {
  GameObjectPBRMaterialDoService.getGameObjects(material);
};

let getDiffuseColor = material => {
  OperatePBRMaterialDoService.getDiffuseColor(material);
};

let setDiffuseColor = (material, diffuse) => {
  OperatePBRMaterialDoService.setDiffuseColor(material, diffuse);
};

let getSpecular = material => {
  OperatePBRMaterialDoService.getSpecular(material);
};

let setSpecular = (material, specular) => {
  OperatePBRMaterialDoService.setSpecular(material, specular);
};

let getRoughness = material => {
  OperatePBRMaterialDoService.getRoughness(material);
};

let setRoughness = (material, roughness) => {
  OperatePBRMaterialDoService.setRoughness(material, roughness);
};

let getMetalness = material => {
  OperatePBRMaterialDoService.getMetalness(material);
};

let setMetalness = (material, metalness) => {
  OperatePBRMaterialDoService.setMetalness(material, metalness);
};

let getDiffuseMapImageId = material => {
  OperatePBRMaterialDoService.getDiffuseMapImageId(material);
};

let setDiffuseMapImageId = (material, id) => {
  OperatePBRMaterialDoService.setDiffuseMapImageId(material, id);
};

let getMetalRoughnessMapImageId = material => {
  OperatePBRMaterialDoService.getMetalRoughnessMapImageId(material);
};

let setMetalRoughnessMapImageId = (material, id) => {
  OperatePBRMaterialDoService.setMetalRoughnessMapImageId(material, id);
};

let getEmissionMapImageId = material => {
  OperatePBRMaterialDoService.getEmissionMapImageId(material);
};

let setEmissionMapImageId = (material, id) => {
  OperatePBRMaterialDoService.setEmissionMapImageId(material, id);
};

let getNormalMapImageId = material => {
  OperatePBRMaterialDoService.getNormalMapImageId(material);
};

let setNormalMapImageId = (material, id) => {
  OperatePBRMaterialDoService.setNormalMapImageId(material, id);
};
