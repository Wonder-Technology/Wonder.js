open StateDataMainType;

open BasicSourceTextureType;

let create =
  (. {settingRecord} as state) => {
    let {index, disposedIndexArray} as basicSourceTextureRecord =
      state |> RecordBasicSourceTextureMainService.getRecord;
    let (index, newIndex, disposedIndexArray) =
      IndexComponentService.generateIndex(index, disposedIndexArray);
    let index =
      IndexSourceTextureMainService.generateBasicSourceTextureIndex(index);
    state.basicSourceTextureRecord =
      Some({...basicSourceTextureRecord, index: newIndex});
    (state, index)
    |> BufferService.checkNotExceedMaxCount(
         BufferSettingService.getBasicSourceTextureCount(settingRecord),
       );
  };