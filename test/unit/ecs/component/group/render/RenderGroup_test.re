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

    describe("replaceMaterial", () => {
      describe("replace material components", () => {
        test("test replace basic material to light material", () => {
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

          let (state, renderGroup2) =
            RenderGroupAPI.createRenderGroup(
              (
                MeshRendererAPI.createMeshRenderer,
                LightMaterialAPI.createLightMaterial,
              ),
              state,
            );

          let state =
            RenderGroupAPI.replaceMaterial(
              (
                RenderGroupTool.buildRenderGroup(meshRenderer1, basicMaterial),
                renderGroup2,
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
        });
        test("test replace light material to basic material", () => {
          state :=
            RenderJobsTool.initWithJobConfigWithoutBuildFakeDom(
              sandbox,
              LoopRenderJobTool.buildNoWorkerJobConfig(),
            );
          let (state, gameObject, _, lightMaterial, meshRenderer1) =
            FrontRenderLightJobTool.prepareGameObject(sandbox, state^);
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
          let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
          let pos1 = 0;
          let getUniformLocation =
            GLSLLocationTool.getUniformLocation(
              ~pos=pos1,
              sandbox,
              "u_color",
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

          let (state, renderGroup2) =
            RenderGroupAPI.createRenderGroup(
              (
                MeshRendererAPI.createMeshRenderer,
                BasicMaterialAPI.createBasicMaterial,
              ),
              state,
            );

          let state =
            RenderGroupAPI.replaceMaterial(
              (
                RenderGroupTool.buildRenderGroup(meshRenderer1, lightMaterial),
                renderGroup2,
              ),
              gameObject,
              (
                GameObjectAPI.disposeGameObjectLightMaterialComponent,
                GameObjectAPI.addGameObjectBasicMaterialComponent,
              ),
              state,
            );
          let state = state |> DirectorTool.runWithDefaultTime;

          uniform3f |> withOneArg(pos1) |> getCallCount |> expect == 1;
        });
      });

      describe("not replace meshRenderer", () => {
        let _prepare = state => {
          let (state, gameObject1, _, lightMaterial1, meshRenderer1) =
            FrontRenderLightJobTool.prepareGameObject(sandbox, state^);

          let state = state |> DirectorTool.init;

          let (state, renderGroup2) =
            RenderGroupAPI.createRenderGroup(
              (
                MeshRendererAPI.createMeshRenderer,
                BasicMaterialAPI.createBasicMaterial,
              ),
              state,
            );

          let state = state |> PregetGLSLDataTool.preparePrecision;

          (state, gameObject1, meshRenderer1, lightMaterial1, renderGroup2);
        };

        let _prepareAndExec = state => {
          let (
            state,
            gameObject1,
            meshRenderer1,
            lightMaterial1,
            renderGroup2,
          ) =
            _prepare(state);

          let state =
            RenderGroupAPI.replaceMaterial(
              (
                RenderGroupTool.buildRenderGroup(
                  meshRenderer1,
                  lightMaterial1,
                ),
                renderGroup2,
              ),
              gameObject1,
              (
                GameObjectAPI.disposeGameObjectLightMaterialComponent,
                GameObjectAPI.addGameObjectBasicMaterialComponent,
              ),
              state,
            );

          (state, gameObject1, meshRenderer1);
        };

        beforeEach(() =>
          state :=
            RenderJobsTool.initWithJobConfigWithoutBuildFakeDom(
              sandbox,
              LoopRenderJobTool.buildNoWorkerJobConfig(),
            )
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()))
            |> PregetGLSLDataTool.preparePrecision
        );

        test("meshRenderer shouldn't be relpace", () => {
          let (state, gameObject1, meshRenderer1) = _prepareAndExec(state);

          GameObjectAPI.unsafeGetGameObjectMeshRendererComponent(
            gameObject1,
            state,
          )
          |> expect == meshRenderer1;
        });
        test("update renderArray", () => {
          let (state, gameObject1, meshRenderer1) = _prepareAndExec(state);

          (
            MeshRendererTool.getBasicMaterialRenderArray(state),
            MeshRendererTool.getLightMaterialRenderArray(state),
          )
          |> expect == ([|gameObject1|], [||]);
        });

        test("meshRenderer->drawMode not change", () => {
          let (
            state,
            gameObject1,
            meshRenderer1,
            lightMaterial1,
            renderGroup2,
          ) =
            _prepare(state);
          let drawMode = 1;
          let state =
            MeshRendererAPI.setMeshRendererDrawMode(
              meshRenderer1,
              drawMode,
              state,
            );

          let state =
            RenderGroupAPI.replaceMaterial(
              (
                RenderGroupTool.buildRenderGroup(
                  meshRenderer1,
                  lightMaterial1,
                ),
                renderGroup2,
              ),
              gameObject1,
              (
                GameObjectAPI.disposeGameObjectLightMaterialComponent,
                GameObjectAPI.addGameObjectBasicMaterialComponent,
              ),
              state,
            );

          MeshRendererAPI.getMeshRendererDrawMode(meshRenderer1, state)
          |> expect == 1;
        });
      });
    });
  });