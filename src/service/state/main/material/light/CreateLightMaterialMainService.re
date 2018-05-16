open MaterialType;

open StateDataMainType;

open LightMaterialType;

let _initDataWhenCreate = (index: int, {textureCountMap} as lightMaterialRecord) => {
  ...lightMaterialRecord,
  textureCountMap:
    textureCountMap
    |> TextureCountMapMaterialService.setCount(
         index,
         TextureCountMapMaterialService.getDefaultCount()
       )
};

let create =
  [@bs]
  (
    ({settingRecord} as state) => {
      let {index, disposedIndexArray} as lightMaterialRecord =
        state |> RecordLightMaterialMainService.getRecord;
      let (index, newIndex, disposedIndexArray) =
        IndexComponentService.generateIndex(index, disposedIndexArray);
      let lightMaterialRecord = _initDataWhenCreate(index, lightMaterialRecord);
      state.lightMaterialRecord = Some({...lightMaterialRecord, index: newIndex});
      (state, index)
      |> BufferService.checkNotExceedMaxCount(
           BufferSettingService.getBasicMaterialCount(settingRecord)
         )
    }
  );