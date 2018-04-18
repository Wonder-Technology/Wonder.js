open StateDataMainType;

open GameObjectType;

let execJob = (flags, state) => {
  let {disposedUidArray, disposedUidArrayForKeepOrder} = state.gameObjectRecord;
  let state =
    state
    |> DisposeGameObjectMainService.batchDispose(disposedUidArray)
    |> DisposeGameObjectMainService.clearDeferDisposeData;
  /* TODO perf: add batch dispose for keep order */
  disposedUidArrayForKeepOrder
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs] ((state, uid) => DisposeGameObjectMainService.disposeKeepOrder(uid, state)),
       state
     )
};