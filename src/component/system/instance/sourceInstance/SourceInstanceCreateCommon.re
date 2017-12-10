open SourceInstanceType;

open SourceInstanceStateCommon;

let create = (state: StateDataType.state) => {
  let {index, objectInstanceListMap} as data = getData(state);
  data.index = succ(index);
  objectInstanceListMap
  |> WonderCommonlib.SparseMapSystem.set(index, WonderCommonlib.ArraySystem.createEmpty());
  let state =
    state
    |> SourceInstanceStaticCommon.markModelMatrixIsStatic(index, true)
    |> SourceInstanceStaticCommon.markSendModelMatrix(index, false);
  (state, index)
};