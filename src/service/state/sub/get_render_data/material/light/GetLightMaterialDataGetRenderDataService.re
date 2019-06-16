open SubStateGetRenderDataType;

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

let getDiffuseTexture = (material, {lightMaterialRecord}) =>
  OperateTypeArrayLightMaterialService.getTextureIndex(.
    material,
    lightMaterialRecord.diffuseTextureIndices,
  );

let getSpecularTexture = (material, {lightMaterialRecord}) =>
  OperateTypeArrayLightMaterialService.getTextureIndex(.
    material,
    lightMaterialRecord.specularTextureIndices,
  );

let getDiffuseMapUnit = (material, {lightMaterialRecord}) =>
  MapUnitLightMaterialService.unsafeGetDiffuseMapUnit(
    material,
    lightMaterialRecord,
  );

let getSpecularMapUnit = (material, {lightMaterialRecord}) =>
  MapUnitLightMaterialService.unsafeGetSpecularMapUnit(
    material,
    lightMaterialRecord,
  );