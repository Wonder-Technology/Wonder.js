open Wonder_jest;

let _ =
  describe(
    "hot change texture",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(CreateStateMainService.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            RenderJobsTool.initWithJobConfig(sandbox, LoopRenderJobTool.buildNoWorkerJobConfig())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test change texture",
        () =>
          describe(
            "test basic material",
            () =>
              describe(
                "test map",
                () => {
                  test(
                    "should get the new texture",
                    () => {
                      let (state, material) = BasicMaterialAPI.createBasicMaterial(state^);
                      let (state, map1) = TextureAPI.createTexture(state);
                      let (state, map2) = TextureAPI.createTexture(state);
                      let state = state |> BasicMaterialAPI.setBasicMaterialMap(material, map2);
                      let state = state |> BasicMaterialAPI.setBasicMaterialMap(material, map1);
                      BasicMaterialAPI.unsafeGetBasicMaterialMap(material, state) |> expect == map1
                    }
                  );
                  test(
                    "should bind the new texture",
                    () => {
                      let (state, gameObject1, _, material1, _, map1) =
                        RenderBasicJobTool.prepareGameObjectWithMap(sandbox, state^);
                      let (state, map2) = TextureAPI.createTexture(state);
                      let (state, _, _, _) = CameraTool.createCameraGameObject(state);
                      let bindTexture = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~bindTexture, ()));
                      let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                      let state = state |> BasicMaterialAPI.setBasicMaterialMap(material1, map2);
                      let state = state |> DirectorTool.runWithDefaultTime;
                      bindTexture |> expect |> toCalledTwice
                    }
                  );
                  describe(
                    "test update texture",
                    () => {
                      let _prepare = (map1, map2, state) => {
                        let source1 = TextureTool.buildSource(10, 20);
                        let state = state |> TextureAPI.setTextureSource(map1, source1);
                        let (state, map2) = TextureAPI.createTexture(state);
                        let source2 = TextureTool.buildSource(40, 30);
                        let state = state |> TextureAPI.setTextureSource(map2, source2);
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
                                 ()
                               )
                             );
                        (state, (map1, map2), (unpackFlipYWebgl, pixelStorei))
                      };
                      test(
                        "should bind the new texture",
                        () => {
                          let (state, gameObject1, _, material1, _, map1) =
                            RenderBasicJobTool.prepareGameObjectWithMap(sandbox, state^);
                          let (state, map2) = TextureAPI.createTexture(state);
                          let (state, (map1, map2), (unpackFlipYWebgl, pixelStorei)) =
                            _prepare(map1, map2, state);
                          let state =
                            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                          let state =
                            state |> BasicMaterialAPI.setBasicMaterialMap(material1, map2);
                          let state = state |> DirectorTool.runWithDefaultTime;
                          pixelStorei |> withOneArg(unpackFlipYWebgl) |> expect |> toCalledTwice
                        }
                      );
                      test(
                        "if new texture has already updated before, not update",
                        () => {
                          let (state, gameObject1, _, material1, _, map1) =
                            RenderBasicJobTool.prepareGameObjectWithMap(sandbox, state^);
                          let (state, gameObject2, _, material2, _, map2) =
                            RenderBasicJobTool.prepareGameObjectWithMap(sandbox, state);
                          let (state, (map1, map2), (unpackFlipYWebgl, pixelStorei)) =
                            _prepare(map1, map2, state);
                          let state =
                            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
                          let state =
                            state |> BasicMaterialAPI.setBasicMaterialMap(material1, map2);
                          let state = state |> DirectorTool.runWithDefaultTime;
                          pixelStorei |> withOneArg(unpackFlipYWebgl) |> expect |> toCalledTwice
                        }
                      )
                    }
                  )
                }
              )
          )
      )
    }
  );