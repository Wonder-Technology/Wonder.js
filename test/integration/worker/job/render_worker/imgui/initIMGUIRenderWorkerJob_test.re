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

    describe("test send init data to render worker", () =>
      describe("send bitmapImageData", () => {
        testPromise("convert bitmap to imageData", () => {
          let (state, (imageDataArrayBuffer1, context)) = _prepare();
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
                            "setting": Sinon.matchAny,
                            "fntData": Sinon.matchAny,
                            "bitmapImageData": (
                              imageDataArrayBuffer1,
                              bitmap##width,
                              bitmap##height,
                            ),
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
        });

        testPromise("send setting", () => {
          let (state, (imageDataArrayBuffer1, context)) = _prepare();
          let setting = {textColorArr: [|0.5, 0.5, 1.|]};
          let state = ManageIMGUIAPI.setSetting(setting, state);
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
                          "setting": setting |> Obj.magic |> Js.Json.stringify,
                          "fntData": Sinon.matchAny,
                          "bitmapImageData": Sinon.matchAny,
                        },
                        (),
                      ),
                    )
                 |> getCallCount
                 |> expect == 1,
             );
        });
        testPromise("send fntData", () => {
          let (state, (imageDataArrayBuffer1, context)) = _prepare();
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
                          "setting": Sinon.matchAny,
                          "fntData":
                            fntData |> Obj.magic |> Js.Json.stringify |. Some,
                          "bitmapImageData": Sinon.matchAny,
                        },
                        (),
                      ),
                    )
                 |> getCallCount
                 |> expect == 1,
             );
        });
      })
    );

    describe("test render worker job", () => {
      let _prepareSetData = () =>
        IMGUIRenderWorkerTool.prepareSetData(sandbox);

      let _prepare = () => {
        let (
          state,
          (fntData, bitmap, setting),
          (imageDataArrayBuffer1, context),
        ) =
          _prepareSetData();
        let state =
          state
          |> FakeGlWorkerTool.setFakeGl(
               FakeGlWorkerTool.buildFakeGl(~sandbox, ()),
             );
        MainStateTool.setState(state);
        BrowserDetectTool.setChrome();

        (
          state,
          (fntData, bitmap, setting),
          (imageDataArrayBuffer1, context),
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
            let (state, (_, bitmap, _), (imageDataArrayBuffer1, context)) =
              _prepare();

            RenderJobsRenderWorkerTool.init(
              state =>
                IMGUIRenderWorkerTool.getBitmap(
                  RenderWorkerStateTool.unsafeGetState().imguiRecord,
                )
                |> Obj.magic
                |>
                expect == [|
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

      testPromise("set setting", () => {
        let (state, (_, _, setting), _) = _prepare();

        RenderJobsRenderWorkerTool.init(
          state =>
            IMGUIRenderWorkerTool.getSetting(
              RenderWorkerStateTool.unsafeGetState().imguiRecord,
            )
            |> expect == setting
            |> resolve,
          state,
        );
      });

      describe("init imgui", () =>
        testPromise("create program", () => {
          let (
            state,
            (fntData, bitmap, setting),
            (imageDataArrayBuffer1, context),
          ) =
            _prepareSetData();
          let createProgram = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlWorkerTool.setFakeGl(
                 FakeGlWorkerTool.buildFakeGl(~sandbox, ~createProgram, ()),
               );
          MainStateTool.setState(state);
          BrowserDetectTool.setChrome();

          RenderJobsRenderWorkerTool.init(
            state => createProgram |> expect |> toCalledOnce |> resolve,
            state,
          );
        })
      );
    });
  });