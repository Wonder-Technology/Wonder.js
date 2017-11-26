let getMappedIndex = (index, mappedIndexMap) =>
  mappedIndexMap |> SparseMapSystem.unsafeGet(index);

let setMappedIndex = (index, mappedIndex, mappedIndexMap) =>
  mappedIndexMap |> SparseMapSystem.set(index, mappedIndex);

let getMappedIndexMap = (state: StateDataType.state) =>
  GeometryStateUtils.getGeometryData(state).mappedIndexMap;