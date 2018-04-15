open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "test render basic render worker job",
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
              ~buffer=SettingTool.buildBufferConfigStr(~basicMaterialDataBufferCount=5, ()),
              ()
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "use program",
        () => {
          let _prepare = (sandbox, state) => {
            let (state, _, _, _, _) = RenderBasicJobTool.prepareGameObject(sandbox, state);
            let (state, _, _, _) = CameraTool.createCameraGameObject(state);
            state
          };
          let _prepareForUseProgram = (sandbox, state) =>
            RenderJobsRenderWorkerTool.prepareForUseProgram(sandbox, _prepare, state);
          testPromise(
            "test",
            () => {
              let (state, program, useProgram) = _prepareForUseProgram(sandbox, state^);
              RenderJobsRenderWorkerTool.initAndLoop(
                (state) => useProgram |> expect |> toCalledWith([|program|]) |> resolve,
                state
              )
            }
          )
        }
      )
    }
  );