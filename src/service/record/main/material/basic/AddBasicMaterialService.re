open MaterialType;

open StateDataMainType;

open BasicMaterialType;

let handleAddComponent =
  [@bs]
  (
    (material, gameObjectUid: int, {gameObjectMap} as record) => {
      ...record,
      gameObjectMap:
        AddComponentService.addComponentToGameObjectMap(material, gameObjectUid, gameObjectMap)
    }
  );