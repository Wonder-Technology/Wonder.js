open ComponentSystem;

open SourceInstanceType;

open SourceInstanceStateCommon;

let create = (state: StateDataType.state) => {
  let {index, objectInstanceListMap, disposedIndexArray} as data = getSourceInstanceData(state);
  let (index, newIndex) = generateIndex(index, disposedIndexArray);
  data.index = newIndex;
  objectInstanceListMap
  |> WonderCommonlib.SparseMapSystem.set(index, WonderCommonlib.ArraySystem.createEmpty());
  let state =
    state
    |> SourceInstanceStaticCommon.markModelMatrixIsStatic(index, true)
    |> SourceInstanceStaticCommon.markSendModelMatrix(index, false);
  (state, index)
};