open StateDataType;

open GameObjectType;

open PointLightType;

let handleAddComponent =
  [@bs]
  (
    (light, gameObjectUid: int, state: StateDataType.state) => {
      let {gameObjectMap} as data = PointLightStateCommon.getLightData(state);
      {
        ...state,
        pointLightData: {
          ...data,
          gameObjectMap:
            AddComponentService.addComponentToGameObjectMap(light, gameObjectUid, gameObjectMap)
        }
      }
    }
  );