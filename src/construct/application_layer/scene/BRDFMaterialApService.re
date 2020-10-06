let create = () => {
  CreateBRDFMaterialDoService.create();
};

let getGameObjects = material => {
  GameObjectBRDFMaterialDoService.getGameObjects(material);
};

let getDiffuseColor = material => {
  OperateBRDFMaterialDoService.getDiffuseColor(material);
};

let setDiffuseColor = (material, diffuse) => {
  OperateBRDFMaterialDoService.setDiffuseColor(material, diffuse);
};

let getSpecular = material => {
  OperateBRDFMaterialDoService.getSpecular(material);
};

let setSpecular = (material, specular) => {
  OperateBRDFMaterialDoService.setSpecular(material, specular);
};

let getRoughness = material => {
  OperateBRDFMaterialDoService.getRoughness(material);
};

let setRoughness = (material, roughness) => {
  OperateBRDFMaterialDoService.setRoughness(material, roughness);
};

let getMetalness = material => {
  OperateBRDFMaterialDoService.getMetalness(material);
};

let setMetalness = (material, metalness) => {
  OperateBRDFMaterialDoService.setMetalness(material, metalness);
};

let getDiffuseMapImageId = material => {
  OperateBRDFMaterialDoService.getDiffuseMapImageId(material);
};

let setDiffuseMapImageId = (material, id) => {
  OperateBRDFMaterialDoService.setDiffuseMapImageId(material, id);
};

let getChannelRoughnessMetallicMapImageId = material => {
  OperateBRDFMaterialDoService.getChannelRoughnessMetallicMapImageId(material);
};

let setChannelRoughnessMetallicMapImageId = (material, id) => {
  OperateBRDFMaterialDoService.setChannelRoughnessMetallicMapImageId(material, id);
};

let getEmissionMapImageId = material => {
  OperateBRDFMaterialDoService.getEmissionMapImageId(material);
};

let setEmissionMapImageId = (material, id) => {
  OperateBRDFMaterialDoService.setEmissionMapImageId(material, id);
};

let getNormalMapImageId = material => {
  OperateBRDFMaterialDoService.getNormalMapImageId(material);
};

let setNormalMapImageId = (material, id) => {
  OperateBRDFMaterialDoService.setNormalMapImageId(material, id);
};
