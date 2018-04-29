open MeshRendererAPI;

open Wonder_jest;

let _ =
  describe(
    "MeshRenderer",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      let _prepareOne = (state) => MeshRendererTool.createBasicMaterialGameObject(state);
      let _prepareTwo = (state) => {
        let (state, gameObject1, meshRenderer1) =
          MeshRendererTool.createBasicMaterialGameObject(state);
        let (state, gameObject2, meshRenderer2) =
          MeshRendererTool.createBasicMaterialGameObject(state);
        (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2)
      };
      let _prepareThree = (state) => {
        let (state, gameObject1, meshRenderer1) =
          MeshRendererTool.createBasicMaterialGameObject(state);
        let (state, gameObject2, meshRenderer2) =
          MeshRendererTool.createBasicMaterialGameObject(state);
        let (state, gameObject3, meshRenderer3) =
          MeshRendererTool.createLightMaterialGameObject(state);
        (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2, gameObject3, meshRenderer3)
      };
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "getBasicMaterialRenderArray",
        () =>
          test(
            "get array of gameObject which has meshRenderer component and basicMaterial component",
            () => {
              let (
                state,
                gameObject1,
                meshRenderer1,
                gameObject2,
                meshRenderer2,
                gameObject3,
                meshRenderer3
              ) =
                _prepareThree(state^);
              state
              |> MeshRendererTool.getBasicMaterialRenderArray
              |> expect == [|gameObject1, gameObject2|]
            }
          )
      );
      describe(
        "getLightMaterialRenderArray",
        () =>
          test(
            "get array of gameObject which has meshRenderer component and lightMaterial component",
            () => {
              let (
                state,
                gameObject1,
                meshRenderer1,
                gameObject2,
                meshRenderer2,
                gameObject3,
                meshRenderer3
              ) =
                _prepareThree(state^);
              state |> MeshRendererTool.getLightMaterialRenderArray |> expect == [|gameObject3|]
            }
          )
      );
      describe(
        "test add component",
        () =>
          describe(
            "should add meshRenderer component after add material component",
            () => {
              test(
                "test basic material",
                () => {
                  open MeshRendererAPI;
                  open GameObjectAPI;
                  let (state, meshRenderer) = createMeshRenderer(state^);
                  let (state, gameObject) = state |> createGameObject;
                  expect(
                    () => {
                      let state =
                        state |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
                      ()
                    }
                  )
                  |> toThrowMessage(
                       "should add material component before add meshRenderer component"
                     )
                }
              );
              test(
                "test light material",
                () => {
                  open MeshRendererAPI;
                  open GameObjectAPI;
                  let (state, meshRenderer) = createMeshRenderer(state^);
                  let (state, gameObject) = state |> createGameObject;
                  expect(
                    () => {
                      let state =
                        state |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
                      ()
                    }
                  )
                  |> toThrowMessage(
                       "should add material component before add meshRenderer component"
                     )
                }
              )
            }
          )
      );
      describe(
        "disposeComponent",
        () => {
          describe(
            "dispose data",
            () => {
              test(
                "remove from gameObjectMap",
                () => {
                  open MeshRendererType;
                  let (state, gameObject1, meshRenderer1) =
                    MeshRendererTool.createBasicMaterialGameObject(state^);
                  let state =
                    state
                    |> GameObjectTool.disposeGameObjectMeshRendererComponent(
                         gameObject1,
                         meshRenderer1
                       );
                  let {gameObjectMap} = MeshRendererTool.getMeshRendererRecord(state);
                  gameObjectMap
                  |> WonderCommonlib.SparseMapService.has(meshRenderer1)
                  |> expect == false
                }
              );
              describe(
                "remove from basicMaterialRenderGameObjectArray",
                () => {
                  test(
                    "test getBasicMaterialRenderArray",
                    () => {
                      let (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2) =
                        _prepareTwo(state^);
                      let state =
                        state
                        |> GameObjectTool.disposeGameObjectMeshRendererComponent(
                             gameObject1,
                             meshRenderer1
                           );
                      state
                      |> MeshRendererTool.getBasicMaterialRenderArray
                      |> expect == [|gameObject2|]
                    }
                  );
                  test(
                    "test add gameObject after dispose",
                    () => {
                      let (state, gameObject1, meshRenderer1) = _prepareOne(state^);
                      let state =
                        state
                        |> GameObjectTool.disposeGameObjectMeshRendererComponent(
                             gameObject1,
                             meshRenderer1
                           );
                      let (state, gameObject2, meshRenderer2) = _prepareOne(state);
                      state
                      |> MeshRendererTool.getBasicMaterialRenderArray
                      |> expect == [|gameObject2|]
                    }
                  )
                }
              );
              describe(
                "remove from lightMaterialRenderGameObjectArray",
                () => {
                  let _prepare = (state) => {
                    let (state, gameObject1, meshRenderer1) =
                      MeshRendererTool.createBasicMaterialGameObject(state);
                    let (state, gameObject2, meshRenderer2) =
                      MeshRendererTool.createLightMaterialGameObject(state);
                    let (state, gameObject3, meshRenderer3) =
                      MeshRendererTool.createLightMaterialGameObject(state);
                    (
                      state,
                      gameObject1,
                      meshRenderer1,
                      gameObject2,
                      meshRenderer2,
                      gameObject3,
                      meshRenderer3
                    )
                  };
                  test(
                    "test getLightMaterialRenderArray",
                    () => {
                      let (
                        state,
                        gameObject1,
                        meshRenderer1,
                        gameObject2,
                        meshRenderer2,
                        gameObject3,
                        meshRenderer3
                      ) =
                        _prepare(state^);
                      let state =
                        state
                        |> GameObjectTool.disposeGameObjectMeshRendererComponent(
                             gameObject2,
                             meshRenderer2
                           );
                      state
                      |> MeshRendererTool.getLightMaterialRenderArray
                      |> expect == [|gameObject3|]
                    }
                  );
                  test(
                    "test add gameObject after dispose",
                    () => {
                      let (
                        state,
                        gameObject1,
                        meshRenderer1,
                        gameObject2,
                        meshRenderer2,
                        gameObject3,
                        meshRenderer3
                      ) =
                        _prepare(state^);
                      let state =
                        state
                        |> GameObjectTool.disposeGameObjectMeshRendererComponent(
                             gameObject2,
                             meshRenderer2
                           );
                      let (state, gameObject4, meshRenderer4) =
                        MeshRendererTool.createLightMaterialGameObject(state);
                      state
                      |> MeshRendererTool.getLightMaterialRenderArray
                      |> expect == [|gameObject3, gameObject4|]
                    }
                  )
                }
              )
            }
          );
          test(
            "the disposed meshRenderer shouldn't affect other alive ones' record",
            () => {
              let (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2) =
                _prepareTwo(state^);
              let state =
                state
                |> GameObjectTool.disposeGameObjectMeshRendererComponent(
                     gameObject1,
                     meshRenderer1
                   );
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
                    |> GameObjectTool.disposeGameObjectMeshRendererComponent(
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
                    |> GameObjectTool.disposeGameObjectMeshRendererComponent(
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
                    |> GameObjectTool.disposeGameObjectMeshRendererComponent(
                         gameObject1,
                         meshRenderer1
                       );
                  expect(
                    () => {
                      let state =
                        state
                        |> GameObjectTool.disposeGameObjectMeshRendererComponent(
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
                    |> GameObjectTool.disposeGameObjectMeshRendererComponent(
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