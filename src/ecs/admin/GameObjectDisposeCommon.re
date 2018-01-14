open GameObjectType;

let _handleByDisposeCount = (data, state) =>
  if (MemoryUtils.isDisposeTooMany(data.disposeCount, state)) {
    data.disposeCount = 0;
    CpuMemorySystem.reAllocateGameObject(state)
  } else {
    state
  };

let rec batchDispose = (uidArray: array(int), state: StateDataType.state) => {
  let {disposeCount, disposedUidMap} as data = GameObjectStateCommon.getGameObjectData(state);
  data.disposeCount = disposeCount + (uidArray |> Js.Array.length);
  state
  |> GameObjectDisposeComponentCommon.batchDisposeCommonComponent(
       uidArray,
       ECSDisposeUtils.buildMapFromArray(uidArray, disposedUidMap),
       batchDispose
     )
  |> _handleByDisposeCount(data)
};

let dispose = (uid: int, state: StateDataType.state) => {
  let {disposeCount, disposedUidMap} as data = GameObjectStateCommon.getGameObjectData(state);
  data.disposeCount = succ(disposeCount);
  disposedUidMap |> WonderCommonlib.SparseMapSystem.set(uid, true) |> ignore;
  state
  |> GameObjectDisposeComponentCommon.disposeComponent(uid, batchDispose)
  |> _handleByDisposeCount(data)
};