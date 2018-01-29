open AmbientLightType;

open AmbientLightStateCommon;

let getGameObject = (light, state: StateDataType.state) =>
  LightGameObjectCommon.getGameObject(light, getLightData(state).gameObjectMap);

let unsafeGetGameObject = (light, state: StateDataType.state) =>
  LightGameObjectCommon.unsafeGetGameObject(light, getLightData(state).gameObjectMap);