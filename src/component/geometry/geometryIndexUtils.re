let getIndexFromIndexMap = (indexStr, indexMap) =>
  indexMap |> WonderCommonlib.HashMapSystem.unsafeGet(indexStr);

let setIndexToIndexMap = (oldIndexStr, newIndex, indexMap) =>
  indexMap |> WonderCommonlib.HashMapSystem.set(oldIndexStr, newIndex);

let getIndexMap = (state: StateDataType.state) =>
  GeometryStateUtils.getGeometryData(state).indexMap;