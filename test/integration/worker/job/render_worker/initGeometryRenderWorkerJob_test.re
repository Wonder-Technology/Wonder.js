open Wonder_jest;

open Js.Promise;

open WonderImgui.IMGUIType;

let _ =
  describe("test init geometry render worker job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    let _prepare = () => IMGUIRenderWorkerTool.prepareState(sandbox);

    beforeEach(() => {
      sandbox := createSandbox();

      SettingWorkerTool.buildFakeCanvasForNotPassCanvasId(sandbox);
      state :=
        TestMainWorkerTool.initWithJobConfig(
          ~sandbox,
          ~workerJobRecord=WorkerJobTool.buildWorkerJobConfig(),
          (),
        );
    });
    afterEach(() => TestWorkerTool.clear(sandbox));

    describe("test send init data to render worker", () =>
      testPromise("send indicesTypeMap", () => {
        let (state, _, _, _, _, _, _) =
          GeometryTool.createThreeGameObjectsAndSetFullPointData(state^);
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
                      ~geometryData={
                        "buffer": Sinon.matchAny,
                        "indicesTypeMap":
                          GeometryTool.getRecord(state).indicesTypeMap,
                      },
                      (),
                    ),
                  )
               |> getCallCount
               |> expect == 1,
           );
      })
    );

    describe("test render worker job", () =>
      testPromise("get indicesTypeMap", () => {
        let state =
          state^
          |> FakeGlWorkerTool.setFakeGl(
               FakeGlWorkerTool.buildFakeGl(~sandbox, ()),
             );
        let (state, _, _, _, _, _, _) =
          GeometryTool.createThreeGameObjectsAndSetFullPointData(state);
        let indicesTypeMapInMainState =
          GeometryTool.getRecord(state).indicesTypeMap;
        MainStateTool.setState(state);

        RenderJobsRenderWorkerTool.init(
          state => {
            let renderWorkerState = RenderWorkerStateTool.unsafeGetState();
            let {indicesTypeMap}: RenderWorkerGeometryType.geometryRecord =
              RecordGeometryRenderWorkerService.getRecord(renderWorkerState);

            indicesTypeMap |> expect == indicesTypeMapInMainState |> resolve;
          },
          state,
        );
      })
    );
  });