open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "test init texture render worker job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => TestWorkerTool.clear(sandbox));
      describe(
        "init all textures",
        () => {
          let _prepare = () => {
            let imageDataArrayBuffer1 = Obj.magic(11);
            let imageDataArrayBuffer2 = Obj.magic(12);
            let (state, context) =
              InitTextureRenderWorkerTool.prepareState(
                sandbox,
                imageDataArrayBuffer1,
                imageDataArrayBuffer2
              );
            let (state, map1) = TextureAPI.createTexture(state);
            let (state, map2) = TextureAPI.createTexture(state);
            let source1 = TextureTool.buildSource(100, 200);
            let source2 = TextureTool.buildSource(110, 210);
            let state = state |> TextureAPI.setTextureSource(map1, source1);
            let state = state |> TextureAPI.setTextureSource(map2, source2);
            let state =
              state |> FakeGlWorkerTool.setFakeGl(FakeGlWorkerTool.buildFakeGl(~sandbox, ()));
            (
              state,
              context,
              (imageDataArrayBuffer1, imageDataArrayBuffer2),
              (map1, map2),
              (source1, source2)
            )
          };
          describe(
            "test init two textures",
            () => {
              describe(
                "test send init data to render worker",
                () =>
                  describe(
                    "send needAddedImageDataArray",
                    () =>
                      testPromise(
                        "convert source to imageData",
                        () => {
                          let (
                            state,
                            context,
                            (imageDataArrayBuffer1, imageDataArrayBuffer2),
                            (map1, map2),
                            (source1, source2)
                          ) =
                            _prepare();
                          let drawImage = context##drawImage;
                          let getImageData = context##getImageData;
                          MainInitJobMainWorkerTool.prepare()
                          |> MainInitJobMainWorkerTool.test(
                               sandbox,
                               (state) =>
                                 WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state),
                               (postMessageToRenderWorker) =>
                                 (
                                   postMessageToRenderWorker
                                   |> withOneArg(
                                        SendInitRenderDataWorkerTool.buildInitRenderData(
                                          ~textureData={
                                            "buffer": Sinon.matchAny,
                                            "index": 2,
                                            "needAddedImageDataArray": [|
                                              (
                                                imageDataArrayBuffer1,
                                                source1##width,
                                                source1##height,
                                                0
                                              ),
                                              (
                                                imageDataArrayBuffer2,
                                                source2##width,
                                                source2##height,
                                                1
                                              )
                                            |]
                                          },
                                          ()
                                        )
                                      )
                                   |> getCallCount,
                                   drawImage |> withThreeArgs(source1, 0., 0.) |> getCallCount,
                                   drawImage |> withThreeArgs(source2, 0., 0.) |> getCallCount,
                                   getImageData
                                   |> withFourArgs(0., 0., source1##width, source1##height)
                                   |> getCallCount,
                                   getImageData
                                   |> withFourArgs(0., 0., source2##width, source2##height)
                                   |> getCallCount
                                 )
                                 |> expect == (1, 1, 1, 1, 1)
                             )
                        }
                      )
                  )
              );
              describe(
                "test render worker job",
                () => {
                  beforeAllPromise(() => TextureRenderWorkerTool.buildFakeCreateImageBitmapFunc());
                  afterAllPromise(() => TextureRenderWorkerTool.clearFakeCreateImageBitmapFunc());
                  describe(
                    "add source to sourceMap",
                    () => {
                      /* TODO test not flipY */
                      testPromise(
                        "test for chrome",
                        () => {
                          let (
                            state,
                            context,
                            (imageDataArrayBuffer1, imageDataArrayBuffer2),
                            (map1, map2),
                            (source1, source2)
                          ) =
                            _prepare();
                          BrowserDetectTool.setChrome();
                          RenderJobsRenderWorkerTool.init(
                            (state) =>
                              (
                                TextureRenderWorkerTool.unsafeGetSource(
                                  map1,
                                  RenderWorkerStateTool.unsafeGetState()
                                )
                                |> Obj.magic,
                                TextureRenderWorkerTool.unsafeGetSource(
                                  map2,
                                  RenderWorkerStateTool.unsafeGetState()
                                )
                                |> Obj.magic
                              )
                              |>
                              expect == (
                                          [|
                                            imageDataArrayBuffer1,
                                            source1##width,
                                            source1##height,
                                            {"imageOrientation": "flipY"} |> Obj.magic
                                          |],
                                          [|
                                            imageDataArrayBuffer2,
                                            source2##width,
                                            source2##height,
                                            {"imageOrientation": "flipY"} |> Obj.magic
                                          |]
                                        )
                              |> resolve,
                            state
                          )
                        }
                      );
                      testPromise(
                        "test for firefox",
                        () => {
                          let (
                            state,
                            context,
                            (imageDataArrayBuffer1, imageDataArrayBuffer2),
                            (map1, map2),
                            (source1, source2)
                          ) =
                            _prepare();
                          BrowserDetectTool.setFirefox();
                          RenderJobsRenderWorkerTool.init(
                            (state) =>
                              (
                                TextureRenderWorkerTool.unsafeGetSource(
                                  map1,
                                  RenderWorkerStateTool.unsafeGetState()
                                )
                                |> Obj.magic,
                                TextureRenderWorkerTool.unsafeGetSource(
                                  map2,
                                  RenderWorkerStateTool.unsafeGetState()
                                )
                                |> Obj.magic
                              )
                              |>
                              expect == (
                                          [|
                                            imageDataArrayBuffer1,
                                            source1##width,
                                            source1##height,
                                            Js.Undefined.empty |> Obj.magic
                                          |],
                                          [|
                                            imageDataArrayBuffer2,
                                            source2##width,
                                            source2##height,
                                            Js.Undefined.empty |> Obj.magic
                                          |]
                                        )
                              |> resolve,
                            state
                          )
                        }
                      )
                    }
                  );
                  describe(
                    "create gl texture",
                    () =>
                      testPromise(
                        "test create",
                        () => {
                          let (
                            state,
                            context,
                            (imageDataArrayBuffer1, imageDataArrayBuffer2),
                            (map1, map2),
                            (source1, source2)
                          ) =
                            _prepare();
                          let createTexture = createEmptyStubWithJsObjSandbox(sandbox);
                          let state =
                            state
                            |> FakeGlWorkerTool.setFakeGl(
                                 FakeGlWorkerTool.buildFakeGl(~sandbox, ~createTexture, ())
                               );
                          BrowserDetectTool.setChrome();
                          RenderJobsRenderWorkerTool.init(
                            (state) => createTexture |> expect |> toCalledTwice |> resolve,
                            state
                          )
                        }
                      )
                  )
                }
              )
            }
          )
        }
      )
    }
  );