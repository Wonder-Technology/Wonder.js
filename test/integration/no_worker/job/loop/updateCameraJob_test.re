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
            |> Vector3Tool.truncate(3)
            |> expect == (1.648, 4.194, 4.009);
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
            TransformAPI.getTransformLocalPosition(transform1, state)
            |> Vector3Tool.truncate(3),
            TransformAPI.getTransformLocalPosition(transform2, state)
            |> Vector3Tool.truncate(3),
          )
          |> expect == ((1.648, 4.194, 4.009), (0., 0., 10.));
        })
      );
    });

    describe("update flyCameraController", () => {
      let _prepare =
          (
            ~eulerAngleDiff={diffX: 0., diffY: 0.},
            ~translationDiff=(0., 0., 0.),
            ~directionArray=[||],
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
          |> FlyCameraControllerAPI.setFlyCameraControllerMoveSpeed(
               cameraController,
               1.2,
             )
          |> FlyCameraControllerAPI.setFlyCameraControllerWheelSpeed(
               cameraController,
               2.5,
             )
          |> FlyCameraControllerAPI.setFlyCameraControllerDirectionArray(
               cameraController,
               directionArray,
             )
          |> FlyCameraControllerTool.setEulerAngleDiff(
               cameraController,
               eulerAngleDiff,
             )
          |> FlyCameraControllerTool.setTranslationDiff(
               cameraController,
               translationDiff,
             );

        (state, transform, cameraController);
      };

      describe("update one flyCameraController", () => {
        describe("update transform", () =>
          describe("trigger point drag event", () => {
            describe("get localEulerAngle from map", () => {
              test("if has localEulerAngle in map, get it", () => {
                let (state, transform, cameraController) =
                  _prepare(~eulerAngleDiff={diffX: 5.2, diffY: 6.2}, ());
                let (x, y, z) as localEulerAngles = (1., 2., 3.);

                let ((ex, ey, ez), state) =
                  state
                  |> FlyCameraControllerTool.setLocalEulerAngle(
                       transform,
                       localEulerAngles,
                     )
                  |> RotateFlyCameraControllerMainService.getLocalEulerAngleOrInit(
                       transform,
                     );

                (ex, ey, ez)
                |> Vector3Tool.truncate(3)
                |> expect == localEulerAngles;
              });
              test(
                "else, get localEulerAngle from engine and store in map", () => {
                let (state, transform, cameraController) = _prepare();
                let (x, y, z) as localEulerAngles = (1., 2., 3.);

                let ((ex, ey, ez), state) =
                  state
                  |> TransformAPI.setTransformLocalEulerAngles(
                       transform,
                       localEulerAngles,
                     )
                  |> RotateFlyCameraControllerMainService.getLocalEulerAngleOrInit(
                       transform,
                     );

                (
                  (ex, ey, ez) |> Vector3Tool.truncate(3),
                  state
                  |> FlyCameraControllerTool.getLocalEulerAngle(transform)
                  |> OptionService.unsafeGet
                  |> Vector3Tool.truncate(3),
                )
                |> expect == (localEulerAngles, localEulerAngles);
              });
            });

            describe(
              "calc the new localEulerAngle with diffValue and localEulerAngle in map and set to map and engine",
              () => {
                let _judgeLocalEulerAngle =
                    ((diffX, diffY), (x, y, z), getNewEulerAngleFunc) => {
                  let (state, transform, cameraController) =
                    _prepare(~eulerAngleDiff={diffX, diffY}, ());

                  let state =
                    state
                    |> FlyCameraControllerTool.setLocalEulerAngle(
                         transform,
                         (x, y, z),
                       );

                  let state = state |> NoWorkerJobTool.execLoopJobs;

                  getNewEulerAngleFunc(transform, state)
                  |> Vector3Tool.truncate(3)
                  |> expect
                  == ((x -. diffX, y -. diffY, z) |> Vector3Tool.truncate(3));
                };

                test("set the new localEulerAngle in localEulerAngleMap", () =>
                  _judgeLocalEulerAngle(
                    (1.2, 3.4), (1., 2., 3.), (transform, state) =>
                    state
                    |> FlyCameraControllerTool.getLocalEulerAngle(transform)
                    |> OptionService.unsafeGet
                  )
                );

                test("set the new localEulerAngle in engine", () =>
                  _judgeLocalEulerAngle(
                    (1.2, 3.4), (1., 2., 3.), (transform, state) =>
                    TransformAPI.getTransformLocalEulerAngles(
                      transform,
                      state,
                    )
                  )
                );
              },
            );
          })
        );

        describe("set local localEulerAngles", () => {
          test("trigger point scale event", () => {
            let (state, transform, cameraController) =
              _prepare(~translationDiff=(0., 0., 12.), ());

            let state =
              TransformAPI.setTransformLocalEulerAngles(
                transform,
                (45., 20., 34.),
                state,
              )
              |> NoWorkerJobTool.execLoopJobs;

            TransformAPI.getTransformLocalPosition(transform, state)
            |> Vector3Tool.truncate(3)
            |> expect == (7.151, (-5.412), 7.974);
          });
          test("trigger keydown event", () => {
            let (state, transform, cameraController) =
              _prepare(~directionArray=[|Left, Up|], ());

            let state = state |> NoWorkerJobTool.execLoopJobs;

            TransformAPI.getTransformLocalPosition(transform, state)
            |> Vector3Tool.truncate(3)
            |> expect == ((-1.2), 1.2, 0.);
          });
          test("tigger point scale and keydown event", () => {
            let (state, transform, cameraController) =
              _prepare(
                ~directionArray=[|Left, Front|],
                ~translationDiff=(0., 0., (-2.5)),
                (),
              );

            let state = state |> NoWorkerJobTool.execLoopJobs;

            TransformAPI.getTransformLocalPosition(transform, state)
            |> Vector3Tool.truncate(3)
            |> expect == ((-1.2), 0., (-3.7));
          });

          describe("trigger keydown and point drag event", () =>
            test(
              "if rotation diff change, local localEulerAngles should change",
              () => {
              let (state, transform, cameraController) =
                _prepare(
                  ~translationDiff=(1.5, 0., 0.),
                  ~eulerAngleDiff={diffX: 0., diffY: 0.},
                  (),
                );

              let state =
                TransformAPI.setTransformLocalEulerAngles(
                  transform,
                  (45., 20., 34.),
                  state,
                )
                |> NoWorkerJobTool.execLoopJobs;

              let localPos1 =
                TransformAPI.getTransformLocalPosition(transform, state)
                |> Vector3Tool.truncate(3);

              let (state, transform, cameraController) =
                _prepare(
                  ~translationDiff=(1.5, 0., 0.),
                  ~eulerAngleDiff={diffX: 10., diffY: 15.},
                  (),
                );

              let state =
                TransformAPI.setTransformLocalEulerAngles(
                  transform,
                  (45., 20., 34.),
                  state,
                )
                |> NoWorkerJobTool.execLoopJobs;

              TransformAPI.getTransformLocalPosition(transform, state)
              |> Vector3Tool.truncate(3)
              |> expect !== localPos1;
            })
          );
        });
      });

      describe("test reset data", () =>
        test("reset flyCamera diff value after update camera", () => {
          let (state, transform, cameraController) =
            _prepare(~translationDiff=(1.5, 0., 0.), ());

          let state = state |> NoWorkerJobTool.execLoopJobs;

          (
            FlyCameraControllerTool.unsafeGetTranslationDiff(
              cameraController,
              state,
            ),
            FlyCameraControllerTool.unsafeGetEulerAngleDiff(
              cameraController,
              state,
            ),
          )
          |> expect == ((0., 0., 0.), {diffX: 0., diffY: 0.});
        })
      );
    });
  });