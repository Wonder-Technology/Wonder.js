open StateDataType;

open GameObjectType;

let _handleByDisposeCount = (record, state) =>
  if (MemoryUtils.isDisposeTooMany(record.disposeCount, state)) {
    record.disposeCount = 0;
    CpuMemorySystem.reAllocateGameObject(state)
  } else {
    state
  };

let rec batchDispose = (uidArray: array(int), state) => {
  let {disposeCount, disposedUidMap} as record = state.gameObjectRecord;
  record.disposeCount = disposeCount + (uidArray |> Js.Array.length);
  state
  |> GameObjectDisposeComponentCommon.batchDisposeCommonComponent(
       uidArray,
       DisposeECSService.buildMapFromArray(uidArray, disposedUidMap),
       batchDispose
     )
  |> _handleByDisposeCount(record)
};

let dispose =
    (
      uid: int,
      /* (
         gameObjectRecord,
         basicCameraViewData,
         state: StateDataType.state
         ) as dataTuple */
      state
    ) => {
  let {disposeCount, disposedUidMap} as record = state.gameObjectRecord;
  record.disposeCount = succ(disposeCount);
  disposedUidMap |> WonderCommonlib.SparseMapSystem.set(uid, true) |> ignore;
  state
  |> GameObjectDisposeComponentCommon.disposeComponent(uid, batchDispose)
  |> _handleByDisposeCount(record)
};