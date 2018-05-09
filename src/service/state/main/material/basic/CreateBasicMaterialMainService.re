open StateDataMainType;

open BasicMaterialType;

/* TODO test */
let _initDataWhenCreate = (index: int, {textureCountMap} as basicMaterialRecord) => {
  ...basicMaterialRecord,
  textureCountMap:
    textureCountMap
    |> TextureCountMapBasicMaterialService.setCount(
         index,
         TextureCountMapBasicMaterialService.getDefaultCount()
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
      state.basicMaterialRecord = Some({...basicMaterialRecord, index: newIndex});
      (state, index)
      |> BufferService.checkNotExceedMaxCount(
           BufferSettingService.getBasicMaterialDataBufferCount(settingRecord)
         )
    }
  );