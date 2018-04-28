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
            TestToolMainWorker.initWithJobConfig(
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
              |> FakeGlToolWorker.setFakeGlToRenderWorkerState(
                   FakeGlToolWorker.buildFakeGl(~sandbox, ())
                 );
              WorkerJobToolWorker.execRenderWorkerJob(
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
          beforeEach(() => SettingToolWorker.buildFakeCanvasForNotPassCanvasId(sandbox));
          testPromise(
            "test false",
            () => {
              MainStateDataTool.setIsDebug(MainStateTool.getStateData(), false) |> ignore;
              MainInitJobToolMainWorker.prepare()
              |> MainInitJobToolMainWorker.test(
                   sandbox,
                   (state) => WorkerInstanceToolMainWorker.unsafeGetRenderWorker(state),
                   (postMessageToRenderWorker) =>
                     postMessageToRenderWorker
                     |> expect
                     |> toCalledWith([|
                          SendInitRenderDataToolWorker.buildInitRenderData(~isDebug=false, ())
                        |])
                 )
            }
          );
          testPromise(
            "test true",
            () => {
              MainStateDataTool.setIsDebug(MainStateTool.getStateData(), true) |> ignore;
              MainInitJobToolMainWorker.prepare()
              |> MainInitJobToolMainWorker.test(
                   sandbox,
                   (state) => WorkerInstanceToolMainWorker.unsafeGetRenderWorker(state),
                   (postMessageToRenderWorker) =>
                     postMessageToRenderWorker
                     |> expect
                     |> toCalledWith([|
                          SendInitRenderDataToolWorker.buildInitRenderData(~isDebug=true, ())
                        |])
                 )
            }
          )
        }
      )
    }
  );