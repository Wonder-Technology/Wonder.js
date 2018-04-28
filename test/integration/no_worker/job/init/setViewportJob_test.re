open Wonder_jest;

let _ =
  describe(
    "test set full screen job",
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
          "name": "set_viewport"
        }
      ]
    }
  ]
        |},
          ~initJobs={|

[
        {
          "name": "set_viewport"
        }
]
        |},
          ()
        );
      let _exec = () => {
        let (width, height) = RootTool.setRoot();
        let (canvasDom, fakeGl, div, body) = SettingTool.buildFakeDomForNotPassCanvasId(sandbox);
        TestTool.initWithJobConfigWithoutBuildFakeDom(
          ~sandbox,
          ~noWorkerJobRecord=_buildNoWorkerJobConfig(),
          ()
        )
        |> FakeGlTool.setFakeGl(fakeGl)
        |> DirectorTool.init
        |> ignore;
        (canvasDom, fakeGl, width, height)
      };
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "set gl viewport",
        () => {
          let (canvasDom, fakeGl, width, height) = _exec();
          fakeGl##viewport |> expect |> toCalledWith([|0., 0., 100., 200.|])
        }
      )
    }
  );