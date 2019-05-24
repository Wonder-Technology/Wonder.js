open Wonder_jest;

open Js.Promise;

let _ =
  describe("test init texture render worker job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => TestWorkerTool.clear(sandbox));

    describe("init all textures", () => {
      let _prepareForBasicSourceTexture = () => {
        let (
          state,
          context,
          (
            imageDataArrayBuffer1,
            imageDataArrayBuffer2,
            imageDataArrayBuffer3,
            imageDataArrayBuffer4,
          ),
          (map1, map2),
          (source1, source2),
        ) =
          BasicSourceTextureRenderWorkerTool.prepareStateAndCreateTwoMaps(
            sandbox,
          );
        let state =
          state
          |> FakeGlWorkerTool.setFakeGl(
               FakeGlWorkerTool.buildFakeGl(~sandbox, ()),
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
          (map1, map2),
          (source1, source2),
        );
      };
      let _prepareForArrayBufferViewSourceTexture = () => {
        let (state, (map1, map2), (source1, source2)) =
          ArrayBufferViewSourceTextureRenderWorkerTool.prepareStateAndCreateTwoMaps(
            sandbox,
          );
        let state =
          state
          |> FakeGlWorkerTool.setFakeGl(
               FakeGlWorkerTool.buildFakeGl(~sandbox, ()),
             );
        (state, (map1, map2), (source1, source2));
      };
      describe("test init two textures", () => {
        describe("test send init data to render worker", () => {
          let _initTwoGameObjects = (map1, map2, state) => {
            let (state, gameObject1, material1) =
              BasicMaterialTool.createGameObject(state);
            let (state, gameObject2, material2) =
              BasicMaterialTool.createGameObject(state);
            let state =
              state |> BasicMaterialAPI.setBasicMaterialMap(material1, map1);
            let state =
              state |> BasicMaterialAPI.setBasicMaterialMap(material2, map2);
            let state = GameObjectAPI.initGameObject(gameObject1, state);
            let state = GameObjectAPI.initGameObject(gameObject2, state);
            state;
          };
          describe("contract check", () => {
            testPromise(
              "basicSourceTextureRecord->needInitedTextureIndexArray should be empty",
              () => {
              let (
                state,
                context,
                (
                  imageDataArrayBuffer1,
                  imageDataArrayBuffer2,
                  imageDataArrayBuffer3,
                  imageDataArrayBuffer4,
                ),
                (map1, map2),
                (source1, source2),
              ) =
                _prepareForBasicSourceTexture();
              let state = _initTwoGameObjects(map1, map2, state);
              MainStateTool.setState(state);
              MainInitJobMainWorkerTool.prepare()
              |> MainInitJobMainWorkerTool.test(
                   sandbox,
                   state =>
                     WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(
                       state,
                     ),
                   postMessageToRenderWorker =>
                     fail("should error before") |> resolve,
                 )
              |> PromiseTool.judgeErrorMessage(
                   "basicSourceTextureRecord->needInitedTextureIndexArray should be empty, but actual is 0,1",
                 );
            });
            testPromise(
              "arrayBufferViewSourceTextureRecord->needInitedTextureIndexArray should be empty",
              () => {
                let (state, (map1, map2), (source1, source2)) =
                  _prepareForArrayBufferViewSourceTexture();
                let state = _initTwoGameObjects(map1, map2, state);
                MainStateTool.setState(state);
                MainInitJobMainWorkerTool.prepare()
                |> MainInitJobMainWorkerTool.test(
                     sandbox,
                     state =>
                       WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(
                         state,
                       ),
                     postMessageToRenderWorker =>
                       fail("should error before") |> resolve,
                   )
                |> PromiseTool.judgeErrorMessage(
                     "arrayBufferViewSourceTextureRecord->needInitedTextureIndexArray should be empty, but actual is 50,51",
                   );
              },
            );
          });

          describe("test basic source texture", () => {
            describe("send needAddedImageDataArray", () => {
              testPromise("convert source to imageData", () => {
                let (
                  state,
                  context,
                  (
                    imageDataArrayBuffer1,
                    imageDataArrayBuffer2,
                    imageDataArrayBuffer3,
                    imageDataArrayBuffer4,
                  ),
                  (map1, map2),
                  (source1, source2),
                ) =
                  _prepareForBasicSourceTexture();
                let drawImage = context##drawImage;
                let getImageData = context##getImageData;
                MainInitJobMainWorkerTool.prepare()
                |> MainInitJobMainWorkerTool.test(
                     sandbox,
                     state =>
                       WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(
                         state,
                       ),
                     postMessageToRenderWorker =>
                       (
                         postMessageToRenderWorker
                         |> withOneArg(
                              SendInitRenderDataWorkerTool.buildInitRenderData(
                                ~textureData={
                                  "buffer": Sinon.matchAny,
                                  "basicSourceTextureData": {
                                    "index": 2,
                                    "needAddedImageDataArray": [|
                                      (
                                        imageDataArrayBuffer1,
                                        source1##width,
                                        source1##height,
                                        0,
                                      ),
                                      (
                                        imageDataArrayBuffer2,
                                        source2##width,
                                        source2##height,
                                        1,
                                      ),
                                    |],
                                  },
                                  "arrayBufferViewSourceTextureData": Sinon.matchAny,
                                },
                                (),
                              ),
                            )
                         |> getCallCount,
                         drawImage
                         |> withThreeArgs(source1, 0., 0.)
                         |> getCallCount,
                         drawImage
                         |> withThreeArgs(source2, 0., 0.)
                         |> getCallCount,
                         getImageData
                         |> withFourArgs(
                              0.,
                              0.,
                              source1##width,
                              source1##height,
                            )
                         |> getCallCount,
                         getImageData
                         |> withFourArgs(
                              0.,
                              0.,
                              source2##width,
                              source2##height,
                            )
                         |> getCallCount,
                       )
                       |> expect == (1, 1, 1, 1, 1),
                   );
              });

              describe("fix bug", () =>
                testPromise("shouldn't convert undefined source", () => {
                  let (
                    state,
                    context,
                    (
                      imageDataArrayBuffer1,
                      imageDataArrayBuffer2,
                      imageDataArrayBuffer3,
                      imageDataArrayBuffer4,
                    ),
                    (map1, map2),
                    (source1, source2),
                  ) =
                    _prepareForBasicSourceTexture();
                  let state =
                    state
                    |> BasicSourceTextureAPI.setBasicSourceTextureSource(
                         Js.Nullable.undefined |> Obj.magic,
                         Js.Nullable.undefined |> Obj.magic,
                       );

                  let drawImage = context##drawImage;
                  let getImageData = context##getImageData;
                  MainInitJobMainWorkerTool.prepare()
                  |> MainInitJobMainWorkerTool.test(
                       sandbox,
                       state =>
                         WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(
                           state,
                         ),
                       postMessageToRenderWorker =>
                         postMessageToRenderWorker
                         |> withOneArg(
                              SendInitRenderDataWorkerTool.buildInitRenderData(
                                ~textureData={
                                  "buffer": Sinon.matchAny,
                                  "basicSourceTextureData": {
                                    "index": 2,
                                    "needAddedImageDataArray": [|
                                      (
                                        imageDataArrayBuffer1,
                                        source1##width,
                                        source1##height,
                                        0,
                                      ),
                                      (
                                        imageDataArrayBuffer2,
                                        source2##width,
                                        source2##height,
                                        1,
                                      ),
                                    |],
                                  },
                                  "arrayBufferViewSourceTextureData": Sinon.matchAny,
                                },
                                (),
                              ),
                            )
                         |> getCallCount
                         |> expect == 1,
                     );
                })
              );
            });
            testPromise(
              "clear basicSourceTextureRecord->needAddedSourceArray, needInitedTextureIndexArray after send",
              () => {
                open BasicSourceTextureType;
                let (
                  state,
                  context,
                  (
                    imageDataArrayBuffer1,
                    imageDataArrayBuffer2,
                    imageDataArrayBuffer3,
                    imageDataArrayBuffer4,
                  ),
                  (map1, map2),
                  (source1, source2),
                ) =
                  _prepareForBasicSourceTexture();
                TestMainWorkerTool.closeContractCheck();
                let state = _initTwoGameObjects(map1, map2, state);
                MainInitJobMainWorkerTool.prepare()
                |> MainInitJobMainWorkerTool.test(
                     sandbox,
                     state =>
                       WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(
                         state,
                       ),
                     postMessageToRenderWorker => {
                       let state = MainStateTool.unsafeGetState();
                       let {needAddedSourceArray, needInitedTextureIndexArray} =
                         BasicSourceTextureTool.getRecord(state);
                       (
                         needAddedSourceArray |> Js.Array.length,
                         needInitedTextureIndexArray |> Js.Array.length,
                       )
                       |> expect == (0, 0);
                     },
                   );
              },
            );
          });

          describe("test arrayBufferView source texture", () => {
            describe("send sourceMap", () =>
              testPromise("test", () => {
                let (state, (map1, map2), (source1, source2)) =
                  _prepareForArrayBufferViewSourceTexture();
                MainStateTool.setState(state);
                MainInitJobMainWorkerTool.prepare()
                |> MainInitJobMainWorkerTool.test(
                     sandbox,
                     state =>
                       WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(
                         state,
                       ),
                     postMessageToRenderWorker =>
                       postMessageToRenderWorker
                       |> withOneArg(
                            SendInitRenderDataWorkerTool.buildInitRenderData(
                              ~textureData={
                                "buffer": Sinon.matchAny,
                                "arrayBufferViewSourceTextureData": {
                                  "index": 2,
                                  "sourceMap":
                                    WonderCommonlib.MutableSparseMapService.createEmpty()
                                    |> WonderCommonlib.MutableSparseMapService.set(
                                         map1,
                                         source1,
                                       )
                                    |> WonderCommonlib.MutableSparseMapService.set(
                                         map2,
                                         source2,
                                       ),
                                },
                                "basicSourceTextureData": Sinon.matchAny,
                              },
                              (),
                            ),
                          )
                       |> getCallCount
                       |> expect == 1,
                   );
              })
            );
            testPromise(
              "clear arrayBufferViewSourceTextureRecord->needAddedSourceArray, needInitedTextureIndexArray after send",
              () => {
                open ArrayBufferViewSourceTextureType;
                let (state, (map1, map2), (source1, source2)) =
                  _prepareForArrayBufferViewSourceTexture();
                TestMainWorkerTool.closeContractCheck();
                let state = _initTwoGameObjects(map1, map2, state);
                MainInitJobMainWorkerTool.prepare()
                |> MainInitJobMainWorkerTool.test(
                     sandbox,
                     state =>
                       WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(
                         state,
                       ),
                     postMessageToRenderWorker => {
                       let state = MainStateTool.unsafeGetState();
                       let {needInitedTextureIndexArray} =
                         ArrayBufferViewSourceTextureTool.getRecord(state);
                       needInitedTextureIndexArray
                       |> Js.Array.length
                       |> expect == 0;
                     },
                   );
              },
            );
          });
        });

        describe("test render worker job", () => {
          describe("test basic source texture", () => {
            beforeAllPromise(() =>
              BasicSourceTextureRenderWorkerTool.buildFakeCreateImageBitmapFunc()
            );
            afterAllPromise(() =>
              BasicSourceTextureRenderWorkerTool.clearFakeCreateImageBitmapFunc()
            );

            describe("add source to sourceMap", () => {
              describe("test for chrome", () => {
                testPromise("test flipY", () => {
                  let (
                    state,
                    context,
                    (
                      imageDataArrayBuffer1,
                      imageDataArrayBuffer2,
                      imageDataArrayBuffer3,
                      imageDataArrayBuffer4,
                    ),
                    (map1, map2),
                    (source1, source2),
                  ) =
                    _prepareForBasicSourceTexture();
                  let state =
                    state
                    |> BasicSourceTextureAPI.setBasicSourceTextureFlipY(
                         map1,
                         true,
                       )
                    |> BasicSourceTextureAPI.setBasicSourceTextureFlipY(
                         map2,
                         true,
                       );
                  BrowserDetectTool.setChrome();

                  RenderJobsRenderWorkerTool.init(
                    state =>
                      (
                        BasicSourceTextureRenderWorkerTool.unsafeGetSource(
                          map1,
                          RenderWorkerStateTool.unsafeGetState(),
                        )
                        |> Obj.magic,
                        BasicSourceTextureRenderWorkerTool.unsafeGetSource(
                          map2,
                          RenderWorkerStateTool.unsafeGetState(),
                        )
                        |> Obj.magic,
                      )
                      |> expect
                      == (
                           [|
                             imageDataArrayBuffer1,
                             source1##width,
                             source1##height,
                             {"imageOrientation": "flipY"} |> Obj.magic,
                           |],
                           [|
                             imageDataArrayBuffer2,
                             source2##width,
                             source2##height,
                             {"imageOrientation": "flipY"} |> Obj.magic,
                           |],
                         )
                      |> resolve,
                    state,
                  );
                });

                testPromise("test not flipY", () => {
                  let (
                    state,
                    context,
                    (
                      imageDataArrayBuffer1,
                      imageDataArrayBuffer2,
                      imageDataArrayBuffer3,
                      imageDataArrayBuffer4,
                    ),
                    (map1, map2),
                    (source1, source2),
                  ) =
                    _prepareForBasicSourceTexture();
                  let state =
                    state
                    |> BasicSourceTextureAPI.setBasicSourceTextureFlipY(
                         map1,
                         false,
                       )
                    |> BasicSourceTextureAPI.setBasicSourceTextureFlipY(
                         map2,
                         false,
                       );
                  BrowserDetectTool.setChrome();

                  RenderJobsRenderWorkerTool.init(
                    state =>
                      (
                        BasicSourceTextureRenderWorkerTool.unsafeGetSource(
                          map1,
                          RenderWorkerStateTool.unsafeGetState(),
                        )
                        |> Obj.magic,
                        BasicSourceTextureRenderWorkerTool.unsafeGetSource(
                          map2,
                          RenderWorkerStateTool.unsafeGetState(),
                        )
                        |> Obj.magic,
                      )
                      |> expect
                      == (
                           [|
                             imageDataArrayBuffer1,
                             source1##width,
                             source1##height,
                             {"imageOrientation": "none"} |> Obj.magic,
                           |],
                           [|
                             imageDataArrayBuffer2,
                             source2##width,
                             source2##height,
                             {"imageOrientation": "none"} |> Obj.magic,
                           |],
                         )
                      |> resolve,
                    state,
                  );
                });
              });
              testPromise("test for firefox", () => {
                let (
                  state,
                  context,
                  (
                    imageDataArrayBuffer1,
                    imageDataArrayBuffer2,
                    imageDataArrayBuffer3,
                    imageDataArrayBuffer4,
                  ),
                  (map1, map2),
                  (source1, source2),
                ) =
                  _prepareForBasicSourceTexture();
                BrowserDetectTool.setFirefox();
                RenderJobsRenderWorkerTool.init(
                  state =>
                    (
                      BasicSourceTextureRenderWorkerTool.unsafeGetSource(
                        map1,
                        RenderWorkerStateTool.unsafeGetState(),
                      )
                      |> Obj.magic,
                      BasicSourceTextureRenderWorkerTool.unsafeGetSource(
                        map2,
                        RenderWorkerStateTool.unsafeGetState(),
                      )
                      |> Obj.magic,
                    )
                    |> expect
                    == (
                         [|
                           imageDataArrayBuffer1,
                           source1##width,
                           source1##height,
                           Js.Undefined.empty |> Obj.magic,
                         |],
                         [|
                           imageDataArrayBuffer2,
                           source2##width,
                           source2##height,
                           Js.Undefined.empty |> Obj.magic,
                         |],
                       )
                    |> resolve,
                  state,
                );
              });
            });

            describe("init added textures", () =>
              testPromise("test create gl texture", () => {
                let (
                  state,
                  context,
                  (
                    imageDataArrayBuffer1,
                    imageDataArrayBuffer2,
                    imageDataArrayBuffer3,
                    imageDataArrayBuffer4,
                  ),
                  (map1, map2),
                  (source1, source2),
                ) =
                  _prepareForBasicSourceTexture();
                let createTexture = createEmptyStubWithJsObjSandbox(sandbox);
                let state =
                  state
                  |> FakeGlWorkerTool.setFakeGl(
                       FakeGlWorkerTool.buildFakeGl(
                         ~sandbox,
                         ~createTexture,
                         (),
                       ),
                     );
                BrowserDetectTool.setChrome();
                RenderJobsRenderWorkerTool.init(
                  state => createTexture |> expect |> toCalledTwice |> resolve,
                  state,
                );
              })
            );
          });

          describe("test arrayBufferView source texture", () => {
            describe("add source map", () =>
              testPromise("test", () => {
                let (state, (map1, map2), (source1, source2)) =
                  _prepareForArrayBufferViewSourceTexture();
                RenderJobsRenderWorkerTool.init(
                  state =>
                    (
                      ArrayBufferViewSourceTextureRenderWorkerTool.unsafeGetSource(
                        map1,
                        RenderWorkerStateTool.unsafeGetState(),
                      )
                      |> Obj.magic,
                      ArrayBufferViewSourceTextureRenderWorkerTool.unsafeGetSource(
                        map2,
                        RenderWorkerStateTool.unsafeGetState(),
                      )
                      |> Obj.magic,
                    )
                    |> expect == (source1, source2)
                    |> resolve,
                  state,
                );
              })
            );
            describe("create gl texture", () =>
              testPromise("test create", () => {
                let (state, (map1, map2), (source1, source2)) =
                  _prepareForArrayBufferViewSourceTexture();
                let createTexture = createEmptyStubWithJsObjSandbox(sandbox);
                let state =
                  state
                  |> FakeGlWorkerTool.setFakeGl(
                       FakeGlWorkerTool.buildFakeGl(
                         ~sandbox,
                         ~createTexture,
                         (),
                       ),
                     );
                RenderJobsRenderWorkerTool.init(
                  state => createTexture |> expect |> toCalledTwice |> resolve,
                  state,
                );
              })
            );
          });
        });
      });
    });
  });