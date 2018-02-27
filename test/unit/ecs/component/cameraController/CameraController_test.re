open CameraController;

open Wonder_jest;

let _ =
  describe(
    "CameraController",
    () => {
      open Expect;
      open! Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "createCameraController",
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
            "add to dirty array",
            () => {
              let (state, cameraController) = createCameraController(state^);
              state |> CameraControllerTool.getDirtyArray |> expect == [|cameraController|]
            }
          )
        }
      );
      /* describe(
           "initSystem",
           () => _testBuildPMatrix((state) => state |> CameraControllerTool.init)
         ); */
      /* describe(
           "contract check",
           () =>
             test(
               "should has no cache",
               () => {
                 let (state, cameraController) =
                   CameraControllerTool.createCameraControllerPerspectiveCamera(state^);
                 let state =
                   state
                   |> CameraControllerTool.setWorldToCameraMatrixCacheMap(cameraController, [||]);
                 expect(() => state |> CameraControllerTool.init |> ignore)
                 |> toThrowMessage("should has no cache")
               }
             )
         ) */
      /* describe(
           "update",
           () => {
             CameraControllerTool._testBuildPMatrix(
               state^,
               (state) => state |> CameraControllerTool.update
             );
             test(
               "test dirty during multi updates",
               () => {
                 open PerspectiveCamera;
                 let (state, cameraController) =
                   CameraControllerTool.createCameraControllerPerspectiveCamera(state^);
                 let state = state |> CameraControllerTool.update;
                 let state = state |> setPerspectiveCameraNear(cameraController, 0.2);
                 let state = state |> CameraControllerTool.update;
                 state
                 |> getCameraControllerPMatrix(cameraController)
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
         ); */
      describe(
        "getWorldToCameraMatrix",
        () => {
          let _prepare = () => {
            open GameObject;
            open Transform;
            let (state, cameraController) =
              CameraControllerTool.createCameraControllerPerspectiveCamera(state^);
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
                  let (state, cameraController) =
                    CameraControllerTool.createCameraControllerPerspectiveCamera(state^);
                  expect(
                    () =>
                      state |> getCameraControllerWorldToCameraMatrix(cameraController) |> ignore
                  )
                  |> toThrowMessage("cameraController's gameObject should exist")
                }
              )
          );
          /* TODO test if cameraController->gameObject->transform not exist, error */
          test(
            "get cameraController->gameObject->transform-> localToWorldMatrix->invert",
            () => {
              let (state, _, _, cameraController) = _prepare();
              let state = state |> CameraControllerTool.init;
              let state = state |> DirectorTool.runWithDefaultTime;
              state
              |> getCameraControllerWorldToCameraMatrix(cameraController)
              |>
              expect == Js.Typed_array.Float32Array.make([|
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
                          (-1.),
                          (-2.),
                          (-3.),
                          1.
                        |])
            }
          )
          /* describe(
               "test cache",
               () => {
                 test(
                   "cache data after first get",
                   () => {
                     open PerspectiveCamera;
                     open Transform;
                     let (state, _, transform, cameraController) = _prepare();
                     let state = state |> DirectorTool.initSystem |> DirectorTool.updateSystem;
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
                     let (state, _, transform, cameraController) = _prepare();
                     let state = state |> DirectorTool.initSystem |> DirectorTool.updateSystem;
                     let state = state |> setTransformLocalPosition(transform, (10., 30., 40.));
                     let state = state |> DirectorTool.initSystem |> DirectorTool.updateSystem;
                     state
                     |> getCameraControllerWorldToCameraMatrix(cameraController)
                     |>
                     expect == CacheType.New([|
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
                               |])
                   }
                 )
               }
             ) */
        }
      );
      describe(
        "getCameraControllerGameObject",
        () =>
          test(
            "get cameraController's gameObject",
            () => {
              open GameObject;
              let (state, cameraController) =
                CameraControllerTool.createCameraControllerPerspectiveCamera(state^);
              let (state, gameObject) = state |> createGameObject;
              let state =
                state |> addGameObjectCameraControllerComponent(gameObject, cameraController);
              state |> getCameraControllerGameObject(cameraController) |> expect == gameObject
            }
          )
      );
      describe(
        "get current cameraController",
        () => {
          test(
            "the first created cameraController is the current cameraController",
            () => {
              let (state, cameraController1) =
                CameraControllerTool.createCameraControllerPerspectiveCamera(state^);
              let (state, _) = CameraControllerTool.createCameraControllerPerspectiveCamera(state);
              state
              |> CameraControllerTool.getCurrentCameraController
              |> Js.Option.getExn
              |> expect == cameraController1
            }
          );
          describe(
            "contract check",
            () =>
              test(
                "current camera should exist",
                () =>
                  expect(() => state^ |> CameraControllerTool.getCurrentCameraController |> ignore)
                  |> toThrowMessage("expect has at least one camera, but actual has 0")
              )
          )
        }
      );
      describe(
        "dispose component",
        () => {
          let _prepareTwo = (state) => {
            let (state, gameObject1, _, cameraController1) =
              CameraControllerTool.createCameraGameObject(state);
            let (state, gameObject2, _, cameraController2) =
              CameraControllerTool.createCameraGameObject(state);
            (state, gameObject1, cameraController1, gameObject2, cameraController2)
          };
          describe(
            "dispose cameraController data",
            () =>
              test(
                "remove from cameraArray, dirtyArray, pMatrixMap, gameObjectMap, updateCameraFuncMap",
                () => {
                  open CameraControllerType;
                  let (state, gameObject1, _, cameraController1) =
                    CameraControllerTool.createCameraGameObject(state^);
                  let state =
                    state
                    |> GameObject.disposeGameObjectCameraControllerComponent(
                         gameObject1,
                         cameraController1
                       );
                  let {cameraArray, dirtyArray, pMatrixMap, gameObjectMap, updateCameraFuncMap} =
                    CameraControllerTool.getCameraControllerData(state);
                  (
                    cameraArray |> WonderCommonlib.SparseMapSystem.has(cameraController1),
                    dirtyArray |> WonderCommonlib.SparseMapSystem.has(cameraController1),
                    pMatrixMap |> WonderCommonlib.SparseMapSystem.has(cameraController1),
                    gameObjectMap |> WonderCommonlib.SparseMapSystem.has(cameraController1),
                    updateCameraFuncMap |> WonderCommonlib.SparseMapSystem.has(cameraController1)
                  )
                  |> expect == (false, false, false, false, false)
                }
              )
          );
          describe(
            "dispose perspective camera data",
            () =>
              test(
                "remove from nearMap, farMap, fovyMap, aspectMap",
                () => {
                  open PerspectiveCameraType;
                  let (state, gameObject1, _, cameraController1) =
                    CameraControllerTool.createCameraGameObject(state^);
                  let state =
                    state
                    |> GameObject.disposeGameObjectCameraControllerComponent(
                         gameObject1,
                         cameraController1
                       );
                  let {nearMap, farMap, fovyMap, aspectMap} as data =
                    CameraControllerTool.getPerspectiveCameraData(state);
                  (
                    nearMap |> WonderCommonlib.SparseMapSystem.has(cameraController1),
                    farMap |> WonderCommonlib.SparseMapSystem.has(cameraController1),
                    fovyMap |> WonderCommonlib.SparseMapSystem.has(cameraController1),
                    aspectMap |> WonderCommonlib.SparseMapSystem.has(cameraController1)
                  )
                  |> expect == (false, false, false, false)
                }
              )
          );
          describe(
            "test add new one after dispose old one",
            () => {
              test(
                "use disposed index as new index firstly",
                () => {
                  let (state, gameObject1, cameraController1, gameObject2, cameraController2) =
                    _prepareTwo(state^);
                  let state =
                    state
                    |> GameObject.disposeGameObjectCameraControllerComponent(
                         gameObject1,
                         cameraController1
                       );
                  let (state, gameObject3, _, cameraController3) =
                    CameraControllerTool.createCameraGameObject(state);
                  cameraController3 |> expect == cameraController1
                }
              );
              test(
                "if has no disposed index, get index from meshRendererData.index",
                () => {
                  let (state, gameObject1, cameraController1, gameObject2, cameraController2) =
                    _prepareTwo(state^);
                  let state =
                    state
                    |> GameObject.disposeGameObjectCameraControllerComponent(
                         gameObject1,
                         cameraController1
                       );
                  let (state, gameObject3, _, cameraController3) =
                    CameraControllerTool.createCameraGameObject(state);
                  let (state, gameObject4, _, cameraController4) =
                    CameraControllerTool.createCameraGameObject(state);
                  (cameraController3, cameraController4)
                  |> expect == (cameraController1, cameraController2 + 1)
                }
              )
            }
          );
          describe(
            "contract check",
            () =>
              test(
                "expect dispose the alive component, but actual not",
                () => {
                  let (state, gameObject1, cameraController1, gameObject2, cameraController2) =
                    _prepareTwo(state^);
                  let state =
                    state
                    |> GameObject.disposeGameObjectCameraControllerComponent(
                         gameObject1,
                         cameraController1
                       );
                  expect(
                    () => {
                      let state =
                        state
                        |> GameObject.disposeGameObjectCameraControllerComponent(
                             gameObject1,
                             cameraController1
                           );
                      ()
                    }
                  )
                  |> toThrowMessage("expect dispose the alive component, but actual not")
                }
              )
          )
        }
      );
      describe(
        "contract check: is alive",
        () =>
          describe(
            "if cameraController is disposed",
            () => {
              let _getErrorMsg = () => "expect component alive, but actual not";
              let _testGetFunc = (getFunc) => {
                open GameObject;
                let (state, gameObject, _, cameraController) =
                  CameraControllerTool.createCameraGameObject(state^);
                let state =
                  state
                  |> GameObject.disposeGameObjectCameraControllerComponent(
                       gameObject,
                       cameraController
                     );
                expect(() => getFunc(cameraController, state)) |> toThrowMessage(_getErrorMsg())
              };
              let _testSetFunc = (setFunc) => {
                open GameObject;
                let (state, gameObject, _, cameraController) =
                  CameraControllerTool.createCameraGameObject(state^);
                let state =
                  state
                  |> GameObject.disposeGameObjectCameraControllerComponent(
                       gameObject,
                       cameraController
                     );
                expect(() => setFunc(cameraController, Obj.magic(0), state))
                |> toThrowMessage(_getErrorMsg())
              };
              test(
                "getCameraControllerPMatrix should error",
                () => _testGetFunc(getCameraControllerPMatrix)
              );
              test(
                "getCameraControllerGameObject should error",
                () => _testGetFunc(getCameraControllerGameObject)
              );
              test(
                "getCameraControllerPMatrix should error",
                () => _testGetFunc(getCameraControllerPMatrix)
              );
              test(
                "getCameraControllerWorldToCameraMatrix should error",
                () => _testGetFunc(getCameraControllerWorldToCameraMatrix)
              );
              test(
                "setCameraControllerPerspectiveCamera should error",
                () => _testGetFunc(setCameraControllerPerspectiveCamera)
              )
            }
          )
      )
    }
  );