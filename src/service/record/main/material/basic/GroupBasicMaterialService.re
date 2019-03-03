open BasicMaterialType;

let isGroupBasicMaterial = (material, record) =>
  GroupService.isGroup(material, record.gameObjectsMap);

let removeGameObject = (gameObject, material, {gameObjectsMap} as record) => {
  ...record,
  gameObjectsMap:
    GroupService.removeGameObject(gameObject, material, gameObjectsMap),
};

let batchRemoveGameObjects =
    (gameObjectArr, material, {gameObjectsMap} as record) => {
  ...record,
  gameObjectsMap:
    GroupService.batchRemoveGameObjects(
      gameObjectArr,
      material,
      gameObjectsMap,
    ),
};