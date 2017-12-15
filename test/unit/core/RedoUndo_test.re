open Wonder_jest;

let _ =
  describe(
    "State",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      let _prepareMeshRendererState = (state) => {
        let (state, gameObject1, meshRenderer1) = MeshRendererTool.createGameObject(state^);
        let (state, gameObject2, meshRenderer2) = MeshRendererTool.createGameObject(state);
        let (state, gameObject3, meshRenderer3) = MeshRendererTool.createGameObject(state);
        let state =
          state |> GameObject.disposeGameObjectMeshRendererComponent(gameObject3, meshRenderer3);
        (state, gameObject1, gameObject2, gameObject3, meshRenderer1, meshRenderer2, meshRenderer3)
      };
      let _prepareTransformState = (state) => {
        let (state, gameObject1, transform1) = GameObjectTool.createGameObject(state^);
        let (state, gameObject2, transform2) = GameObjectTool.createGameObject(state);
        let (state, gameObject3, transform3) = GameObjectTool.createGameObject(state);
        let state =
          Transform.setTransformParent(Js.Nullable.return(transform1), transform2, state);
        let pos1 = (1., 2., 3.);
        let pos2 = (2., 4., 10.);
        let pos3 = ((-1.), 4., 5.);
        let state = Transform.setTransformLocalPosition(transform1, pos1, state);
        let state = Transform.setTransformLocalPosition(transform2, pos2, state);
        let state = Transform.setTransformLocalPosition(transform3, pos3, state);
        let state =
          state |> GameObject.disposeGameObjectTransformComponent(gameObject3, transform3);
        (state, gameObject1, gameObject2, gameObject3, transform1, transform2, transform3)
      };
      let _prepareCameraControllerState = (state) => {
        /* open CameraController; */
        open PerspectiveCamera;
        let (state, gameObject1, _, cameraController1) =
          CameraControllerTool.createCameraGameObject(state^);
        let (state, gameObject2, _, cameraController2) =
          CameraControllerTool.createCameraGameObject(state);
        let (state, gameObject3, _, cameraController3) =
          CameraControllerTool.createCameraGameObject(state);
        let state = state |> setPerspectiveCameraNear(cameraController2, 0.2);
        let state = state |> setPerspectiveCameraFar(cameraController2, 100.);
        let state = state |> setPerspectiveCameraFar(cameraController3, 100.);
        let state = state |> setPerspectiveCameraAspect(cameraController1, 1.);
        let state = state |> setPerspectiveCameraAspect(cameraController2, 2.);
        let state = state |> setPerspectiveCameraFovy(cameraController2, 60.);
        let state = state |> CameraControllerTool.update;
        let state =
          state
          |> GameObject.disposeGameObjectCameraControllerComponent(gameObject3, cameraController3);
        (
          state,
          gameObject1,
          gameObject2,
          gameObject3,
          cameraController1,
          cameraController2,
          cameraController3
        )
      };
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "deepCopyState",
        () => {
          describe(
            "deep copy meshRenderer data",
            () => {
              test(
                "copied data should equal to source data",
                () => {
                  open MeshRendererType;
                  let (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    meshRenderer1,
                    meshRenderer2,
                    meshRenderer3
                  ) =
                    _prepareMeshRendererState(state);
                  let copyState = StateTool.deepCopyState(state);
                  MeshRendererTool.getMeshRendererData(copyState)
                  |>
                  expect == {
                              index: 3,
                              renderGameObjectArray: [|gameObject1, gameObject2|],
                              gameObjectMap: [|
                                gameObject1,
                                gameObject2,
                                Js.Undefined.empty |> Obj.magic
                              |],
                              disposedIndexArray: [|meshRenderer3|]
                            }
                }
              );
              test(
                "change copied state shouldn't affect source state",
                () => {
                  open MeshRendererType;
                  let (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    meshRenderer1,
                    meshRenderer2,
                    meshRenderer3
                  ) =
                    _prepareMeshRendererState(state);
                  let copyState = StateTool.deepCopyState(state);
                  let data = MeshRendererTool.getMeshRendererData(copyState);
                  data.index = 0;
                  data.renderGameObjectArray |> Js.Array.pop |> ignore;
                  data.gameObjectMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(meshRenderer2);
                  data.disposedIndexArray |> Js.Array.pop |> ignore;
                  MeshRendererTool.getMeshRendererData(state)
                  |>
                  expect == {
                              index: 3,
                              renderGameObjectArray: [|gameObject1, gameObject2|],
                              gameObjectMap: [|
                                gameObject1,
                                gameObject2,
                                Js.Undefined.empty |> Obj.magic
                              |],
                              disposedIndexArray: [|meshRenderer3|]
                            }
                }
              )
            }
          );
          describe(
            "deep copy transform data",
            () => {
              test(
                "copied data should equal to source data",
                () => {
                  open TransformType;
                  let (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    transform1,
                    transform2,
                    transform3
                  ) =
                    _prepareTransformState(state);
                  let _ = Transform.getTransformPosition(transform2, state);
                  let transformData = TransformTool.getTransformData(state);
                  let copyState = StateTool.deepCopyState(state);
                  TransformTool.getTransformData(copyState)
                  |> expect == TransformTool.getTransformData(state)
                }
              );
              describe(
                "change copied state shouldn't affect source state",
                () => {
                  test(
                    "test copied data",
                    () => {
                      open TransformType;
                      let (
                        state,
                        gameObject1,
                        gameObject2,
                        gameObject3,
                        transform1,
                        transform2,
                        transform3
                      ) =
                        _prepareTransformState(state);
                      let _ = Transform.getTransformPosition(transform2, state);
                      let copyState = StateTool.deepCopyState(state);
                      let data = TransformTool.getTransformData(copyState);
                      data.localPositionMap
                      |> Obj.magic
                      |> WonderCommonlib.SparseMapSystem.deleteVal(transform2);
                      TransformTool.getTransformData(state).localPositionMap
                      |>
                      expect == [|
                                  TransformTool.getTransformLocalPositionTypeArray(
                                    transform1,
                                    state
                                  ),
                                  TransformTool.getTransformLocalPositionTypeArray(
                                    transform2,
                                    state
                                  ),
                                  Js.Undefined.empty |> Obj.magic
                                |]
                    }
                  );
                  test(
                    "not copy localToWorldMatrixTypeArrayPool, localPositionTypeArrayPool",
                    () => {
                      open TransformType;
                      let (
                        state,
                        gameObject1,
                        gameObject2,
                        gameObject3,
                        transform1,
                        transform2,
                        transform3
                      ) =
                        _prepareTransformState(state);
                      let _ = Transform.getTransformPosition(transform2, state);
                      let copyState = StateTool.deepCopyState(state);
                      let data = TransformTool.getTransformData(copyState);
                      data.localToWorldMatrixTypeArrayPool
                      |> Obj.magic
                      |> WonderCommonlib.SparseMapSystem.deleteVal(transform2);
                      data.localPositionTypeArrayPool
                      |> Obj.magic
                      |> WonderCommonlib.SparseMapSystem.deleteVal(transform1);
                      let {localToWorldMatrixTypeArrayPool, localPositionTypeArrayPool} =
                        TransformTool.getTransformData(state);
                      (localToWorldMatrixTypeArrayPool, localPositionTypeArrayPool)
                      |>
                      expect == (
                                  data.localToWorldMatrixTypeArrayPool,
                                  data.localPositionTypeArrayPool
                                )
                    }
                  )
                }
              )
            }
          );
          describe(
            "deep copy cameraController data",
            () => {
              test(
                "copied data should equal to source data",
                () => {
                  open CameraControllerType;
                  let (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    cameraController1,
                    cameraController2,
                    cameraController3
                  ) =
                    _prepareCameraControllerState(state);
                  let cameraControllerData = CameraControllerTool.getCameraControllerData(state);
                  let copyState = StateTool.deepCopyState(state);
                  CameraControllerTool.getCameraControllerData(copyState)
                  |> expect == CameraControllerTool.getCameraControllerData(state)
                }
              );
              test(
                "change copied state shouldn't affect source state",
                () => {
                  open CameraControllerType;
                  let (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    cameraController1,
                    cameraController2,
                    cameraController3
                  ) =
                    _prepareCameraControllerState(state);
                  let copyState = StateTool.deepCopyState(state);
                  let {perspectiveCameraData} as data =
                    CameraControllerTool.getCameraControllerData(copyState);
                  data.cameraArray
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(cameraController2);
                  data.updateCameraFuncMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(cameraController2);
                  perspectiveCameraData.nearMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(cameraController1);
                  let {cameraArray, updateCameraFuncMap, perspectiveCameraData} =
                    CameraControllerTool.getCameraControllerData(state);
                  (
                    cameraArray,
                    updateCameraFuncMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(cameraController2)
                    |> JudgeTool.isUndefined,
                    perspectiveCameraData.nearMap
                  )
                  |>
                  expect == (
                              [|
                                cameraController1,
                                cameraController2,
                                Js.Undefined.empty |> Obj.magic
                              |],
                              false,
                              [|0.1, 0.2, Js.Undefined.empty |> Obj.magic|]
                            )
                }
              )
            }
          );
          describe(
            "restoreFromState",
            () => {
              let _test = (_prepareState, state) => {
                open TransformType;
                let (state, _, _, _, _, _, _) = _prepareState(state);
                let (currentState, _, _) =
                  GameObjectTool.createGameObject(StateTool.createNewCompleteState());
                let currentState = StateTool.restoreFromState(state);
                StateTool.getState() |> expect == state
              };
              describe(
                "restore meshRenderer data to target state",
                () => {
                  let _prepare = (state) => {
                    let (
                      state,
                      gameObject1,
                      gameObject2,
                      gameObject3,
                      meshRenderer1,
                      meshRenderer2,
                      meshRenderer3
                    ) =
                      _prepareMeshRendererState(state);
                    let (currentState, gameObject4, meshRenderer4) =
                      MeshRendererTool.createGameObject(StateTool.createNewCompleteState());
                    (
                      (
                        state,
                        gameObject1,
                        gameObject2,
                        gameObject3,
                        meshRenderer1,
                        meshRenderer2,
                        meshRenderer3
                      ),
                      (currentState, gameObject4, meshRenderer4)
                    )
                  };
                  test(
                    "test restore",
                    () => {
                      let ((state, _, _, _, _, _, _), (currentState, _, _)) = _prepare(state);
                      let currentState = StateTool.restoreFromState(state);
                      currentState |> expect == state
                    }
                  );
                  test(
                    "set restored state to stateData",
                    () => {
                      let ((state, _, _, _, _, _, _), (currentState, _, _)) = _prepare(state);
                      let currentState = StateTool.restoreFromState(state);
                      StateTool.getState() |> expect == currentState
                    }
                  );
                  test(
                    "change restored state should affect source state",
                    () => {
                      let ((state, _, _, _, _, _, _), (currentState, _, _)) = _prepare(state);
                      let currentState = StateTool.restoreFromState(state);
                      let (currentState, gameObject5, meshRenderer5) =
                        MeshRendererTool.createGameObject(StateTool.createNewCompleteState());
                      state
                      |> MeshRenderer.getMeshRendererGameObject(meshRenderer5)
                      |> expect == gameObject5
                    }
                  );
                  test(
                    "change restored state which is restore from deep copy state shouldn't affect source state",
                    () => {
                      let ((state, gameObject1, gameObject2, _, _, _, _), (currentState, _, _)) =
                        _prepare(state);
                      let currentState =
                        StateTool.restoreFromState(state |> StateTool.deepCopyState);
                      let (currentState, _, _) = MeshRendererTool.createGameObject(currentState);
                      MeshRendererTool.getMeshRendererData(state).renderGameObjectArray
                      |> expect == [|gameObject1, gameObject2|]
                    }
                  )
                }
              );
              test(
                "restore transform data to target state",
                () => _test(_prepareTransformState, state)
              );
              test(
                "restore cameraController data to target state",
                () => _test(_prepareCameraControllerState, state)
              )
            }
          )
        }
      )
    }
  );