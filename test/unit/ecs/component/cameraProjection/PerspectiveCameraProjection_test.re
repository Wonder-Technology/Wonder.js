open PerspectiveCameraProjectionAPI;

open MainStateDataType;

open PerspectiveCameraProjectionType;

open Wonder_jest;

let _ =
  describe(
    "PerspectiveCameraProjection",
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
        "createPerspectiveCameraProjection",
        () => {
          test(
            "create a new camera which is just index(int)",
            () => {
              let (_, cameraProjection) = createPerspectiveCameraProjection(state^);
              expect(cameraProjection) == 0
            }
          );
          describe(
            "change state",
            () =>
              test(
                "state->index + 1",
                () => {
                  let (state, _) = createPerspectiveCameraProjection(state^);
                  state.perspectiveCameraProjectionRecord
                  |> ((record) => expect(record.index) == 1)
                }
              )
          );
          test(
            "add to dirty array",
            () => {
              let (state, cameraProjection) = createPerspectiveCameraProjection(state^);
              state
              |> PerspectiveCameraProjectionTool.getDirtyArray
              |> expect == [|cameraProjection|]
            }
          )
        }
      );
      describe(
        "unsafeGetPerspectiveCameraProjectionGameObject",
        () =>
          test(
            "get cameraProjection's gameObject",
            () => {
              open GameObjectAPI;
              let (state, cameraProjection) = createPerspectiveCameraProjection(state^);
              let (state, gameObject) = state |> GameObjectAPI.createGameObject;
              let state =
                state
                |> addGameObjectPerspectiveCameraProjectionComponent(gameObject, cameraProjection);
              state
              |> unsafeGetPerspectiveCameraProjectionGameObject(cameraProjection)
              |> expect == gameObject
            }
          )
      );
      describe(
        "dispose component",
        () => {
          let _prepareTwo = (state) => {
            let (state, gameObject1, _, (_, perspectiveCameraProjection1)) =
              CameraTool.createCameraGameObject(state);
            let (state, gameObject2, _, (_, perspectiveCameraProjection2)) =
              CameraTool.createCameraGameObject(state);
            (
              state,
              gameObject1,
              perspectiveCameraProjection1,
              gameObject2,
              perspectiveCameraProjection2
            )
          };
          describe(
            "dispose record",
            () => {
              test(
                "dirtyArray: remove from array",
                () => {
                  open PerspectiveCameraProjectionType;
                  let (state, gameObject1, _, (_, perspectiveCameraProjection1)) =
                    CameraTool.createCameraGameObject(state^);
                  let state =
                    PerspectiveCameraProjectionTool.updateCameraProjection(
                      perspectiveCameraProjection1,
                      state
                    );
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectPerspectiveCameraProjectionComponent(
                         gameObject1,
                         perspectiveCameraProjection1
                       );
                  let {dirtyArray} = state.perspectiveCameraProjectionRecord;
                  dirtyArray
                  |> WonderCommonlib.ArrayService.removeDuplicateItems
                  |> expect == [|0|]
                }
              );
              test(
                "remove from pMatrixMap, gameObjectMap",
                () => {
                  open PerspectiveCameraProjectionType;
                  let (state, gameObject1, _, (_, perspectiveCameraProjection1)) =
                    CameraTool.createCameraGameObject(state^);
                  let state =
                    PerspectiveCameraProjectionTool.updateCameraProjection(
                      perspectiveCameraProjection1,
                      state
                    );
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectPerspectiveCameraProjectionComponent(
                         gameObject1,
                         perspectiveCameraProjection1
                       );
                  let {pMatrixMap, gameObjectMap} = state.perspectiveCameraProjectionRecord;
                  (
                    pMatrixMap |> WonderCommonlib.SparseMapService.has(perspectiveCameraProjection1),
                    gameObjectMap
                    |> WonderCommonlib.SparseMapService.has(perspectiveCameraProjection1)
                  )
                  |> expect == (false, false)
                }
              );
              test(
                "remove from nearMap, farMap, fovyMap, aspectMap",
                () => {
                  let (state, gameObject1, _, (_, perspectiveCameraProjection1)) =
                    CameraTool.createCameraGameObject(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectPerspectiveCameraProjectionComponent(
                         gameObject1,
                         perspectiveCameraProjection1
                       );
                  let {nearMap, farMap, fovyMap, aspectMap} as record =
                    state.perspectiveCameraProjectionRecord;
                  (
                    nearMap |> WonderCommonlib.SparseMapService.has(perspectiveCameraProjection1),
                    farMap |> WonderCommonlib.SparseMapService.has(perspectiveCameraProjection1),
                    fovyMap |> WonderCommonlib.SparseMapService.has(perspectiveCameraProjection1),
                    aspectMap |> WonderCommonlib.SparseMapService.has(perspectiveCameraProjection1)
                  )
                  |> expect == (false, false, false, false)
                }
              )
            }
          );
          describe(
            "test add new one after dispose old one",
            () => {
              test(
                "use disposed index as new index firstly",
                () => {
                  let (
                    state,
                    gameObject1,
                    perspectiveCameraProjection1,
                    gameObject2,
                    perspectiveCameraProjection2
                  ) =
                    _prepareTwo(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectPerspectiveCameraProjectionComponent(
                         gameObject1,
                         perspectiveCameraProjection1
                       );
                  let (state, gameObject3, _, (_, perspectiveCameraProjection3)) =
                    CameraTool.createCameraGameObject(state);
                  perspectiveCameraProjection3 |> expect == perspectiveCameraProjection1
                }
              );
              test(
                "if has no disposed index, get index from record.index",
                () => {
                  let (
                    state,
                    gameObject1,
                    perspectiveCameraProjection1,
                    gameObject2,
                    perspectiveCameraProjection2
                  ) =
                    _prepareTwo(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectPerspectiveCameraProjectionComponent(
                         gameObject1,
                         perspectiveCameraProjection1
                       );
                  let (state, gameObject3, _, (_, perspectiveCameraProjection3)) =
                    CameraTool.createCameraGameObject(state);
                  let (state, gameObject4, _, (_, perspectiveCameraProjection4)) =
                    CameraTool.createCameraGameObject(state);
                  (perspectiveCameraProjection3, perspectiveCameraProjection4)
                  |> expect == (perspectiveCameraProjection1, perspectiveCameraProjection2 + 1)
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
                  let (
                    state,
                    gameObject1,
                    perspectiveCameraProjection1,
                    gameObject2,
                    perspectiveCameraProjection2
                  ) =
                    _prepareTwo(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectPerspectiveCameraProjectionComponent(
                         gameObject1,
                         perspectiveCameraProjection1
                       );
                  expect(
                    () => {
                      let state =
                        state
                        |> GameObjectAPI.disposeGameObjectPerspectiveCameraProjectionComponent(
                             gameObject1,
                             perspectiveCameraProjection1
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
            "if cameraProjection is disposed",
            () => {
              let _getErrorMsg = () => "expect component alive, but actual not";
              let _testGetFunc = (getFunc) => {
                open GameObjectAPI;
                let (state, gameObject, _, (_, cameraProjection)) =
                  CameraTool.createCameraGameObject(state^);
                let state =
                  state
                  |> GameObjectAPI.disposeGameObjectPerspectiveCameraProjectionComponent(
                       gameObject,
                       cameraProjection
                     );
                expect(() => getFunc(cameraProjection, state)) |> toThrowMessage(_getErrorMsg())
              };
              let _testSetFunc = (setFunc) => {
                open GameObjectAPI;
                let (state, gameObject, _, (_, cameraProjection)) =
                  CameraTool.createCameraGameObject(state^);
                let state =
                  state
                  |> GameObjectAPI.disposeGameObjectPerspectiveCameraProjectionComponent(
                       gameObject,
                       cameraProjection
                     );
                expect(() => setFunc(cameraProjection, Obj.magic(0), state))
                |> toThrowMessage(_getErrorMsg())
              };
              test(
                "unsafeGetPerspectiveCameraProjectionGameObject should error",
                () => _testGetFunc(unsafeGetPerspectiveCameraProjectionGameObject)
              );
              test(
                "unsafeGetPerspectiveCameraProjectionPMatrix should error",
                () => _testGetFunc(unsafeGetPerspectiveCameraProjectionPMatrix)
              )
            }
          )
      );
      describe(
        "getFovy",
        () =>
          test(
            "test",
            () => {
              let (state, cameraProjection) = createPerspectiveCameraProjection(state^);
              let fovy = 65.;
              let state = state |> setPerspectiveCameraFovy(cameraProjection, fovy);
              state |> unsafeGetPerspectiveCameraFovy(cameraProjection) |> expect == fovy
            }
          )
      );
      describe(
        "getAspect",
        () =>
          test(
            "test",
            () => {
              let (state, cameraProjection) = createPerspectiveCameraProjection(state^);
              let aspect = 1.;
              let state = state |> setPerspectiveCameraAspect(cameraProjection, aspect);
              state |> unsafeGetPerspectiveCameraAspect(cameraProjection) |> expect == aspect
            }
          )
      );
      describe(
        "getNear",
        () =>
          test(
            "test",
            () => {
              let (state, cameraProjection) = createPerspectiveCameraProjection(state^);
              let near = 0.1;
              let state = state |> setPerspectiveCameraNear(cameraProjection, near);
              state |> unsafeGetPerspectiveCameraNear(cameraProjection) |> expect == near
            }
          )
      );
      describe(
        "getFar",
        () =>
          test(
            "test",
            () => {
              let (state, cameraProjection) = createPerspectiveCameraProjection(state^);
              let far = 1000.;
              let state = state |> setPerspectiveCameraFar(cameraProjection, far);
              state |> unsafeGetPerspectiveCameraFar(cameraProjection) |> expect == far
            }
          )
      )
    }
  );