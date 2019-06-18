open StateDataMainType;

open CubemapTextureType;

let create =
  (. {settingRecord} as state) => {
    let {index, disposedIndexArray} as cubemapTextureRecord =
      state |> RecordCubemapTextureMainService.getRecord;
    let (index, newIndex, disposedIndexArray) =
      IndexComponentService.generateIndex(index, disposedIndexArray);

    state.cubemapTextureRecord =
      Some({...cubemapTextureRecord, index: newIndex});
    (state, index)
    |> BufferService.checkNotExceedMaxCount(
         BufferSettingService.getCubemapTextureCount(settingRecord),
       );
  };