open MaterialType;

open StateDataMainType;

open LightMaterialType;

let handleAddComponent =
  (. material, gameObjectUid: int, {gameObjectsMap} as record) => {
    ...record,
    isGameObjectsMapDirtyForDeepCopy: true,
    gameObjectsMap:
      AddComponentService.addSharableComponentToGameObjectsMap(
        material,
        gameObjectUid,
        gameObjectsMap,
      ),
  };