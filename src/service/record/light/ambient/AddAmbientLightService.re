open GameObjectType;

open AmbientLightType;

let handleAddComponent =
  [@bs]
  (
    (light, gameObjectUid: int, {gameObjectMap} as record) => {
      ...record,
      gameObjectMap:
        AddComponentService.addComponentToGameObjectMap(light, gameObjectUid, gameObjectMap)
    }
  );