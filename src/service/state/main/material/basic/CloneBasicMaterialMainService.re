open StateDataType;

open MaterialType;

open BasicMaterialType;

let _getData =
  [@bs]
  (
    (sourceComponent, state: StateDataType.state) =>
      OperateBasicMaterialMainService.unsafeGetColor(sourceComponent, state)
  );

let _setData =
  [@bs]
  (
    (sourceComponent, color, state: StateDataType.state) =>
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