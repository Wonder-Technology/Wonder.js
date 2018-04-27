/* let setGPUDetectDataAllowHardwareInstance = (sandbox) => {
     let renderWorkerState =
       RenderWorkerStateTool.createState()
       |> InstanceRenderWorkerTool.setGPUDetectDataAllowHardwareInstance(sandbox)
       |> RenderWorkerStateTool.setState;
     ()
   }; */
let prepare = (sandbox, state) => {
  InstanceRenderWorkerTool.setGPUDetectDataAllowHardwareInstance(sandbox);
  let (state, gameObject, componentTuple) =
    RenderBasicHardwareInstanceTool.createSourceInstanceGameObject(sandbox, state);
  let (state, _, _, _) = CameraTool.createCameraGameObject(state);
  (state, gameObject, componentTuple)
};