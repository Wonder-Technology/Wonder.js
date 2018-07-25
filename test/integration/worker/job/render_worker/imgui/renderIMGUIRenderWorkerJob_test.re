open Wonder_jest;

open Js.Promise;

open WonderImgui.IMGUIType;

let _ =
  describe("test render imgui render worker job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => TestWorkerTool.clear(sandbox));

    describe("test send render data to render worker", () => {
      let _prepare = () => {
        let state = TestMainWorkerTool.initWithJobConfig(~sandbox, ());
        let state = WorkerWorkerTool.setFakeWorkersAndSetState(state);
        let renderWorker =
          WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state);
        let postMessageToRenderWorker =
          WorkerWorkerTool.stubPostMessage(sandbox, renderWorker);
        MainStateTool.setState(state);

        (state, postMessageToRenderWorker);
      };

      testPromise("send ioData", () => {
        open IMGUIType;

        let ioData = {
          pointUp: true,
          pointDown: true,
          pointPosition: (0, 1),
          pointMovementDelta: (1, 2),
        };
        let (state, postMessageToRenderWorker) = _prepare();
        let state = IMGUITool.setIOData(ioData, state);
        MainStateTool.setState(state);

        WorkerJobWorkerTool.execMainWorkerJob(
          ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
          ~completeFunc=
            _ =>
              postMessageToRenderWorker
              |> expect
              |> toCalledWith([|
                   SendRenderRenderDataWorkerTool.buildRenderRenderData(
                     ~imguiData={
                       "ioData": ioData,
                       "customData": Sinon.matchAny,
                       "imguiFunc": Sinon.matchAny,
                     },
                     (),
                   ),
                 |])
              |> resolve,
          (),
        );
      });

      describe("reset io data->point event state when point up", () =>
        testPromise("test io data after send data", () => {
          open IMGUIType;

          let ioData = {
            pointUp: true,
            pointDown: true,
            pointPosition: (0, 1),
            pointMovementDelta: (1, 2),
          };
          let (state, postMessageToRenderWorker) = _prepare();
          let state = IMGUITool.setIOData(ioData, state);
          MainStateTool.setState(state);

          WorkerJobWorkerTool.execMainWorkerJob(
            ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
            ~completeFunc=
              _ => {
                let state = MainStateTool.unsafeGetState();

                IMGUITool.getIOData(state)
                |> expect == {...ioData, pointUp: false, pointDown: false}
                |> resolve;
              },
            (),
          );
        })
      );

      testPromise("send imguiFunc and customData", () => {
        let (state, postMessageToRenderWorker) = _prepare();
        let imguiFunc = (. _, _, state) => state;
        let customData = Obj.magic(100);
        let state = ManageIMGUIAPI.setIMGUIFunc(customData, imguiFunc, state);
        MainStateTool.setState(state);

        WorkerJobWorkerTool.execMainWorkerJob(
          ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
          ~completeFunc=
            _ =>
              postMessageToRenderWorker
              |> expect
              |> toCalledWith([|
                   SendRenderRenderDataWorkerTool.buildRenderRenderData(
                     ~imguiData={
                       "ioData": Sinon.matchAny,
                       "customData": customData,
                       "imguiFunc":
                         RenderIMGUIRenderWorkerTool.serializeFunction(
                           imguiFunc,
                         ),
                     },
                     (),
                   ),
                 |])
              |> resolve,
          (),
        );
      });
    });

    describe("test render worker job", () => {
      beforeAllPromise(() =>
        BasicSourceTextureRenderWorkerTool.buildFakeCreateImageBitmapFunc()
      );
      afterAllPromise(() =>
        BasicSourceTextureRenderWorkerTool.clearFakeCreateImageBitmapFunc()
      );

      describe("test render imgui", () =>
        testPromise("test render image", () => {
          let (state, (fntData, bitmap, setting, _), (_, context)) =
            IMGUIRenderWorkerTool.prepareSetData(sandbox);
          let canvasWidth = 100;
          let canvasHeight = 200;
          let state =
            ViewTool.setCanvas(
              {"width": canvasWidth, "height": canvasHeight} |> Obj.magic,
              state,
            );
          let state =
            ManageIMGUIAPI.setIMGUIFunc(
              Obj.magic(WonderImgui.RenderIMGUITool.buildImageData()),
              (. customData, apiJsObj, state) => {
                let (
                  (
                    (imageX1, imageY1, imageWidth1, imageHeight1),
                    (imageS01, imageT01, imageS11, imageT11),
                    textureId1,
                  ),
                  _,
                  _,
                ) =
                  Obj.magic(customData);
                let apiJsObj = Obj.magic(apiJsObj);

                let imageFunc = apiJsObj##image;

                let state =
                  imageFunc(.
                    (imageX1, imageY1, imageWidth1, imageHeight1),
                    (imageS01, imageT01, imageS11, imageT11),
                    textureId1,
                    state,
                  );

                state;
              },
              state,
            );
          let array_buffer = 1;
          let dynamic_draw = 2;
          let getExtension =
            WonderImgui.RenderIMGUITool.buildNoVAOExtension(sandbox);
          let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlWorkerTool.setFakeGl(
                 FakeGlWorkerTool.buildFakeGl(
                   ~sandbox,
                   ~array_buffer,
                   ~bufferData,
                   ~dynamic_draw,
                   ~getExtension,
                   (),
                 ),
               );
          MainStateTool.setState(state);
          BrowserDetectTool.setChrome();

          RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
            ~state,
            ~sandbox,
            ~completeFunc=
              _ => bufferData |> getCallCount |> expect == 8 |> resolve,
            (),
          );
        })
      );

      describe("test operate main state if imgui button is click", () =>
        describe(
          {|can't invoke api to operate main state in imguiFunc!
          instead, should:|},
          () => {
            testPromise(
              {|set custom data to render worker state in imguiFunc;
                send custom data to main worker when finish render;|},
              () => {
                let (state, (fntData, bitmap, setting, _), (_, context)) =
                  IMGUIRenderWorkerTool.prepareSetData(sandbox);
                let state = RenderIMGUITool.prepareFntData(state);
                let canvasWidth = 100;
                let canvasHeight = 200;
                let state =
                  ViewTool.setCanvas(
                    {"width": canvasWidth, "height": canvasHeight}
                    |> Obj.magic,
                    state,
                  );
                let sendedCustomData = 1;

                let ((buttonX1, buttonY1, buttonWidth1, buttonHeight1), str1) as customData =
                  WonderImgui.ButtonIMGUITool.buildButtonData1();
                let state =
                  ManageIMGUIAPI.setIMGUIFunc(
                    Obj.magic(customData),
                    (. customData, apiJsObj, state) => {
                      let (
                        (buttonX1, buttonY1, buttonWidth1, buttonHeight1),
                        str1,
                      ) =
                        Obj.magic(customData);
                      let apiJsObj = Obj.magic(apiJsObj);

                      let buttonFunc = apiJsObj##button;
                      let setCustomDataFunc = apiJsObj##setCustomDataFromRenderWorkerToMainWorker;

                      let (state, isClick) =
                        buttonFunc(.
                          (buttonX1, buttonY1, buttonWidth1, buttonHeight1),
                          str1,
                          state,
                        );

                      let state =
                        isClick ?
                          setCustomDataFunc(. sendedCustomData, state) : state;

                      state;
                    },
                    state,
                  );
                let getExtension =
                  WonderImgui.RenderIMGUITool.buildNoVAOExtension(sandbox);
                let state =
                  state
                  |> FakeGlWorkerTool.setFakeGl(
                       FakeGlWorkerTool.buildFakeGl(
                         ~sandbox,
                         ~getExtension,
                         (),
                       ),
                     );
                MainStateTool.setState(state);
                BrowserDetectTool.setChrome();
                let selfPostMessage =
                  RenderJobsRenderWorkerTool.stubSelfPostMessage(sandbox^);
                let state =
                  IMGUITool.setIOData(
                    {
                      pointUp: true,
                      pointDown: true,
                      pointPosition: (buttonX1, buttonY1),
                      pointMovementDelta: (0, 0),
                    },
                    state,
                  );
                MainStateTool.setState(state);
                BrowserDetectTool.setChrome();

                RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                  ~state,
                  ~sandbox,
                  ~completeFunc=
                    postMessageToRenderWorker =>
                      selfPostMessage
                      |> expect
                      |> toCalledWith([|
                           {
                             "operateType": "FINISH_RENDER",
                             "customData": sendedCustomData,
                           },
                         |])
                      |> resolve,
                  (),
                );
              },
            );
            test(
              {|get custom data in main worker;
                (so that in the next frame, user can check custom data in main state and operate main state in main worker)|},
              () => {
                let state = MainStateTool.createState();
                let customData = 1;

                let state =
                  GetFinishRenderDataMainWorkerJob._exec(
                    {
                      "data": {
                        "customData": customData,
                      },
                    },
                    state,
                  );

                WorkerDataTool.getRenderWorkerCustomData(state)
                |> expect == Obj.magic(customData);
              },
            );
          },
        )
      );
    });
  });