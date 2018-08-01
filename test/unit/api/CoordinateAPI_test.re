open Wonder_jest;

let _ =
  describe("CoordinateAPI", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());
    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("convertWorldToScreen", () =>
      describe("convert world coordinate to screen coordinate", () => {
        let _test =
            (localPosition, (worldX, worldY, worldZ), (screenX, screenY)) => {
          let screenWidth = 1000.;
          let screenHeight = 2000.;
          let (
            state,
            gameObject,
            transform,
            (basicCameraView, perspectiveCameraProjection),
          ) =
            CameraTool.createCameraGameObject(state^);

          let state =
            TransformAPI.setTransformLocalPosition(
              transform,
              localPosition,
              state,
            );
          let state = TransformAPI.lookAt(transform, (0., 0., 0.), state);
          let state =
            state
            |> PerspectiveCameraProjectionAPI.setPerspectiveCameraProjectionNear(
                 perspectiveCameraProjection,
                 0.1,
               )
            |> PerspectiveCameraProjectionAPI.setPerspectiveCameraProjectionFar(
                 perspectiveCameraProjection,
                 100.,
               )
            |> PerspectiveCameraProjectionAPI.setPerspectiveCameraProjectionFovy(
                 perspectiveCameraProjection,
                 60.,
               )
            |> PerspectiveCameraProjectionAPI.setPerspectiveCameraProjectionAspect(
                 perspectiveCameraProjection,
                 screenWidth /. screenHeight,
               );
          let state = UpdateTransformJob.execJob(None, state);
          let state = UpdateCameraJob.execJob(None, state);

          CoordinateAPI.convertWorldToScreen(
            basicCameraView,
            perspectiveCameraProjection,
            (worldX, worldY, worldZ, screenWidth, screenHeight),
            state,
          )
          |> expect == (screenX, screenY);
        };

        test("test1", () =>
          _test((0., 1., 1.), (0., 0., 0.), (500., 1000.))
        );
        test("test2", () =>
          _test((0., 0., 1.), (1., 0.5, 0.), (2232., 134.))
        );
      })
    );
  });