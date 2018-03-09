open Wonder_jest;

let _ =
  describe(
    "test preget glsl data job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      let _buildNoWorkerJobConfig = () =>
        NoWorkerJobConfigTool.buildNoWorkerJobConfig(
          ~initPipelines={|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "preget_glslData"
        },
        {
          "name": "init_basic_material"
        }
      ]
    }
  ]
        |},
          ~initJobs={|

[
        {
          "name": "preget_glslData"
        },
        {
          "name": "init_basic_material"
        }
]
        |},
          ()
        );
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := InitBasicMaterialJobTool.initWithJobConfig(sandbox, _buildNoWorkerJobConfig())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "get gpu detect precision",
        () => {
          test(
            "test vs top",
            () => {
              let state = GpuDetectTool.setPrecision(GPUDetectType.HIGHP, state^);
              let shaderSource = InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state);
              GLSLTool.containSpecifyCount(
                GLSLTool.getVsSource(shaderSource),
                {|precision highp float;
precision highp int;
|},
                ~count=1,
                ()
              )
              |> expect == true
            }
          );
          describe(
            "test fs top",
            () => {
              let judge = (shaderSource) =>
                GLSLTool.containSpecifyCount(
                  GLSLTool.getFsSource(shaderSource),
                  {|precision highp float;
precision highp int;
|},
                  ~count=1,
                  ()
                )
                |> expect == true;
              test(
                "test highp precision",
                () => {
                  let state = GpuDetectTool.setPrecision(GPUDetectType.HIGHP, state^);
                  let shaderSource = InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state);
                  judge(shaderSource)
                }
              );
              test(
                "test mediump precision",
                () => {
                  let state = GpuDetectTool.setPrecision(GPUDetectType.MEDIUMP, state^);
                  let shaderSource = InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state);
                  judge(shaderSource)
                }
              );
              test(
                "test lowp precision",
                () => {
                  let state = GpuDetectTool.setPrecision(GPUDetectType.LOWP, state^);
                  let shaderSource = InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state);
                  judge(shaderSource)
                }
              )
            }
          )
        }
      )
    }
  );