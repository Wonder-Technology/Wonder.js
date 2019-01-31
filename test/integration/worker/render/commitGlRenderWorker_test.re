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
            TestMainWorkerTool.initWithJobConfig(
              ~sandbox,
              ~buffer=
                SettingTool.buildBufferConfigStr(
                  ~transformCount=5,
                  ~basicMaterialCount=8,
                  ()
                ),
              ()
            )
        }
      );
      afterEach(() => TestWorkerTool.clear(sandbox));
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
                |> FakeGlWorkerTool.setFakeGl(FakeGlWorkerTool.buildFakeGl(~sandbox, ~commit, ()));
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