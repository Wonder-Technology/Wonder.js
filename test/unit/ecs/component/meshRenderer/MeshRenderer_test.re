open MeshRendererAPI;

open Wonder_jest;

let _ =
  describe(
    "MeshRendererAPI",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      let _prepareOne = (state) => MeshRendererTool.createGameObject(state);
      let _prepareTwo = (state) => {
        let (state, gameObject1, meshRenderer1) = MeshRendererTool.createGameObject(state);
        let (state, gameObject2, meshRenderer2) = MeshRendererTool.createGameObject(state);
        (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2)
      };
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "getRenderArray",
        () =>
          test(
            "get array of gameObject which has MeshRendererAPI component",
            () => {
              let (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2) = _prepareTwo(state^);
              state |> MeshRendererTool.getRenderArray |> expect == [|gameObject1, gameObject2|]
            }
          )
      );
      describe(
        "disposeComponent",
        () => {
          describe(
            "dispose record",
            () => {
              test(
                "remove from gameObjectMap",
                () => {
                  open MeshRendererType;
                  let (state, gameObject1, meshRenderer1) =
                    MeshRendererTool.createGameObject(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectMeshRendererComponent(
                         gameObject1,
                         meshRenderer1
                       );
                  let {gameObjectMap} = MeshRendererTool.getMeshRendererData(state);
                  gameObjectMap
                  |> WonderCommonlib.SparseMapSystem.has(meshRenderer1)
                  |> expect == false
                }
              );
              describe(
                "remove from renderGameObjectArray",
                () => {
                  test(
                    "test getRenderArray",
                    () => {
                      let (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2) =
                        _prepareTwo(state^);
                      let state =
                        state
                        |> GameObjectAPI.disposeGameObjectMeshRendererComponent(
                             gameObject1,
                             meshRenderer1
                           );
                      state |> MeshRendererTool.getRenderArray |> expect == [|gameObject2|]
                    }
                  );
                  test(
                    "test add gameObject after dispose",
                    () => {
                      let (state, gameObject1, meshRenderer1) = _prepareOne(state^);
                      let state =
                        state
                        |> GameObjectAPI.disposeGameObjectMeshRendererComponent(
                             gameObject1,
                             meshRenderer1
                           );
                      let (state, gameObject2, meshRenderer2) = _prepareOne(state);
                      state |> MeshRendererTool.getRenderArray |> expect == [|gameObject2|]
                    }
                  )
                }
              )
            }
          );
          test(
            "the disposed meshRenderer shouldn't affect other alive ones' record",
            () => {
              let (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2) = _prepareTwo(state^);
              let state =
                state
                |> GameObjectAPI.disposeGameObjectMeshRendererComponent(gameObject1, meshRenderer1);
              state
              |> MeshRendererAPI.unsafeGetMeshRendererGameObject(meshRenderer2)
              |> expect == gameObject2
            }
          );
          describe(
            "test add new one after dispose old one",
            () => {
              test(
                "use disposed index as new index firstly",
                () => {
                  let (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2) =
                    _prepareTwo(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectMeshRendererComponent(
                         gameObject1,
                         meshRenderer1
                       );
                  let (state, meshRenderer3) = createMeshRenderer(state);
                  meshRenderer3 |> expect == meshRenderer1
                }
              );
              test(
                "if has no disposed index, get index from meshRendererRecord.index",
                () => {
                  let (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2) =
                    _prepareTwo(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectMeshRendererComponent(
                         gameObject2,
                         meshRenderer2
                       );
                  let (state, meshRenderer3) = createMeshRenderer(state);
                  let (state, meshRenderer4) = createMeshRenderer(state);
                  (meshRenderer3, meshRenderer4) |> expect == (meshRenderer2, meshRenderer2 + 1)
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
                  let (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2) =
                    _prepareTwo(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectMeshRendererComponent(
                         gameObject1,
                         meshRenderer1
                       );
                  expect(
                    () => {
                      let state =
                        state
                        |> GameObjectAPI.disposeGameObjectMeshRendererComponent(
                             gameObject1,
                             meshRenderer1
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
            "if meshRenderer is disposed",
            () =>
              test(
                "unsafeGetMeshRendererGameObject should error",
                () => {
                  let (state, gameObject1, meshRenderer1) = _prepareOne(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectMeshRendererComponent(
                         gameObject1,
                         meshRenderer1
                       );
                  expect(() => unsafeGetMeshRendererGameObject(meshRenderer1, state))
                  |> toThrowMessage("expect component alive, but actual not")
                }
              )
          )
      )
    }
  );