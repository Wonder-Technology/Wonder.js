open StateDataMainType;

let getIsActive = (uid, {gameObjectRecord} as state) =>
  gameObjectRecord.isActiveMap
  |> WonderCommonlib.MutableSparseMapService.get(uid);

let unsafeGetIsActive = (uid, state) =>
  switch (getIsActive(uid, state)) {
  | None => true
  | Some(isActive) => isActive
  };