open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "GetWorkerDetectDataRenderWorkerJob",
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
        "get worker detect data and set to main state data",
        () =>
          testPromise(
            "test",
            () => {
              RenderWorkerStateTool.createStateAndSetToStateData();
              WorkerJobWorkerTool.execRenderWorkerJob(
                ~execJobFunc=GetWorkerDetectDataRenderWorkerJob.execJob |> Obj.magic,
                ~completeFunc=
                  (state) =>
                    WorkerDetectRenderWorkerTool.getRecord(state).isUseWorker
                    |> expect == true
                    |> resolve,
                ~e=Some({"data": {"workerDetectData": {"isUseWorker": true}}}) |> Obj.magic,
                ()
              )
            }
          )
      );
      describe(
        "test sended init render data->workerDetectData",
        () => {
          beforeEach(() => SettingWorkerTool.buildFakeCanvasForNotPassCanvasId(sandbox));
          testPromise(
            "test",
            () => {
              let state =
                WorkerDetectMainWorkerTool.markIsSupportRenderWorkerAndSharedArrayBuffer(
                  false,
                  state^
                )
                |> SettingTool.setUseWorker(false);
              MainStateTool.setState(state);
              MainInitJobMainWorkerTool.prepare()
              |> MainInitJobMainWorkerTool.test(
                   sandbox,
                   (state) => WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state),
                   (postMessageToRenderWorker) =>
                     postMessageToRenderWorker
                     |> expect
                     |> toCalledWith([|
                          SendInitRenderDataWorkerTool.buildInitRenderData(
                            ~workerDetectData={"isUseWorker": false},
                            ()
                          )
                        |])
                 )
            }
          )
        }
      )
    }
  );