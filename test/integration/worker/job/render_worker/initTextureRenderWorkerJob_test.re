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

      let _prepareForCubemapTexture = () => {
        let (
          state,
          context,
          (
            imageDataArrayBuffer1,
            imageDataArrayBuffer2,
            imageDataArrayBuffer3,
            imageDataArrayBuffer4,
            imageDataArrayBuffer5,
            imageDataArrayBuffer6,
            imageDataArrayBuffer7,
            imageDataArrayBuffer8,
            imageDataArrayBuffer9,
            imageDataArrayBuffer10,
            imageDataArrayBuffer11,
            imageDataArrayBuffer12,
          ),
          (map1, map2),
          (allSource1, allSource2),
        ) =
          CubemapTextureRenderWorkerTool.prepareStateAndCreateTwoMaps(
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
            imageDataArrayBuffer5,
            imageDataArrayBuffer6,
            imageDataArrayBuffer7,
            imageDataArrayBuffer8,
            imageDataArrayBuffer9,
            imageDataArrayBuffer10,
            imageDataArrayBuffer11,
            imageDataArrayBuffer12,
          ),
          (map1, map2),
          (allSource1, allSource2),
        );
      };

      describe("test init two textures", () => {
        describe("test send init data to render worker", () => {
          describe("test source texture", () => {
            let _initTwoGameObjects = (map1, map2, state) => {
              let (state, gameObject1, material1) =
                LightMaterialTool.createGameObject(state);
              let (state, gameObject2, material2) =
                LightMaterialTool.createGameObject(state);
              let state =
                state
                |> LightMaterialAPI.setLightMaterialDiffuseMap(
                     material1,
                     map1,
                   );
              let state =
                state
                |> LightMaterialAPI.setLightMaterialDiffuseMap(
                     material2,
                     map2,
                   );
              let state = GameObjectAPI.initGameObject(gameObject1, state);
              let state = GameObjectAPI.initGameObject(gameObject2, state);
              state;
            };

            describe("test basic source texture", () => {
              describe("contract check", () =>
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
                })
              );

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
                                  ~textureData=
                                    SendInitRenderDataWorkerTool.buildTextureData(
                                      ~basicSourceTextureData={
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
                                      (),
                                    ),
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
                                  ~textureData=
                                    SendInitRenderDataWorkerTool.buildTextureData(
                                      ~basicSourceTextureData={
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
                                      (),
                                    ),
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
                         let {
                           needAddedSourceArray,
                           needInitedTextureIndexArray,
                         } =
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
              describe("contract check", () =>
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
                         "arrayBufferViewSourceTextureRecord->needInitedTextureIndexArray should be empty",
                       );
                  },
                )
              );

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
                                ~textureData=
                                  SendInitRenderDataWorkerTool.buildTextureData(
                                    ~arrayBufferViewSourceTextureData={
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
                                    (),
                                  ),
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

          describe("test cubemap texture", () => {
            describe("contract check", () =>
              testPromise(
                "cubemapTextureRecord->needInitedTextureIndexArray should be empty",
                () => {
                let (
                  state,
                  context,
                  (
                    imageDataArrayBuffer1,
                    imageDataArrayBuffer2,
                    imageDataArrayBuffer3,
                    imageDataArrayBuffer4,
                    imageDataArrayBuffer5,
                    imageDataArrayBuffer6,
                    imageDataArrayBuffer7,
                    imageDataArrayBuffer8,
                    imageDataArrayBuffer9,
                    imageDataArrayBuffer10,
                    imageDataArrayBuffer11,
                    imageDataArrayBuffer12,
                  ),
                  (map1, map2),
                  (allSource1, allSource2),
                ) =
                  _prepareForCubemapTexture();
                let state =
                  state
                  |> CubemapTextureAPI.initCubemapTexture(map1)
                  |> CubemapTextureAPI.initCubemapTexture(map2);
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
                     "cubemapTextureRecord->needInitedTextureIndexArray should be empty, but actual is 0,1",
                   );
              })
            );

            describe("send needAddedImageDataArray", () =>
              testPromise("convert source to imageData", () => {
                let (
                  state,
                  context,
                  (
                    imageDataArrayBuffer1,
                    imageDataArrayBuffer2,
                    imageDataArrayBuffer3,
                    imageDataArrayBuffer4,
                    imageDataArrayBuffer5,
                    imageDataArrayBuffer6,
                    imageDataArrayBuffer7,
                    imageDataArrayBuffer8,
                    imageDataArrayBuffer9,
                    imageDataArrayBuffer10,
                    imageDataArrayBuffer11,
                    imageDataArrayBuffer12,
                  ),
                  (map1, map2),
                  (
                    (
                      pxSource1,
                      nxSource1,
                      pySource1,
                      nySource1,
                      pzSource1,
                      nzSource1,
                    ),
                    (
                      pxSource2,
                      nxSource2,
                      pySource2,
                      nySource2,
                      pzSource2,
                      nzSource2,
                    ),
                  ),
                ) =
                  _prepareForCubemapTexture();
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
                                ~textureData=
                                  SendInitRenderDataWorkerTool.buildTextureData(
                                    ~cubemapTextureData={
                                      "buffer":
                                        CubemapTextureTool.getRecord(state).
                                          buffer,
                                      "index": 2,
                                      "needAddedPXImageDataArray": [|
                                        (
                                          imageDataArrayBuffer1,
                                          pxSource1##width,
                                          pxSource1##height,
                                          0,
                                        ),
                                        (
                                          imageDataArrayBuffer2,
                                          pxSource2##width,
                                          pxSource2##height,
                                          1,
                                        ),
                                      |],
                                      "needAddedNXImageDataArray": [|
                                        (
                                          imageDataArrayBuffer3,
                                          nxSource1##width,
                                          nxSource1##height,
                                          0,
                                        ),
                                        (
                                          imageDataArrayBuffer4,
                                          nxSource2##width,
                                          nxSource2##height,
                                          1,
                                        ),
                                      |],
                                      "needAddedPYImageDataArray": [|
                                        (
                                          imageDataArrayBuffer5,
                                          pySource1##width,
                                          pySource1##height,
                                          0,
                                        ),
                                        (
                                          imageDataArrayBuffer6,
                                          pySource2##width,
                                          pySource2##height,
                                          1,
                                        ),
                                      |],
                                      "needAddedNYImageDataArray": [|
                                        (
                                          imageDataArrayBuffer7,
                                          nySource1##width,
                                          nySource1##height,
                                          0,
                                        ),
                                        (
                                          imageDataArrayBuffer8,
                                          nySource2##width,
                                          nySource2##height,
                                          1,
                                        ),
                                      |],
                                      "needAddedPZImageDataArray": [|
                                        (
                                          imageDataArrayBuffer9,
                                          pzSource1##width,
                                          pzSource1##height,
                                          0,
                                        ),
                                        (
                                          imageDataArrayBuffer10,
                                          pzSource2##width,
                                          pzSource2##height,
                                          1,
                                        ),
                                      |],
                                      "needAddedNZImageDataArray": [|
                                        (
                                          imageDataArrayBuffer11,
                                          nzSource1##width,
                                          nzSource1##height,
                                          0,
                                        ),
                                        (
                                          imageDataArrayBuffer12,
                                          nzSource2##width,
                                          nzSource2##height,
                                          1,
                                        ),
                                      |],
                                    },
                                    (),
                                  ),
                                (),
                              ),
                            )
                         |> getCallCount,
                         drawImage
                         |> withThreeArgs(pxSource1, 0., 0.)
                         |> getCallCount,
                         drawImage
                         |> withThreeArgs(pxSource2, 0., 0.)
                         |> getCallCount,
                         drawImage
                         |> withThreeArgs(pzSource1, 0., 0.)
                         |> getCallCount,
                         drawImage
                         |> withThreeArgs(pzSource2, 0., 0.)
                         |> getCallCount,
                         getImageData
                         |> withFourArgs(
                              0.,
                              0.,
                              pxSource1##width,
                              pxSource1##height,
                            )
                         |> getCallCount,
                         getImageData
                         |> withFourArgs(
                              0.,
                              0.,
                              pxSource2##width,
                              pxSource2##height,
                            )
                         |> getCallCount,
                       )
                       |> expect == (1, 1, 1, 1, 1, 6, 6),
                   );
              })
            );

            testPromise(
              "clear cubemapTextureRecord->needAddedSourceArray, needInitedTextureIndexArray after send",
              () => {
                open CubemapTextureType;
                let (
                  state,
                  context,
                  (
                    imageDataArrayBuffer1,
                    imageDataArrayBuffer2,
                    imageDataArrayBuffer3,
                    imageDataArrayBuffer4,
                    imageDataArrayBuffer5,
                    imageDataArrayBuffer6,
                    imageDataArrayBuffer7,
                    imageDataArrayBuffer8,
                    imageDataArrayBuffer9,
                    imageDataArrayBuffer10,
                    imageDataArrayBuffer11,
                    imageDataArrayBuffer12,
                  ),
                  (map1, map2),
                  _,
                ) =
                  _prepareForCubemapTexture();
                TestMainWorkerTool.closeContractCheck();
                let state =
                  state
                  |> CubemapTextureAPI.initCubemapTexture(map1)
                  |> CubemapTextureAPI.initCubemapTexture(map2);
                MainInitJobMainWorkerTool.prepare()
                |> MainInitJobMainWorkerTool.test(
                     sandbox,
                     state =>
                       WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(
                         state,
                       ),
                     postMessageToRenderWorker => {
                       let state = MainStateTool.unsafeGetState();
                       let {
                         needAddedPXSourceArray,
                         needAddedNXSourceArray,
                         needAddedPYSourceArray,
                         needAddedNYSourceArray,
                         needAddedPZSourceArray,
                         needAddedNZSourceArray,
                         needInitedTextureIndexArray,
                       } =
                         CubemapTextureTool.getRecord(state);
                       (
                         needAddedPXSourceArray |> Js.Array.length,
                         needAddedNXSourceArray |> Js.Array.length,
                         needAddedPYSourceArray |> Js.Array.length,
                         needAddedNYSourceArray |> Js.Array.length,
                         needAddedPZSourceArray |> Js.Array.length,
                         needAddedNZSourceArray |> Js.Array.length,
                         needInitedTextureIndexArray |> Js.Array.length,
                       )
                       |> expect == (0, 0, 0, 0, 0, 0, 0);
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

          describe("test cubemap texture", () => {
            beforeAllPromise(() =>
              CubemapTextureRenderWorkerTool.buildFakeCreateImageBitmapFunc()
            );
            afterAllPromise(() =>
              CubemapTextureRenderWorkerTool.clearFakeCreateImageBitmapFunc()
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
                      imageDataArrayBuffer5,
                      imageDataArrayBuffer6,
                      imageDataArrayBuffer7,
                      imageDataArrayBuffer8,
                      imageDataArrayBuffer9,
                      imageDataArrayBuffer10,
                      imageDataArrayBuffer11,
                      imageDataArrayBuffer12,
                    ),
                    (map1, map2),
                    (
                      (
                        pxSource1,
                        nxSource1,
                        pySource1,
                        nySource1,
                        pzSource1,
                        nzSource1,
                      ),
                      (
                        pxSource2,
                        nxSource2,
                        pySource2,
                        nySource2,
                        pzSource2,
                        nzSource2,
                      ),
                    ),
                  ) =
                    _prepareForCubemapTexture();
                  let state =
                    state
                    |> CubemapTextureAPI.setCubemapTextureFlipY(map1, true)
                    |> CubemapTextureAPI.setCubemapTextureFlipY(map2, true);
                  BrowserDetectTool.setChrome();

                  RenderJobsRenderWorkerTool.init(
                    state =>
                      (
                        CubemapTextureRenderWorkerTool.unsafeGetAllSources(
                          map1,
                          RenderWorkerStateTool.unsafeGetState(),
                        )
                        |> Obj.magic,
                        CubemapTextureRenderWorkerTool.unsafeGetAllSources(
                          map2,
                          RenderWorkerStateTool.unsafeGetState(),
                        )
                        |> Obj.magic,
                      )
                      |> expect
                      == (
                           [|
                             [|
                               imageDataArrayBuffer1,
                               pxSource1##width,
                               pxSource1##height,
                               {"imageOrientation": "flipY"} |> Obj.magic,
                             |],
                             [|
                               imageDataArrayBuffer3,
                               nxSource1##width,
                               nxSource1##height,
                               {"imageOrientation": "flipY"} |> Obj.magic,
                             |],
                             [|
                               imageDataArrayBuffer5,
                               pySource1##width,
                               pySource1##height,
                               {"imageOrientation": "flipY"} |> Obj.magic,
                             |],
                             [|
                               imageDataArrayBuffer7,
                               nySource1##width,
                               nySource1##height,
                               {"imageOrientation": "flipY"} |> Obj.magic,
                             |],
                             [|
                               imageDataArrayBuffer9,
                               pzSource1##width,
                               pzSource1##height,
                               {"imageOrientation": "flipY"} |> Obj.magic,
                             |],
                             [|
                               imageDataArrayBuffer11,
                               nzSource1##width,
                               nzSource1##height,
                               {"imageOrientation": "flipY"} |> Obj.magic,
                             |],
                           |],
                           [|
                             [|
                               imageDataArrayBuffer2,
                               pxSource2##width,
                               pxSource2##height,
                               {"imageOrientation": "flipY"} |> Obj.magic,
                             |],
                             [|
                               imageDataArrayBuffer4,
                               nxSource2##width,
                               nxSource2##height,
                               {"imageOrientation": "flipY"} |> Obj.magic,
                             |],
                             [|
                               imageDataArrayBuffer6,
                               pySource2##width,
                               pySource2##height,
                               {"imageOrientation": "flipY"} |> Obj.magic,
                             |],
                             [|
                               imageDataArrayBuffer8,
                               nySource2##width,
                               nySource2##height,
                               {"imageOrientation": "flipY"} |> Obj.magic,
                             |],
                             [|
                               imageDataArrayBuffer10,
                               pzSource2##width,
                               pzSource2##height,
                               {"imageOrientation": "flipY"} |> Obj.magic,
                             |],
                             [|
                               imageDataArrayBuffer12,
                               nzSource2##width,
                               nzSource2##height,
                               {"imageOrientation": "flipY"} |> Obj.magic,
                             |],
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
                      imageDataArrayBuffer5,
                      imageDataArrayBuffer6,
                      imageDataArrayBuffer7,
                      imageDataArrayBuffer8,
                      imageDataArrayBuffer9,
                      imageDataArrayBuffer10,
                      imageDataArrayBuffer11,
                      imageDataArrayBuffer12,
                    ),
                    (map1, map2),
                    (
                      (
                        pxSource1,
                        nxSource1,
                        pySource1,
                        nySource1,
                        pzSource1,
                        nzSource1,
                      ),
                      (
                        pxSource2,
                        nxSource2,
                        pySource2,
                        nySource2,
                        pzSource2,
                        nzSource2,
                      ),
                    ),
                  ) =
                    _prepareForCubemapTexture();
                  let state =
                    state
                    |> CubemapTextureAPI.setCubemapTextureFlipY(map1, false)
                    |> CubemapTextureAPI.setCubemapTextureFlipY(map2, false);

                  BrowserDetectTool.setChrome();

                  RenderJobsRenderWorkerTool.init(
                    state =>
                      (
                        CubemapTextureRenderWorkerTool.unsafeGetAllSources(
                          map1,
                          RenderWorkerStateTool.unsafeGetState(),
                        )
                        |> Obj.magic,
                        CubemapTextureRenderWorkerTool.unsafeGetAllSources(
                          map2,
                          RenderWorkerStateTool.unsafeGetState(),
                        )
                        |> Obj.magic,
                      )
                      |> expect
                      == (
                           [|
                             [|
                               imageDataArrayBuffer1,
                               pxSource1##width,
                               pxSource1##height,
                               {"imageOrientation": "none"} |> Obj.magic,
                             |],
                             [|
                               imageDataArrayBuffer3,
                               nxSource1##width,
                               nxSource1##height,
                               {"imageOrientation": "none"} |> Obj.magic,
                             |],
                             [|
                               imageDataArrayBuffer5,
                               pySource1##width,
                               pySource1##height,
                               {"imageOrientation": "none"} |> Obj.magic,
                             |],
                             [|
                               imageDataArrayBuffer7,
                               nySource1##width,
                               nySource1##height,
                               {"imageOrientation": "none"} |> Obj.magic,
                             |],
                             [|
                               imageDataArrayBuffer9,
                               pzSource1##width,
                               pzSource1##height,
                               {"imageOrientation": "none"} |> Obj.magic,
                             |],
                             [|
                               imageDataArrayBuffer11,
                               nzSource1##width,
                               nzSource1##height,
                               {"imageOrientation": "none"} |> Obj.magic,
                             |],
                           |],
                           [|
                             [|
                               imageDataArrayBuffer2,
                               pxSource2##width,
                               pxSource2##height,
                               {"imageOrientation": "none"} |> Obj.magic,
                             |],
                             [|
                               imageDataArrayBuffer4,
                               nxSource2##width,
                               nxSource2##height,
                               {"imageOrientation": "none"} |> Obj.magic,
                             |],
                             [|
                               imageDataArrayBuffer6,
                               pySource2##width,
                               pySource2##height,
                               {"imageOrientation": "none"} |> Obj.magic,
                             |],
                             [|
                               imageDataArrayBuffer8,
                               nySource2##width,
                               nySource2##height,
                               {"imageOrientation": "none"} |> Obj.magic,
                             |],
                             [|
                               imageDataArrayBuffer10,
                               pzSource2##width,
                               pzSource2##height,
                               {"imageOrientation": "none"} |> Obj.magic,
                             |],
                             [|
                               imageDataArrayBuffer12,
                               nzSource2##width,
                               nzSource2##height,
                               {"imageOrientation": "none"} |> Obj.magic,
                             |],
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
                    imageDataArrayBuffer5,
                    imageDataArrayBuffer6,
                    imageDataArrayBuffer7,
                    imageDataArrayBuffer8,
                    imageDataArrayBuffer9,
                    imageDataArrayBuffer10,
                    imageDataArrayBuffer11,
                    imageDataArrayBuffer12,
                  ),
                  (map1, map2),
                  (
                    (
                      pxSource1,
                      nxSource1,
                      pySource1,
                      nySource1,
                      pzSource1,
                      nzSource1,
                    ),
                    (
                      pxSource2,
                      nxSource2,
                      pySource2,
                      nySource2,
                      pzSource2,
                      nzSource2,
                    ),
                  ),
                ) =
                  _prepareForCubemapTexture();
                let state =
                  state
                  |> CubemapTextureAPI.setCubemapTextureFlipY(map1, true)
                  |> CubemapTextureAPI.setCubemapTextureFlipY(map2, true);
                BrowserDetectTool.setFirefox();

                RenderJobsRenderWorkerTool.init(
                  state =>
                    (
                      CubemapTextureRenderWorkerTool.unsafeGetAllSources(
                        map1,
                        RenderWorkerStateTool.unsafeGetState(),
                      )
                      |> Obj.magic,
                      CubemapTextureRenderWorkerTool.unsafeGetAllSources(
                        map2,
                        RenderWorkerStateTool.unsafeGetState(),
                      )
                      |> Obj.magic,
                    )
                    |> expect
                    == (
                         [|
                           [|
                             imageDataArrayBuffer1,
                             pxSource1##width,
                             pxSource1##height,
                             Js.Undefined.empty |> Obj.magic,
                           |],
                           [|
                             imageDataArrayBuffer3,
                             nxSource1##width,
                             nxSource1##height,
                             Js.Undefined.empty |> Obj.magic,
                           |],
                           [|
                             imageDataArrayBuffer5,
                             pySource1##width,
                             pySource1##height,
                             Js.Undefined.empty |> Obj.magic,
                           |],
                           [|
                             imageDataArrayBuffer7,
                             nySource1##width,
                             nySource1##height,
                             Js.Undefined.empty |> Obj.magic,
                           |],
                           [|
                             imageDataArrayBuffer9,
                             pzSource1##width,
                             pzSource1##height,
                             Js.Undefined.empty |> Obj.magic,
                           |],
                           [|
                             imageDataArrayBuffer11,
                             nzSource1##width,
                             nzSource1##height,
                             Js.Undefined.empty |> Obj.magic,
                           |],
                         |],
                         [|
                           [|
                             imageDataArrayBuffer2,
                             pxSource2##width,
                             pxSource2##height,
                             Js.Undefined.empty |> Obj.magic,
                           |],
                           [|
                             imageDataArrayBuffer4,
                             nxSource2##width,
                             nxSource2##height,
                             Js.Undefined.empty |> Obj.magic,
                           |],
                           [|
                             imageDataArrayBuffer6,
                             pySource2##width,
                             pySource2##height,
                             Js.Undefined.empty |> Obj.magic,
                           |],
                           [|
                             imageDataArrayBuffer8,
                             nySource2##width,
                             nySource2##height,
                             Js.Undefined.empty |> Obj.magic,
                           |],
                           [|
                             imageDataArrayBuffer10,
                             pzSource2##width,
                             pzSource2##height,
                             Js.Undefined.empty |> Obj.magic,
                           |],
                           [|
                             imageDataArrayBuffer12,
                             nzSource2##width,
                             nzSource2##height,
                             Js.Undefined.empty |> Obj.magic,
                           |],
                         |],
                       )
                    |> resolve,
                  state,
                );
              });
            });

            describe("init added textures", () =>
              testPromise("test create gl texture", () => {
                let (state, _, _, _, _) = _prepareForCubemapTexture();
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
        });
      });
    });
  });