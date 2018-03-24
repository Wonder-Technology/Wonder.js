open MainStateDataType;

open PointLightType;

let handleAddComponent =
  [@bs]
  (
    (light, gameObjectUid: int, {gameObjectMap} as record) => {
      ...record,
      gameObjectMap:
        AddComponentService.addComponentToGameObjectMap(light, gameObjectUid, gameObjectMap)
    }
  );