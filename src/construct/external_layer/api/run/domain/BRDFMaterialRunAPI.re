let create = () => {
  BRDFMaterialApService.create();
};

let getGameObjects = material => {
  BRDFMaterialApService.getGameObjects(material);
};

let getDiffuseColor = material => {
  BRDFMaterialApService.getDiffuseColor(material);
};

let setDiffuseColor = (material, diffuse) => {
  BRDFMaterialApService.setDiffuseColor(material, diffuse);
};

let getSpecular = material => {
  BRDFMaterialApService.getSpecular(material);
};

let setSpecular = (material, specular) => {
  BRDFMaterialApService.setSpecular(material, specular);
};

let getRoughness = material => {
  BRDFMaterialApService.getRoughness(material);
};

let setRoughness = (material, roughness) => {
  BRDFMaterialApService.setRoughness(material, roughness);
};

let getMetalness = material => {
  BRDFMaterialApService.getMetalness(material);
};

let setMetalness = (material, metalness) => {
  BRDFMaterialApService.setMetalness(material, metalness);
};

let getDiffuseMapImageId = material => {
  BRDFMaterialApService.getDiffuseMapImageId(material);
};

let setDiffuseMapImageId = (material, id) => {
  BRDFMaterialApService.setDiffuseMapImageId(material, id);
};

let getChannelRoughnessMetallicMapImageId = material => {
  BRDFMaterialApService.getChannelRoughnessMetallicMapImageId(material);
};

let setChannelRoughnessMetallicMapImageId = (material, id) => {
  BRDFMaterialApService.setChannelRoughnessMetallicMapImageId(material, id);
};

let getEmissionMapImageId = material => {
  BRDFMaterialApService.getEmissionMapImageId(material);
};

let setEmissionMapImageId = (material, id) => {
  BRDFMaterialApService.setEmissionMapImageId(material, id);
};

let getNormalMapImageId = material => {
  BRDFMaterialApService.getNormalMapImageId(material);
};

let setNormalMapImageId = (material, id) => {
  BRDFMaterialApService.setNormalMapImageId(material, id);
};
