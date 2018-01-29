open BasicMaterialType;

open StateDataType;

open BasicMaterialStateCommon;

let unsafeGetColor = (material, state: StateDataType.state) =>
  MaterialOperateCommon.unsafeGetColor(material, getMaterialData(state).colorMap);

let setColor = (material, color: array(float), state: StateDataType.state) => {
  ...state,
  basicMaterialData: {
    ...getMaterialData(state),
    colorMap: MaterialOperateCommon.setColor(material, color, getMaterialData(state).colorMap)
  }
};