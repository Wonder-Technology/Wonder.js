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
