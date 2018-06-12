open StateRenderType;

let getDiffuseColor = (material, {lightMaterialRecord}) =>
  OperateTypeArrayLightMaterialService.getDiffuseColor(
    material,
    lightMaterialRecord.diffuseColors,
  );

let getSpecularColor = (material, {lightMaterialRecord}) =>
  OperateTypeArrayLightMaterialService.getSpecularColor(
    material,
    lightMaterialRecord.specularColors,
  );

let getShininess = (material, {lightMaterialRecord}) =>
  OperateTypeArrayLightMaterialService.getShininess(
    material,
    lightMaterialRecord.shininess,
  );

let getDiffuseMapUnit = (material, {lightMaterialRecord}) =>
  OperateTypeArrayLightMaterialService.getDiffuseMapUnit(.
    material,
    lightMaterialRecord.diffuseMapUnits,
  );

let getSpecularMapUnit = (material, {lightMaterialRecord}) =>
  OperateTypeArrayLightMaterialService.getSpecularMapUnit(.
    material,
    lightMaterialRecord.specularMapUnits,
  );