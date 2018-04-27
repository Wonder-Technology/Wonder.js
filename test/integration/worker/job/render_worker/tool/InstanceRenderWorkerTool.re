open StateDataRenderWorkerType;

let _setGPUDetectDataAllowHardwareInstance = (sandbox, state) => {
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

let setGPUDetectDataAllowHardwareInstance = (sandbox) => {
  let renderWorkerState =
    RenderWorkerStateTool.createState()
    |> _setGPUDetectDataAllowHardwareInstance(sandbox)
    |> RenderWorkerStateTool.setState;
  ()
};

let getExtensionInstancedArrays = (state) =>
  state.gpuDetectRecord.extensionInstancedArrays |> OptionTool.unsafeGet;