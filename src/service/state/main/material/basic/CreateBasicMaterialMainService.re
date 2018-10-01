open StateDataMainType;

open BasicMaterialType;

let _initDataWhenCreate =
    (
      index: int,
      textureCountPerMaterial,
      {emptyMapUnitArrayMap} as basicMaterialRecord,
    ) => {
  ...basicMaterialRecord,
  emptyMapUnitArrayMap:
    emptyMapUnitArrayMap
    |> EmptyMapUnitArrayMapService.initEmptyMapUnitArray(
         index,
         textureCountPerMaterial,
       ),
};

let create =
  (. {settingRecord} as state) => {
    let {index, disposedIndexArray} as basicMaterialRecord =
      state |> RecordBasicMaterialMainService.getRecord;
    let (index, newIndex, disposedIndexArray) =
      IndexComponentService.generateIndex(index, disposedIndexArray);
    let basicMaterialRecord =
      _initDataWhenCreate(
        index,
        BufferSettingService.getTextureCountPerMaterial(settingRecord),
        basicMaterialRecord,
      );
    state.basicMaterialRecord =
      Some({...basicMaterialRecord, index: newIndex, disposedIndexArray});
    (state, index)
    |> BufferService.checkNotExceedMaxCount(
         BufferSettingService.getBasicMaterialCount(settingRecord),
       );
  };