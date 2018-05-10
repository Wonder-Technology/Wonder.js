open StateDataMainType;

open BasicMaterialType;

let getMap = (material, {settingRecord} as state) => {
  let {textureIndices, mapUnits} = RecordBasicMaterialMainService.getRecord(state);
  let textureCountPerBasicMaterial =
    BufferSettingService.getTextureCountPerBasicMaterial(settingRecord);
  OperateTypeArrayBasicMaterialService.getTextureIndex(
    (
      material,
      OperateTypeArrayBasicMaterialService.getMapUnit(material, mapUnits),
      textureCountPerBasicMaterial
    ),
    textureIndices
  )
};

let setMap = (material, texture, {settingRecord} as state) => {
  let {textureIndices, mapUnits, textureCountMap} as basicMaterialRecord =
    RecordBasicMaterialMainService.getRecord(state);
  let textureCountPerBasicMaterial =
    BufferSettingService.getTextureCountPerBasicMaterial(settingRecord);
  let mapCount = TextureCountMapBasicMaterialService.unsafeGetCount(material, textureCountMap);
  {
    ...state,
    basicMaterialRecord:
      Some({
        ...basicMaterialRecord,
        textureIndices:
          OperateTypeArrayBasicMaterialService.setTextureIndex(
            (material, mapCount, textureCountPerBasicMaterial),
            texture,
            textureIndices
          ),
        mapUnits: OperateTypeArrayBasicMaterialService.setMapUnit(material, mapCount, mapUnits),
        textureCountMap:
          textureCountMap
          |> TextureCountMapBasicMaterialService.setCount(material, mapCount |> succ)
      })
  }
};