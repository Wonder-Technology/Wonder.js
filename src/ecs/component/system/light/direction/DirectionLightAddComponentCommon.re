open StateDataType;

open GameObjectType;

open DirectionLightType;

let handleAddComponent =
  [@bs]
  (
    (light, gameObjectUid: int, state: StateDataType.state) => {
      let {gameObjectMap} as data = DirectionLightStateCommon.getLightData(state);
      {
        ...state,
        directionLightData: {
          ...data,
          gameObjectMap:
            AddComponentService.addComponentToGameObjectMap(light, gameObjectUid, gameObjectMap)
        }
      }
    }
  );