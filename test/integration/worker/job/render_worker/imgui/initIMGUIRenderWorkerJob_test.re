open Wonder_jest;

open Js.Promise;

open WonderImgui.IMGUIType;

let _ =
  describe("test init imgui render worker job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    let _prepare = () => IMGUIRenderWorkerTool.prepareState(sandbox);

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => TestWorkerTool.clear(sandbox));

    describe("test send init data to render worker", () => {
      testPromise("send canvas size data", () => {
        let (state, (_, context)) = _prepare();
        MainStateTool.setState(state);

        MainInitJobMainWorkerTool.prepare()
        |> MainInitJobMainWorkerTool.test(
             sandbox,
             state =>
               WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state),
             postMessageToRenderWorker => {
               let (_, _, width, height, _, _) =
                 ScreenService.queryFullScreenData();

               postMessageToRenderWorker
               |> withOneArg(
                    SendInitRenderDataWorkerTool.buildInitRenderData(
                      ~imguiData={
                        "canvasWidth": width,
                        "canvasHeight": height,
                        "fntData": Sinon.matchAny,
                        "bitmapImageData": Sinon.matchAny,
                        "customTextureSourceDataArr": Sinon.matchAny,
                        "extendData": Sinon.matchAny,
                      },
                      (),
                    ),
                  )
               |> getCallCount
               |> expect == 1;
             },
           );
      });

      describe("send bitmapImageData", () =>
        testPromise("convert bitmap to imageData", () => {
          let (
            state,
            (
              (
                imageDataArrayBuffer1,
                imageDataArrayBuffer2,
                imageDataArrayBuffer3,
                imageDataArrayBuffer4,
              ),
              context,
            ),
          ) =
            _prepare();
          let bitmap = Obj.magic({"width": 100, "height": 200});
          let state = IMGUIRenderWorkerTool.setBitmap(bitmap, state);
          MainStateTool.setState(state);
          let drawImage = context##drawImage;
          let getImageData = context##getImageData;

          MainInitJobMainWorkerTool.prepare()
          |> MainInitJobMainWorkerTool.test(
               sandbox,
               state =>
                 WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state),
               postMessageToRenderWorker =>
                 (
                   postMessageToRenderWorker
                   |> withOneArg(
                        SendInitRenderDataWorkerTool.buildInitRenderData(
                          ~imguiData={
                            "canvasWidth": Sinon.matchAny,
                            "canvasHeight": Sinon.matchAny,
                            "fntData": Sinon.matchAny,
                            "bitmapImageData": (
                              imageDataArrayBuffer1,
                              bitmap##width,
                              bitmap##height,
                            ),
                            "customTextureSourceDataArr": Sinon.matchAny,
                            "extendData": Sinon.matchAny,
                          },
                          (),
                        ),
                      )
                   |> getCallCount,
                   drawImage |> withThreeArgs(bitmap, 0., 0.) |> getCallCount,
                   getImageData
                   |> withFourArgs(0., 0., bitmap##width, bitmap##height)
                   |> getCallCount,
                 )
                 |> expect == (1, 1, 1),
             );
        })
      );

      describe("send customTextureSourceDataArr", () =>
        testPromise("convert sources to imageData arr", () => {
          let (
            state,
            (
              (
                imageDataArrayBuffer1,
                imageDataArrayBuffer2,
                imageDataArrayBuffer3,
                imageDataArrayBuffer4,
              ),
              context,
            ),
          ) =
            _prepare();
          let id1 = "a1";
          let imageType1 = WonderImgui.ImageType.Png;
          let source1 = Obj.magic({"width": 100, "height": 200});
          let id2 = "a2";
          let imageType2 = WonderImgui.ImageType.Jpg;
          let source2 = Obj.magic({"width": 300, "height": 400});
          let state =
            IMGUIRenderWorkerTool.setCustomImageArr(
              [|
                IMGUIRenderWorkerTool.buildCustomImageData(
                  ~source=source1,
                  ~id=id1,
                  ~imageType=imageType1,
                  (),
                ),
                IMGUIRenderWorkerTool.buildCustomImageData(
                  ~source=source2,
                  ~id=id2,
                  ~imageType=imageType2,
                  (),
                ),
              |],
              state,
            );
          MainStateTool.setState(state);
          let drawImage = context##drawImage;
          let getImageData = context##getImageData;

          MainInitJobMainWorkerTool.prepare()
          |> MainInitJobMainWorkerTool.test(
               sandbox,
               state =>
                 WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state),
               postMessageToRenderWorker =>
                 (
                   postMessageToRenderWorker
                   |> withOneArg(
                        SendInitRenderDataWorkerTool.buildInitRenderData(
                          ~imguiData={
                            "extendData": Sinon.matchAny,
                            "canvasWidth": Sinon.matchAny,
                            "canvasHeight": Sinon.matchAny,
                            "fntData": Sinon.matchAny,
                            "bitmapImageData": Sinon.matchAny,
                            "customTextureSourceDataArr": [|
                              (
                                (
                                  imageDataArrayBuffer2,
                                  source1##width,
                                  source1##height,
                                ),
                                id1,
                                imageType1,
                              ),
                              (
                                (
                                  imageDataArrayBuffer3,
                                  source2##width,
                                  source2##height,
                                ),
                                id2,
                                imageType2,
                              ),
                            |],
                          },
                          (),
                        ),
                      )
                   |> getCallCount,
                   drawImage |> withThreeArgs(source1, 0., 0.) |> getCallCount,
                   drawImage |> withThreeArgs(source2, 0., 0.) |> getCallCount,
                   getImageData
                   |> withFourArgs(0., 0., source1##width, source1##height)
                   |> getCallCount,
                   getImageData
                   |> withFourArgs(0., 0., source2##width, source2##height)
                   |> getCallCount,
                 )
                 |> expect == (1, 1, 1, 1, 1),
             );
        })
      );

      testPromise("send fntData", () => {
        let (state, (_, context)) = _prepare();
        let fntData = Obj.magic(2);
        let state = IMGUIRenderWorkerTool.setFntData(fntData, state);
        MainStateTool.setState(state);

        MainInitJobMainWorkerTool.prepare()
        |> MainInitJobMainWorkerTool.test(
             sandbox,
             state =>
               WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state),
             postMessageToRenderWorker =>
               postMessageToRenderWorker
               |> withOneArg(
                    SendInitRenderDataWorkerTool.buildInitRenderData(
                      ~imguiData={
                        "extendData": Sinon.matchAny,
                        "canvasWidth": Sinon.matchAny,
                        "canvasHeight": Sinon.matchAny,
                        "fntData":
                          (fntData |> Obj.magic |> Js.Json.stringify)->Some,
                        "bitmapImageData": Sinon.matchAny,
                        "customTextureSourceDataArr": Sinon.matchAny,
                      },
                      (),
                    ),
                  )
               |> getCallCount
               |> expect == 1,
           );
      });
    });

    describe("test render worker job", () => {
      let _prepareSetData = () =>
        IMGUIRenderWorkerTool.prepareSetData(sandbox);

      let _prepare = () => {
        let (
          state,
          (fntData, bitmap, customImageArr),
          (
            (
              imageDataArrayBuffer1,
              imageDataArrayBuffer2,
              imageDataArrayBuffer3,
              imageDataArrayBuffer4,
            ),
            context,
          ),
        ) =
          _prepareSetData();
        let state =
          state
          |> FakeGlWorkerTool.setFakeGl(
               FakeGlWorkerTool.buildFakeGl(~sandbox, ()),
             );
        let state = state |> BrowserDetectTool.setChrome;

        (
          state,
          (fntData, bitmap, customImageArr),
          (
            (
              imageDataArrayBuffer1,
              imageDataArrayBuffer2,
              imageDataArrayBuffer3,
              imageDataArrayBuffer4,
            ),
            context,
          ),
        );
      };

      beforeAllPromise(() =>
        BasicSourceTextureRenderWorkerTool.buildFakeCreateImageBitmapFunc()
      );
      afterAllPromise(() =>
        BasicSourceTextureRenderWorkerTool.clearFakeCreateImageBitmapFunc()
      );

      describe("set bitmap", () =>
        describe("test for chrome", () =>
          testPromise("flipY is false", () => {
            let (
              state,
              (_, bitmap, _),
              (
                (
                  imageDataArrayBuffer1,
                  imageDataArrayBuffer2,
                  imageDataArrayBuffer3,
                  imageDataArrayBuffer4,
                ),
                context,
              ),
            ) =
              _prepare();

            RenderJobsRenderWorkerTool.init(
              state =>
                IMGUIRenderWorkerTool.getBitmap(
                  RenderWorkerStateTool.unsafeGetState().imguiRecord,
                )
                |> Obj.magic
                |> expect
                == [|
                     imageDataArrayBuffer1,
                     bitmap##width,
                     bitmap##height,
                     {"imageOrientation": "none"} |> Obj.magic,
                   |]
                |> resolve,
              state,
            );
          })
        )
      );

      describe("set customImageArr", () =>
        describe("test for chrome", () =>
          testPromise("flipY is false", () => {
            let (
              state,
              (_, _, customImageArr),
              (
                (
                  imageDataArrayBuffer1,
                  imageDataArrayBuffer2,
                  imageDataArrayBuffer3,
                  imageDataArrayBuffer4,
                ),
                context,
              ),
            ) =
              _prepare();
            let (source1, id1, imageType1) = customImageArr[0];
            let (source2, id2, imageType2) = customImageArr[1];

            RenderJobsRenderWorkerTool.init(
              state =>
                IMGUIRenderWorkerTool.getCustomImageArr(
                  RenderWorkerStateTool.unsafeGetState().imguiRecord,
                )
                |> Obj.magic
                |> expect
                == [|
                     (
                       (
                         imageDataArrayBuffer2,
                         source1##width,
                         source1##height,
                         {"imageOrientation": "none"} |> Obj.magic,
                       ),
                       id1,
                       imageType1,
                     ),
                     (
                       (
                         imageDataArrayBuffer3,
                         source2##width,
                         source2##height,
                         {"imageOrientation": "none"} |> Obj.magic,
                       ),
                       id2,
                       imageType2,
                     ),
                   |]
                |> resolve,
              state,
            );
          })
        )
      );

      testPromise("set fntData", () => {
        let (state, (fntData, _, _), _) = _prepare();

        RenderJobsRenderWorkerTool.init(
          state =>
            IMGUIRenderWorkerTool.getFntData(
              RenderWorkerStateTool.unsafeGetState().imguiRecord,
            )
            |> expect == fntData
            |> resolve,
          state,
        );
      });

      describe("init imgui", () =>
        testPromise("create program", () => {
          let (state, (fntData, bitmap, _), (_, context)) =
            _prepareSetData();
          let createProgram = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlWorkerTool.setFakeGl(
                 FakeGlWorkerTool.buildFakeGl(~sandbox, ~createProgram, ()),
               );
          let state = state |> BrowserDetectTool.setChrome;

          RenderJobsRenderWorkerTool.initWithJob(
            ~completeFunc=
              state => createProgram |> expect |> toCalledThrice |> resolve,
            ~state,
            ~jobFuncArr=
              RenderJobsRenderWorkerTool.getJobFuncArrExceptInitNoMaterialShader(),
          );
        })
      );

      describe("fix bug", () =>
        describe("test render empty imgui + a light box", () =>
          testPromise(
            {|vs glsl should not contain "attribute null null;" |}, () => {
            let (state, (fntData, bitmap, _), (_, context)) =
              _prepareSetData();
            let getExtension =
              WonderImgui.RenderIMGUITool.buildNoVAOExtension(sandbox);
            let shaderSource = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlWorkerTool.setFakeGl(
                   FakeGlWorkerTool.buildFakeGl(
                     ~sandbox,
                     ~shaderSource,
                     ~getExtension,
                     (),
                   ),
                 );
            let (state, _, _, _, _) =
              FrontRenderLightJobTool.prepareGameObject(sandbox, state);
            let (state, _, _, _) = CameraTool.createCameraGameObject(state);
            let state = state |> BrowserDetectTool.setChrome;

            RenderJobsRenderWorkerTool.init(
              state =>
                GLSLTool.contain(
                  GLSLTool.getVsSource(shaderSource),
                  {|attribute null null;|},
                )
                |> expect == false
                |> resolve,
              state,
            );
          })
        )
      );
    });
  });