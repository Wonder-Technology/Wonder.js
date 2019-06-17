open StateDataMainType;

open BasicMaterialType;

let create =
  (. {settingRecord} as state) => {
    let {index, disposedIndexArray} as basicMaterialRecord =
      state |> RecordBasicMaterialMainService.getRecord;
    let (index, newIndex, disposedIndexArray) =
      IndexComponentService.generateIndex(index, disposedIndexArray);

    state.basicMaterialRecord =
      Some({...basicMaterialRecord, index: newIndex, disposedIndexArray});

    (state, index)
    |> BufferService.checkNotExceedMaxCount(
         BufferSettingService.getBasicMaterialCount(settingRecord),
       );
  };