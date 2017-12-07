open SourceInstanceType;

open SourceInstanceStateSystem;

let create = (state: StateDataType.state) => {
  let {index, objectInstanceListMap} as data = getData(state);
  data.index = succ(index);
  objectInstanceListMap
  |> WonderCommonlib.SparseMapSystem.set(index, WonderCommonlib.ArraySystem.createEmpty());
  (state, index)
};