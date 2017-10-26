open CameraController;

open Jest;

let _ =
  describe
    "CameraController"
    (
      fun () => {
        open Expect;
        open! Expect.Operators;
        open Sinon;
        let sandbox = getSandboxDefaultVal ();
        let state = ref (StateSystem.createState ());
        let createCameraController_perspectiveCamera () => {
          open PerspectiveCamera;
          let (state, cameraController) = createCameraController !state;
          let state =
            state
            |> setPerspectiveCameraNear cameraController 0.1
            |> setPerspectiveCameraFar cameraController 1000.
            |> setPerspectiveCameraFovy cameraController 65.
            |> setPerspectiveCameraAspect cameraController 0.8;
          let state = state |> setCameraControllerPerspectiveCamera cameraController;
          (state, cameraController)
        };
        let testBuildPMatrix execFunc =>
          test
            "build dirty cameraControllers' pMatrix"
            (
              fun () => {
                let (state, cameraController) = createCameraController_perspectiveCamera ();
                let state = state |> execFunc;
                state
                |> getCameraControllerPMatrix cameraController
                |> expect
                == [|
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
        beforeEach (
          fun () => {
            sandbox := createSandbox ();
            state := TestTool.init ()
          }
        );
        afterEach (fun () => restoreSandbox (refJsObjToSandbox !sandbox));
        describe
          "create"
          (
            fun () => {
              test
                "create a new camera which is just index(int)"
                (
                  fun () => {
                    let (_, cameraController) = createCameraController !state;
                    expect cameraController == 0
                  }
                );
              describe
                "change state"
                (
                  fun () =>
                    test
                      "state->index + 1"
                      (
                        fun () => {
                          let (state, _) = createCameraController !state;
                          CameraControllerTool.getCameraControllerData state
                          |> (fun data => expect data.index == 1)
                        }
                      )
                );
              test
                "add to dirty list"
                (
                  fun () => {
                    let (state, cameraController) = createCameraController !state;
                    state |> CameraControllerTool.getDirtyList |> expect == [|cameraController|]
                  }
                )
            }
          );
        describe
          "init"
          (
            fun () => {
              testBuildPMatrix (fun state => state |> CameraControllerTool.init);
              describe
                "ensure check"
                (
                  fun () =>
                    test
                      "should has no cache"
                      (
                        fun () => {
                          let (state, cameraController) =
                            createCameraController_perspectiveCamera ();
                          let state =
                            state
                            |> CameraControllerTool.setWorldToCameraMatrixCacheMap
                                 cameraController [||];
                          expect (fun () => state |> CameraControllerTool.init |> ignore)
                          |> toThrowMessage "should has no cache"
                        }
                      )
                )
            }
          );
        describe
          "update"
          (
            fun () => {
              testBuildPMatrix (fun state => state |> CameraControllerTool.update);
              test
                "test dirty during multi updates"
                (
                  fun () => {
                    open PerspectiveCamera;
                    let (state, cameraController) = createCameraController_perspectiveCamera ();
                    let state = state |> CameraControllerTool.update;
                    let state = state |> setPerspectiveCameraNear cameraController 0.2;
                    let state = state |> CameraControllerTool.update;
                    state
                    |> getCameraControllerPMatrix cameraController
                    |> expect
                    == [|
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
        describe
          "getWorldToCameraMatrix"
          (
            fun () => {
              let prepare () => {
                open GameObject;
                open Transform;
                let (state, cameraController) = createCameraController_perspectiveCamera ();
                let (state, gameObject) = state |> createGameObject;
                let state =
                  state |> addGameObjectCameraControllerComponent gameObject cameraController;
                let transform = state |> getGameObjectTransformComponent gameObject;
                let state = state |> setTransformLocalPosition transform (1., 2., 3.);
                (state, gameObject, transform, cameraController)
              };
              test
                "get cameraController->gameObject->transform-> localToWorldMatrix->invert"
                (
                  fun () => {
                    let (state, gameObject, transform, cameraController) = prepare ();
                    let state = state |> DirectorTool.init |> DirectorTool.loopBody;
                    state
                    |> getCameraControllerWorldToCameraMatrix cameraController
                    |> expect
                    == [|1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1., 0., (-1.), (-2.), (-3.), 1.|]
                  }
                );
              describe
                "test cache"
                (
                  fun () => {
                    test
                      "cache data after first get"
                      (
                        fun () => {
                          open PerspectiveCamera;
                          open Transform;
                          let (state, gameObject, transform, cameraController) = prepare ();
                          let state = state |> DirectorTool.init |> DirectorTool.loopBody;
                          let mat1 =
                            state |> getCameraControllerWorldToCameraMatrix cameraController;
                          let state = state |> setTransformLocalPosition transform (10., 30., 40.);
                          let mat2 =
                            state |> getCameraControllerWorldToCameraMatrix cameraController;
                          let state = state |> setPerspectiveCameraFovy cameraController 101.;
                          let mat3 =
                            state |> getCameraControllerWorldToCameraMatrix cameraController;
                          (mat2, mat3) |> expect == (mat1, mat1)
                        }
                      );
                    test
                      "clear cache after update"
                      (
                        fun () => {
                          open Transform;
                          let (state, gameObject, transform, cameraController) = prepare ();
                          let state = state |> DirectorTool.init |> DirectorTool.loopBody;
                          let state = state |> setTransformLocalPosition transform (10., 30., 40.);
                          let state = state |> DirectorTool.init |> DirectorTool.loopBody;
                          state
                          |> getCameraControllerWorldToCameraMatrix cameraController
                          |> expect
                          == [|
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
        describe
          "getCameraControllerGameObject"
          (
            fun () =>
              test
                "get cameraController's gameObject"
                (
                  fun () => {
                    open GameObject;
                    let (state, cameraController) = createCameraController_perspectiveCamera ();
                    let (state, gameObject) = state |> createGameObject;
                    let state =
                      state |> addGameObjectCameraControllerComponent gameObject cameraController;
                    state |> getCameraControllerGameObject cameraController |> expect == gameObject
                  }
                )
          )
      }
    );