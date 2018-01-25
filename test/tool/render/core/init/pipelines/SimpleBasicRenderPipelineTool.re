let initWithRenderConfig = (sandbox) =>
  TestTool.initWithRenderConfig(
    ~sandbox,
    ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(1000)),
    ~logicConfig=LogicConfigTool.buildLogicConfig(),
    ~renderConfig=
      RenderConfigTool.buildRenderConfig(
        ~renderSetting={|
    {
    "init_pipeline": "simple_basic_render",
    "render_pipeline": "simple_basic_render"
}
|},
        ()
      ),
    ()
  );

let prepareForJudgeGLSL = (sandbox, state) => {
  open Sinon;
  let (state, _, _, _) = InitBasicMaterialJobTool.prepareGameObject(sandbox, state);
  let shaderSource = createEmptyStubWithJsObjSandbox(sandbox);
  let createProgram = createEmptyStubWithJsObjSandbox(sandbox);
  let state =
    state
    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~shaderSource, ~createProgram, ()));
  let state = state |> JobSystem.init |> GeometryTool.initGeometrys |> WebGLRenderTool.init;
  shaderSource
};