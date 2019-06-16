open StateDataRenderWorkerType;

open RenderWorkerLightMaterialType;

let _createTypeArrays = (buffer, lightMaterialCount, state) => {
  let (
    shaderIndices,
    diffuseColors,
    specularColors,
    shininess,
    diffuseTextureIndices,
    specularTextureIndices,
  ) =
    CreateTypeArrayLightMaterialService.createTypeArrays(
      buffer,
      lightMaterialCount,
    );
  let lightMaterialRecord =
    RecordLightMaterialRenderWorkerService.getRecord(state);
  state.lightMaterialRecord =
    Some({
      ...lightMaterialRecord,
      shaderIndices: Some(shaderIndices),
      diffuseColors: Some(diffuseColors),
      specularColors: Some(specularColors),
      shininess: Some(shininess),
      diffuseTextureIndices: Some(diffuseTextureIndices),
      specularTextureIndices: Some(specularTextureIndices),
    });
  state;
};

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);
    let data = MessageService.getRecord(e);
    let lightMaterialData = data##lightMaterialData;
    let lightMaterialCount = data##bufferData##lightMaterialCount;
    state
    |> _createTypeArrays(
         lightMaterialData##buffer,
         lightMaterialCount,
       )
    |> InitMaterialRenderWorkerJobUtils.initMaterials(
         (
           CreateInitLightMaterialStateRenderWorkerService.createInitMaterialState,
           InitInitLightMaterialService.init,
         ),
         RecordLightMaterialRenderWorkerService.getRecord(state).
           isSourceInstanceMap,
       )
    |> StateRenderWorkerService.setState(stateData);
    e;
  });