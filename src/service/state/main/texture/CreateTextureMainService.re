open StateDataMainType;

open TextureType;

let create =
  [@bs]
  (
    ({settingRecord} as state) => {
      let {index, disposedIndexArray} as textureRecord =
        state |> RecordTextureMainService.getRecord;
      let (index, newIndex, disposedIndexArray) =
        IndexComponentService.generateIndex(index, disposedIndexArray);
      state.textureRecord = Some({...textureRecord, index: newIndex});
      (state, index)
      |> BufferService.checkNotExceedMaxCount(
           BufferSettingService.getTextureDataBufferCount(settingRecord)
         )
    }
  );