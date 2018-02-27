open Wonder_jest;

open CameraController;

let _ =
  describe(
    "test init cameraController",
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
          "name": "init_cameraController"
        }
      ]
    }
  ]
        |},
          ~initJobs={|
[
        {
          "name": "init_cameraController"
        }
]
        |},
          ()
        );
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      CameraControllerTool.testBuildPMatrix(
        TestTool.initWithJobConfigWithoutBuildFakeDom(
          ~sandbox,
          ~noWorkerJobConfig=_buildNoWorkerJobConfig(),
          ()
        ),
        (state) => state |> CameraControllerTool.init
      )
    }
  );