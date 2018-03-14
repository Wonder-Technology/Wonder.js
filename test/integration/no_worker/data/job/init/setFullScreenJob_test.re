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
          "name": "create_canvas"
        },
        {
          "name": "set_full_screen"
        }
      ]
    }
  ]
        |},
          ~initJobs={|

[

        {
          "name": "create_canvas"
        },
        {
          "name": "set_full_screen"
        }
]
        |},
          ()
        );
      let _exec = () => {
        let width = 100.;
        let height = 200.;
        Root.root##innerWidth#=width;
        Root.root##innerHeight#=height;
        let (canvasDom, fakeGl, div, body) = SettingTool.buildFakeDomForNotPassCanvasId(sandbox);
        TestTool.initWithJobConfigWithoutBuildFakeDom(
          ~sandbox,
          ~noWorkerJobRecord=_buildNoWorkerJobConfig(),
          ()
        )
        |> DirectorTool.init
        |> ignore;
        (canvasDom, fakeGl, width, height)
      };
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "set canvas",
        () => {
          let (canvasDom, fakeGl, width, height) = _exec();
          (
            canvasDom##width,
            canvasDom##height,
            canvasDom##style##position,
            canvasDom##style##left,
            canvasDom##style##top,
            canvasDom##style##width,
            canvasDom##style##height
          )
          |> expect == (width, height, "absolute", "0px", "0px", "100%", "100%")
        }
      )
    }
  );