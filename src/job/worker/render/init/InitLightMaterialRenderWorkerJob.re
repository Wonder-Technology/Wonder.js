open StateDataRenderWorkerType;

open RenderWorkerLightMaterialType;

let _createTypeArrays = (count, state) => {
  let {buffer} as lightMaterialRecord = RecordLightMaterialRenderWorkerService.getRecord(state);
  let (shaderIndices, diffuseColors, specularColors, shininess) =
    CreateTypeArrayLightMaterialService.createTypeArrays(buffer, count);
  state.lightMaterialRecord =
    Some({
      ...lightMaterialRecord,
      shaderIndices: Some(shaderIndices),
      diffuseColors: Some(diffuseColors),
      specularColors: Some(specularColors),
      shininess: Some(shininess)
    });
  state
};

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let lightMaterialData = data##lightMaterialData;
      let count = data##bufferData##lightMaterialDataBufferCount;
      state
      |> _createTypeArrays(count)
      |> InitMaterialRenderWorkerJobUtils.initMaterials(
           (
             CreateInitLightMaterialStateRenderWorkerService.createInitMaterialState,
             InitInitLightMaterialService.init
           ),
           RecordLightMaterialRenderWorkerService.getRecord(state).isSourceInstanceMap
         )
      |> StateRenderWorkerService.setState(stateData);
      e
    }
  );