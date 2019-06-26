open Wonder_jest;

let _ =
  describe("test preget glsl record job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    let _buildNoWorkerJobConfig = () =>
      NoWorkerJobConfigTool.buildNoWorkerJobConfig(
        ~initPipelines=
          {|
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
        ~initJobs=
          {|

[
        {
          "name": "preget_glslData"
        },
        {
          "name": "init_basic_material"
        }
]
        |},
        (),
      );
    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        InitBasicMaterialJobTool.initWithJobConfig(
          sandbox,
          _buildNoWorkerJobConfig(),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("get gpu detect precision", () => {
      test("test vs top", () => {
        let state =
          GPUDetectTool.setPrecision(AllGPUDetectType.HIGHP, state^);
        let (_, shaderSource) =
          InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state);
        GLSLTool.containSpecifyCount(
          GLSLTool.getVsSource(shaderSource),
          {|precision highp float;
precision highp int;
|},
          ~count=1,
          (),
        )
        |> expect == true;
      });
      describe("test fs top", () => {
        let judge = shaderSource =>
          GLSLTool.containSpecifyCount(
            GLSLTool.getFsSource(shaderSource),
            {|precision highp float;
precision highp int;
|},
            ~count=1,
            (),
          )
          |> expect == true;
        test("test highp precision", () => {
          let state =
            GPUDetectTool.setPrecision(AllGPUDetectType.HIGHP, state^);
          let (_, shaderSource) =
            InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state);
          judge(shaderSource);
        });
        test("test mediump precision", () => {
          let state =
            GPUDetectTool.setPrecision(AllGPUDetectType.MEDIUMP, state^);
          let (_, shaderSource) =
            InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state);
          judge(shaderSource);
        });
        test("test lowp precision", () => {
          let state =
            GPUDetectTool.setPrecision(AllGPUDetectType.LOWP, state^);
          let (_, shaderSource) =
            InitBasicMaterialJobTool.prepareForJudgeGLSL(sandbox, state);
          judge(shaderSource);
        });
      });
    });
  });