open StateDataMainType;

open LightMaterialType;

let _getData =
  (. sourceComponent, state: StateDataMainType.state) => (
    NameLightMaterialMainService.getName(sourceComponent, state),
    OperateLightMaterialMainService.getDiffuseColor(sourceComponent, state),
    OperateLightMaterialMainService.getSpecularColor(sourceComponent, state),
    OperateLightMaterialMainService.getShininess(sourceComponent, state),
    OperateLightMaterialMainService.getDiffuseMap(sourceComponent, state),
    OperateLightMaterialMainService.getSpecularMap(sourceComponent, state),
  );

let _setData =
  (.
    sourceComponent,
    (
      nameOption,
      diffuseColor,
      specularColor: array(float),
      shininess: float,
      diffuseMapOption,
      specularMapOption,
    ),
    state: StateDataMainType.state,
  ) => {
    let state =
      switch (nameOption) {
      | None => state
      | Some(name) =>
        NameLightMaterialMainService.setName(sourceComponent, name, state)
      };
    let state =
      state
      |> OperateLightMaterialMainService.setDiffuseColor(
           sourceComponent,
           diffuseColor,
         )
      |> OperateLightMaterialMainService.setSpecularColor(
           sourceComponent,
           specularColor,
         )
      |> OperateLightMaterialMainService.setShininess(
           sourceComponent,
           shininess,
         );
    let state =
      switch (diffuseMapOption) {
      | None => state
      | Some(map) =>
        state
        |> OperateLightMaterialMainService.setDiffuseMap(sourceComponent, map)
      };
    let state =
      switch (specularMapOption) {
      | None => state
      | Some(map) =>
        state
        |> OperateLightMaterialMainService.setSpecularMap(
             sourceComponent,
             map,
           )
      };
    state;
  };

let handleCloneComponent =
    (
      sourceComponent,
      countRangeArr: array(int),
      isShareMaterial: bool,
      state,
    ) => {
  let {shaderIndices} = state |> RecordLightMaterialMainService.getRecord;
  CloneMaterialMainService.handleCloneComponent(
    (sourceComponent, countRangeArr, isShareMaterial),
    (
      CreateLightMaterialMainService.create,
      _getData,
      _setData |> Obj.magic,
      ShaderIndexLightMaterialMainService.setShaderIndex,
    ),
    (shaderIndices, state),
  );
};