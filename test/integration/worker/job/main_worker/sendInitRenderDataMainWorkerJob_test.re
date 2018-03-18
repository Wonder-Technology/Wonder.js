open Wonder_jest;

let _ =
  describe(
    "test send init render data job",
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
            ~workerJobRecord=WorkerJobTool.buildWorkerJobConfig(),
            ()
          )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "send data to render worker",
        () => {
          testPromise(
            "test send data",
            () =>
              MainInitJobToolMainWorker.prepare()
              |> MainInitJobToolMainWorker.test(
                   sandbox,
                   (state) => WorkerInstanceToolMainWorker.unsafeGetRenderWorker(state),
                   (postMessageToRenderWorker) =>
                     postMessageToRenderWorker
                     |> expect
                     |> toCalledWith([|{"operateType": "INIT_RENDER"}|])
                 )
          );
          testPromise(
            "test send after send job data",
            () =>
              MainInitJobToolMainWorker.prepare()
              |> MainInitJobToolMainWorker.test(
                   sandbox,
                   (state) => WorkerInstanceToolMainWorker.unsafeGetRenderWorker(state),
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
      )
    }
  );