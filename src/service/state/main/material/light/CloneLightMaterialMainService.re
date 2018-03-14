open StateDataType;

open LightMaterialType;

let _getData =
  [@bs]
  (
    (sourceComponent, state: StateDataType.state) => (
      OperateLightMaterialMainService.unsafeGetDiffuseColor(sourceComponent, state),
      OperateLightMaterialMainService.unsafeGetSpecularColor(sourceComponent, state),
      OperateLightMaterialMainService.unsafeGetShininess(sourceComponent, state)
    )
  );

let _setData =
  [@bs]
  (
    (
      sourceComponent,
      (diffuseColor, specularColor: array(float), shininess: float),
      state: StateDataType.state
    ) =>
      OperateLightMaterialMainService.(
        state
        |> setDiffuseColor(sourceComponent, diffuseColor)
        |> setSpecularColor(sourceComponent, specularColor)
        |> setShininess(sourceComponent, shininess)
      )
  );

let handleCloneComponent =
    (
      sourceComponent,
      countRangeArr: array(int),
      isShareMaterial: bool,
      {lightMaterialRecord} as state
    ) =>
  CloneMaterialMainService.handleCloneComponent(
    (sourceComponent, countRangeArr, isShareMaterial),
    (
      CreateLightMaterialMainService.create,
      _getData,
      _setData |> Obj.magic,
      ShaderIndexLightMaterialMainService.setShaderIndex
    ),
    (lightMaterialRecord.shaderIndexMap, state)
  );