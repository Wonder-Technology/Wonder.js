open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "test detect gl render worker job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestToolMainWorker.initWithJobConfig(
              ~sandbox,
              ~buffer=SettingTool.buildBufferConfigStr(),
              ()
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "detect extension",
        () =>
          testPromise(
            "detect instanced_arrays",
            () => {
              let renderWorkerState = RenderWorkerStateTool.createStateAndSetToStateData();
              let renderWorkerState =
                renderWorkerState |> FakeGlToolWorker.setFakeGlToRenderWorkerState(FakeGlToolWorker.buildFakeGl(~sandbox, ()));
              WorkerJobToolWorker.execRenderWorkerJob(
                ~execJobFunc=DetectGlRenderWorkerJob.execJob,
                ~completeFunc=
                  (state) => {
                    let gl = GlToolRenderWorker.unsafeGetGl(state) |> Obj.magic;
                    gl##getExtension |> expect |> toCalledOnce |> resolve
                  },
                ()
              )
            }
          )
      )
    }
  );