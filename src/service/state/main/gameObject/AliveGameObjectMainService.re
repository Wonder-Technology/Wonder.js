open StateDataMainType;

open GameObjectType;

let isAlive = (uid: int, {gameObjectRecord}) => {
  let {transformMap, disposedUidMap} = gameObjectRecord;
  disposedUidMap |> WonderCommonlib.SparseMapService.has(uid) ?
    false : transformMap |> WonderCommonlib.SparseMapService.has(uid) ? true : false
};