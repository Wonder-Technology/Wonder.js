open AllInstanceType;

open SourceInstanceType;

let handleAddComponent =
  [@bs]
  (
    (sourceInstance: sourceInstance, gameObjectUid: int, {gameObjectMap} as record) => {
      ...record,
      gameObjectMap:
        gameObjectMap
        |> AddComponentService.addComponentToGameObjectMap(sourceInstance, gameObjectUid)
    }
  );