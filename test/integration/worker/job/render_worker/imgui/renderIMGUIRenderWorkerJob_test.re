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
        let imguiFunc = (_, _, record) => record;
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
              (customData, apiJsObj, record) => {
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

                let imageFunc = apiJsObj##image;

                let record =
                  imageFunc(.
                    (imageX1, imageY1, imageWidth1, imageHeight1),
                    (imageS01, imageT01, imageS11, imageT11),
                    textureId1,
                    record,
                  );

                record;
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
    });
  });