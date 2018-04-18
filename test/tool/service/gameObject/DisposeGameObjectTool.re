open StateDataMainType;

open GameObjectType;

open DisposeGameObjectMainService;

let _dispose = (uid: int, disposeFunc, state) => {
  let {disposeCount, disposedUidMap} as record = state.gameObjectRecord;
  record.disposeCount = succ(disposeCount);
  disposedUidMap |> WonderCommonlib.SparseMapService.set(uid, true) |> ignore;
  disposeFunc(uid, batchDispose, state) |> _handleByDisposeCount(record)
};

let dispose = (uid: int, state) => _dispose(uid, DisposeGameObjectComponentTool.dispose, state);

let disposeKeepOrder = (uid: int, state) =>
  _dispose(uid, DisposeGameObjectComponentTool.disposeKeepOrder, state);