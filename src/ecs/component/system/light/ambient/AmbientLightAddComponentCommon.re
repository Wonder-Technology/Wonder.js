open StateDataType;

open GameObjectType;

open AmbientLightType;

let handleAddComponent =
  [@bs]
  (
    (light, gameObjectUid: int, state: StateDataType.state) => {
      let {gameObjectMap} as data = AmbientLightStateCommon.getLightData(state);
      {
        ...state,
        ambientLightData: {
          ...data,
          gameObjectMap:
            ComponentSystem.addComponentToGameObjectMap(light, gameObjectUid, gameObjectMap)
        }
      }
    }
  );