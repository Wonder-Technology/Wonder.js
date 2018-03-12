open StateDataType;

open LightMaterialType;

let _getData =
  [@bs]
  (
    (sourceComponent, state: StateDataType.state) => (
      OperateLightMaterialService.unsafeGetDiffuseColor(sourceComponent, state),
      OperateLightMaterialService.unsafeGetSpecularColor(sourceComponent, state),
      OperateLightMaterialService.unsafeGetShininess(sourceComponent, state)
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
      OperateLightMaterialService.(
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
  CloneMaterialService.handleCloneComponent(
    (sourceComponent, countRangeArr, isShareMaterial),
    (
      CreateLightMaterialService.create,
      _getData,
      _setData |> Obj.magic,
      ShaderIndexLightMaterialService.setShaderIndex
    ),
    (lightMaterialRecord.shaderIndexMap, state)
  );