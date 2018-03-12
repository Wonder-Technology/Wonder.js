let initWithJobConfigWithoutBuildFakeDom = (sandbox, noWorkerJobConfig) =>
   TestTool.initWithJobConfigWithoutBuildFakeDom(
     ~sandbox,
     ~noWorkerJobConfig,
     /* ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(1000)), */
     ()
   );
let initWithJobConfig = (sandbox, noWorkerJobConfig) =>
  TestTool.initWithJobConfig(~sandbox, ~noWorkerJobConfig, ());

let prepareGameObject = (sandbox, state) => {
  open GameObject; open GameObjectAPI;
  open BasicMaterial;
  open BoxGeometryAPI;
  open Sinon;
  let (state, material) = createBasicMaterial(state);
  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectBasicMaterialComponent(gameObject, material)
    |> addGameObjectBoxGeometryComponent(gameObject, geometry);
  (state, gameObject, geometry, material)
};

let exec = (state: StateDataType.state) => InitRenderJobTool.exec(state);

let prepareForJudgeGLSLNotExec = (sandbox, state) => {
  open Sinon;
  let (state, gameObject, _, _) = prepareGameObject(sandbox, state);
  let shaderSource = createEmptyStubWithJsObjSandbox(sandbox);
  let createProgram = createEmptyStubWithJsObjSandbox(sandbox);
  let state =
    state
    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~shaderSource, ~createProgram, ()));
  (state, shaderSource, gameObject)
};

let prepareForJudgeGLSL = (sandbox, state) => {
  let (state, shaderSource, _) = prepareForJudgeGLSLNotExec(sandbox, state);
  let state = state |> exec;
  shaderSource
};