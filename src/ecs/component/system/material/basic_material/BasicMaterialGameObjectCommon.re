open MaterialType;

open BasicMaterialType;

open BasicMaterialStateCommon;

let getGameObject = (material, state: StateDataType.state) =>
  MaterialGameObjectCommon.getGameObject(material, getMaterialData(state).gameObjectMap);

let unsafeGetGameObject = (material, state: StateDataType.state) =>
  MaterialGameObjectCommon.unsafeGetGameObject(material, getMaterialData(state).gameObjectMap);