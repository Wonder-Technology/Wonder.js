open StateDataType;

let addSourceInstance = (gameObject, state) => {
  let (state, sourceInstance) = SourceInstanceAPI.createSourceInstance(state);
  let state = state |> GameObjectAPI.addGameObjectSourceInstanceComponent(gameObject, sourceInstance);
  (state, sourceInstance)
};

let setGpuDetectDataAllowHardwareInstance = (sandbox, state) => {
  ...state,
  gpuDetectData: {
    ...state.gpuDetectData,
    extensionInstancedArrays:
      Some({
        "drawElementsInstancedANGLE": Sinon.createEmptyStubWithJsObjSandbox(sandbox),
        "vertexAttribDivisorANGLE": Sinon.createEmptyStubWithJsObjSandbox(sandbox)
      })
  }
};

let setGpuDetectDataAllowBatchInstance = (state) => {
  ...state,
  gpuDetectData: {...state.gpuDetectData, extensionInstancedArrays: None}
};

let getExtensionInstancedArrays = (state) => GpuDetectTool.getData(state).extensionInstancedArrays |> Js.Option.getExn;