open Wonder_jest;

let _ =
  describe(
    "test detect gl job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let _buildNoWorkerJobConfig = () =>
        NoWorkerJobConfigTool.buildNoWorkerJobConfig(
          ~initPipelines={|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "detect_gl"
        }
      ]
    }
  ]
        |},
          ~initJobs={|

[

        {
          "name": "detect_gl"
        }
]
        |},
          ()
        );
      let _exec = (fakeGl) =>
        TestTool.initWithJobConfigWithoutBuildFakeDom(
          ~sandbox,
          ~noWorkerJobRecord=_buildNoWorkerJobConfig(),
          ()
        )
        |> FakeGlTool.setFakeGl(fakeGl)
        |> DirectorTool.init;
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "detect extension",
        () =>
          test(
            "detect instanced_arrays",
            () => {
              let (_, fakeGl, _, _) = SettingTool.buildFakeDomForNotPassCanvasId(sandbox);
              let state = _exec(fakeGl);
              fakeGl##getExtension |> expect |> toCalledOnce
            }
          )
      );
      describe(
        "detect capabilty",
        () => {
          let _prepare = (sandbox) => {
            open GPUDetectType;
            let warn = createMethodStubWithJsObjSandbox(sandbox, Console.console, "warn");
            let (_, fakeGl, _, _) = SettingTool.buildFakeDomForNotPassCanvasId(sandbox);
            let vertexShader = 0;
            let fragmentShader = 1;
            let highFloat = 2;
            let mediumFloat = 3;
            fakeGl##getShaderPrecisionFormat |> returns({"precision": 0}) |> ignore;
            (fakeGl, warn, vertexShader, fragmentShader, highFloat, mediumFloat)
          };
          test(
            "if highp is available, use highp",
            () => {
              let (fakeGl, _, vertexShader, fragmentShader, highFloat, _) = _prepare(sandbox);
              fakeGl##getShaderPrecisionFormat
              |> withTwoArgs(vertexShader, highFloat)
              |> returns({"precision": 1})
              |> ignore;
              fakeGl##getShaderPrecisionFormat
              |> withTwoArgs(fragmentShader, highFloat)
              |> returns({"precision": 1})
              |> ignore;
              let state = _exec(fakeGl);
              GPUDetectTool.getRecord(state).precision |> expect == Some(HIGHP)
            }
          );
          test(
            "else if mediump is available, warn and use mediump",
            () => {
              let (fakeGl, warn, vertexShader, fragmentShader, _, mediumFloat) = _prepare(sandbox);
              fakeGl##getShaderPrecisionFormat
              |> withTwoArgs(vertexShader, mediumFloat)
              |> returns({"precision": 1})
              |> ignore;
              fakeGl##getShaderPrecisionFormat
              |> withTwoArgs(fragmentShader, mediumFloat)
              |> returns({"precision": 1})
              |> ignore;
              let state = _exec(fakeGl);
              (warn |> getCallCount, GPUDetectTool.getRecord(state).precision)
              |> expect == (1, Some(MEDIUMP))
            }
          );
          test(
            "else, warn and use lowp",
            () => {
              let (fakeGl, warn, _, _, _, _) = _prepare(sandbox);
              let state = _exec(fakeGl);
              (warn |> getCallCount, GPUDetectTool.getRecord(state).precision)
              |> expect == (1, Some(LOWP))
            }
          )
        }
      )
    }
  );