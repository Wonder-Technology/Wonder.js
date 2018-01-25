open Wonder_jest;

let _ =
  describe(
    "test simple_basic_render pipeline",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := SimpleBasicRenderPipelineTool.initWithJobConfig(sandbox)
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
                  GLSLTool.getFsSource(shaderSource)
                  |> expect
                  |> toContainString({|gl_FragColor = vec4(totalColor.rgb, totalColor.a);|})
                }
              )
          )
      )
    }
  );