open Wonder_jest;

let _ =
  describe(
    "test send finish send job data job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "send data to main worker",
        () =>
          testPromise(
            "test send data",
            () => {
              /* TODO refactor: move to test tool */
              open Js.Promise;
              /* TODO use tool instead of service (all) */
              let worker = WorkerService.getSelf();
              let postMessageToWorker = WorkerToolWorker.stubPostMessage(sandbox, worker);
              let flag = Some([|"FINISH_SEND_JOB_DATA"|]);
              SendFinishSendJobDataRenderWorkerJob.execJob(
                flag,
                None,
                RenderWorkerStateData.renderWorkerStateData
              )
              |> Most.drain
              |> then_(
                   () =>
                     postMessageToWorker
                     |> withOneArg({"operateType": OptionService.unsafeGet(flag)[0]})
                     |> expect
                     |> toCalledOnce
                     |> resolve
                 )
            }
          )
      )
    }
  );