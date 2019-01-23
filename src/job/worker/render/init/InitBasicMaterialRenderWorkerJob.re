open StateDataRenderWorkerType;

open RenderWorkerBasicMaterialType;

let _createTypeArrays =
    (buffer, basicMaterialCount, textureCountPerMaterial, state) => {
  let (shaderIndices, colors, textureIndices, mapUnits, isDepthTests) =
    CreateTypeArrayBasicMaterialService.createTypeArrays(
      buffer,
      basicMaterialCount,
      textureCountPerMaterial,
    );
  let basicMaterialRecord =
    RecordBasicMaterialRenderWorkerService.getRecord(state);
  state.basicMaterialRecord =
    Some({
      ...basicMaterialRecord,
      shaderIndices: Some(shaderIndices),
      colors: Some(colors),
      textureIndices: Some(textureIndices),
      mapUnits: Some(mapUnits),
      isDepthTests: Some(isDepthTests),
    });
  state;
};

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);
    let data = MessageService.getRecord(e);
    let basicMaterialData = data##basicMaterialData;
    let basicMaterialCount = data##bufferData##basicMaterialCount;
    let textureCountPerMaterial = data##bufferData##textureCountPerMaterial;
    state
    |> _createTypeArrays(
         basicMaterialData##buffer,
         basicMaterialCount,
         textureCountPerMaterial,
       )
    |> InitMaterialRenderWorkerJobUtils.initMaterials(
         (
           CreateInitBasicMaterialStateRenderWorkerService.createInitMaterialState,
           InitInitBasicMaterialService.init,
         ),
         RecordBasicMaterialRenderWorkerService.getRecord(state).
           isSourceInstanceMap,
       )
    |> StateRenderWorkerService.setState(stateData);
    e;
  });