open ObjectInstanceType;

open ObjectInstanceStateCommon;

let getGameObject = (objectInstance: objectInstance, state: StateDataType.state) =>
  GameObjectMapService.getGameObject(
    objectInstance,
    getObjectInstanceData(state).gameObjectMap
  );

let unsafeGetGameObject = (objectInstance: objectInstance, state: StateDataType.state) =>
  GameObjectMapService.unsafeGetGameObject(
    objectInstance,
    getObjectInstanceData(state).gameObjectMap
  );