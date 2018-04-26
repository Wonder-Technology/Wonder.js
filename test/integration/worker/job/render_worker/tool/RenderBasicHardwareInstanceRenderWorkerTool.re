let prepare = (sandbox, state) => {
  let renderWorkerState =
    RenderWorkerStateTool.createState()
    |> InstanceRenderWorkerTool.setGPUDetectDataAllowHardwareInstance(sandbox)
    |> RenderWorkerStateTool.setState;
  let (state, gameObject, componentTuple) =
    RenderBasicHardwareInstanceTool.createSourceInstanceGameObject(sandbox, state);
  let (state, _, _, _) = CameraTool.createCameraGameObject(state);
  (state, gameObject, componentTuple)
};