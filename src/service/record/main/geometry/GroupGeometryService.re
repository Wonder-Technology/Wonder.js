open GeometryType;

let isGroupGeometry = (geometry, record) =>
  GroupService.isGroup(geometry, record.gameObjectsMap);

let removeGameObject = (gameObject, geometry, {gameObjectsMap} as record) => {
  ...record,
  gameObjectsMap:
    GroupService.removeGameObject(gameObject, geometry, gameObjectsMap),
};

let batchRemoveGameObjects =
    (gameObjectArr, geometry, {gameObjectsMap} as record) => {
  ...record,
  gameObjectsMap:
    GroupService.batchRemoveGameObjects(
      gameObjectArr,
      geometry,
      gameObjectsMap,
    ),
};