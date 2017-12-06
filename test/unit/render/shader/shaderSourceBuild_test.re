open Wonder_jest;

let _ =
  describe(
    "build shader source",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := InitBasicMaterialJobTool.initWithRenderConfig(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "build glsl source",
        () =>
          describe(
            "fs top define precision based on gpu detect data->precision",
            () => {
              test(
                "test highp precision",
                () => {
                  let state = GpuDetectTool.setPrecision(GPUDetectType.HIGHP, state^);
                  let shaderSource = InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state);
                  GlslTool.containSpecifyCount(
                    GlslTool.getFsSource(shaderSource),
                    {|precision highp float;
precision highp int;
|},
                    ~count=1
                  )
                  |> expect == true
                }
              );
              test(
                "test mediump precision",
                () => {
                  let state = GpuDetectTool.setPrecision(GPUDetectType.MEDIUMP, state^);
                  let shaderSource = InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state);
                  GlslTool.containSpecifyCount(
                    GlslTool.getFsSource(shaderSource),
                    {|precision mediump float;
precision mediump int;
|},
                    ~count=1
                  )
                  |> expect == true
                }
              );
              test(
                "test lowp precision",
                () => {
                  let state = GpuDetectTool.setPrecision(GPUDetectType.LOWP, state^);
                  let shaderSource = InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state);
                  GlslTool.containSpecifyCount(
                    GlslTool.getFsSource(shaderSource),
                    {|precision lowp float;
precision lowp int;
|},
                    ~count=1
                  )
                  |> expect == true
                }
              )
            }
          )
      )
    }
  );