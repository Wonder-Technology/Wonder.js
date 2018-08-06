open StateDataMainType;

open GeometryType;

open GeometryType;

let create = ({settingRecord} as state) => {
  let {disposedIndexArray, aliveIndexArray, index} as geometryRecord =
    RecordGeometryMainService.getRecord(state);
  let (index, newIndex, disposedIndexArray) =
    IndexComponentService.generateIndex(index, disposedIndexArray);
  state.geometryRecord =
    Some({
      ...geometryRecord,
      index: newIndex,
      disposedIndexArray,
      aliveIndexArray: aliveIndexArray |> ArrayService.push(index)
    });
  (state, index)
  |> BufferService.checkNotExceedMaxCount(
       BufferSettingService.getGeometryCount(settingRecord)
     )
};