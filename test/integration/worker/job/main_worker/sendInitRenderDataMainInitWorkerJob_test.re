open Wonder_jest;

let _ =
  describe(
    "test send init render data main worker job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          SettingToolWorker.buildFakeCanvasForNotPassCanvasId(sandbox);
          TestToolMainWorker.initWithJobConfig(
            ~sandbox,
            ~workerJobRecord=WorkerJobTool.buildWorkerJobConfig(),
            ()
          )
          |> ignore
        }
      );
      afterEach(() => TestToolWorker.clear(sandbox));
      describe(
        "send data to render worker",
        () => {
          let _buildInitRenderData = () => SendInitRenderDataToolWorker.buildInitRenderData();
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
                     |> toCalledWith([|_buildInitRenderData()|])
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
                     |> withOneArg(_buildInitRenderData())
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