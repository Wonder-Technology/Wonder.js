open MaterialType;
open LightMaterialType;

open LightMaterialStateCommon;

let getGameObject = (material, state: StateDataType.state) =>
  MaterialGameObjectCommon.getGameObject(material, getMaterialData(state).gameObjectMap);

let unsafeGetGameObject = (material, state: StateDataType.state) =>
  MaterialGameObjectCommon.unsafeGetGameObject(material, getMaterialData(state).gameObjectMap);