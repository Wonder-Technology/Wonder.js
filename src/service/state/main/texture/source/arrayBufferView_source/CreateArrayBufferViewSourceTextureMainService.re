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
      let index = IndexSourceTextureMainService.generateArrayBufferViewSourceTextureIndex(index, state);
      state.arrayBufferViewSourceTextureRecord =
        Some({...arrayBufferViewSourceTextureRecord, index: newIndex});
      (state, index)
      |> BufferService.checkNotExceedMaxCount(
           BufferArrayBufferViewSourceTextureMainService.getMaxArrayBufferViewSourceTextureIndex(
             state
           )
         )
    }
  );