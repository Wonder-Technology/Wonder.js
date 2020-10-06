open Js.Typed_array;

let isBRDFMaterial = material => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(material->BRDFMaterialEntity.value) >= 0;
};

let getMaxIndex = () => {
  CPRepo.getExnBRDFMaterial().maxIndex;
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

let getDiffuseMapImageId = OperateBRDFMaterialDoService.getDiffuseMapImageId;

let getChannelRoughnessMetallicMapImageId = OperateBRDFMaterialDoService.getChannelRoughnessMetallicMapImageId;

let getEmissionMapImageId = OperateBRDFMaterialDoService.getEmissionMapImageId;

let getNormalMapImageId = OperateBRDFMaterialDoService.getNormalMapImageId;
