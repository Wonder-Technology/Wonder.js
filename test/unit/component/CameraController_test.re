open CameraController;

open Jest;

let _ =
  describe(
    "CameraController",
    () => {
      open Expect;
      open! Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      let createCameraController_perspectiveCamera = () => {
        open PerspectiveCamera;
        let (state, cameraController) = createCameraController(state^);
        let state =
          state
          |> setPerspectiveCameraNear(cameraController, 0.1)
          |> setPerspectiveCameraFar(cameraController, 1000.)
          |> setPerspectiveCameraFovy(cameraController, 65.)
          |> setPerspectiveCameraAspect(cameraController, 0.8);
        let state = state |> setCameraControllerPerspectiveCamera(cameraController);
        (state, cameraController)
      };
      let testBuildPMatrix = (execFunc) =>
        test(
          "build dirty cameraControllers' pMatrix",
          () => {
            let (state, cameraController) = createCameraController_perspectiveCamera();
            let state = state |> execFunc;
            state
            |> getCameraControllerPMatrix(cameraController)
            |>
            expect == [|
                        (-1.7006360120001864),
                        0.,
                        0.,
                        0.,
                        0.,
                        (-1.3605088096001492),
                        0.,
                        0.,
                        0.,
                        0.,
                        (-1.0002000200020003),
                        (-1.),
                        0.,
                        0.,
                        (-0.2000200020002),
                        0.
                      |]
          }
        );
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init()
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "create",
        () => {
          test(
            "create a new camera which is just index(int)",
            () => {
              let (_, cameraController) = createCameraController(state^);
              expect(cameraController) == 0
            }
          );
          describe(
            "change state",
            () =>
              test(
                "state->index + 1",
                () => {
                  let (state, _) = createCameraController(state^);
                  CameraControllerTool.getCameraControllerData(state)
                  |> ((data) => expect(data.index) == 1)
                }
              )
          );
          test(
            "add to dirty list",
            () => {
              let (state, cameraController) = createCameraController(state^);
              state |> CameraControllerTool.getDirtyList |> expect == [|cameraController|]
            }
          )
        }
      );
      describe(
        "init",
        () => {
          testBuildPMatrix((state) => state |> CameraControllerTool.init);
          describe(
            "ensure check",
            () =>
              test(
                "should has no cache",
                () => {
                  let (state, cameraController) = createCameraController_perspectiveCamera();
                  let state =
                    state
                    |> CameraControllerTool.setWorldToCameraMatrixCacheMap(cameraController, [||]);
                  expect(() => state |> CameraControllerTool.init |> ignore)
                  |> toThrowMessage("should has no cache")
                }
              )
          )
        }
      );
      describe(
        "update",
        () => {
          testBuildPMatrix((state) => state |> CameraControllerTool.update);
          test(
            "test dirty during multi updates",
            () => {
              open PerspectiveCamera;
              let (state, cameraController) = createCameraController_perspectiveCamera();
              let state = state |> CameraControllerTool.update;
              let state = state |> setPerspectiveCameraNear(cameraController, 0.2);
              let state = state |> CameraControllerTool.update;
              state
              |> getCameraControllerPMatrix(cameraController)
              |>
              expect == [|
                          (-1.7006360120001864),
                          0.,
                          0.,
                          0.,
                          0.,
                          (-1.3605088096001492),
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
                        |]
            }
          )
        }
      );
      describe(
        "getWorldToCameraMatrix",
        () => {
          let prepare = () => {
            open GameObject;
            open Transform;
            let (state, cameraController) = createCameraController_perspectiveCamera();
            let (state, gameObject) = state |> createGameObject;
            let state =
              state |> addGameObjectCameraControllerComponent(gameObject, cameraController);
            let transform = state |> getGameObjectTransformComponent(gameObject);
            let state = state |> setTransformLocalPosition(transform, (1., 2., 3.));
            (state, gameObject, transform, cameraController)
          };
          describe(
            "runtime check",
            () =>
              test(
                "if cameraController->gameObject not exist, error",
                () => {
                  let (state, cameraController) = createCameraController_perspectiveCamera();
                  expect(
                    () =>
                      state |> getCameraControllerWorldToCameraMatrix(cameraController) |> ignore
                  )
                  |> toThrowMessage("cameraController's gameObject should exist")
                }
              )
              /* todo test if cameraController->gameObject->transform not exist, error */
          );
          test(
            "get cameraController->gameObject->transform-> localToWorldMatrix->invert",
            () => {
              let (state, _, _, cameraController) = prepare();
              let state = state |> DirectorTool.init |> DirectorTool.loopBody;
              state
              |> getCameraControllerWorldToCameraMatrix(cameraController)
              |>
              expect == [|1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1., 0., (-1.), (-2.), (-3.), 1.|]
            }
          );
          describe(
            "test cache",
            () => {
              test(
                "cache data after first get",
                () => {
                  open PerspectiveCamera;
                  open Transform;
                  let (state, _, transform, cameraController) = prepare();
                  let state = state |> DirectorTool.init |> DirectorTool.loopBody;
                  let mat1 = state |> getCameraControllerWorldToCameraMatrix(cameraController);
                  let state = state |> setTransformLocalPosition(transform, (10., 30., 40.));
                  let mat2 = state |> getCameraControllerWorldToCameraMatrix(cameraController);
                  let state = state |> setPerspectiveCameraFovy(cameraController, 101.);
                  let mat3 = state |> getCameraControllerWorldToCameraMatrix(cameraController);
                  (mat2, mat3) |> expect == (mat1, mat1)
                }
              );
              test(
                "clear cache after update",
                () => {
                  open Transform;
                  let (state, _, transform, cameraController) = prepare();
                  let state = state |> DirectorTool.init |> DirectorTool.loopBody;
                  let state = state |> setTransformLocalPosition(transform, (10., 30., 40.));
                  let state = state |> DirectorTool.init |> DirectorTool.loopBody;
                  state
                  |> getCameraControllerWorldToCameraMatrix(cameraController)
                  |>
                  expect == [|
                              1.,
                              0.,
                              0.,
                              0.,
                              0.,
                              1.,
                              0.,
                              0.,
                              0.,
                              0.,
                              1.,
                              0.,
                              (-10.),
                              (-30.),
                              (-40.),
                              1.
                            |]
                }
              )
            }
          )
        }
      );
      describe(
        "getCameraControllerGameObject",
        () =>
          test(
            "get cameraController's gameObject",
            () => {
              open GameObject;
              let (state, cameraController) = createCameraController_perspectiveCamera();
              let (state, gameObject) = state |> createGameObject;
              let state =
                state |> addGameObjectCameraControllerComponent(gameObject, cameraController);
              state |> getCameraControllerGameObject(cameraController) |> expect == gameObject
            }
          )
      )
    }
  );
