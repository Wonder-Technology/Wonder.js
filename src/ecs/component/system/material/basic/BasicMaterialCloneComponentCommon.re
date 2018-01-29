open MaterialType;

open BasicMaterialType;

let _getData =
  [@bs]
  (
    (sourceComponent, state: StateDataType.state) =>
      BasicMaterialOperateCommon.unsafeGetColor(sourceComponent, state)
  );

let _setData =
  [@bs]
  (
    (sourceComponent, color, state: StateDataType.state) =>
      BasicMaterialOperateCommon.(state |> setColor(sourceComponent, color))
  );

let handleCloneComponent =
    (sourceComponent, countRangeArr: array(int), isShareMaterial: bool, state: StateDataType.state) =>
  MaterialCloneComponentCommon.handleCloneComponent(
    (sourceComponent, countRangeArr, isShareMaterial),
    (
      BasicMaterialCreateCommon.create,
      _getData,
      _setData |> Obj.magic,
      BasicMaterialShaderIndexCommon.setShaderIndex
    ),
    (BasicMaterialStateCommon.getMaterialData(state).shaderIndexMap, state)
  );