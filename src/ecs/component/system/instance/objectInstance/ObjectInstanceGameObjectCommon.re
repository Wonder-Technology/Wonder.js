open ObjectInstanceType;

open ObjectInstanceStateCommon;

let getGameObject = (objectInstance: objectInstance, state: StateDataType.state) =>
  ComponentSystem.getComponentGameObject(
    objectInstance,
    getObjectInstanceData(state).gameObjectMap
  );

let unsafeGetGameObject = (objectInstance: objectInstance, state: StateDataType.state) =>
  ComponentSystem.unsafeGetComponentGameObject(
    objectInstance,
    getObjectInstanceData(state).gameObjectMap
  );