open MainStateDataType;

let addSourceInstance = (gameObject, state) => {
  let (state, sourceInstance) = SourceInstanceAPI.createSourceInstance(state);
  let state = state |> GameObjectAPI.addGameObjectSourceInstanceComponent(gameObject, sourceInstance);
  (state, sourceInstance)
};

let setGpuDetectDataAllowHardwareInstance = (sandbox, state) => {
  ...state,
  gpuDetectRecord: {
    ...state.gpuDetectRecord,
    extensionInstancedArrays:
      Some({
        "drawElementsInstancedANGLE": Sinon.createEmptyStubWithJsObjSandbox(sandbox),
        "vertexAttribDivisorANGLE": Sinon.createEmptyStubWithJsObjSandbox(sandbox)
      })
  }
};

let setGpuDetectDataAllowBatchInstance = (state) => {
  ...state,
  gpuDetectRecord: {...state.gpuDetectRecord, extensionInstancedArrays: None}
};

let getExtensionInstancedArrays = (state) => GPUDetectTool.getData(state).extensionInstancedArrays |> Js.Option.getExn;