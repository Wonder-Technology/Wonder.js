open Wonder_jest;

open Js.Promise;

let _ =
  describe("test get geometry data render worker job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => TestWorkerTool.clear(sandbox));

    describe("test send render data to render worker", () =>
      testPromise("send indiciesTypeMap", () => {
        let (state, postMessageToRenderWorker) =
          SendRenderDataMainWorkerTool.prepareForTestSendRenderData(sandbox);
        let (state, _, _, _, _, _, _) =
          GeometryTool.createThreeGameObjectsAndSetFullPointData(state);
        let indicesTypeMap = GeometryTool.getRecord(state).indicesTypeMap;
        MainStateTool.setState(state);

        WorkerJobWorkerTool.execMainWorkerJob(
          ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
          ~completeFunc=
            _ =>
              postMessageToRenderWorker
              |> expect
              |> toCalledWith([|
                   SendRenderRenderDataWorkerTool.buildRenderRenderData(
                     ~renderGeometryData={"indicesTypeMap": indicesTypeMap},
                     (),
                   ),
                 |])
              |> resolve,
          (),
        );
      })
    );

    describe("test render worker job", () =>
      testPromise("get indicesTypeMap", () => {
        let state = TestMainWorkerTool.initWithJobConfig(~sandbox, ());
        let state =
          state
          |> FakeGlWorkerTool.setFakeGl(
               FakeGlWorkerTool.buildFakeGl(~sandbox, ()),
             );
        let (state, _, _, _, _, _, _) =
          GeometryTool.createThreeGameObjectsAndSetFullPointData(state);
        let indicesTypeMapInMainState =
          GeometryTool.getRecord(state).indicesTypeMap;
        MainStateTool.setState(state);

        RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
          ~state,
          ~sandbox,
          ~completeFunc=
            _ => {
              let renderWorkerState = RenderWorkerStateTool.unsafeGetState();
              let {indicesTypeMap}: RenderWorkerGeometryType.geometryRecord =
                RecordGeometryRenderWorkerService.getRecord(
                  renderWorkerState,
                );

              indicesTypeMap |> expect == indicesTypeMapInMainState |> resolve;
            },
          (),
        );
      })
    );
  });