open StateDataMainType;

open MaterialType;

open BasicMaterialType;

let _getData =
  (. sourceComponent, state: StateDataMainType.state) => (
    NameBasicMaterialMainService.getName(sourceComponent, state),
    OperateBasicMaterialMainService.getColor(sourceComponent, state),
    OperateBasicMaterialMainService.getMap(sourceComponent, state),
    OperateBasicMaterialMainService.getIsDepthTest(sourceComponent, state),
    OperateBasicMaterialMainService.getAlpha(sourceComponent, state),
  );

let _setData =
  (.
    sourceComponent: int,
    (
      nameOption,
      color: array(float),
      mapOption: option(int),
      isDepthTest,
      alpha,
    ),
    state: StateDataMainType.state,
  ) => {
    let state =
      switch (nameOption) {
      | None => state
      | Some(name) =>
        NameBasicMaterialMainService.setName(sourceComponent, name, state)
      };
    let state =
      state
      |> OperateBasicMaterialMainService.setColor(sourceComponent, color);
    let state =
      switch (mapOption) {
      | None => state
      | Some(map) =>
        state |> OperateBasicMaterialMainService.setMap(sourceComponent, map)
      };
    let state =
      state
      |> OperateBasicMaterialMainService.setIsDepthTest(
           sourceComponent,
           isDepthTest,
         );
    let state =
      state
      |> OperateBasicMaterialMainService.setAlpha(sourceComponent, alpha);

    state;
  };

let handleCloneComponent =
    (
      sourceComponent,
      countRangeArr: array(int),
      isShareMaterial: bool,
      state,
    ) => {
  let {shaderIndices} = state |> RecordBasicMaterialMainService.getRecord;
  CloneMaterialMainService.handleCloneComponent(
    (sourceComponent, countRangeArr, isShareMaterial),
    (
      CreateBasicMaterialMainService.create,
      _getData,
      _setData |> Obj.magic,
      ShaderIndexBasicMaterialMainService.setShaderIndex,
    ),
    (shaderIndices, state),
  );
};