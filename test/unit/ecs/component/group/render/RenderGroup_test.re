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
        let (state, renderGroup) = RenderGroupTool.createRenderGroup(state^);
        let (state, gameObject) = GameObjectAPI.createGameObject(state);

        let state =
          RenderGroupTool.addGameObjectRenderGroupComponents(
            gameObject,
            renderGroup,
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
        let (state, renderGroup) = RenderGroupTool.createRenderGroup(state^);
        let (state, gameObject) = GameObjectAPI.createGameObject(state);
        let state =
          RenderGroupTool.addGameObjectRenderGroupComponents(
            gameObject,
            renderGroup,
            state,
          );

        let state =
          RenderGroupTool.disposeGameObjectRenderGroupComponents(
            gameObject,
            renderGroup,
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
        let (state, renderGroup) = RenderGroupTool.createRenderGroup(state^);
        let (state, gameObject) = GameObjectAPI.createGameObject(state);
        let state =
          RenderGroupTool.addGameObjectRenderGroupComponents(
            gameObject,
            renderGroup,
            state,
          );

        RenderGroupTool.unsafeGetGameObjectRenderGroupComponents(
          gameObject,
          state,
        )
        |> expect == renderGroup;
      })
    );

    describe("hasGameObjectRenderGroupComponents", () =>
      test("has meshRenderer and material components", () => {
        let (state, renderGroup) = RenderGroupTool.createRenderGroup(state^);
        let (state, gameObject) = GameObjectAPI.createGameObject(state);
        let state =
          RenderGroupTool.addGameObjectRenderGroupComponents(
            gameObject,
            renderGroup,
            state,
          );

        RenderGroupTool.hasGameObjectRenderGroupComponents(gameObject, state)
        |> expect == true;
      })
    );

    describe("replaceRenderGroupComponents", () =>
      describe("replace meshRenderer and material components", () =>
        test("test send u_diffuse", () => {
          state :=
            RenderJobsTool.initWithJobConfigWithoutBuildFakeDom(
              sandbox,
              LoopRenderJobTool.buildNoWorkerJobConfig(),
            );
          let (state, gameObject, _, basicMaterial, meshRenderer1) =
            RenderBasicJobTool.prepareGameObject(sandbox, state^);
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
          let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
          let pos1 = 0;
          let getUniformLocation =
            GLSLLocationTool.getUniformLocation(
              ~pos=pos1,
              sandbox,
              "u_diffuse",
            );
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(
                   ~sandbox,
                   ~uniform3f,
                   ~getUniformLocation,
                   (),
                 ),
               );
          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

          let (state, lightMaterial) =
            LightMaterialAPI.createLightMaterial(state);
          let (state, meshRenderer2) =
            MeshRendererAPI.createMeshRenderer(state);

          let state =
            RenderGroupAPI.replaceRenderGroupComponents(
              (
                (meshRenderer1, basicMaterial),
                (meshRenderer2, lightMaterial),
              ),
              gameObject,
              (
                GameObjectAPI.disposeGameObjectBasicMaterialComponent,
                GameObjectAPI.addGameObjectLightMaterialComponent,
              ),
              state,
            );
          let state = state |> DirectorTool.runWithDefaultTime;

          uniform3f |> withOneArg(pos1) |> getCallCount |> expect == 1;
        })
      )
    );
  });