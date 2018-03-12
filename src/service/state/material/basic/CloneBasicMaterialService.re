open StateDataType;

open MaterialType;

open BasicMaterialType;

let _getData =
  [@bs]
  (
    (sourceComponent, state: StateDataType.state) =>
      OperateBasicMaterialService.unsafeGetColor(sourceComponent, state)
  );

let _setData =
  [@bs]
  (
    (sourceComponent, color, state: StateDataType.state) =>
      OperateBasicMaterialService.(state |> setColor(sourceComponent, color))
  );

let handleCloneComponent =
    (
      sourceComponent,
      countRangeArr: array(int),
      isShareMaterial: bool,
      {basicMaterialRecord} as state
    ) =>
  CloneMaterialService.handleCloneComponent(
    (sourceComponent, countRangeArr, isShareMaterial),
    (
      CreateBasicMaterialService.create,
      _getData,
      _setData |> Obj.magic,
      ShaderIndexBasicMaterialService.setShaderIndex
    ),
    (basicMaterialRecord.shaderIndexMap, state)
  );