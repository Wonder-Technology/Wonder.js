open MainStateDataType;

open BasicMaterialType;

let create =
  [@bs]
  (
    ({settingRecord} as state) => {
      let {index, disposedIndexArray} as basicMaterialRecord =
        state |> RecordBasicMaterialMainService.getRecord;
      let (index, newIndex, disposedIndexArray) =
        IndexComponentService.generateIndex(index, disposedIndexArray);
      ({...state, basicMaterialRecord: Some({...basicMaterialRecord, index: newIndex})}, index)
      |> BufferService.checkNotExceedMaxCount(
           BufferSettingService.getBasicMaterialDataBufferCount(settingRecord)
         )
    }
  );