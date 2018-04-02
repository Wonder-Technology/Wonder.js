open MainStateDataType;

open LightMaterialType;

let _getData =
  [@bs]
  (
    (sourceComponent, state: MainStateDataType.state) => (
      OperateLightMaterialMainService.getDiffuseColor(sourceComponent, state),
      OperateLightMaterialMainService.getSpecularColor(sourceComponent, state),
      OperateLightMaterialMainService.getShininess(sourceComponent, state)
    )
  );

let _setData =
  [@bs]
  (
    (
      sourceComponent,
      (diffuseColor, specularColor: array(float), shininess: float),
      state: MainStateDataType.state
    ) =>
      OperateLightMaterialMainService.(
        state
        |> setDiffuseColor(sourceComponent, diffuseColor)
        |> setSpecularColor(sourceComponent, specularColor)
        |> setShininess(sourceComponent, shininess)
      )
  );

let handleCloneComponent =
    (sourceComponent, countRangeArr: array(int), isShareMaterial: bool, state) => {
  let {shaderIndices} = state |> RecordLightMaterialMainService.getRecord;
  CloneMaterialMainService.handleCloneComponent(
    (sourceComponent, countRangeArr, isShareMaterial),
    (
      CreateLightMaterialMainService.create,
      _getData,
      _setData |> Obj.magic,
      ShaderIndexLightMaterialMainService.setShaderIndex
    ),
    (shaderIndices, state)
  )
};