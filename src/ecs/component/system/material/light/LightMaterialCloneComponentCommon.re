open LightMaterialType;

let _getData =
  [@bs]
  (
    (sourceComponent, state: StateDataType.state) => (
      LightMaterialOperateCommon.unsafeGetDiffuseColor(sourceComponent, state),
      LightMaterialOperateCommon.unsafeGetSpecularColor(sourceComponent, state)
    )
  );

let _setData =
  [@bs]
  (
    (
      sourceComponent,
      (diffuseColor, specularColor: array(float)),
      state: StateDataType.state
    ) =>
      LightMaterialOperateCommon.(
        state
        |> setDiffuseColor(sourceComponent, diffuseColor)
        |> setSpecularColor(sourceComponent, specularColor)
      )
  );

let handleCloneComponent =
    (
      sourceComponent,
      countRangeArr: array(int),
      isShareMaterial: bool,
      state: StateDataType.state
    ) =>
  MaterialCloneComponentCommon.handleCloneComponent(
    (sourceComponent, countRangeArr, isShareMaterial),
    (
      LightMaterialCreateCommon.create,
      _getData,
      _setData |> Obj.magic,
      LightMaterialShaderIndexCommon.setShaderIndex
    ),
    (LightMaterialStateCommon.getMaterialData(state).shaderIndexMap, state)
  );