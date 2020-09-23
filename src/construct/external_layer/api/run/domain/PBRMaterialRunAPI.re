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

let setDiffuseMapSourceId = (material, id) => {
  PBRMaterialApService.setDiffuseMapSourceId(material, id);
};

let setMetalRoughnessMapSourceId = (material, id) => {
  PBRMaterialApService.setMetalRoughnessMapSourceId(material, id);
};

let setEmissionMapSourceId = (material, id) => {
  PBRMaterialApService.setEmissionMapSourceId(material, id);
};

let setNormalMapSourceId = (material, id) => {
  PBRMaterialApService.setNormalMapSourceId(material, id);
};
