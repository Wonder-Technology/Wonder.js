let create = () => {
  CreateBSDFMaterialDoService.create();
};

let getGameObjects = material => {
  GameObjectBSDFMaterialDoService.getGameObjects(material);
};

let getDiffuseColor = material => {
  OperateBSDFMaterialDoService.getDiffuseColor(material);
};

let setDiffuseColor = (material, color) => {
  OperateBSDFMaterialDoService.setDiffuseColor(material, color);
};

let getSpecular = material => {
  OperateBSDFMaterialDoService.getSpecular(material);
};

let setSpecular = (material, specular) => {
  OperateBSDFMaterialDoService.setSpecular(material, specular);
};

let getSpecularColor = material => {
  OperateBSDFMaterialDoService.getSpecularColor(material);
};

let setSpecularColor = (material, color) => {
  OperateBSDFMaterialDoService.setSpecularColor(material, color);
};

let getRoughness = material => {
  OperateBSDFMaterialDoService.getRoughness(material);
};

let setRoughness = (material, roughness) => {
  OperateBSDFMaterialDoService.setRoughness(material, roughness);
};

let getMetalness = material => {
  OperateBSDFMaterialDoService.getMetalness(material);
};

let setMetalness = (material, metalness) => {
  OperateBSDFMaterialDoService.setMetalness(material, metalness);
};

let getTransmission = material => {
  OperateBSDFMaterialDoService.getTransmission(material);
};

let setTransmission = (material, transmission) => {
  OperateBSDFMaterialDoService.setTransmission(material, transmission);
};

let getIOR = material => {
  OperateBSDFMaterialDoService.getIOR(material);
};

let setIOR = (material, ior) => {
  OperateBSDFMaterialDoService.setIOR(material, ior);
};

let getDiffuseMapImageId = material => {
  OperateBSDFMaterialDoService.getDiffuseMapImageId(material);
};

let setDiffuseMapImageId = (material, id) => {
  OperateBSDFMaterialDoService.setDiffuseMapImageId(material, id);
};

let getChannelRoughnessMetallicMapImageId = material => {
  OperateBSDFMaterialDoService.getChannelRoughnessMetallicMapImageId(
    material,
  );
};

let setChannelRoughnessMetallicMapImageId = (material, id) => {
  OperateBSDFMaterialDoService.setChannelRoughnessMetallicMapImageId(
    material,
    id,
  );
};

let getEmissionMapImageId = material => {
  OperateBSDFMaterialDoService.getEmissionMapImageId(material);
};

let setEmissionMapImageId = (material, id) => {
  OperateBSDFMaterialDoService.setEmissionMapImageId(material, id);
};

let getNormalMapImageId = material => {
  OperateBSDFMaterialDoService.getNormalMapImageId(material);
};

let setNormalMapImageId = (material, id) => {
  OperateBSDFMaterialDoService.setNormalMapImageId(material, id);
};

let getTransmissionMapImageId = material => {
  OperateBSDFMaterialDoService.getTransmissionMapImageId(material);
};

let setTransmissionMapImageId = (material, id) => {
  OperateBSDFMaterialDoService.setTransmissionMapImageId(material, id);
};

let getSpecularMapImageId = material => {
  OperateBSDFMaterialDoService.getSpecularMapImageId(material);
};

let setSpecularMapImageId = (material, id) => {
  OperateBSDFMaterialDoService.setSpecularMapImageId(material, id);
};
