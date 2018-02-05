open GeometryGetStateDataCommon;

open StateDataType;

open ComponentSystem;

let create = (state: StateDataType.state) => {
  let {index, disposedIndexArray} as data = getGeometryData(state);
  generateIndex(index, disposedIndexArray)
};