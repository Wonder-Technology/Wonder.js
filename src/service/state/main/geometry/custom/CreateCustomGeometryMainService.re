open StateDataMainType;

open GeometryType;

open CustomGeometryType;

let create = ({settingRecord} as state) => {
  let {disposedIndexArray, aliveIndexArray, index} as customGeometryRecord =
    RecordCustomGeometryMainService.getRecord(state);
  let (index, newIndex, disposedIndexArray) =
    IndexComponentService.generateIndex(index, disposedIndexArray);
  state.customGeometryRecord =
    Some({
      ...customGeometryRecord,
      index: newIndex,
      disposedIndexArray,
      aliveIndexArray: aliveIndexArray |> ArrayService.push(index)
    });
  (state, index)
  |> BufferService.checkNotExceedMaxCount(
       BufferSettingService.getCustomGeometryCount(settingRecord)
     )
};