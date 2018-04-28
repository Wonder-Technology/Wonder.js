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
          SettingWorkerTool.buildFakeCanvasForNotPassCanvasId(sandbox);
          TestMainWorkerTool.initWithJobConfig(
            ~sandbox,
            ~workerJobRecord=WorkerJobTool.buildWorkerJobConfig(),
            ()
          )
          |> ignore
        }
      );
      afterEach(() => TestWorkerTool.clear(sandbox));
      describe(
        "send data to render worker",
        () => {
          let _buildInitRenderData = () => SendInitRenderDataWorkerTool.buildInitRenderData();
          testPromise(
            "test send data",
            () =>
              MainInitJobMainWorkerTool.prepare()
              |> MainInitJobMainWorkerTool.test(
                   sandbox,
                   (state) => WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state),
                   (postMessageToRenderWorker) =>
                     postMessageToRenderWorker
                     |> expect
                     |> toCalledWith([|_buildInitRenderData()|])
                 )
          );
          testPromise(
            "test send after send job data",
            () =>
              MainInitJobMainWorkerTool.prepare()
              |> MainInitJobMainWorkerTool.test(
                   sandbox,
                   (state) => WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state),
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