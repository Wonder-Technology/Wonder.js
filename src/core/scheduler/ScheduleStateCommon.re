open StateDataType;

let getSchedulerData = (state: StateDataType.state) => state.schedulerData;

let deepCopyStateForRestore = (state: StateDataType.state) => {
  let {count, funcRecordArray, isFinishMap} = state |> getSchedulerData;
  {
    ...state,
    schedulerData: {
      count,
      funcRecordArray: funcRecordArray |> Js.Array.copy,
      isFinishMap: isFinishMap |> SparseMapSystem.copy
    }
  }
};