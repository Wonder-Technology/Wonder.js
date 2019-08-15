open Wonder_jest;

open Js.Promise;

let _ =
  describe("hot change texture with render worker", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test change texture", () =>
      describe("test light material", () => {
        describe("test basic source texture", () =>
          describe("test map", () => {
            let _prepare = () => {
              let (
                state,
                context,
                (
                  imageDataArrayBuffer1,
                  imageDataArrayBuffer2,
                  imageDataArrayBuffer3,
                  imageDataArrayBuffer4,
                ),
                (gameObject1, gameObject2),
                (map1, map2),
                (source1, source2),
              ) =
                BasicSourceTextureRenderWorkerTool.prepareStateAndCreateTwoGameObjects(
                  sandbox,
                );
              let bindTexture = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlWorkerTool.setFakeGl(
                     FakeGlWorkerTool.buildFakeGl(~sandbox, ~bindTexture, ()),
                   );
              (
                state,
                context,
                (
                  imageDataArrayBuffer1,
                  imageDataArrayBuffer2,
                  imageDataArrayBuffer3,
                  imageDataArrayBuffer4,
                ),
                (gameObject1, gameObject2),
                (map1, map2),
                (source1, source2),
                bindTexture,
              );
            };
            beforeAllPromise(() =>
              BasicSourceTextureRenderWorkerTool.buildFakeCreateImageBitmapFunc()
            );
            afterAllPromise(() =>
              BasicSourceTextureRenderWorkerTool.clearFakeCreateImageBitmapFunc()
            );
            testPromise(
              /* "if the new texture if cached before, not bind", */
              "not cache texture", () => {
              let (
                state,
                context,
                (
                  imageDataArrayBuffer1,
                  imageDataArrayBuffer2,
                  imageDataArrayBuffer3,
                  imageDataArrayBuffer4,
                ),
                (gameObject1, gameObject2),
                (map1, map2),
                (source1, source2),
                bindTexture,
              ) =
                _prepare();
              let state = state |> BrowserDetectTool.setChrome;
              RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                ~state,
                ~sandbox,
                ~completeFunc=
                  _ => {
                    let state = MainStateTool.unsafeGetState();
                    let material1 =
                      GameObjectAPI.unsafeGetGameObjectLightMaterialComponent(
                        gameObject1,
                        state,
                      );
                    let state =
                      state
                      |> LightMaterialAPI.setLightMaterialDiffuseMap(
                           material1,
                           map2,
                         );
                    RenderJobsRenderWorkerTool.mainLoopAndRender(
                      ~state,
                      ~sandbox,
                      ~completeFunc=
                        _ =>
                          bindTexture
                          |> getCallCount
                          |> expect == 2
                          * 2
                          |> resolve,
                      (),
                    );
                  },
                (),
              );
            });
          })
        );

        describe("test arrayBufferView source texture", () =>
          describe("test map", () => {
            let _prepare = () => {
              let (
                state,
                (gameObject1, gameObject2),
                (map1, map2),
                (source1, source2),
              ) =
                ArrayBufferViewSourceTextureRenderWorkerTool.prepareStateAndCreateTwoGameObjects(
                  sandbox,
                );
              let bindTexture = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlWorkerTool.setFakeGl(
                     FakeGlWorkerTool.buildFakeGl(~sandbox, ~bindTexture, ()),
                   );
              (
                state,
                (gameObject1, gameObject2),
                (map1, map2),
                (source1, source2),
                bindTexture,
              );
            };
            /* testPromise("if the new texture if cached before, not bind", () => { */
            testPromise("not cache texture", () => {
              let (
                state,
                (gameObject1, gameObject2),
                (map1, map2),
                (source1, source2),
                bindTexture,
              ) =
                _prepare();
              let state = state |> BrowserDetectTool.setChrome;
              RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                ~state,
                ~sandbox,
                ~completeFunc=
                  _ => {
                    let state = MainStateTool.unsafeGetState();
                    let material1 =
                      GameObjectAPI.unsafeGetGameObjectLightMaterialComponent(
                        gameObject1,
                        state,
                      );
                    let state =
                      state
                      |> LightMaterialAPI.setLightMaterialDiffuseMap(
                           material1,
                           map2,
                         );
                    RenderJobsRenderWorkerTool.mainLoopAndRender(
                      ~state,
                      ~sandbox,
                      ~completeFunc=
                        _ =>
                          bindTexture
                          |> getCallCount
                          |> expect == 2
                          * 2
                          |> resolve,
                      (),
                    );
                  },
                (),
              );
            });
          })
        );
      })
    );
  });