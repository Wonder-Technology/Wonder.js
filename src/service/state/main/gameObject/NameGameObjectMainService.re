open StateDataMainType;

let getName = (uid, {gameObjectRecord} as state) =>
  NameService.getName(uid, gameObjectRecord.nameMap);

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