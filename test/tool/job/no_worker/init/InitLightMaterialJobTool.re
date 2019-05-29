let initWithJobConfig = (sandbox, noWorkerJobRecord) =>
  TestTool.initWithJobConfig(~sandbox, ~noWorkerJobRecord, ());

let prepareGameObject = (sandbox, state) => {
  open GameObjectAPI;
  open LightMaterialAPI;
  open Sinon;
  let (state, material) = createLightMaterial(state);
  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectLightMaterialComponent(gameObject, material)
    |> addGameObjectGeometryComponent(gameObject, geometry);
  (state, gameObject, geometry, material);
};

let prepareGameObjectWithMap = (sandbox, diffuseMap, specularMap, state) => {
  open GameObjectAPI;
  open LightMaterialAPI;
  open Sinon;
  let (state, material) = createLightMaterial(state);
  let (state, (texture1, texture2)) =
    LightMaterialTool.setMaps(
      material,
      diffuseMap,
      specularMap,
      state,
    );
  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectLightMaterialComponent(gameObject, material)
    |> addGameObjectGeometryComponent(gameObject, geometry);
  (state, gameObject, geometry, material);
};

let prepareGameObjectWithCreatedMap = (sandbox, state) => {
  open GameObjectAPI;
  open LightMaterialAPI;
  open Sinon;
  let (state, material) = createLightMaterial(state);
  let (state, (texture1, texture2)) =
    LightMaterialTool.createAndSetMaps(material, state);
  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectLightMaterialComponent(gameObject, material)
    |> addGameObjectGeometryComponent(gameObject, geometry);
  (state, gameObject, geometry, material);
};

let exec = (state: StateDataMainType.state) => InitRenderJobTool.exec(state);

let prepareForJudgeGLSLNotExec = (prepareGameObjectFunc, sandbox, state) => {
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

let prepareForJudgeGLSL = (prepareGameObjectFunc, sandbox, state) => {
  let (state, shaderSource, _) =
    prepareForJudgeGLSLNotExec(prepareGameObjectFunc, sandbox, state);
  let state = state |> exec;
  (state, shaderSource);
};