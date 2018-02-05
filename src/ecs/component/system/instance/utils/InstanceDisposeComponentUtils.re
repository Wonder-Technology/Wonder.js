open SourceInstanceType;

open SourceInstanceStateCommon;

open ComponentDisposeComponentCommon;

let disposeObjectInstance = (sourceInstance, objectInstanceUid: int, state: StateDataType.state) => {
  let {objectInstanceArrayMap} as data = getSourceInstanceData(state);
  objectInstanceArrayMap
  |> SourceInstanceObjectInstanceArrayCommon.unsafeGetObjectInstanceArray(sourceInstance)
  |> removeFromArray(objectInstanceUid)
  |> ignore;
  state
};

let batchDisposeObjectInstance =
    (sourceInstance, disposedUidMap, disposedUidArr, state: StateDataType.state) => {
  let {objectInstanceArrayMap} = getSourceInstanceData(state);
  objectInstanceArrayMap
  |> WonderCommonlib.SparseMapSystem.set(
       sourceInstance,
       batchRemoveFromArray(disposedUidMap, disposedUidArr)
     )
  |> ignore;
  state
};