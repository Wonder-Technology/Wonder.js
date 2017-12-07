open SourceInstanceType;

open SourceInstanceStateSystem;

let create = (state: StateDataType.state) => {
  let {index, objectInstanceListMap} as data = getData(state);
  data.index = succ(index);
  objectInstanceListMap
  |> WonderCommonlib.SparseMapSystem.set(index, WonderCommonlib.ArraySystem.createEmpty());
  let state =
    state
    |> SourceInstanceStaticSystem.markModelMatrixIsStatic(index, true)
    |> SourceInstanceStaticSystem.markSendModelMatrix(index, false);
  (state, index)
};