open SubStateGetRenderDataType;

let getColor = (material, {basicMaterialRecord}) =>
  OperateTypeArrayBasicMaterialService.getColor(
    material,
    basicMaterialRecord.colors,
  );

let getAlpha = (material, {basicMaterialRecord}) =>
  OperateTypeArrayBasicMaterialService.getAlpha(
    material,
    basicMaterialRecord.alphas,
  );