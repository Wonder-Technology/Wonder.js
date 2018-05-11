open StateDataRenderWorkerType;

open RenderWorkerLightMaterialType;

let _createTypeArrays = (buffer, count, state) => {
  let (shaderIndices, diffuseColors, specularColors, shininess) =
    CreateTypeArrayLightMaterialService.createTypeArrays(buffer, count);
  let lightMaterialRecord = RecordLightMaterialRenderWorkerService.getRecord(state);
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
      |> _createTypeArrays(lightMaterialData##buffer, count)
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