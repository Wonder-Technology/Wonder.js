open Wonder_jest;

open BasicCameraViewAPI;

open ArcballCameraControllerAPI;

let _ =
  describe("test init camera job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("init perspectiveCameraProjection", () => {
      let _buildNoWorkerJobConfig = () =>
        NoWorkerJobConfigTool.buildNoWorkerJobConfig(
          ~initPipelines=
            {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "init_camera"
        }
      ]
    }
  ]
        |},
          ~initJobs=
            {|
[
        {
          "name": "init_camera"
        }
]
        |},
          (),
        );

      CameraTool.testBuildPMatrix(
        () =>
          TestTool.initWithJobConfigWithoutBuildFakeDom(
            ~sandbox,
            ~noWorkerJobRecord=_buildNoWorkerJobConfig(),
            (),
          ),
        state => state |> DirectorTool.init,
      );
    });
  });