open StateRenderType;

let getColor = (material, {basicMaterialRecord}) =>
  OperateTypeArrayBasicMaterialService.getColor(material, basicMaterialRecord.colors);