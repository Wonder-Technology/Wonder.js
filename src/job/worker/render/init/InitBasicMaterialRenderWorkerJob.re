open StateDataRenderWorkerType;

open RenderWorkerBasicMaterialType;

let _createTypeArrays = (count, state) => {
  let {buffer} as basicMaterialRecord = RecordBasicMaterialRenderWorkerService.getRecord(state);
  let (shaderIndices, colors) =
    CreateTypeArrayBasicMaterialService.createTypeArrays(buffer, count);
  state.basicMaterialRecord =
    Some({...basicMaterialRecord, shaderIndices: Some(shaderIndices), colors: Some(colors)});
  state
};

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let basicMaterialData = data##basicMaterialData;
      let count = data##bufferData##basicMaterialDataBufferCount;
      state
      |> _createTypeArrays(count)
      |> InitMaterialRenderWorkerJobUtils.initMaterials(
           (
             CreateInitBasicMaterialStateRenderWorkerService.createInitMaterialState,
             InitInitBasicMaterialService.init
           ),
           RecordBasicMaterialRenderWorkerService.getRecord(state).isSourceInstanceMap
         )
      |> StateRenderWorkerService.setState(stateData);
      e
    }
  );