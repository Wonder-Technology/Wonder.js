open Wonder_jest;

let _ =
  describe(
    "test get camera data job",
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
          ~loopPipelines={|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "get_camera_data"
        }
      ]
    }
  ]
        |},
          ~loopJobs={|
[
        {
          "name": "get_camera_data"
        }
]
        |},
          ()
        );
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := RenderJobsTool.initWithJobConfig(sandbox, _buildNoWorkerJobConfig())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "set current camera data to state.renderData.cameraData",
        () => {
          let (state, _, _, _, _) = RenderJobsTool.prepareGameObject(sandbox, state^);
          let (state, _, transform2, cameraController2) =
            CameraControllerTool.createCameraGameObject(state);
          let state = state |> Transform.setTransformLocalPosition(transform2, (1., 2., 3.));
          let state = RenderJobsTool.passGl(sandbox, state);
          let state =
            state |> RenderJobsTool.initSystemAndRender |> DirectorTool.runWithDefaultTime;
          state.renderData.cameraData
          |>
          expect == Some({
                      vMatrix: CameraControllerTool.getWorldToCameraMatrix(transform2, state),
                      pMatrix: CameraControllerTool.unsafeGetPMatrix(cameraController2, state),
                      position: CameraControllerTool.getPosition(transform2, state)
                    })
        }
      )
    }
  );