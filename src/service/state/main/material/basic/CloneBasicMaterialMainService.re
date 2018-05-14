open StateDataMainType;

open MaterialType;

open BasicMaterialType;

let _getData =
  [@bs]
  (
    (sourceComponent, state: StateDataMainType.state) => (
      OperateBasicMaterialMainService.getColor(sourceComponent, state),
      OperateBasicMaterialMainService.getMap(sourceComponent, state)
    )
  );

let _setData =
  [@bs]
  (
    (
      sourceComponent: int,
      (color: array(float), mapOption: option(int)),
      state: StateDataMainType.state
    ) => {
      let state = state |> OperateBasicMaterialMainService.setColor(sourceComponent, color);
      switch mapOption {
      | None => state
      | Some(map) => state |> OperateBasicMaterialMainService.setMap(sourceComponent, map)
      }
    }
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