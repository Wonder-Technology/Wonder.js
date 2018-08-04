open RenderGroupAPI;

open StateDataMainType;

open RenderGroupType;

open Wonder_jest;

let _ =
  describe("RenderGroup", () => {
    open Expect;
    open! Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("createRenderGroup", () => {
      test("create meshRenderer and material", () => {
        let (state, {meshRenderer, material}) =
          RenderGroupTool.createRenderGroup(state^);

        (meshRenderer, material) |> expect == (0, 0);
      });

      describe("change state", () =>
        test("state->index + 1", () => {
          let (state, {meshRenderer, material}) =
            RenderGroupTool.createRenderGroup(state^);

          (
            MeshRendererTool.getRecord(state).index,
            LightMaterialTool.getRecord(state).index,
          )
          |> expect == (1, 1);
        })
      );
    });

    describe("addRenderGroupComponents", () =>
      test("add meshRenderer and material component", () => {
        let (state, cameraGroup) = RenderGroupTool.createRenderGroup(state^);
        let (state, gameObject) = GameObjectAPI.createGameObject(state);

        let state =
          RenderGroupTool.addGameObjectRenderGroupComponents(
            gameObject,
            cameraGroup,
            state,
          );

        (
          GameObjectAPI.hasGameObjectMeshRendererComponent(gameObject, state),
          GameObjectAPI.hasGameObjectLightMaterialComponent(
            gameObject,
            state,
          ),
        )
        |> expect == (true, true);
      })
    );

    describe("disposeGameObjectRenderGroupComponents", () =>
      test("dispose meshRenderer and material component", () => {
        let (state, cameraGroup) = RenderGroupTool.createRenderGroup(state^);
        let (state, gameObject) = GameObjectAPI.createGameObject(state);
        let state =
          RenderGroupTool.addGameObjectRenderGroupComponents(
            gameObject,
            cameraGroup,
            state,
          );

        let state =
          RenderGroupTool.disposeGameObjectRenderGroupComponents(
            gameObject,
            cameraGroup,
            state,
          );

        (
          GameObjectAPI.hasGameObjectMeshRendererComponent(gameObject, state),
          GameObjectAPI.hasGameObjectLightMaterialComponent(
            gameObject,
            state,
          ),
        )
        |> expect == (false, false);
      })
    );

    describe("unsafeGetGameObjectRenderGroupComponents", () =>
      test("unsafe get meshRenderer and material components", () => {
        let (state, cameraGroup) = RenderGroupTool.createRenderGroup(state^);
        let (state, gameObject) = GameObjectAPI.createGameObject(state);
        let state =
          RenderGroupTool.addGameObjectRenderGroupComponents(
            gameObject,
            cameraGroup,
            state,
          );

        RenderGroupTool.unsafeGetGameObjectRenderGroupComponents(
          gameObject,
          state,
        )
        |> expect == cameraGroup;
      })
    );

    describe("hasGameObjectRenderGroupComponents", () =>
      test("has meshRenderer and material components", () => {
        let (state, cameraGroup) = RenderGroupTool.createRenderGroup(state^);
        let (state, gameObject) = GameObjectAPI.createGameObject(state);
        let state =
          RenderGroupTool.addGameObjectRenderGroupComponents(
            gameObject,
            cameraGroup,
            state,
          );

        RenderGroupTool.hasGameObjectRenderGroupComponents(gameObject, state)
        |> expect == true;
      })
    );
  });