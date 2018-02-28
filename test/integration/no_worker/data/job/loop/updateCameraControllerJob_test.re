open Wonder_jest;

open CameraController;

let _ =
  describe(
    "test update cameraController job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      let _buildNoWorkerJobConfig = () =>
        NoWorkerJobConfigTool.buildNoWorkerJobConfig(
          ~loopPipelines={|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "update_cameraController"
        }
      ]
    }
  ]
        |},
          ~loopJobs={|
[
        {
          "name": "update_cameraController"
        }
]
        |},
          ()
        );
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestTool.initWithJobConfig(~sandbox, ~noWorkerJobConfig=_buildNoWorkerJobConfig(), ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      CameraControllerTool.testBuildPMatrix(() => state^, (state) => DirectorTool.run(state, ()));
      test(
        "test dirty during multi updates",
        () => {
          open PerspectiveCamera;
          let (state, cameraController) =
            CameraControllerTool.createCameraControllerPerspectiveCamera(state^);
          let state = DirectorTool.run(state, ());
          let state = state |> setPerspectiveCameraNear(cameraController, 0.2);
          let state = state |> CameraControllerTool.update;
          state
          |> getCameraControllerPMatrix(cameraController)
          |>
          expect == Js.Typed_array.Float32Array.make([|
                      1.7320508075688776,
                      0.,
                      0.,
                      0.,
                      0.,
                      1.7320508075688776,
                      0.,
                      0.,
                      0.,
                      0.,
                      (-1.0004000800160033),
                      (-1.),
                      0.,
                      0.,
                      (-0.40008001600320064),
                      0.
                    |])
        }
      )
    }
  );