open StateInitBoxGeometryType;

open BoxGeometryType;

let createInitBoxGeometryState = (state: StateDataMainType.state) => {
  let {index, vertices, normals, indices, configDataMap, isInitMap, disposedIndexArray} =
    RecordBoxGeometryMainService.getRecord(state);
  {
    boxGeometryRecord: {
      index,
      vertices,
      normals,
      indices,
      configDataMap,
      isInitMap,
      disposedIndexArray
    }
  }
};