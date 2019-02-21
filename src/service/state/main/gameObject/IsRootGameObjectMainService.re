open StateDataMainType;

let getIsRoot = (uid, {gameObjectRecord} as state) =>
  gameObjectRecord.isRootMap
  |> WonderCommonlib.MutableSparseMapService.get(uid);

let unsafeGetIsRoot = (uid, state) =>
  switch (getIsRoot(uid, state)) {
  | None => false
  | Some(isRoot) => isRoot
  };

let setIsRoot =
  (. uid, isRoot, {gameObjectRecord} as state) => {
    ...state,
    gameObjectRecord: {
      ...gameObjectRecord,
      isRootMap:
        gameObjectRecord.isRootMap
        |> WonderCommonlib.MutableSparseMapService.set(uid, isRoot),
    },
  };