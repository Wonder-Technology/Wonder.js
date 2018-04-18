open StateDataMainType;

open GameObjectType;

let _handleByDisposeCount = (record, state) =>
  if (QueryCPUMemoryService.isDisposeTooMany(record.disposeCount, state.settingRecord)) {
    record.disposeCount = 0;
    {
      ...state,
      gameObjectRecord: ReallocateGameObjectCPUMemoryService.reAllocate(state.gameObjectRecord)
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

let deferBatchDispose = (uidArray: array(int), state) => {
  ...state,
  gameObjectRecord: {
    ...state.gameObjectRecord,
    disposedUidArray: state.gameObjectRecord.disposedUidArray |> Js.Array.concat(uidArray)
  }
};

let clearDeferDisposeData = (state) => {
  ...state,
  gameObjectRecord: {
    ...state.gameObjectRecord,
    disposedUidArray: WonderCommonlib.ArrayService.createEmpty()
  }
};

let _dispose = (uid: int, disposeFunc, state) => {
  let {disposeCount, disposedUidMap} as record = state.gameObjectRecord;
  record.disposeCount = succ(disposeCount);
  disposedUidMap |> WonderCommonlib.SparseMapService.set(uid, true) |> ignore;
  disposeFunc(uid, batchDispose, state) |> _handleByDisposeCount(record)
};

let dispose = (uid: int, state) =>
  _dispose(uid, DisposeGameObjectComponentMainService.dispose, state);

let disposeKeepOrder = (uid: int, state) =>
  _dispose(uid, DisposeGameObjectComponentMainService.disposeKeepOrder, state);