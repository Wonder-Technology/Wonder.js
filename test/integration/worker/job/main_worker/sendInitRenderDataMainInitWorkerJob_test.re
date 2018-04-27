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
          let _buildInitRenderData = () => {
            "operateType": "INIT_RENDER",
            "canvas": Sinon.matchAny,
            "contextConfig": Sinon.matchAny,
            "bufferData": Sinon.matchAny,
            "gpuData": Sinon.matchAny,
            "memoryData": Sinon.matchAny,
            "renderConfigData": Sinon.matchAny,
            "workerDetectData": Sinon.matchAny,
            "transformData": Sinon.matchAny,
            "basicMaterialData": Sinon.matchAny,
            "lightMaterialData": Sinon.matchAny,
            "customGeometryData": Sinon.matchAny,
            "ambientLightData": Sinon.matchAny,
            "directionLightData": Sinon.matchAny,
            "pointLightData": Sinon.matchAny
          };
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