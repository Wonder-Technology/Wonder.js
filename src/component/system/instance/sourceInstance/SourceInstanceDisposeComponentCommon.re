/* open SourceInstanceType;

open SourceInstanceStateCommon;

open ComponentDisposeComponentCommon;

let disposeObjectInstance = (sourceInstance, objectInstanceUid: int, state: StateDataType.state) => {
  let {objectInstanceListMap} = getSourceInstanceData(state);
  objectInstanceListMap
  |> SourceInstanceObjectInstanceListCommon.unsafeGetObjectInstanceList(sourceInstance)
  |> removeFromArray(objectInstanceUid)
  |> ignore;
  state
};

let batchDisposeObjectInstance = (sourceInstance, objectInstanceUid: int, state: StateDataType.state) => {
  let {objectInstanceListMap} = getSourceInstanceData(state);
  objectInstanceListMap
  |> SourceInstanceObjectInstanceListCommon.unsafeGetObjectInstanceList(sourceInstance)
  |> removeFromArray(objectInstanceUid)
  |> ignore;
  state
}; */