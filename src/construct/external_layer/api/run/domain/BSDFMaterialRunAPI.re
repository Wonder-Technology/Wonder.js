let create = () => {
  BSDFMaterialApService.create();
};

let getGameObjects = material => {
  BSDFMaterialApService.getGameObjects(material);
};

let getDiffuseColor = material => {
  BSDFMaterialApService.getDiffuseColor(material);
};

let setDiffuseColor = (material, diffuse) => {
  BSDFMaterialApService.setDiffuseColor(material, diffuse);
};

let getSpecular = material => {
  BSDFMaterialApService.getSpecular(material);
};

let setSpecular = (material, specular) => {
  BSDFMaterialApService.setSpecular(material, specular);
};

let getRoughness = material => {
  BSDFMaterialApService.getRoughness(material);
};

let setRoughness = (material, roughness) => {
  BSDFMaterialApService.setRoughness(material, roughness);
};

let getMetalness = material => {
  BSDFMaterialApService.getMetalness(material);
};

let setMetalness = (material, metalness) => {
  BSDFMaterialApService.setMetalness(material, metalness);
};

let getDiffuseMapImageId = material => {
  BSDFMaterialApService.getDiffuseMapImageId(material);
};

let setDiffuseMapImageId = (material, id) => {
  BSDFMaterialApService.setDiffuseMapImageId(material, id);
};

let getChannelRoughnessMetallicMapImageId = material => {
  BSDFMaterialApService.getChannelRoughnessMetallicMapImageId(material);
};

let setChannelRoughnessMetallicMapImageId = (material, id) => {
  BSDFMaterialApService.setChannelRoughnessMetallicMapImageId(material, id);
};

let getEmissionMapImageId = material => {
  BSDFMaterialApService.getEmissionMapImageId(material);
};

let setEmissionMapImageId = (material, id) => {
  BSDFMaterialApService.setEmissionMapImageId(material, id);
};

let getNormalMapImageId = material => {
  BSDFMaterialApService.getNormalMapImageId(material);
};

let setNormalMapImageId = (material, id) => {
  BSDFMaterialApService.setNormalMapImageId(material, id);
};
