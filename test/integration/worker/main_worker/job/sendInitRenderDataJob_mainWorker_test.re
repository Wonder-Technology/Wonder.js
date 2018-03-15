open Wonder_jest;

let _ =
  describe(
    "test send init render record job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestToolMainWorker.initWithJobConfig(
            ~sandbox,
            ~workerJobRecord=WorkerJobConfigToolWorker.buildWorkerJobConfig(),
            ()
          )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      testPromise(
        "send record",
        () =>
          MainInitJobToolMainWorkerTool.prepare()
          |> MainInitJobToolMainWorkerTool.test(
               sandbox,
               (postMessageToRenderWorker) =>
                 postMessageToRenderWorker
                 |> expect
                 |> toCalledWith([|{"operateType": "INIT_RENDER"}|])
             )
      );
      testPromise(
        "send after send job record",
        () =>
          MainInitJobToolMainWorkerTool.prepare()
          |> MainInitJobToolMainWorkerTool.test(
               sandbox,
               (postMessageToRenderWorker) =>
                 postMessageToRenderWorker
                 |> withOneArg({"operateType": "INIT_RENDER"})
                 |> expect
                 |> toCalledAfter(
                      postMessageToRenderWorker
                      |> withOneArg({
                           "operateType": "SEND_JOB_DATA",
                           "pipelineJobs": Sinon.matchAny,
                           "jobs": Sinon.matchAny
                         })
                    )
             )
      )
    }
  );