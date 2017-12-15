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
        (
          state,
          gameObject1,
          gameObject2,
          gameObject3,
          transform1,
          transform2,
          transform3,
          pos1,
          pos2,
          pos3
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
                "test deep copy data",
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
          test(
            "deep copy transform data",
            () => {
              open TransformType;
              let (
                state,
                gameObject1,
                gameObject2,
                gameObject3,
                transform1,
                transform2,
                transform3,
                pos1,
                pos2,
                pos3
              ) =
                _prepareTransformState(state);
              let _ = Transform.getTransformPosition(transform2, state);
              let transformData = TransformTool.getTransformData(state);
              let copyState = StateTool.deepCopyState(state);
              TransformTool.getTransformData(copyState)
              |>
              expect == {
                          index: 3,
                          parentMap: [|
                            Js.Undefined.empty,
                            transform1 |> Obj.magic,
                            Js.Undefined.empty
                          |],
                          childMap: [|[|transform2|], [||], Js.Undefined.empty |> Obj.magic|],
                          localToWorldMatrixMap: [|
                            TransformTool.getLocalToWorldMatrixTypeArray(transform1, copyState),
                            TransformTool.getLocalToWorldMatrixTypeArray(transform2, copyState),
                            Js.Undefined.empty |> Obj.magic
                          |],
                          localPositionMap: [|
                            TransformTool.getTransformLocalPositionTypeArray(
                              transform1,
                              copyState
                            ),
                            TransformTool.getTransformLocalPositionTypeArray(
                              transform2,
                              copyState
                            ),
                            Js.Undefined.empty |> Obj.magic
                          |],
                          localToWorldMatrixTypeArrayPool:
                            transformData.localToWorldMatrixTypeArrayPool,
                          localPositionTypeArrayPool: transformData.localPositionTypeArrayPool,
                          gameObjectMap: [|
                            gameObject1,
                            gameObject2,
                            Js.Undefined.empty |> Obj.magic
                          |],
                          dirtyMap: [|false, false, Js.Undefined.empty |> Obj.magic|],
                          disposedIndexArray: [|transform3|]
                        }
            }
          )
        }
      );
      describe(
        "restoreFromState",
        () => {
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
                  let currentState = StateTool.restoreFromState(state |> StateTool.deepCopyState);
                  let (currentState, _, _) = MeshRendererTool.createGameObject(currentState);
                  MeshRendererTool.getMeshRendererData(state).renderGameObjectArray
                  |> expect == [|gameObject1, gameObject2|]
                }
              )
            }
          );
          test(
            "restore transform data to target state",
            () => {
              open TransformType;
              let (
                state,
                gameObject1,
                gameObject2,
                gameObject3,
                transform1,
                transform2,
                transform3,
                pos1,
                pos2,
                pos3
              ) =
                _prepareTransformState(state);
              let (currentState, _, _) =
                GameObjectTool.createGameObject(StateTool.createNewCompleteState());
              let currentState = StateTool.restoreFromState(state);
              StateTool.getState() |> expect == state
            }
          )
        }
      )
    }
  );