open Wonder_jest;

open BasicCameraViewAPI;

open PerspectiveCameraProjectionAPI;

let _ =
  describe(
    "test update basicCameraView job",
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
          "name": "update_camera"
        }
      ]
    }
  ]
        |},
          ~loopJobs={|
[
        {
          "name": "update_camera"
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
      CameraTool.testBuildPMatrix(() => state^, (state) => DirectorTool.run(state, ()));
      test(
        "test dirty during multi updates",
        () => {
          open PerspectiveCameraProjectionAPI;
          let (state, basicCameraView, perspectiveCameraProjection) =
            CameraTool.createBasicCameraViewPerspectiveCamera(state^);
          let state = state |> DirectorTool.runWithDefaultTime;
          let state = state |> setPerspectiveCameraNear(basicCameraView, 0.2);
          let state = state |> DirectorTool.runWithDefaultTime;
          state
          |> unsafeGetPerspectiveCameraProjectionPMatrix(basicCameraView)
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