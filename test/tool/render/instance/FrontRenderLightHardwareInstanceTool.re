let createSourceInstanceGameObject = (sandbox, state) => {
  let (state, gameObject, geometry, material, meshRenderer) =
    FrontRenderLightJobTool.prepareGameObject(sandbox, state);
  let (state, sourceInstance) = SourceInstance.createSourceInstance(state);
  let (state, objectInstanceGameObject) =
    SourceInstance.createSourceInstanceObjectInstance(sourceInstance, state);
  let state = state |> GameObject.addGameObjectSourceInstanceComponent(gameObject, sourceInstance);
  (state, gameObject, (geometry, material, meshRenderer, sourceInstance, objectInstanceGameObject))
};

let prepare = (sandbox, state) => {
  let state = state |> InstanceTool.setGpuDetectDataAllowHardwareInstance(sandbox);
  let (state, gameObject, componentTuple) = createSourceInstanceGameObject(sandbox, state);
  let (state, _, _, _) = CameraTool.createCameraGameObject(state);
  (state, gameObject, componentTuple)
};

let render = (state: StateDataType.state) => state |> WebGLRenderTool.render;