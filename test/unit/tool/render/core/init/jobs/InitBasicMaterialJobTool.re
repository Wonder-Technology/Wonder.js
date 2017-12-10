let initWithRenderConfigWithoutBuildFakeDom = (sandbox) =>
  TestTool.initWithoutBuildFakeDom(
    ~sandbox,
    ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(1000)),
    ()
  );

let initWithRenderConfig = (sandbox) =>
  /* TestTool.initWithRenderConfig(
         ~bufferConfig=
           Js.Nullable.return({
             "transformDataBufferCount": Js.Nullable.undefined,
             "geometryPointDataBufferCount": Js.Nullable.return(1000),
             "basicMaterialDataBufferCount": Js.Nullable.undefined
           }),
         ~renderConfig=
           RenderConfigTool.buildRenderConfig(
             ~renderSetting={|
         {
         "platform": "pc",
         "browser": [
             {
                 "name": "chrome",
                 "version": "newest"
             },
             {
                 "name": "firefox",
                 "version": "newest"
             }
         ],
         "backend": {
             "name": "webgl1"
         },
         "init_pipeline": "simple_basic_render",
         "render_pipeline": "simple_basic_render"
     }
     |},
             ()
           ),
         ()
       ); */
  TestTool.init(
    ~sandbox,
    ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(1000)),
    ()
  );

let prepareGameObject = (sandbox, state) => {
  open GameObject;
  open BasicMaterial;
  open BoxGeometry;
  open Sinon;
  let (state, material) = createBasicMaterial(state);
  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectMaterialComponent(gameObject, material)
    |> addGameObjectGeometryComponent(gameObject, geometry);
  (state, gameObject, geometry, material)
};

let exec = (state: StateDataType.state) =>
  state
  |> GeometryTool.initGeometrys
  |> MaterialAdmin.pregetGLSLData([@bs] DeviceManagerSystem.getGl(state))
  |> BasicMaterialSystem.init([@bs] DeviceManagerSystem.getGl(state));

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