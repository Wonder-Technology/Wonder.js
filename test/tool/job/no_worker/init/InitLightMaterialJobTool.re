/* let initWithJobConfigWithoutBuildFakeDom = (sandbox) =>
   TestTool.initWithJobConfigWithoutBuildFakeDom(
     ~sandbox,
     ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(1000)),
     ()
   ); */
let initWithJobConfig = (sandbox, noWorkerJobRecord) =>
  TestTool.initWithJobConfig(~sandbox, ~noWorkerJobRecord, ());

let prepareGameObject = (sandbox, state) => {
  open GameObjectAPI; open GameObjectAPI;
  open LightMaterialAPI;
  open BoxGeometryAPI;
  open Sinon;
  let (state, material) = createLightMaterial(state);
  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectLightMaterialComponent(gameObject, material)
    |> addGameObjectBoxGeometryComponent(gameObject, geometry);
  (state, gameObject, geometry, material)
};

/* let exec = (state: StateDataMainType.state) =>
   state
   |> BoxGeometryTool.initGeometrys
   |> AllMaterialTool.pregetGLSLData
   |> LightMaterialSystem.init([@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord)); */
let exec = (state: StateDataMainType.state) => InitRenderJobTool.exec(state);

let prepareForJudgeGLSLNotExec = (prepareGameObjectFunc, sandbox, state) => {
  open Sinon;
  let (state, gameObject, _, _) = prepareGameObjectFunc(sandbox, state);
  let shaderSource = createEmptyStubWithJsObjSandbox(sandbox);
  let createProgram = createEmptyStubWithJsObjSandbox(sandbox);
  let state =
    state
    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~shaderSource, ~createProgram, ()));
  (state, shaderSource, gameObject)
};

let prepareForJudgeGLSL = (~prepareGameObjectFunc=prepareGameObject, sandbox, state) => {
  let (state, shaderSource, _) = prepareForJudgeGLSLNotExec(prepareGameObjectFunc, sandbox, state);
  let state = state |> exec;
  shaderSource
};