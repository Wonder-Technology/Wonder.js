open Wonder_jest;

let _ =
  describe(
    "WorkerJobService",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "getRenderWorkerJobStreamArr",
        () => {
          /* TODO use tool instead of service (all) */
          let _buildWorkerJobs = () =>
            {|
                 [
             {
                 "name": "send_finish_send_job_data",
                 "flags": [
                     "FINISH_SEND_JOB_DATA"
                 ]
             },
             {
                 "name": "send_finish_init_render_data",
                 "flags": [
                     "FINISH_INIT_RENDER"
                 ]
             }
         ]
                 |}
            |> Obj.magic
            |> Js.Json.parseExn
            |> WorkerJobTool.convertWorkerJobsToRecord
            |> Obj.magic;
          testPromise(
            "concat exec sub jobs",
            () => {
              open Js.Promise;
              let worker = WorkerToolRenderWorker.getSelf();
              let postMessageToWorker = WorkerToolWorker.stubPostMessage(sandbox, worker);
              WorkerJobTool.getRenderWorkerJobStreamArr(
                {|
         [
             {
                 "name": "default",
                 "jobs": {
                     "render": [
                         [
                             {
                                 "name": "send_finish_send_job_data"
                             },

                             {
                                 "name": "send_finish_init_render_data"
                             }
                         ]
                     ]
                 }
             }
         ]
                 |}
                |> Obj.magic
                |> Js.Json.parseExn
                |> WorkerJobTool.convertWorkerPipelinesToRecord
                |> WorkerJobTool.getRenderWorkerPipelineJobs("default")
                |> Obj.magic,
                _buildWorkerJobs(),
                (
                  WorkerJobHandleSystem.createWorkerJobHandleMap,
                  WorkerJobHandleSystem.getWorkerJobHandle
                ),
                RenderWorkerStateTool.getStateData()
              )
              |> Most.mergeArray
              |> Most.drain
              |> then_(
                   () =>
                     postMessageToWorker
                     |> withOneArg({"operateType": "FINISH_SEND_JOB_DATA"})
                     |> expect
                     |> toCalledBefore(
                          postMessageToWorker |> withOneArg({"operateType": "FINISH_INIT_RENDER"})
                        )
                     |> resolve
                 )
            }
          );
          testPromise(
            "merge exec main jobs",
            () => {
              open Js.Promise;
              let callCount = ref(0);
              let worker = WorkerToolRenderWorker.getSelf();
              let postMessageToWorker = WorkerToolWorker.stubPostMessage(sandbox, worker);
              WorkerJobTool.getRenderWorkerJobStreamArr(
                {|
         [
             {
                 "name": "default",
                 "jobs": {
                     "render": [
                         [
                             {
                                 "name": "send_finish_send_job_data"
                             }
                         ],
                         [
                             {
                                 "name": "send_finish_init_render_data"
                             }
                         ]
                     ]
                 }
             }
         ]
                 |}
                |> Obj.magic
                |> Js.Json.parseExn
                |> WorkerJobTool.convertWorkerPipelinesToRecord
                |> WorkerJobTool.getRenderWorkerPipelineJobs("default")
                |> Obj.magic,
                _buildWorkerJobs(),
                (
                  WorkerJobHandleSystem.createWorkerJobHandleMap,
                  WorkerJobHandleSystem.getWorkerJobHandle
                ),
                RenderWorkerStateTool.getStateData()
              )
              |> Most.mergeArray
              |> Most.forEach((record) => callCount := callCount^ + 1)
              |> then_(() => callCount^ |> expect == 2 |> resolve)
            }
          )
        }
      )
    }
  );