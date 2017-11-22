let getMappedIndex = (indexStr, mappedIndexMap) =>
  mappedIndexMap |> WonderCommonlib.HashMapSystem.unsafeGet(indexStr);

let setMappedIndex = (indexStr, mappedIndex, mappedIndexMap) =>
  mappedIndexMap |> WonderCommonlib.HashMapSystem.set(indexStr, mappedIndex);

let getMappedIndexMap = (state: StateDataType.state) =>
  GeometryStateUtils.getGeometryData(state).mappedIndexMap;