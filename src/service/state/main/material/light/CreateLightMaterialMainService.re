open MaterialType;

open StateDataMainType;

open LightMaterialType;

let create =
  (. {settingRecord} as state) => {
    let {index, disposedIndexArray} as lightMaterialRecord =
      state |> RecordLightMaterialMainService.getRecord;
    let (index, newIndex, disposedIndexArray) =
      IndexComponentService.generateIndex(index, disposedIndexArray);

    state.lightMaterialRecord =
      Some({...lightMaterialRecord, index: newIndex, disposedIndexArray});

    (state, index)
    |> BufferService.checkNotExceedMaxCount(
         BufferSettingService.getBasicMaterialCount(settingRecord),
       );
  };