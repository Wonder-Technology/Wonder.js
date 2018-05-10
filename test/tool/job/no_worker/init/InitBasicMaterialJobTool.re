let initWithJobConfigWithoutBuildFakeDom = (sandbox, noWorkerJobRecord) =>
  TestTool.initWithJobConfigWithoutBuildFakeDom(
    ~sandbox,
    ~noWorkerJobRecord,
    /* ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(1000)), */
    ()
  );

let initWithJobConfig = (sandbox, noWorkerJobRecord) =>
  TestTool.initWithJobConfig(~sandbox, ~noWorkerJobRecord, ());

let prepareGameObject = (sandbox, state) => {
  open GameObjectAPI;
  open GameObjectAPI;
  open BasicMaterialAPI;
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

let prepareGameObjectWithMap = (sandbox, state) => {
  open GameObjectAPI;
  open BasicMaterialAPI;
  open BoxGeometryAPI;
  open Sinon;
  let (state, material) = createBasicMaterial(state);
  let (state, map) = TextureAPI.createTexture(state);
  let state = state |> BasicMaterialAPI.setBasicMaterialMap(material, map);
  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectBasicMaterialComponent(gameObject, material)
    |> addGameObjectBoxGeometryComponent(gameObject, geometry);
  (state, gameObject, geometry, material)
};

let exec = (state: StateDataMainType.state) => InitRenderJobTool.exec(state);

let _prepareForJudgeGLSLNotExec = (sandbox, prepareGameObjectFunc, state) => {
  open Sinon;
  let (state, gameObject, _, _) = prepareGameObjectFunc(sandbox, state);
  let shaderSource = createEmptyStubWithJsObjSandbox(sandbox);
  let createProgram = createEmptyStubWithJsObjSandbox(sandbox);
  let state =
    state
    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~shaderSource, ~createProgram, ()));
  (state, shaderSource, gameObject)
};

let prepareForJudgeGLSLNotExec = (sandbox, state) =>
  _prepareForJudgeGLSLNotExec(sandbox, prepareGameObject, state);

let prepareForJudgeGLSL = (sandbox, state) => {
  let (state, shaderSource, _) = prepareForJudgeGLSLNotExec(sandbox, state);
  let state = state |> exec;
  shaderSource
};

let prepareForJudgeGLSLNotExecWithMap = (sandbox, state) =>
  _prepareForJudgeGLSLNotExec(sandbox, prepareGameObjectWithMap, state);

let prepareForJudgeGLSLWithMap = (sandbox, state) => {
  let (state, shaderSource, _) = prepareForJudgeGLSLNotExecWithMap(sandbox, state);
  let state = state |> exec;
  shaderSource
};