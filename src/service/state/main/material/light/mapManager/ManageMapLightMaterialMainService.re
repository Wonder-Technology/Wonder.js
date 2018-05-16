open StateDataMainType;

open LightMaterialType;

let getDiffuseMap = (material, {settingRecord} as state) => {
  let {textureIndices, diffuseMapUnits} = RecordLightMaterialMainService.getRecord(state);
  ManagerMapMaterialMainService.getMap(
    material,
    BufferSettingService.getTextureCountPerMaterial(settingRecord),
    (
      OperateTypeArrayLightMaterialService.getDiffuseMapUnit,
      OperateTypeArrayLightMaterialService.getTextureIndex
    ),
    (textureIndices, diffuseMapUnits)
  )
};

let unsafeGetDiffuseMap = (material, {settingRecord} as state) =>
  getDiffuseMap(material, state) |> OptionService.unsafeGet;

let setDiffuseMap = (material, texture, {settingRecord} as state) => {
  let {textureIndices, diffuseMapUnits, textureCountMap} as lightMaterialRecord =
    RecordLightMaterialMainService.getRecord(state);
  let (textureIndices, diffuseMapUnits, textureCountMap) =
    ManagerMapMaterialMainService.setMap(
      material,
      texture,
      BufferSettingService.getTextureCountPerMaterial(settingRecord),
      (
        OperateTypeArrayLightMaterialService.getDiffuseMapUnit,
        OperateTypeArrayLightMaterialService.setDiffuseMapUnit,
        OperateTypeArrayLightMaterialService.setTextureIndex
      ),
      (textureIndices, diffuseMapUnits, textureCountMap)
    );
  {
    ...state,
    lightMaterialRecord:
      Some({...lightMaterialRecord, textureIndices, diffuseMapUnits, textureCountMap})
  }
};

let getSpecularMap = (material, {settingRecord} as state) => {
  let {textureIndices, specularMapUnits} = RecordLightMaterialMainService.getRecord(state);
  ManagerMapMaterialMainService.getMap(
    material,
    BufferSettingService.getTextureCountPerMaterial(settingRecord),
    (
      OperateTypeArrayLightMaterialService.getSpecularMapUnit,
      OperateTypeArrayLightMaterialService.getTextureIndex
    ),
    (textureIndices, specularMapUnits)
  )
};

let unsafeGetSpecularMap = (material, {settingRecord} as state) =>
  getSpecularMap(material, state) |> OptionService.unsafeGet;

let setSpecularMap = (material, texture, {settingRecord} as state) => {
  let {textureIndices, specularMapUnits, textureCountMap} as lightMaterialRecord =
    RecordLightMaterialMainService.getRecord(state);
  let (textureIndices, specularMapUnits, textureCountMap) =
    ManagerMapMaterialMainService.setMap(
      material,
      texture,
      BufferSettingService.getTextureCountPerMaterial(settingRecord),
      (
        OperateTypeArrayLightMaterialService.getSpecularMapUnit,
        OperateTypeArrayLightMaterialService.setSpecularMapUnit,
        OperateTypeArrayLightMaterialService.setTextureIndex
      ),
      (textureIndices, specularMapUnits, textureCountMap)
    );
  {
    ...state,
    lightMaterialRecord:
      Some({...lightMaterialRecord, textureIndices, specularMapUnits, textureCountMap})
  }
};