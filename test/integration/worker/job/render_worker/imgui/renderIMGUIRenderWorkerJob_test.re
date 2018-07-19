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
        let imguiFunc = (_, _, record) => record;
        let customData = Obj.magic(100);
        let state = ManageIMGUIAPI.setIMGUIFunc(customData, imguiFunc, state);
        let renderWorker =
          WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state);
        let postMessageToRenderWorker =
          WorkerWorkerTool.stubPostMessage(sandbox, renderWorker);
        MainStateTool.setState(state);

        (state, postMessageToRenderWorker, (customData, imguiFunc));
      };

      testPromise("send imguiFunc and customData", () => {
        let (state, postMessageToRenderWorker, (customData, imguiFunc)) =
          _prepare();

        WorkerJobWorkerTool.execMainWorkerJob(
          ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
          ~completeFunc=
            _ =>
              postMessageToRenderWorker
              |> expect
              |> toCalledWith([|
                   SendRenderRenderDataWorkerTool.buildRenderRenderData(
                     ~imguiData={
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

      testPromise("test render imgui", () => {
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
      });
    });
  });