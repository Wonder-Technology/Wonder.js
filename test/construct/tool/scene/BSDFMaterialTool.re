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

let truncateColor = color => {
  let (r, g, b) = color->DiffuseVO.getPrimitiveValue;

  (
    TruncateTool.truncateFloatValue(5, r),
    TruncateTool.truncateFloatValue(5, g),
    TruncateTool.truncateFloatValue(5, b),
  )
  ->createDiffuseColor;
};

let getDiffuseMapImageId = BSDFMaterialRunAPI.getDiffuseMapImageId;

let getChannelRoughnessMetallicMapImageId = BSDFMaterialRunAPI.getChannelRoughnessMetallicMapImageId;

let getEmissionMapImageId = BSDFMaterialRunAPI.getEmissionMapImageId;

let getNormalMapImageId = BSDFMaterialRunAPI.getNormalMapImageId;

let getTransmissionMapImageId = BSDFMaterialRunAPI.getTransmissionMapImageId;
