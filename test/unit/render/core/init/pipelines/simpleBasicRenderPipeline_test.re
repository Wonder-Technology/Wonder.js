open Wonder_jest;

let _ =
  describe(
    "test simple_basic_render pipeline",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := SimpleBasicRenderPipelineTool.initWithRenderConfig()
        }
      );
      describe(
        "exec jobs",
        () =>
          describe(
            "exec init_basic_material job",
            () =>
              test(
                "should contain basic_end shader lib's glsl",
                () => {
                  let shaderSource = SimpleBasicRenderPipelineTool.prepareForJudgeGLSL(sandbox, state^);
                  GlslTool.getFsSource(shaderSource)
                  |> expect
                  |> toContainString({|gl_FragColor = vec4(1.0,0.5,1.0,1.0);|})
                }
              )
          )
      )
    }
  );