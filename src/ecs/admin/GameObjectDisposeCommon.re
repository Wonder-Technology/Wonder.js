open StateDataType;

open GameObjectType;

let _handleByDisposeCount = (data, state) =>
  if (MemoryUtils.isDisposeTooMany(data.disposeCount, state)) {
    data.disposeCount = 0;
    CpuMemorySystem.reAllocateGameObject(state)
  } else {
    state
  };

let rec batchDispose = (uidArray: array(int), state) => {
  let {disposeCount, disposedUidMap} as data = state.gameObjectRecord;
  data.disposeCount = disposeCount + (uidArray |> Js.Array.length);
  state
  |> GameObjectDisposeComponentCommon.batchDisposeCommonComponent(
       uidArray,
       ECSDisposeUtils.buildMapFromArray(uidArray, disposedUidMap),
       batchDispose
     )
  |> _handleByDisposeCount(data)
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
  let {disposeCount, disposedUidMap} as data = state.gameObjectRecord;
  data.disposeCount = succ(disposeCount);
  disposedUidMap |> WonderCommonlib.SparseMapSystem.set(uid, true) |> ignore;
  state
  |> GameObjectDisposeComponentCommon.disposeComponent(uid, batchDispose)
  |> _handleByDisposeCount(data)
};