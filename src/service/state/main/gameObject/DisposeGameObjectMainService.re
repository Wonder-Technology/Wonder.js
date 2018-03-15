open MainStateDataType;

open GameObjectType;

let _handleByDisposeCount = (record, state) =>
  if (QueryCPUMemoryService.isDisposeTooMany(record.disposeCount, state.settingRecord)) {
    record.disposeCount = 0;
    {
      ...state,
      gameObjectRecord:
        ReallocateGameObjectCPUMemoryService.reAllocateGameObject(state.gameObjectRecord)
    }
  } else {
    state
  };

let rec batchDispose = (uidArray: array(int), state) => {
  let {disposeCount, disposedUidMap} as record = state.gameObjectRecord;
  record.disposeCount = disposeCount + (uidArray |> Js.Array.length);
  state
  |> DisposeGameObjectComponentMainService.batchDispose(
       uidArray,
       DisposeECSService.buildMapFromArray(uidArray, disposedUidMap),
       batchDispose
     )
  |> _handleByDisposeCount(record)
};

let dispose = (uid: int, state) => {
  let {disposeCount, disposedUidMap} as record = state.gameObjectRecord;
  record.disposeCount = succ(disposeCount);
  disposedUidMap |> WonderCommonlib.SparseMapService.set(uid, true) |> ignore;
  state
  |> DisposeGameObjectComponentMainService.dispose(uid, batchDispose)
  |> _handleByDisposeCount(record)
};

let disposeKeepOrder = (uid: int, state) => {
  let {disposeCount, disposedUidMap} as record = state.gameObjectRecord;
  record.disposeCount = succ(disposeCount);
  disposedUidMap |> WonderCommonlib.SparseMapService.set(uid, true) |> ignore;
  state
  |> DisposeGameObjectComponentMainService.disposeKeepOrder(uid, batchDispose)
  |> _handleByDisposeCount(record)
};