let createSourceInstanceGameObject = (sandbox, state) => {
  let (state, gameObject, geometry, material, meshRenderer) =
    RenderBasicJobTool.prepareGameObject(sandbox, state);
  let (state, sourceInstance) = SourceInstance.createSourceInstance(state);
  let (state, objectInstanceGameObject) =
    SourceInstance.createSourceInstanceObjectInstance(sourceInstance, state);
  let state = state |> GameObject.addGameObjectSourceInstanceComponent(gameObject, sourceInstance);
  (state, gameObject, (geometry, material, meshRenderer, sourceInstance, objectInstanceGameObject))
};

let prepare = (sandbox, state) => {
  let state = state |> InstanceTool.setGpuDetectDataAllowHardwareInstance(sandbox);
  let (state, gameObject, componentTuple) = createSourceInstanceGameObject(sandbox, state);
  let (state, _, _, _) = CameraControllerTool.createCameraGameObject(state);
  (state, gameObject, componentTuple)
};

let prepareForTestVertexAttribPointer = (sandbox, prepareFunc, state) => {
  open Sinon;
  let (state, pos1, pos2, pos3, pos4, getAttribLocation) = prepareFunc(sandbox, state);
  let float = 1;
  let vertexAttribPointer = createEmptyStubWithJsObjSandbox(sandbox);
  let state =
    state
    |> FakeGlTool.setFakeGl(
         FakeGlTool.buildFakeGl(~sandbox, ~float, ~vertexAttribPointer, ~getAttribLocation, ())
       );
  let state = state |> RenderJobsTool.initSystemAndRender;
  let state = state |> DirectorTool.runWithDefaultTime;
  (state, float, (pos1, pos2, pos3, pos4), vertexAttribPointer)
};