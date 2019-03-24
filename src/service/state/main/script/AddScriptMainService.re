open StateDataMainType;

let handleAddComponent =
  (. script, gameObjectUid: int, {gameObjectMap} as record: scriptRecord) => (
    {
      ...record,
      gameObjectMap:
        AddComponentService.addComponentToGameObjectMap(
          script,
          gameObjectUid,
          gameObjectMap,
        ),
    }: scriptRecord
  );