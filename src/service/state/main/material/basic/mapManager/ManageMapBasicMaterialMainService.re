open BasicMaterialType;

/* let _setMapTextureIndex = (material, texture, mapTextureIndexMap) =>
   mapTextureIndexMap |> WonderCommonlib.SparseMapService.set(material, texture); */
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
  /* let mapCount = OperateTypeArrayBasicMaterialService.getTextureCount(material, textureCounts); */
  let mapCount = TextureCountMapBasicMaterialService.unsafeGetCount(material, textureCountMap);
  /* let textureCounts =
       OperateTypeArrayBasicMaterialService.setTextureCount(
         material,
         mapCount |> succ,
         textureCounts
       );
     let textureIndices =
       OperateTypeArrayBasicMaterialService.setTextureIndex(
         (material, mapCount, textureCountPerBasicMaterial),
         texture,
         textureIndices
       );
     let mapTextureIndexMap = _setMapTextureIndex(material, texture, mapTextureIndexMap); */
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
        /* textureCounts:
           OperateTypeArrayBasicMaterialService.setTextureCount(
             material,
             mapCount |> succ,
             textureCounts
           ), */
        /* mapTextureIndexMap: _setMapTextureIndex(material, texture, mapTextureIndexMap) */
        mapUnits:
          OperateTypeArrayBasicMaterialService.setMapUnit(material, mapCount, mapUnits),
        textureCountMap:
          textureCountMap
          |> TextureCountMapBasicMaterialService.setCount(material, mapCount |> succ)
      })
  }
};