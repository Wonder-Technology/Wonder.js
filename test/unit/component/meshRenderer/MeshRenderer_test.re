open MeshRenderer;

open Wonder_jest;

let _ =
  describe(
    "MeshRenderer",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      let _prepareOne = (state) => {
        MeshRendererTool.createGameObject(state);
      };
      let _prepareTwo = () => {
        let (state, meshRenderer1) = createMeshRenderer(state^);
        let (state, gameObject1) = state |> GameObject.createGameObject;
        let state =
          state |> GameObject.addGameObjectMeshRendererComponent(gameObject1, meshRenderer1);
        let (state, meshRenderer2) = createMeshRenderer(state);
        let (state, gameObject2) = state |> GameObject.createGameObject;
        let state =
          state |> GameObject.addGameObjectMeshRendererComponent(gameObject2, meshRenderer2);
        (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2)
      };
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init()
        }
      );
      describe(
        "getRenderArray",
        () =>
          test(
            "get array of gameObject which has MeshRenderer component",
            () => {
              let (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2) = _prepareTwo();
              state |> MeshRendererTool.getRenderArray |> expect == [|gameObject1, gameObject2|]
            }
          )
      );
      describe(
        "disposeComponent",
        () => {
          describe(
            "remove from renderGameObjectArray",
            () => {
              test(
                "test getRenderArray",
                () => {
                  let (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2) =
                    _prepareTwo();
                  let state =
                    state
                    |> GameObject.disposeGameObjectMeshRendererComponent(
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
                    |> GameObject.disposeGameObjectMeshRendererComponent(
                         gameObject1,
                         meshRenderer1
                       );
                  let (state, gameObject2, meshRenderer2) = _prepareOne(state);
                  state |> MeshRendererTool.getRenderArray |> expect == [|gameObject2|]
                }
              )
            }
          );
          test(
            "the disposed meshRenderer shouldn't affect other alive ones' data",
            () => {
              let (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2) = _prepareTwo();
              let state =
                state
                |> GameObject.disposeGameObjectMeshRendererComponent(gameObject1, meshRenderer1);
              state
              |> MeshRenderer.getMeshRendererGameObject(meshRenderer2)
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
                    _prepareTwo();
                  let state =
                    state
                    |> GameObject.disposeGameObjectMeshRendererComponent(
                         gameObject1,
                         meshRenderer1
                       );
                  let (state, meshRenderer3) = createMeshRenderer(state);
                  meshRenderer3 |> expect == meshRenderer1
                }
              );
              test(
                "if has no disposed index, get index from meshRendererData.index",
                () => {
                  let (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2) =
                    _prepareTwo();
                  let state =
                    state
                    |> GameObject.disposeGameObjectMeshRendererComponent(
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
                "shouldn't dispose the component which isn't alive",
                () => {
                  let (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2) =
                    _prepareTwo();
                  let state =
                    state
                    |> GameObject.disposeGameObjectMeshRendererComponent(
                         gameObject1,
                         meshRenderer1
                       );
                  expect(
                    () => {
                      let state =
                        state
                        |> GameObject.disposeGameObjectMeshRendererComponent(
                             gameObject1,
                             meshRenderer1
                           );
                      ()
                    }
                  )
                  |> toThrowMessage("shouldn't dispose the component which isn't alive")
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
                "getMeshRendererGameObject should error",
                () => {
                  let (state, gameObject1, meshRenderer1) = _prepareOne(state^);
                  let state =
                    state
                    |> GameObject.disposeGameObjectMeshRendererComponent(
                         gameObject1,
                         meshRenderer1
                       );
                  expect(() => getMeshRendererGameObject(meshRenderer1, state))
                  |> toThrowMessage("component should alive")
                }
              )
          )
      )
    }
  );