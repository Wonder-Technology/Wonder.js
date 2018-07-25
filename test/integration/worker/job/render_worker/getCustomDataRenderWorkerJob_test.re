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

      testPromise("send customData", () => {
        let (state, postMessageToRenderWorker) = _prepare();
        let customData = 100;
        let state = WorkerDataAPI.setMainWorkerCustomData(customData, state);
        MainStateTool.setState(state);

        WorkerJobWorkerTool.execMainWorkerJob(
          ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
          ~completeFunc=
            _ =>
              postMessageToRenderWorker
              |> expect
              |> toCalledWith([|
                   SendRenderRenderDataWorkerTool.buildRenderRenderData(
                     ~customData,
                     (),
                   ),
                 |])
              |> resolve,
          (),
        );
      });
    });

    describe("test render worker job", () =>
      testPromise("get customData", () => {
        let state = TestMainWorkerTool.initWithJobConfig(~sandbox, ());
        let state =
          state
          |> FakeGlWorkerTool.setFakeGl(
               FakeGlWorkerTool.buildFakeGl(~sandbox, ()),
             );
        let customData = 100;
        let state = WorkerDataAPI.setMainWorkerCustomData(customData, state);
        MainStateTool.setState(state);

        RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
          ~state,
          ~sandbox,
          ~completeFunc=
            _ => {
              let renderWorkerState = RenderWorkerStateTool.unsafeGetState();

              OperateCustomRenderWorkerService.getCustomDataFromMainWorkerToRenderWorker(
                renderWorkerState,
              )
              |> Obj.magic
              |> expect == customData
              |> resolve;
            },
          (),
        );
      })
    );
  });