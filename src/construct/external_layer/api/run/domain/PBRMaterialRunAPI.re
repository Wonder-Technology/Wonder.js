let create = () => {
  PBRMaterialApService.create();
};

let getGameObjects = material => {
  PBRMaterialApService.getGameObjects(material);
};

let getDiffuseColor = material => {
  PBRMaterialApService.getDiffuseColor(material);
};

let setDiffuseColor = (material, diffuse) => {
  PBRMaterialApService.setDiffuseColor(material, diffuse);
};

let getSpecular = material => {
  PBRMaterialApService.getSpecular(material);
};

let setSpecular = (material, specular) => {
  PBRMaterialApService.setSpecular(material, specular);
};

let getRoughness = material => {
  PBRMaterialApService.getRoughness(material);
};

let setRoughness = (material, roughness) => {
  PBRMaterialApService.setRoughness(material, roughness);
};

let getMetalness = material => {
  PBRMaterialApService.getMetalness(material);
};

let setMetalness = (material, metalness) => {
  PBRMaterialApService.setMetalness(material, metalness);
};

let getDiffuseMapImageId = material => {
  PBRMaterialApService.getDiffuseMapImageId(material);
};

let setDiffuseMapImageId = (material, id) => {
  PBRMaterialApService.setDiffuseMapImageId(material, id);
};

let getMetalRoughnessMapImageId = material => {
  PBRMaterialApService.getMetalRoughnessMapImageId(material);
};

let setMetalRoughnessMapImageId = (material, id) => {
  PBRMaterialApService.setMetalRoughnessMapImageId(material, id);
};

let getEmissionMapImageId = material => {
  PBRMaterialApService.getEmissionMapImageId(material);
};

let setEmissionMapImageId = (material, id) => {
  PBRMaterialApService.setEmissionMapImageId(material, id);
};

let getNormalMapImageId = material => {
  PBRMaterialApService.getNormalMapImageId(material);
};

let setNormalMapImageId = (material, id) => {
  PBRMaterialApService.setNormalMapImageId(material, id);
};
