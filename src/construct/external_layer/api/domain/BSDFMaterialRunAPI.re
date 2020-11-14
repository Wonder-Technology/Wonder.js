let getDiffuseColor = material => {
  BSDFMaterialApService.getDiffuseColor(material);
};

let getSpecular = material => {
  BSDFMaterialApService.getSpecular(material);
};

let getSpecularColor = material => {
  BSDFMaterialApService.getSpecularColor(material);
};

let getRoughness = material => {
  BSDFMaterialApService.getRoughness(material);
};

let getMetalness = material => {
  BSDFMaterialApService.getMetalness(material);
};

let getTransmission = material => {
  BSDFMaterialApService.getTransmission(material);
};

let getIOR = material => {
  BSDFMaterialApService.getIOR(material);
};

let getDiffuseMapImageId = material => {
  BSDFMaterialApService.getDiffuseMapImageId(material);
};

let getChannelRoughnessMetallicMapImageId = material => {
  BSDFMaterialApService.getChannelRoughnessMetallicMapImageId(material);
};

let getEmissionMapImageId = material => {
  BSDFMaterialApService.getEmissionMapImageId(material);
};

let getNormalMapImageId = material => {
  BSDFMaterialApService.getNormalMapImageId(material);
};

let getTransmissionMapImageId = material => {
  BSDFMaterialApService.getTransmissionMapImageId(material);
};

let getSpecularMapImageId = material => {
  BSDFMaterialApService.getSpecularMapImageId(material);
};

let getAlphaCutoff = material => {
  BSDFMaterialApService.getAlphaCutoff(material);
};

let isSame = (material1, material2) => {
  BSDFMaterialApService.isSame(material1, material2);
};

let getId = material => {
  BSDFMaterialApService.getId(material);
};

let getDiffuseMapImageWrapData = material =>
  BSDFMaterialApService.getDiffuseMapImageWrapData(material);

let getChannelRoughnessMetallicMapImageWrapData = material =>
  BSDFMaterialApService.getChannelRoughnessMetallicMapImageWrapData(material);

let getEmissionMapImageWrapData = material =>
  BSDFMaterialApService.getEmissionMapImageWrapData(material);

let getNormalMapImageWrapData = material =>
  BSDFMaterialApService.getNormalMapImageWrapData(material);

let getTransmissionMapImageWrapData = material =>
  BSDFMaterialApService.getTransmissionMapImageWrapData(material);

let getSpecularMapImageWrapData = material =>
  BSDFMaterialApService.getSpecularMapImageWrapData(material);

let isDoubleSide = material => BSDFMaterialApService.isDoubleSide(material);
