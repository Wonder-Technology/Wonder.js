open Wonder_jest;

let _ =
  describe(
    "test get_camera_data job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := RenderJobsTool.initWithJobConfig(sandbox)
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
          let render = (state: StateDataType.state) =>
            state |> GetCameraDataJobTool.execJob(RenderJobsTool.buildConfigData());
          let state = RenderJobsTool.passGl(sandbox, state);
          let state =
            state |> RenderJobsTool.initSystemAndRender |> RenderJobsTool.updateSystem |> render;
          state.renderData.cameraData
          |>
          expect == Some({
                      vMatrix: CameraControllerTool.getWorldToCameraMatrix(transform2, state),
                      pMatrix: CameraControllerTool.unsafeGetPMatrix(cameraController2, state),
                      normalMatrix: CameraControllerTool.getNormalMatrix(transform2, state),
                      position: CameraControllerTool.getPosition(transform2, state)
                    })
        }
      )
    }
  );