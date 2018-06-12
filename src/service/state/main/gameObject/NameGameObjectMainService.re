open StateDataMainType;

let unsafeGetName = (uid, {gameObjectRecord} as state) =>
  gameObjectRecord.nameMap
  |> WonderCommonlib.SparseMapService.get(uid)
  |> OptionService.unsafeGet;

let setName = (uid, name, {gameObjectRecord} as state) => {
  ...state,
  gameObjectRecord: {
    ...gameObjectRecord,
    nameMap:
      gameObjectRecord.nameMap
      |> WonderCommonlib.SparseMapService.set(uid, name),
  },
};