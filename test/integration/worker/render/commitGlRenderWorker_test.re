open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "test commit gl",
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
              ~buffer=
                SettingTool.buildBufferConfigStr(
                  ~transformDataBufferCount=5,
                  ~basicMaterialDataBufferCount=5,
                  ()
                ),
              ()
            )
        }
      );
      afterEach(() => TestToolWorker.clear(sandbox));
      describe(
        "should only commit once",
        () =>
          testPromise(
            "test render basic and front render light",
            () => {
              let (state, _, _, _, _) = RenderBasicJobTool.prepareGameObject(sandbox, state^);
              let (state, _, _, _, _) = FrontRenderLightJobTool.prepareGameObject(sandbox, state);
              let (state, _, _, _) = CameraTool.createCameraGameObject(state);
              let commit = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlToolWorker.setFakeGl(FakeGlToolWorker.buildFakeGl(~sandbox, ~commit, ()));
              RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
                ~state,
                ~sandbox,
                ~completeFunc=(_) => commit |> expect |> toCalledOnce |> resolve,
                ()
              )
            }
          )
      )
    }
  );