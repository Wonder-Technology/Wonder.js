open Wonder_jest;

let _ =
  describe(
    "test get_camera_data job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := RenderJobsTool.initWithRenderConfig()
        }
      );
      test(
        "set current camera data to state.renderData.cameraData",
        () => {
          let (state, _, _, _, _) = RenderJobsTool.prepareGameObject(sandbox, state^);
          let (state, _, transform2, cameraController2) =
            CameraControllerTool.createCameraGameObject(state);
          let state = state |> Transform.setTransformLocalPosition(transform2, (1., 2., 3.));
          let render = (state: StateDataType.state) =>
            state |> GetCameraDataJobTool.getJob(RenderJobsTool.buildConfigData());
          let state = RenderJobsTool.passGl(sandbox, state);
          let state =
            state |> RenderJobsTool.initSystemAndRender |> RenderJobsTool.updateSystem |> render;
          state.renderData.cameraData
          |>
          expect == Some({
                      vMatrix:
                        CameraControllerTool.getWorldToCameraMatrix(cameraController2, state),
                      pMatrix: CameraControllerTool.getPMatrix(cameraController2, state)
                    })
        }
      )
    }
  );