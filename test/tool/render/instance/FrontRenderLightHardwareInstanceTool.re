let createSourceInstanceGameObject = (sandbox, state) => {
  let (state, gameObject, geometry, material, meshRenderer) =
    FrontRenderLightJobTool.prepareGameObject(sandbox, state);
  let (state, sourceInstance) = SourceInstanceAPI.createSourceInstance(state);
  let (state, objectInstanceGameObject) =
    SourceInstanceAPI.createObjectInstanceGameObject(sourceInstance, state);
  let state = state |> GameObjectAPI.addGameObjectSourceInstanceComponent(gameObject, sourceInstance);
  (state, gameObject, (geometry, material, meshRenderer, sourceInstance, objectInstanceGameObject))
};

let prepare = (sandbox, state) => {
  let state = state |> InstanceTool.setGPUDetectDataAllowHardwareInstance(sandbox);
  let (state, gameObject, componentTuple) = createSourceInstanceGameObject(sandbox, state);
  let (state, _, _, _) = CameraTool.createCameraGameObject(state);
  (state, gameObject, componentTuple)
};