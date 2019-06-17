open Wonder_jest;

let _ =
  describe("hot change texture", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());
    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        RenderJobsTool.initWithJobConfig(
          sandbox,
          LoopRenderJobTool.buildNoWorkerJobConfig(),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("test change texture", () => {
      let _prepareForUpdateTexture = state => {
        let (state, _, _, _) = CameraTool.createCameraGameObject(state);
        let unpackFlipYWebgl = Obj.magic(2);
        let pixelStorei = createEmptyStubWithJsObjSandbox(sandbox);
        let state =
          state
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(
                 ~sandbox,
                 ~unpackFlipYWebgl,
                 ~pixelStorei,
                 (),
               ),
             );
        (state, (unpackFlipYWebgl, pixelStorei));
      };
      describe("test basic material", () =>
        describe("test map", () => {
          test("should get the new texture", () => {
            let (state, material) =
              LightMaterialAPI.createLightMaterial(state^);
            let (state, map1) =
              BasicSourceTextureAPI.createBasicSourceTexture(state);
            let (state, map2) =
              BasicSourceTextureAPI.createBasicSourceTexture(state);
            let state =
              state
              |> LightMaterialAPI.setLightMaterialDiffuseMap(material, map2);
            let state =
              state
              |> LightMaterialAPI.setLightMaterialDiffuseMap(material, map1);

            LightMaterialAPI.unsafeGetLightMaterialDiffuseMap(material, state)
            |> expect == map1;
          });
          test("should bind the new texture", () => {
            let (state, gameObject1, _, material1, _, map1) =
              FrontRenderLightJobTool.prepareGameObjectWithCreatedDiffuseMap(
                sandbox,
                state^,
              );
            let (state, map2) =
              BasicSourceTextureAPI.createBasicSourceTexture(state);
            let (state, _, _, _) = CameraTool.createCameraGameObject(state);
            let bindTexture = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(~sandbox, ~bindTexture, ()),
                 );
            let state =
              state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
            let state =
              state |> LightMaterialAPI.setLightMaterialDiffuseMap(material1, map2);
            let state = state |> DirectorTool.runWithDefaultTime;
            bindTexture |> expect |> toCalledTwice;
          });
          describe("test update texture", () => {
            let _prepare = (map1, map2, state) => {
              let state =
                state |> RenderMaterialMapTool.setSource([map1, map2]);
              let (state, (unpackFlipYWebgl, pixelStorei)) =
                _prepareForUpdateTexture(state);
              (state, (map1, map2), (unpackFlipYWebgl, pixelStorei));
            };
            test("should bind the new texture", () => {
              let (state, gameObject1, _, material1, _, map1) =
                FrontRenderLightJobTool.prepareGameObjectWithCreatedDiffuseMap(
                  sandbox,
                  state^,
                );
              let (state, map2) =
                BasicSourceTextureAPI.createBasicSourceTexture(state);
              let (state, (map1, map2), (unpackFlipYWebgl, pixelStorei)) =
                _prepare(map1, map2, state);
              let state =
                state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
              let state =
                state |> LightMaterialAPI.setLightMaterialDiffuseMap(material1, map2);
              let state = state |> DirectorTool.runWithDefaultTime;
              pixelStorei
              |> withOneArg(unpackFlipYWebgl)
              |> expect
              |> toCalledTwice;
            });
            test("if new texture has already updated before, not update", () => {
              let (state, gameObject1, _, material1, _, map1) =
                FrontRenderLightJobTool.prepareGameObjectWithCreatedDiffuseMap(
                  sandbox,
                  state^,
                );
              let (state, gameObject2, _, material2, _, map2) =
                FrontRenderLightJobTool.prepareGameObjectWithCreatedDiffuseMap(
                  sandbox,
                  state,
                );
              let (state, (map1, map2), (unpackFlipYWebgl, pixelStorei)) =
                _prepare(map1, map2, state);
              let state =
                state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
              let state =
                state |> LightMaterialAPI.setLightMaterialDiffuseMap(material1, map2);
              let state = state |> DirectorTool.runWithDefaultTime;
              pixelStorei
              |> withOneArg(unpackFlipYWebgl)
              |> expect
              |> toCalledTwice;
            });
          });
        })
      );
      describe("test light material", () =>
        describe("test diffuseMap+specularMap", () => {
          test("should get the new texture", () => {
            let (state, material) =
              LightMaterialAPI.createLightMaterial(state^);
            let (state, map1) =
              BasicSourceTextureAPI.createBasicSourceTexture(state);
            let (state, map2) =
              BasicSourceTextureAPI.createBasicSourceTexture(state);
            let (state, map3) =
              BasicSourceTextureAPI.createBasicSourceTexture(state);
            let (state, map4) =
              BasicSourceTextureAPI.createBasicSourceTexture(state);
            let state =
              state
              |> LightMaterialAPI.setLightMaterialDiffuseMap(material, map2);
            let state =
              state
              |> LightMaterialAPI.setLightMaterialSpecularMap(material, map1);
            let state =
              state
              |> LightMaterialAPI.setLightMaterialSpecularMap(material, map3);
            let state =
              state
              |> LightMaterialAPI.setLightMaterialDiffuseMap(material, map4);
            (
              LightMaterialAPI.unsafeGetLightMaterialDiffuseMap(
                material,
                state,
              ),
              LightMaterialAPI.unsafeGetLightMaterialSpecularMap(
                material,
                state,
              ),
            )
            |> expect == (map4, map3);
          });
          test("should bind the new texture", () => {
            let (state, gameObject1, _, material1, _, (map1, map2)) =
              FrontRenderLightJobTool.prepareGameObjectWithCreatedMap(
                sandbox,
                state^,
              );
            let (state, map3) =
              BasicSourceTextureAPI.createBasicSourceTexture(state);
            let (state, map4) =
              BasicSourceTextureAPI.createBasicSourceTexture(state);
            let (state, _, _, _) = CameraTool.createCameraGameObject(state);
            let bindTexture = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(~sandbox, ~bindTexture, ()),
                 );
            let state =
              state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
            let state =
              state
              |> LightMaterialAPI.setLightMaterialSpecularMap(material1, map3);
            let state =
              state
              |> LightMaterialAPI.setLightMaterialDiffuseMap(material1, map4);
            let state = state |> DirectorTool.runWithDefaultTime;
            bindTexture |> getCallCount |> expect == 4;
          });
          describe("test update texture", () => {
            test("should bind the new texture", () => {
              let (state, gameObject1, _, material1, _, (map1, map2)) =
                FrontRenderLightJobTool.prepareGameObjectWithCreatedMap(
                  sandbox,
                  state^,
                );
              let (state, map3) =
                BasicSourceTextureAPI.createBasicSourceTexture(state);
              let (state, map4) =
                BasicSourceTextureAPI.createBasicSourceTexture(state);
              let (state, (unpackFlipYWebgl, pixelStorei)) =
                _prepareForUpdateTexture(state);
              let state =
                state
                |> RenderMaterialMapTool.setSource([map1, map2, map3, map4]);
              let state =
                state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
              let state =
                state
                |> LightMaterialAPI.setLightMaterialDiffuseMap(
                     material1,
                     map3,
                   );
              let state =
                state
                |> LightMaterialAPI.setLightMaterialSpecularMap(
                     material1,
                     map4,
                   );
              let state = state |> DirectorTool.runWithDefaultTime;
              pixelStorei
              |> withOneArg(unpackFlipYWebgl)
              |> getCallCount
              |> expect == 4;
            });
            test("if new texture has already updated before, not update", () => {
              let (state, gameObject1, _, material1, _, (map1, map2)) =
                FrontRenderLightJobTool.prepareGameObjectWithCreatedMap(
                  sandbox,
                  state^,
                );
              let (state, gameObject2, _, material2, _, (map3, map4)) =
                FrontRenderLightJobTool.prepareGameObjectWithCreatedMap(
                  sandbox,
                  state,
                );
              let state =
                state
                |> RenderMaterialMapTool.setSource([map1, map2, map3, map4]);
              let (state, (unpackFlipYWebgl, pixelStorei)) =
                _prepareForUpdateTexture(state);
              let state =
                state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
              let state =
                state
                |> LightMaterialAPI.setLightMaterialDiffuseMap(
                     material1,
                     map3,
                   );
              let state =
                state
                |> LightMaterialAPI.setLightMaterialSpecularMap(
                     material1,
                     map4,
                   );
              let state = state |> DirectorTool.runWithDefaultTime;
              pixelStorei
              |> withOneArg(unpackFlipYWebgl)
              |> getCallCount
              |> expect == 4;
            });
          });
        })
      );
    });
  });