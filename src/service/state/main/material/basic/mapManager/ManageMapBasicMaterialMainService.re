open BasicMaterialType;

let _setMapTextureIndex = (material, texture, mapTextureIndexMap) =>
  mapTextureIndexMap |> WonderCommonlib.SparseMapService.set(material, texture);

let getMap = (material, state) => {
  let {mapTextureIndexMap} =
    RecordBasicMaterialMainService.getRecord(state);
  mapTextureIndexMap |> WonderCommonlib.SparseMapService.unsafeGet(material)
};

let setMap = (material, texture, {settingRecord} as state) => {
  let {textureIndices, textureCounts, mapTextureIndexMap} as basicMaterialRecord =
    RecordBasicMaterialMainService.getRecord(state);
  let textureCountPerBasicMaterial =
    BufferSettingService.getTextureCountPerBasicMaterial(settingRecord);
  let mapCount = OperateTypeArrayBasicMaterialService.getTextureCount(material, textureCounts);
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
        textureCounts:
          OperateTypeArrayBasicMaterialService.setTextureCount(
            material,
            mapCount |> succ,
            textureCounts
          ),
        mapTextureIndexMap: _setMapTextureIndex(material, texture, mapTextureIndexMap)
      })
  }
};