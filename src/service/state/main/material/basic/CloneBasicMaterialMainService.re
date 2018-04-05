open StateDataMainType;

open MaterialType;

open BasicMaterialType;

let _getData =
  [@bs]
  (
    (sourceComponent, state: StateDataMainType.state) =>
      OperateBasicMaterialMainService.getColor(sourceComponent, state)
  );

let _setData =
  [@bs]
  (
    (sourceComponent, color, state: StateDataMainType.state) =>
      OperateBasicMaterialMainService.(state |> setColor(sourceComponent, color))
  );

let handleCloneComponent =
    (sourceComponent, countRangeArr: array(int), isShareMaterial: bool, state) => {
  let {shaderIndices} = state |> RecordBasicMaterialMainService.getRecord;
  CloneMaterialMainService.handleCloneComponent(
    (sourceComponent, countRangeArr, isShareMaterial),
    (
      CreateBasicMaterialMainService.create,
      _getData,
      _setData |> Obj.magic,
      ShaderIndexBasicMaterialMainService.setShaderIndex
    ),
    (shaderIndices, state)
  )
};