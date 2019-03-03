open Wonder_jest;

open Js.Promise;

let _ =
  describe("SendFinishSendJobRenderWorkerJob", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("send data to main worker", () =>
      testPromise("test send data", () => {
        let worker = WorkerRenderWorkerTool.getSelf();
        let postMessageToWorker =
          WorkerWorkerTool.stubPostMessage(sandbox, worker);
        let flag = Some([|"FINISH_SEND_JOB_DATA"|]);
        SendFinishSendJobDataRenderWorkerJob.execJob(
          flag,
          None,
          RenderWorkerStateTool.getStateData(),
        )
        |> WonderBsMost.Most.drain
        |> then_(() =>
             postMessageToWorker
             |> withOneArg({"operateType": OptionTool.unsafeGet(flag)[0]})
             |> expect
             |> toCalledOnce
             |> resolve
           );
      })
    );
  });