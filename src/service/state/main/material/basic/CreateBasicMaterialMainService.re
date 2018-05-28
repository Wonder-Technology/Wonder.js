open StateDataMainType;

open BasicMaterialType;

let _initDataWhenCreate = (index: int, {textureCountMap} as basicMaterialRecord) => {
  ...basicMaterialRecord,
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
      let {index, disposedIndexArray} as basicMaterialRecord =
        state |> RecordBasicMaterialMainService.getRecord;
      let (index, newIndex, disposedIndexArray) =
        IndexComponentService.generateIndex(index, disposedIndexArray);
      let basicMaterialRecord = _initDataWhenCreate(index, basicMaterialRecord);
      state.basicMaterialRecord =
        Some({...basicMaterialRecord, index: newIndex, disposedIndexArray});
      (state, index)
      |> BufferService.checkNotExceedMaxCount(
           BufferSettingService.getBasicMaterialCount(settingRecord)
         )
    }
  );