open StateDataMainType;

open BasicMaterialType;

let getMap = (material, {settingRecord} as state) => {
  let {textureIndices, mapUnits} = RecordBasicMaterialMainService.getRecord(state);
  ManagerMapMaterialMainService.getMap(
    material,
    BufferSettingService.getTextureCountPerMaterial(settingRecord),
    (
      OperateTypeArrayBasicMaterialService.getMapUnit,
      OperateTypeArrayBasicMaterialService.getTextureIndex
    ),
    (textureIndices, mapUnits)
  )
};

let unsafeGetMap = (material, {settingRecord} as state) =>
  getMap(material, state) |> OptionService.unsafeGet;

let setMap = (material, texture, {settingRecord} as state) => {
  let {textureIndices, mapUnits, textureCountMap} as basicMaterialRecord =
    RecordBasicMaterialMainService.getRecord(state);
  let (textureIndices, mapUnits, textureCountMap) =
    ManagerMapMaterialMainService.setMap(
      material,
      texture,
      BufferSettingService.getTextureCountPerMaterial(settingRecord),
      (
        OperateTypeArrayBasicMaterialService.getMapUnit,
        OperateTypeArrayBasicMaterialService.setMapUnit,
        OperateTypeArrayBasicMaterialService.setTextureIndex
      ),
      (textureIndices, mapUnits, textureCountMap)
    );
  {
    ...state,
    basicMaterialRecord: Some({...basicMaterialRecord, textureIndices, mapUnits, textureCountMap})
  }
};