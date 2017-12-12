open MaterialType;

open MaterialStateCommon;

let getGameObject = (material: material, state: StateDataType.state) =>
  ComponentSystem.getComponentGameObject(material, getMaterialData(state).gameObjectMap);

let unsafeGetGameObject = (material: material, state: StateDataType.state) =>
  ComponentSystem.unsafeGetComponentGameObject(material, getMaterialData(state).gameObjectMap);