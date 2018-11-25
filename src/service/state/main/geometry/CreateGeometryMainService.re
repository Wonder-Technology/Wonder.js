open StateDataMainType;

open GeometryType;

open GeometryType;

let create =
  (. {settingRecord} as state) => {
    let {disposedIndexArray, index} as geometryRecord =
      RecordGeometryMainService.getRecord(state);
    let (index, newIndex, disposedIndexArray) =
      IndexComponentService.generateIndex(index, disposedIndexArray);
    state.geometryRecord =
      Some({...geometryRecord, index: newIndex, disposedIndexArray});
    (state, index)
    |> BufferService.checkNotExceedMaxCount(
         BufferSettingService.getGeometryCount(settingRecord),
       );
  };