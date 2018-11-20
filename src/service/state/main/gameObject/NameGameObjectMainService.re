open StateDataMainType;

let getCopiedNameMap = state =>
  state.gameObjectRecord.nameMap |> SparseMapService.copy;

let setNameMap = (nameMap, state) => {
  ...state,
  gameObjectRecord: {
    ...state.gameObjectRecord,
    nameMap,
  },
};

let getName = (uid, {gameObjectRecord} as state) =>
  NameService.getName(uid, gameObjectRecord.nameMap);

let unsafeGetName = (uid, {gameObjectRecord} as state) =>
  NameService.unsafeGetName(uid, gameObjectRecord.nameMap);

let setName =
  (. uid, name, {gameObjectRecord} as state) =>
    NameService.setName(
      uid,
      name,
      gameObjectRecord.nameMap |> SparseMapService.copy,
    )
    |> setNameMap(_, state);