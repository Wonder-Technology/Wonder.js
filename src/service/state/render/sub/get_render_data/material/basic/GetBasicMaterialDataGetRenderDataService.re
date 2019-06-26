open SubStateGetRenderDataType;

let getColor = (material, {basicMaterialRecord}) =>
  OperateTypeArrayAllBasicMaterialService.getColor(
    material,
    basicMaterialRecord.colors,
  );

let getAlpha = (material, {basicMaterialRecord}) =>
  OperateTypeArrayAllBasicMaterialService.getAlpha(
    material,
    basicMaterialRecord.alphas,
  );