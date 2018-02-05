open ComponentSystem;

open SourceInstanceType;

open SourceInstanceStateCommon;

let create = (state: StateDataType.state) => {
  let {index, objectInstanceArrayMap, disposedIndexArray} as data = getSourceInstanceData(state);
  let (index, newIndex, disposedIndexArray) = generateIndex(index, disposedIndexArray);
  objectInstanceArrayMap
  |> WonderCommonlib.SparseMapSystem.set(index, WonderCommonlib.ArraySystem.createEmpty())
  |> ignore;
  let state =
    state
    |> SourceInstanceStaticCommon.markModelMatrixIsStatic(index, true)
    |> SourceInstanceStaticCommon.markIsSendTransformMatrixData(index, false);
  (
    {
      ...state,
      sourceInstanceData: {
        ...getSourceInstanceData(state),
        index: newIndex,
        disposedIndexArray,
        objectInstanceArrayMap
      }
    },
    index
  )
};