open Wonder_jest;

open WorkerJobType;

open Js.Promise;

let _ =
  describe(
    "CreateWorkerInstanceMainWorkerJob",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "create worker and set to state",
        () =>
          testPromise(
            "create render worker",
            () => {
              let workerFileDir = "./worker/";
              let state = MainStateTool.getState();
              let state =
                state
                |> WorkerJobTool.createWithRecord((
                     {
                       workerFileDir,
                       mainInitPipeline: "",
                       mainLoopPipeline: "",
                       workerPipeline: ""
                     }
                     |> Obj.magic,
                     Obj.magic(1),
                     Obj.magic(1),
                     Obj.magic(1),
                     Obj.magic(1),
                     Obj.magic(1),
                     Obj.magic(1)
                   ));
              let state = MainStateTool.setState(state);
              WorkerToolMainWorker.buildFakeWorker();
              CreateWorkerInstanceMainWorkerJob.execJob(None, MainStateTool.getStateData())
              |> Most.drain
              |> then_(
                   () => {
                     let state = MainStateTool.getState();
                     Obj.magic(WorkerInstanceToolMainWorker.unsafeGetRenderWorker(state))##path
                     |> expect == {j|$(workerFileDir)wd.render.worker.js|j}
                     |> resolve
                   }
                 )
            }
          )
      )
    }
  )