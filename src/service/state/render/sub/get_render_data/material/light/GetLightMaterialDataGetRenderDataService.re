open SubStateGetRenderDataType;

open RenderLightMaterialType;

let getDiffuseColor = (material, {lightMaterialRecord}) =>
  OperateTypeArrayAllLightMaterialService.getDiffuseColor(
    material,
    lightMaterialRecord.diffuseColors,
  );

let getSpecularColor = (material, {lightMaterialRecord}) =>
  OperateTypeArrayAllLightMaterialService.getSpecularColor(
    material,
    lightMaterialRecord.specularColors,
  );

let getShininess = (material, {lightMaterialRecord}) =>
  OperateTypeArrayAllLightMaterialService.getShininess(
    material,
    lightMaterialRecord.shininess,
  );

let getDiffuseTexture = (material, {lightMaterialRecord}) =>
  OperateTypeArrayAllLightMaterialService.getTextureIndex(.
    material,
    lightMaterialRecord.diffuseTextureIndices,
  );

let getSpecularTexture = (material, {lightMaterialRecord}) =>
  OperateTypeArrayAllLightMaterialService.getTextureIndex(.
    material,
    lightMaterialRecord.specularTextureIndices,
  );

let _unsafeGetMapUnit = (material, unitMap) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|unitMap has unit|j},
                ~actual={j|not|j},
              ),
              () =>
              unitMap
              |> WonderCommonlib.MutableSparseMapService.has(material)
              |> assertTrue
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  unitMap |> WonderCommonlib.MutableSparseMapService.unsafeGet(material);
};

let unsafeGetDiffuseMapUnit = (material, lightMaterialRecord) =>
  _unsafeGetMapUnit(material, lightMaterialRecord.diffuseMapUnitMap);

let unsafeGetSpecularMapUnit = (material, lightMaterialRecord) =>
  _unsafeGetMapUnit(material, lightMaterialRecord.specularMapUnitMap);

let getDiffuseMapUnit = (material, {lightMaterialRecord}) =>
  unsafeGetDiffuseMapUnit(material, lightMaterialRecord);

let getSpecularMapUnit = (material, {lightMaterialRecord}) =>
  unsafeGetSpecularMapUnit(material, lightMaterialRecord);