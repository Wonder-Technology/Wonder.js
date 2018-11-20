open StateDataRenderWorkerType;

open RenderWorkerLightMaterialType;

let _createTypeArrays =
    (buffer, lightMaterialCount, textureCountPerMaterial, state) => {
  let (
    shaderIndices,
    diffuseColors,
    specularColors,
    shininess,
    textureIndices,
    diffuseMapUnits,
    specularMapUnits,
    _,
    _,
    _,
    _,
    _,
    _,
    _,
  ) =
    CreateTypeArrayLightMaterialService.createTypeArrays(
      buffer,
      lightMaterialCount,
      textureCountPerMaterial,
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
      textureIndices: Some(textureIndices),
      diffuseMapUnits: Some(diffuseMapUnits),
      specularMapUnits: Some(specularMapUnits),
    });
  state;
};

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);
    let data = MessageService.getRecord(e);
    let lightMaterialData = data##lightMaterialData;
    let lightMaterialCount = data##bufferData##lightMaterialCount;
    let textureCountPerMaterial = data##bufferData##textureCountPerMaterial;
    state
    |> _createTypeArrays(
         lightMaterialData##buffer,
         lightMaterialCount,
         textureCountPerMaterial,
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