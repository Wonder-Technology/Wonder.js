open MaterialType;

open LightMaterialType;

open StateDataType;

open LightMaterialStateCommon;

let unsafeGetDiffuseColor = (material, state: StateDataType.state) =>
  MaterialOperateCommon.unsafeGetColor(material, getMaterialData(state).diffuseColorMap);

let setDiffuseColor = (material, color: array(float), state: StateDataType.state) => {
  ...state,
  lightMaterialData: {
    ...getMaterialData(state),
    diffuseColorMap:
      MaterialOperateCommon.setColor(material, color, getMaterialData(state).diffuseColorMap)
  }
};

let unsafeGetSpecularColor = (material, state: StateDataType.state) =>
  MaterialOperateCommon.unsafeGetColor(material, getMaterialData(state).specularColorMap);

let setSpecularColor = (material, color: array(float), state: StateDataType.state) => {
  ...state,
  lightMaterialData: {
    ...getMaterialData(state),
    specularColorMap:
      MaterialOperateCommon.setColor(material, color, getMaterialData(state).specularColorMap)
  }
};

let unsafeGetShininess = (material, state: StateDataType.state) =>
  getMaterialData(state).shininessMap |> WonderCommonlib.SparseMapSystem.unsafeGet(material);

let setShininess = (material, shininess: float, state: StateDataType.state) => {
  ...state,
  lightMaterialData: {
    ...getMaterialData(state),
    shininessMap:
      getMaterialData(state).shininessMap
      |> WonderCommonlib.SparseMapSystem.set(material, shininess)
  }
};