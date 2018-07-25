open Wonder_jest;

open Js.Promise;

open WonderImgui.IMGUIType;

let _ =
  describe("test sync control data between main worker and render worker", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => TestWorkerTool.clear(sandbox));

    describe("test send render data to render worker", () => {
      let _prepare = () =>
        IMGUIWorkerTool.prepareForTestSendRenderData(sandbox);

      testPromise("send controlData", () => {
        open IMGUIType;

        let controlData = IMGUIWorkerTool.buildControlData();
        let (state, postMessageToRenderWorker) = _prepare();
        let state = IMGUITool.setControlData(controlData, state);
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
                       "controlData": controlData,
                       "ioData": Sinon.matchAny,
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
    });

    describe("test render worker job", () => {
      beforeAllPromise(() =>
        BasicSourceTextureRenderWorkerTool.buildFakeCreateImageBitmapFunc()
      );
      afterAllPromise(() =>
        BasicSourceTextureRenderWorkerTool.clearFakeCreateImageBitmapFunc()
      );

      describe("test render imgui", () =>
        testPromise("set controlData from main worker", () => {
          let (state, _) =
            IMGUIWorkerTool.prepareForTestInRenderWorkerJob(sandbox);
          let state =
            ManageIMGUIAPI.setIMGUIFunc(
              IMGUIWorkerTool.buildEmptyCustomData(),
              (. customData, apiJsObj, state) => state,
              state,
            );
          let controlData = IMGUIWorkerTool.buildControlData();
          let state = IMGUITool.setControlData(controlData, state);

          RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
            ~state,
            ~sandbox,
            ~completeFunc=
              _ =>
                IMGUIWorkerTool.isRenderWorkerControlDataEqualMainWorkerControlData(
                  RenderWorkerStateTool.unsafeGetState()
                  |> IMGUIRenderWorkerTool.getControlData,
                  controlData,
                )
                |> expect == true
                |> resolve,
            (),
          );
        })
      );

      describe("test send finish render data", () =>
        testPromise("send controlData", () => {
          let (state, _) =
            IMGUIWorkerTool.prepareForTestInRenderWorkerJob(sandbox);
          let state =
            ManageIMGUIAPI.setIMGUIFunc(
              IMGUIWorkerTool.buildEmptyCustomData(),
              (. customData, apiJsObj, state) => state,
              state,
            );
          let controlData = IMGUIWorkerTool.buildControlData();
          let state = IMGUITool.setControlData(controlData, state);
          let selfPostMessage =
            RenderJobsRenderWorkerTool.stubSelfPostMessage(sandbox^);

          RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
            ~state,
            ~sandbox,
            ~completeFunc=
              _ =>
                selfPostMessage
                |> expect
                |> toCalledWith([|
                     GetFinishRenderDataMainWorkerTool.buildFinishRenderData(
                       ~imguiData={
                         "controlData":
                           IMGUIWorkerTool.buildControlDataAfterRenderIMGUI(
                             controlData,
                           ),
                       },
                       (),
                     ),
                   |])
                |> resolve,
            (),
          );
        })
      );
    });

    describe("test get finish render data in main worker", () =>
      test("sync controlData from render worker to main worker", () => {
        let state = MainStateTool.createState();
        let imguiData = {
          "controlData":
            IMGUIWorkerTool.buildControlDataAfterRenderIMGUI(
              IMGUIWorkerTool.buildControlData(),
            ),
        };

        let state =
          GetFinishRenderDataMainWorkerJob._exec(
            GetFinishRenderDataMainWorkerTool.buildFinishRenderData(
              ~imguiData,
              (),
            ),
            state,
          );

        IMGUIWorkerTool.getMainWorkerControlData(state)
        |> expect == imguiData##controlData;
      })
    );
  });