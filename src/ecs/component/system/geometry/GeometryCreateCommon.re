open GeometryGetStateDataCommon;

open StateDataType;

open ComponentSystem;

let create = (state: StateDataType.state) => {
  let {index, disposedIndexArray} as data = getGeometryData(state);
  let (index, newIndex) = generateIndex(index, disposedIndexArray);
  data.index = newIndex;
  (state, index)
};