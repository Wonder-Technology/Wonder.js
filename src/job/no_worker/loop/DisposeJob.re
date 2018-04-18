open StateDataMainType;

open GameObjectType;

let _disposeComponents = ({gameObjectRecord} as state) => {
  let {disposedBasicCameraViewArray} = state.gameObjectRecord;
  disposedBasicCameraViewArray
  |> DisposeComponentGameObjectMainService.batchDisposeBasicCameraViewComponent(state)
};

let _disposeGameObjects = ({gameObjectRecord} as state) => {
  let {disposedUidArray, disposedUidArrayForKeepOrder} = gameObjectRecord;
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

let execJob = (flags, state) => {
  let {disposedUidArray, disposedUidArrayForKeepOrder} = state.gameObjectRecord;
  state |> _disposeComponents |> _disposeGameObjects
};