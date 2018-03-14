open MainStateDataType;

open MaterialType;

open BasicMaterialType;

let _getData =
  [@bs]
  (
    (sourceComponent, state: MainStateDataType.state) =>
      OperateBasicMaterialMainService.unsafeGetColor(sourceComponent, state)
  );

let _setData =
  [@bs]
  (
    (sourceComponent, color, state: MainStateDataType.state) =>
      OperateBasicMaterialMainService.(state |> setColor(sourceComponent, color))
  );

let handleCloneComponent =
    (
      sourceComponent,
      countRangeArr: array(int),
      isShareMaterial: bool,
      {basicMaterialRecord} as state
    ) =>
  CloneMaterialMainService.handleCloneComponent(
    (sourceComponent, countRangeArr, isShareMaterial),
    (
      CreateBasicMaterialMainService.create,
      _getData,
      _setData |> Obj.magic,
      ShaderIndexBasicMaterialMainService.setShaderIndex
    ),
    (basicMaterialRecord.shaderIndexMap, state)
  );