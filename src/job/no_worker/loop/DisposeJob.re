open StateDataMainType;

open GameObjectType;

let execJob = (flags, state) => {
  let {disposedUidArray} = state.gameObjectRecord;
  state
  |> DisposeGameObjectMainService.batchDispose(disposedUidArray)
  |> DisposeGameObjectMainService.clearDeferDisposeData
};