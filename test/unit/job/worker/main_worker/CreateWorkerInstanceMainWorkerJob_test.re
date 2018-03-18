open Wonder_jest;

open WorkerJobType;

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
              /* TODO refactor: move to test tool */
              open Js.Promise;
              let workerFileDir = "./worker/";
              let state = StateTool.getState();
              let state = {
                ...state,
                workerJobRecord:
                  RecordWorkerJobService.create((
                    {workerFileDir, mainInitPipeline: "", workerPipeline: ""} |> Obj.magic,
                    Obj.magic(1),
                    Obj.magic(1),
                    Obj.magic(1),
                    Obj.magic(1)
                  ))
              };
              let state = StateTool.setState(state);
              let _buildFakeWorker = [%bs.raw
                {|
  function build(){
  function Worker(path) {
    this.path = path;
  }

  window.Worker = Worker;
  }
  |}
              ];
              _buildFakeWorker();
              CreateWorkerInstanceMainWorkerJob.execJob(None, StateTool.getStateData())
              |> Most.drain
              |> then_(
                   () => {
                     let state = StateTool.getState();
                     Obj.magic(WorkerInstanceToolMainWorker.unsafeGetRenderWorker(state))##path
                     |> expect == {j|$(workerFileDir)wd.render.worker.js|j}
                     |> resolve
                   }
                 )
            }
          )
      )
    }
  );