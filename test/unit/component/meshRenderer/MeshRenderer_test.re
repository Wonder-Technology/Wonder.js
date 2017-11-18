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
        "dispose component",
        () =>
          test(
            "remove from renderGameObjectArray",
            () => {
              let (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2) = _prepareTwo();
              let state =
                state
                |> GameObject.disposeGameObjectMeshRendererComponent(gameObject1, meshRenderer1);
              state |> MeshRendererTool.getRenderArray |> expect == [|gameObject2|]
            }
          )
      );
      test(
        "the disposed meshRenderer shouldn't affect other alive ones' data",
        () => {
          let (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2) = _prepareTwo();
          let state =
            state |> GameObject.disposeGameObjectMeshRendererComponent(gameObject1, meshRenderer1);
          state |> MeshRenderer.getMeshRendererGameObject(meshRenderer2) |> expect == gameObject2
        }
      );
      describe(
        "test gameObject add new meshRenderer after dispose old one",
        () => {
          beforeEach(
            () => BufferConfigTool.setBufferSize(state^, ~meshRendererDataBufferCount=2, ()) |> ignore
          );
          test(
            "if meshRendererData.index == maxCount, use disposed index(meshRenderer) as new index",
            () => {
              let (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2) = _prepareTwo();
              let state =
                state
                |> GameObject.disposeGameObjectMeshRendererComponent(gameObject1, meshRenderer1);
              let (state, meshRenderer3) = createMeshRenderer(state);
              meshRenderer3 |> expect == meshRenderer1
            }
          );
          test(
            "if has no disposed one, error",
            () => {
              let (state, gameObject1, meshRenderer1, gameObject2, meshRenderer2) = _prepareTwo();
              expect(() => createMeshRenderer(state))
              |> toThrowMessage("have create too many components")
            }
          )
        }
      )
      /*
       todo test
        test(
          "if meshRenderer is disposed, getMeshRendererGameObject/getMeshRendererGameObject should error",
          () => {
            /* let (state, transform1) = createTransform(state^);
            let state = state |> dispose(transform1);
            expect(() => getTransformPosition(transform1, state))
            |> toThrowMessage("component should alive") */
          }
        ) */
    }
  );