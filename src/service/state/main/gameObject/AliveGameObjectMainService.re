open MainStateDataType;

open MainStateDataType;

let isAlive = (uid: int, {gameObjectRecord}) => {
  let {transformMap, disposedUidMap} = gameObjectRecord;
  disposedUidMap |> WonderCommonlib.SparseMapService.has(uid) ?
    false : transformMap |> WonderCommonlib.SparseMapService.has(uid) ? true : false
};