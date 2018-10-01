open MaterialType;

open StateDataMainType;

open LightMaterialType;

let _initDataWhenCreate =
    (
      index: int,
      textureCountPerMaterial,
      {emptyMapUnitArrayMap} as lightMaterialRecord,
    ) => {
  ...lightMaterialRecord,
  emptyMapUnitArrayMap:
    emptyMapUnitArrayMap
    |> EmptyMapUnitArrayMapService.initEmptyMapUnitArray(
         index,
         textureCountPerMaterial,
       ),
};

let create =
  (. {settingRecord} as state) => {
    let {index, disposedIndexArray} as lightMaterialRecord =
      state |> RecordLightMaterialMainService.getRecord;
    let (index, newIndex, disposedIndexArray) =
      IndexComponentService.generateIndex(index, disposedIndexArray);
    let lightMaterialRecord =
      _initDataWhenCreate(
        index,
        BufferSettingService.getTextureCountPerMaterial(settingRecord),
        lightMaterialRecord,
      );
    state.lightMaterialRecord =
      Some({...lightMaterialRecord, index: newIndex, disposedIndexArray});
    (state, index)
    |> BufferService.checkNotExceedMaxCount(
         BufferSettingService.getBasicMaterialCount(settingRecord),
       );
  };