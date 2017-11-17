let initWithRenderConfig = () =>
  TestTool.initWithRenderConfig(
    ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(1000)),
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
  );

let prepareForJudgeGLSL = (sandbox, state) => {
  open Sinon;
  let (state, _, _, _) = InitBasicMaterialJobTool.prepareGameObject(sandbox, state);
  let shaderSource = createEmptyStubWithJsObjSandbox(sandbox);
  let createProgram = createEmptyStubWithJsObjSandbox(sandbox);
  let state =
    state
    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~shaderSource, ~createProgram, ()));
  let state = state |> GeometryTool.initGeometrys |> WebGLRenderSystem.init;
  shaderSource
};