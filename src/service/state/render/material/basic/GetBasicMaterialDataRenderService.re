open GlType;

open StateRenderType;

let getColor = (material, {basicMaterialRecord}) =>
  OperateTypeArrayBasicMaterialService.getColor(
    material,
    basicMaterialRecord.colors,
  );

let getMapUnit = (material, {basicMaterialRecord}) =>
  OperateTypeArrayBasicMaterialService.getMapUnit(.
    material,
    basicMaterialRecord.mapUnits,
  );