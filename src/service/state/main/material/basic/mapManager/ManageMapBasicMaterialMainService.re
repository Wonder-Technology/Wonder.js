open StateDataMainType;

open BasicMaterialType;

let getMap = (material, {settingRecord} as state) => {
  let {textureIndices, mapUnits} = RecordBasicMaterialMainService.getRecord(state);
  let textureCountPerMaterial = BufferSettingService.getTextureCountPerMaterial(settingRecord);
  let mapUnit = OperateTypeArrayBasicMaterialService.getMapUnit(material, mapUnits);
  MapUnitService.hasMap(mapUnit) ?
    Some(
      OperateTypeArrayBasicMaterialService.getTextureIndex(
        (material, mapUnit, textureCountPerMaterial),
        textureIndices
      )
    ) :
    None
};

let unsafeGetMap = (material, {settingRecord} as state) =>
  getMap(material, state) |> OptionService.unsafeGet;

/* let _hasMap = (material, mapUnits) => {
     OperateTypeArrayBasicMaterialService.getMapUnit(material, mapUnits) |> MapUnitService.hasMap
   }; */
let setMap = (material, texture, {settingRecord} as state) => {
  let {textureIndices, mapUnits, textureCountMap} as basicMaterialRecord =
    RecordBasicMaterialMainService.getRecord(state);
  let textureCountPerMaterial = BufferSettingService.getTextureCountPerMaterial(settingRecord);
  let mapUnit = OperateTypeArrayBasicMaterialService.getMapUnit(material, mapUnits);
  MapUnitService.hasMap(mapUnit) ?
    {
      ...state,
      basicMaterialRecord:
        Some({
          ...basicMaterialRecord,
          textureIndices:
            OperateTypeArrayBasicMaterialService.setTextureIndex(
              (material, mapUnit, textureCountPerMaterial),
              texture,
              textureIndices
            )
        })
    } :
    {
      let mapCount = TextureCountMapMaterialService.unsafeGetCount(material, textureCountMap);
      {
        ...state,
        basicMaterialRecord:
          Some({
            ...basicMaterialRecord,
            textureIndices:
              OperateTypeArrayBasicMaterialService.setTextureIndex(
                (material, mapCount, textureCountPerMaterial),
                texture,
                textureIndices
              ),
            mapUnits: OperateTypeArrayBasicMaterialService.setMapUnit(material, mapCount, mapUnits),
            textureCountMap:
              textureCountMap
              |> TextureCountMapMaterialService.setCount(material, mapCount |> succ)
          })
      }
    }
};