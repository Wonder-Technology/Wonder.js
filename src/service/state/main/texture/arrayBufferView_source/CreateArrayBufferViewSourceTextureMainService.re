open StateDataMainType;

open ArrayBufferViewSourceTextureType;

let create =
  [@bs]
  (
    ({settingRecord} as state) => {
      let {index, disposedIndexArray} as arrayBufferViewSourceTextureRecord =
        state |> RecordArrayBufferViewSourceTextureMainService.getRecord;
      let (index, newIndex, disposedIndexArray) =
        IndexComponentService.generateIndex(index, disposedIndexArray);
        /* TODO test */
      let index =
        CreateSourceTextureMainService.getArrayBufferViewSourceTextureIndex(index, state);
      state.arrayBufferViewSourceTextureRecord =
        Some({...arrayBufferViewSourceTextureRecord, index: newIndex});
      (state, index)
      |> BufferService.checkNotExceedMaxCount(
           BufferSettingService.getArrayBufferViewSourceTextureCount(settingRecord)
         )
    }
  );