open Jest;

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
          state := InitBasicMaterialTool.initWithRenderConfig()
        }
      );
      describe(
        "build glsl source",
        () =>
          describe(
            "fs top define precision based on gpu->precision",
            () =>
              test(
                "precision now is hard-coded HIGHP ",
                () => {
                  let shaderSource = InitBasicMaterialTool.prepareForJudgeGLSL(sandbox, state^);
                  GlslTool.containSpecifyCount(
                    GlslTool.getFsSource(shaderSource),
                    {|precision highp float;
precision highp int;
|},
                    ~count=1
                  )
                  |> expect == true
                }
              )
          )
      )
    }
  );