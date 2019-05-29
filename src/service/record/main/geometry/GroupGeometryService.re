open GeometryType;

let isGroupGeometry = (geometry, record) =>
  GameObjectsMapGroupService.isGroup(geometry, record.gameObjectsMap);

let removeGameObject = (gameObject, geometry, {gameObjectsMap} as record) => {
  ...record,
  gameObjectsMap:
    GameObjectsMapGroupService.removeGameObject(gameObject, geometry, gameObjectsMap),
};

let batchRemoveGameObjects =
    (gameObjectArr, geometry, {gameObjectsMap} as record) => {
  ...record,
  gameObjectsMap:
    GameObjectsMapGroupService.batchRemoveGameObjects(
      gameObjectArr,
      geometry,
      gameObjectsMap,
    ),
};