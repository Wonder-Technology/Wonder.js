open StateDataRenderWorkerType;

open RenderWorkerBasicMaterialType;

let _createTypeArrays = (buffer, basicMaterialCount, state) => {
  let (shaderIndices, colors, isDepthTests, alphas) =
    CreateTypeArrayAllBasicMaterialService.createTypeArrays(
      buffer,
      basicMaterialCount,
    );
  let basicMaterialRecord =
    RecordBasicMaterialRenderWorkerService.getRecord(state);
  state.basicMaterialRecord =
    Some({
      ...basicMaterialRecord,
      shaderIndices: Some(shaderIndices),
      colors: Some(colors),
      isDepthTests: Some(isDepthTests),
      alphas: Some(alphas),
    });
  state;
};

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);
    let data = MessageService.getRecord(e);
    let basicMaterialData = data##basicMaterialData;
    let basicMaterialCount = data##bufferData##basicMaterialCount;
    state
    |> _createTypeArrays(basicMaterialData##buffer, basicMaterialCount)
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