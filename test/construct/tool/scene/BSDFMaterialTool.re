open Js.Typed_array;

let isBSDFMaterial = material => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(material->BSDFMaterialEntity.value) >= 0;
};

let getMaxIndex = () => {
  CPRepo.getExnBSDFMaterial().maxIndex;
};

let createDiffuseColor = color => color->Color3VO.create->DiffuseVO.create;

let createSpecularColor = color =>
  color->Color3VO.create->SpecularColorVO.create;

let _truncateColor = ((r, g, b)) => {
  (
    TruncateTool.truncateFloatValue(5, r),
    TruncateTool.truncateFloatValue(5, g),
    TruncateTool.truncateFloatValue(5, b),
  );
};

let truncateDiffuseColor = color => {
  color->DiffuseVO.getPrimitiveValue->_truncateColor->createDiffuseColor;
};

let truncateSpecularColor = color => {
  color
  ->SpecularColorVO.getPrimitiveValue
  ->_truncateColor
  ->createSpecularColor;
};

let getDiffuseMapImageId = BSDFMaterialRunAPI.getDiffuseMapImageId;

let getChannelRoughnessMetallicMapImageId = BSDFMaterialRunAPI.getChannelRoughnessMetallicMapImageId;

let getEmissionMapImageId = BSDFMaterialRunAPI.getEmissionMapImageId;

let getNormalMapImageId = BSDFMaterialRunAPI.getNormalMapImageId;

let getTransmissionMapImageId = BSDFMaterialRunAPI.getTransmissionMapImageId;
