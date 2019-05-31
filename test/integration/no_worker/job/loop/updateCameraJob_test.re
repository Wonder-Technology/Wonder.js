open Wonder_jest;

open BasicCameraViewAPI;

open PerspectiveCameraProjectionAPI;

open ArcballCameraControllerAPI;

open FlyCameraControllerAPI;

open FlyCameraControllerType;

let _ =
  describe("test update camera job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("update perspectiveCameraProjection", () => {
      let _buildNoWorkerJobConfig = () =>
        NoWorkerJobConfigTool.buildNoWorkerJobConfig(
          ~loopPipelines=
            {|
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
          ~loopJobs=
            {|
          [
            {
              "name": "update_camera"
            }
          ]
        |},
          (),
        );

      beforeEach(() =>
        state :=
          TestTool.initWithJobConfig(
            ~sandbox,
            ~noWorkerJobRecord=_buildNoWorkerJobConfig(),
            (),
          )
      );

      CameraTool.testBuildPMatrix(
        () => state^,
        state => DirectorTool.run(state, ()),
      );
      test("test dirty during multi updates", () => {
        open PerspectiveCameraProjectionAPI;
        let (state, basicCameraView, perspectiveCameraProjection) =
          CameraTool.createBasicCameraViewPerspectiveCamera(state^);
        let state = state |> DirectorTool.runWithDefaultTime;
        let state =
          state
          |> setPerspectiveCameraProjectionNear(
               perspectiveCameraProjection,
               0.2,
             );
        let state = state |> DirectorTool.runWithDefaultTime;
        state
        |> unsafeGetPerspectiveCameraProjectionPMatrix(
             perspectiveCameraProjection,
           )
        |> expect
        == Js.Typed_array.Float32Array.make([|
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
             0.,
           |]);
      });
      test("test mark dirty", () => {
        let (state, gameObject1, _, (_, cameraProjection1)) =
          CameraTool.createCameraGameObjectWithoutAspect(state^);
        let width = 100;
        let height = 150;
        let state =
          SettingTool.buildFakeCanvasWithSize(
            ~gl=SettingTool.buildFakeGl(sandbox),
            ~sandbox,
            ~width,
            ~height,
            (),
          )
          |> Obj.magic
          |> ViewTool.setCanvas(_, state);
        let state = state |> DirectorTool.runWithDefaultTime;

        let width = 200;
        let height = 150;
        let state =
          SettingTool.buildFakeCanvasWithSize(
            ~gl=SettingTool.buildFakeGl(sandbox),
            ~sandbox,
            ~width,
            ~height,
            (),
          )
          |> Obj.magic
          |> ViewTool.setCanvas(_, state);
        let state =
          PerspectiveCameraProjectionAPI.markPerspectiveCameraProjectionDirty(
            cameraProjection1,
            state,
          );
        let state = state |> DirectorTool.runWithDefaultTime;

        PerspectiveCameraProjectionTool.unsafeGetPMatrix(
          cameraProjection1,
          state,
        )
        |> expect
        == Js.Typed_array.Float32Array.make([|
             1.299038052558899,
             0.,
             0.,
             0.,
             0.,
             1.7320507764816284,
             0.,
             0.,
             0.,
             0.,
             (-1.0002000331878662),
             (-1.),
             0.,
             0.,
             (-0.20002000033855438),
             0.,
           |]);
      });
    });

    describe("update arcballCameraController", () => {
      let _prepare =
          (~distance=2.5, ~phi=1., ~theta=0.5, ~target=(1., 2., 3.), ()) => {
        let state =
          TestTool.initWithJobConfigWithoutBuildFakeDom(
            ~sandbox,
            ~noWorkerJobRecord=
              NoWorkerJobConfigTool.buildNoWorkerJobConfig(
                ~loopPipelines=
                  {|
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
                ~loopJobs=
                  {j|
                [
                  {
                    "name": "update_camera"
                  }
                ]
              |j},
                (),
              ),
            (),
          );

        let (
          state,
          gameObject,
          transform,
          (cameraController, basicCameraView, perspectiveCameraProjection),
        ) =
          ArcballCameraControllerTool.createGameObject(state);

        let state =
          state
          |> setArcballCameraControllerDistance(cameraController, distance)
          |> setArcballCameraControllerPhi(cameraController, phi)
          |> setArcballCameraControllerTheta(cameraController, theta)
          |> setArcballCameraControllerTarget(cameraController, target);

        (state, transform);
      };

      describe("update one arcballCameraController", () =>
        describe("update transform", () => {
          test("set localPosition", () => {
            let (state, transform) =
              _prepare(
                ~distance=2.5,
                ~phi=1.,
                ~theta=0.5,
                ~target=(1., 2., 3.),
                (),
              );

            let state = state |> NoWorkerJobTool.execLoopJobs;

            TransformAPI.getTransformLocalPosition(transform, state)
            |> expect
            == (1.6475868225097656, 4.19395637512207, 4.008556842803955);
          });

          test("lookAt target", () => {
            let (state, transform) =
              _prepare(
                ~distance=2.5,
                ~phi=1.,
                ~theta=0.5,
                ~target=(1., 2., 3.),
                (),
              );

            let state = state |> NoWorkerJobTool.execLoopJobs;

            TransformAPI.getTransformRotation(transform, state)
            |> expect
            == (
                 (-0.4895463742519966),
                 0.24214243964541454,
                 0.14363681885111765,
                 0.8252756113563703,
               );
          });
        })
      );

      describe("update two arcballCameraController", () =>
        test("set localPosition", () => {
          let (state, transform1) =
            _prepare(
              ~distance=2.5,
              ~phi=1.,
              ~theta=0.5,
              ~target=(1., 2., 3.),
              (),
            );
          let (state, _, transform2, _) =
            ArcballCameraControllerTool.createGameObject(state);

          let state = state |> NoWorkerJobTool.execLoopJobs;

          (
            TransformAPI.getTransformLocalPosition(transform1, state),
            TransformAPI.getTransformLocalPosition(transform2, state),
          )
          |> expect
          == (
               (1.6475868225097656, 4.19395637512207, 4.008556842803955),
               (6.123233998228043e-16, 6.123233998228043e-16, 10.),
             );
        })
      );
    });
    describe("update flyCameraController", () => {
      let _prepare =
          (
            ~eulerAngleDiff={diffX: 0., diffY: 0.},
            ~translationDiff=(0., 0., 0.),
            (),
          ) => {
        let state =
          TestTool.initWithJobConfigWithoutBuildFakeDom(
            ~sandbox,
            ~noWorkerJobRecord=
              NoWorkerJobConfigTool.buildNoWorkerJobConfig(
                ~loopPipelines=
                  {|
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
                ~loopJobs=
                  {j|
                [
                  {
                    "name": "update_camera"
                  }
                ]
              |j},
                (),
              ),
            (),
          );

        let (
          state,
          gameObject,
          transform,
          (cameraController, basicCameraView, perspectiveCameraProjection),
        ) =
          FlyCameraControllerTool.createGameObject(state);

        let state =
          state
          |> FlyCameraControllerTool.setEulerAngleDiff(
               cameraController,
               eulerAngleDiff,
             )
          |> FlyCameraControllerTool.setTranslationDiff(
               cameraController,
               translationDiff,
             );

        (state, transform);
      };

      describe("update one flyCameraController", () =>
        describe("update transform", () => {
          test("set local eulerAngle ", () => {
            let (state, transform) =
              _prepare(~eulerAngleDiff={diffX: 1.2, diffY: 2.2}, ());

            let state = state |> NoWorkerJobTool.execLoopJobs;

            TransformAPI.getTransformLocalEulerAngles(transform, state)
            |> expect
            == (
                 (-1.1999999217979254),
                 (-2.1999998811124652),
                 (-1.6704253016336438e-9),
               );
          });
          test("set local position ", () => {
            let (state, transform) =
              _prepare(~translationDiff=(1.5, 0., 0.), ());

            let state =
              TransformAPI.setTransformLocalEulerAngles(
                transform,
                (45., 20., 34.),
                state,
              )
              |> NoWorkerJobTool.execLoopJobs;

            TransformAPI.getTransformLocalPosition(transform, state)
            |> expect
            == (1.1685607433319092, 0.7882041335105896, (-0.5130302309989929));
          });
        })
      );
    });
  });