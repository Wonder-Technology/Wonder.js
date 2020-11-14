let getDiffuseColor = material => {
  OperateBSDFMaterialDoService.getDiffuseColor(material);
};

let getSpecular = material => {
  OperateBSDFMaterialDoService.getSpecular(material);
};

let getSpecularColor = material => {
  OperateBSDFMaterialDoService.getSpecularColor(material);
};

let getRoughness = material => {
  OperateBSDFMaterialDoService.getRoughness(material);
};

let getMetalness = material => {
  OperateBSDFMaterialDoService.getMetalness(material);
};

let getTransmission = material => {
  OperateBSDFMaterialDoService.getTransmission(material);
};

let getIOR = material => {
  OperateBSDFMaterialDoService.getIOR(material);
};

let getDiffuseMapImageId = material => {
  OperateBSDFMaterialDoService.getDiffuseMapImageId(material);
};

let getChannelRoughnessMetallicMapImageId = material => {
  OperateBSDFMaterialDoService.getChannelRoughnessMetallicMapImageId(
    material,
  );
};

let getEmissionMapImageId = material => {
  OperateBSDFMaterialDoService.getEmissionMapImageId(material);
};

let getNormalMapImageId = material => {
  OperateBSDFMaterialDoService.getNormalMapImageId(material);
};

let getTransmissionMapImageId = material => {
  OperateBSDFMaterialDoService.getTransmissionMapImageId(material);
};

let getSpecularMapImageId = material => {
  OperateBSDFMaterialDoService.getSpecularMapImageId(material);
};

let getAlphaCutoff = material => {
  OperateBSDFMaterialDoService.getAlphaCutoff(material);
};

let isSame = (material1, material2) => {
  OperateBSDFMaterialDoService.isSame(material1, material2);
};

let getId = material => {
  OperateBSDFMaterialDoService.getId(material);
};

let getDiffuseMapImageWrapData = material =>
  OperateBSDFMaterialDoService.getDiffuseMapImageWrapData(material);

let getChannelRoughnessMetallicMapImageWrapData = material =>
  OperateBSDFMaterialDoService.getChannelRoughnessMetallicMapImageWrapData(
    material,
  );

let getEmissionMapImageWrapData = material =>
  OperateBSDFMaterialDoService.getEmissionMapImageWrapData(material);

let getNormalMapImageWrapData = material =>
  OperateBSDFMaterialDoService.getNormalMapImageWrapData(material);

let getTransmissionMapImageWrapData = material =>
  OperateBSDFMaterialDoService.getTransmissionMapImageWrapData(material);

let getSpecularMapImageWrapData = material =>
  OperateBSDFMaterialDoService.getSpecularMapImageWrapData(material);

let isDoubleSide = material =>
  OperateBSDFMaterialDoService.isDoubleSide(material);
