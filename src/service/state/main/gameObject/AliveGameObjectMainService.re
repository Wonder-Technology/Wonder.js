open StateDataMainType;

open GameObjectType;

let isAlive = (uid: int, {gameObjectRecord}) => {
  let {transformMap, disposedUidMap} = gameObjectRecord;

  disposedUidMap |> WonderCommonlib.MutableSparseMapService.has(uid) ?
    false :
    transformMap |> WonderCommonlib.MutableSparseMapService.has(uid) ? true : false;
};