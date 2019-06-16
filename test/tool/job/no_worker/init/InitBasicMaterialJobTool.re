let initWithJobConfigWithoutBuildFakeDom = (sandbox, noWorkerJobRecord) =>
  TestTool.initWithJobConfigWithoutBuildFakeDom(
    ~sandbox,
    ~noWorkerJobRecord,
    (),
  );

let initWithJobConfig = (sandbox, noWorkerJobRecord) =>
  TestTool.initWithJobConfig(~sandbox, ~noWorkerJobRecord, ());

let prepareGameObject = (sandbox, state) => {
  open GameObjectAPI;
  open BasicMaterialAPI;
  open Sinon;
  let (state, material) = createBasicMaterial(state);
  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectBasicMaterialComponent(gameObject, material)
    |> addGameObjectGeometryComponent(gameObject, geometry);
  (state, gameObject, geometry, material);
};

let exec = (state: StateDataMainType.state) => InitRenderJobTool.exec(state);

let _prepareForJudgeGLSLNotExec = (sandbox, prepareGameObjectFunc, state) => {
  open Sinon;
  let (state, gameObject, _, _) = prepareGameObjectFunc(sandbox, state);
  let shaderSource = createEmptyStubWithJsObjSandbox(sandbox);
  let createProgram = createEmptyStubWithJsObjSandbox(sandbox);
  let state =
    state
    |> FakeGlTool.setFakeGl(
         FakeGlTool.buildFakeGl(~sandbox, ~shaderSource, ~createProgram, ()),
       );
  (state, shaderSource, gameObject);
};

let prepareForJudgeGLSLNotExec = (sandbox, state) =>
  _prepareForJudgeGLSLNotExec(sandbox, prepareGameObject, state);

let prepareForJudgeGLSL = (sandbox, state) => {
  let (state, shaderSource, _) = prepareForJudgeGLSLNotExec(sandbox, state);
  let state = state |> exec;
  (state, shaderSource);
};