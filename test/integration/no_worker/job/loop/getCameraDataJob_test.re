open Wonder_jest;

let _ =
  describe("test get camera record job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
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
        ~loopPipelines=
          {|
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
        ~loopJobs=
          {|
[
        {
          "name": "get_camera_data"
        }
]
        |},
        (),
      );
    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        RenderJobsTool.initWithJobConfig(sandbox, _buildNoWorkerJobConfig());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("active camera to be current camera", () => {
      let _prepare = state => {
        let (state, _, _, _, _) =
          RenderJobsTool.prepareGameObject(sandbox, state^);
        let (
          state,
          gameObject2,
          transform2,
          (basicCameraView2, perspectiveCameraProjection2),
        ) =
          CameraTool.createCameraGameObject(state);
        let state =
          state
          |> TransformAPI.setTransformLocalPosition(transform2, (1., 2., 3.));
        let (
          state,
          gameObject3,
          transform3,
          (basicCameraView3, perspectiveCameraProjection3),
        ) =
          CameraTool.createCameraGameObject(state);
        let state =
          state
          |> TransformAPI.setTransformLocalPosition(
               transform3,
               (10., 11., 12.),
             )
          |> PerspectiveCameraProjectionAPI.setPerspectiveCameraProjectionNear(
               perspectiveCameraProjection3,
               11.,
             )
          |> PerspectiveCameraProjectionTool.update;
        let state = RenderJobsTool.passGl(sandbox, state);
        (
          state,
          (
            gameObject2,
            transform2,
            (basicCameraView2, perspectiveCameraProjection2),
          ),
          (
            gameObject3,
            transform3,
            (basicCameraView3, perspectiveCameraProjection3),
          ),
        );
      };
      describe("test active different camera", () => {
        test("test1", () => {
          let (
            state,
            (
              gameObject2,
              transform2,
              (basicCameraView2, perspectiveCameraProjection2),
            ),
            (
              gameObject3,
              transform3,
              (basicCameraView3, perspectiveCameraProjection3),
            ),
          ) =
            _prepare(state);
          let state =
            state
            |> BasicCameraViewAPI.activeBasicCameraView(basicCameraView2);
          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
          RenderTool.getCameraRecord(state)
          |>
          expect == Some({
                      vMatrix:
                        BasicCameraViewAPI.getBasicCameraViewWorldToCameraMatrix(
                          basicCameraView2,
                          state,
                        ),
                      pMatrix:
                        PerspectiveCameraProjectionTool.unsafeGetPMatrix(
                          perspectiveCameraProjection2,
                          state,
                        ),
                      position:
                        BasicCameraViewTool.getPosition(transform2, state),
                    });
        });
        test("test2", () => {
          let (
            state,
            (
              gameObject2,
              transform2,
              (basicCameraView2, perspectiveCameraProjection2),
            ),
            (
              gameObject3,
              transform3,
              (basicCameraView3, perspectiveCameraProjection3),
            ),
          ) =
            _prepare(state);
          let state =
            state
            |> BasicCameraViewAPI.activeBasicCameraView(basicCameraView3);
          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
          RenderTool.getCameraRecord(state)
          |>
          expect == Some({
                      vMatrix:
                        BasicCameraViewAPI.getBasicCameraViewWorldToCameraMatrix(
                          basicCameraView3,
                          state,
                        ),
                      pMatrix:
                        PerspectiveCameraProjectionTool.unsafeGetPMatrix(
                          perspectiveCameraProjection3,
                          state,
                        ),
                      position:
                        BasicCameraViewTool.getPosition(transform3, state),
                    });
        });
      });
    });
  });