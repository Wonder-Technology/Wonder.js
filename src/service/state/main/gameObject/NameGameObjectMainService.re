open StateDataMainType;

let unsafeGetName = (uid, {gameObjectRecord} as state) =>
  NameService.unsafeGetName(uid, gameObjectRecord.nameMap);

let setName =
  (. uid, name, {gameObjectRecord} as state) => {
    ...state,
    gameObjectRecord: {
      ...gameObjectRecord,
      nameMap: NameService.setName(uid, name, gameObjectRecord.nameMap),
    },
  };