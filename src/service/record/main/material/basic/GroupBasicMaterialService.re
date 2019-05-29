open BasicMaterialType;

let isGroupBasicMaterial = (material, record) =>
  GameObjectsMapGroupService.isGroup(material, record.gameObjectsMap);

let removeGameObject = (gameObject, material, {gameObjectsMap} as record) => {
  ...record,
  gameObjectsMap:
    GameObjectsMapGroupService.removeGameObject(gameObject, material, gameObjectsMap),
};

let batchRemoveGameObjects =
    (gameObjectArr, material, {gameObjectsMap} as record) => {
  ...record,
  gameObjectsMap:
    GameObjectsMapGroupService.batchRemoveGameObjects(
      gameObjectArr,
      material,
      gameObjectsMap,
    ),
};