open PointLightType;

open PointLightStateCommon;

let getGameObject = (mappedIndex, state: StateDataType.state) =>
  LightGameObjectCommon.getGameObject(mappedIndex, getLightData(state).gameObjectMap);

let unsafeGetGameObject = (mappedIndex, state: StateDataType.state) =>
  LightGameObjectCommon.unsafeGetGameObject(mappedIndex, getLightData(state).gameObjectMap);