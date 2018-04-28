open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "GetIsDebugDataRenderWorkerJob",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestMainWorkerTool.initWithJobConfig(
              ~sandbox,
              ~buffer=SettingTool.buildBufferConfigStr(),
              ()
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "get isDebug data and set to main state data",
        () =>
          testPromise(
            "test",
            () => {
              RenderWorkerStateTool.createStateAndSetToStateData()
              |> FakeGlWorkerTool.setFakeGlToRenderWorkerState(
                   FakeGlWorkerTool.buildFakeGl(~sandbox, ())
                 );
              WorkerJobWorkerTool.execRenderWorkerJob(
                ~execJobFunc=GetIsDebugDataRenderWorkerJob.execJob |> Obj.magic,
                ~completeFunc=
                  (state) =>
                    MainStateDataTool.getIsDebug(MainStateTool.getStateData())
                    |> expect == true
                    |> resolve,
                ~e=Some({"data": {"isDebug": true}}) |> Obj.magic,
                ()
              )
            }
          )
      );
      describe(
        "test sended init render data->isDebug",
        () => {
          beforeEach(() => SettingWorkerTool.buildFakeCanvasForNotPassCanvasId(sandbox));
          testPromise(
            "test false",
            () => {
              MainStateDataTool.setIsDebug(MainStateTool.getStateData(), false) |> ignore;
              MainInitJobMainWorkerTool.prepare()
              |> MainInitJobMainWorkerTool.test(
                   sandbox,
                   (state) => WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state),
                   (postMessageToRenderWorker) =>
                     postMessageToRenderWorker
                     |> expect
                     |> toCalledWith([|
                          SendInitRenderDataWorkerTool.buildInitRenderData(~isDebug=false, ())
                        |])
                 )
            }
          );
          testPromise(
            "test true",
            () => {
              MainStateDataTool.setIsDebug(MainStateTool.getStateData(), true) |> ignore;
              MainInitJobMainWorkerTool.prepare()
              |> MainInitJobMainWorkerTool.test(
                   sandbox,
                   (state) => WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state),
                   (postMessageToRenderWorker) =>
                     postMessageToRenderWorker
                     |> expect
                     |> toCalledWith([|
                          SendInitRenderDataWorkerTool.buildInitRenderData(~isDebug=true, ())
                        |])
                 )
            }
          )
        }
      )
    }
  );