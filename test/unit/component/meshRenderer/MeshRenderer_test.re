open MeshRenderer;

open Jest;

let _ =
  describe(
    "MeshRenderer",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
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
              let (state, meshRenderer1) = createMeshRenderer(state^);
              let (state, gameObject1) = state |> GameObject.createGameObject;
              let state =
                state |> GameObject.addGameObjectMeshRendererComponent(gameObject1, meshRenderer1);
              let (state, meshRenderer2) = createMeshRenderer(state);
              let (state, gameObject2) = state |> GameObject.createGameObject;
              let state =
                state |> GameObject.addGameObjectMeshRendererComponent(gameObject2, meshRenderer2);
              state |> MeshRendererTool.getRenderArray |> expect == [|gameObject1, gameObject2|]
            }
          )
      )
    }
  );