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

let _initMaterials = (basicMaterialData, data, state) => {
  let {isSourceInstanceMap} = RecordBasicMaterialRenderWorkerService.getRecord(state);
  InitInitBasicMaterialService.init(
    [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
    (isSourceInstanceMap, JudgeInstanceRenderWorkerService.isSupportInstance(state)),
    CreateInitBasicMaterialStateRenderWorkerService.createInitMaterialState(state)
  )
  |> ignore;
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
      |> _initMaterials(basicMaterialData, data)
      |> StateRenderWorkerService.setState(stateData);
      e
    }
  );