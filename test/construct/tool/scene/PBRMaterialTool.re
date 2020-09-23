open Js.Typed_array;

let isPBRMaterial = material => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(material->PBRMaterialEntity.value) >= 0;
};

let getMaxIndex = () => {
  CPRepo.getExnPBRMaterial().maxIndex;
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

let getDiffuseMapImageId = OperatePBRMaterialDoService.getDiffuseMapImageId;

let getMetalRoughnessMapImageId = OperatePBRMaterialDoService.getMetalRoughnessMapImageId;

let getEmissionMapImageId = OperatePBRMaterialDoService.getEmissionMapImageId;

let getNormalMapImageId = OperatePBRMaterialDoService.getNormalMapImageId;
