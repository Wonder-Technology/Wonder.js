open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "test set viewport render worker job",
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
      testPromise(
        "set gl viewport",
        () => {
          let (width, height) = RootTool.setRoot();
          let state =
            state^ |> FakeGlToolWorker.setFakeGl(FakeGlToolWorker.buildFakeGl(~sandbox, ()));
          SettingToolWorker.buildFakeCanvasForNotPassCanvasId(sandbox);
          RenderJobsRenderWorkerTool.init(
            (state) => {
              let fakeGl = [@bs] GlTool.unsafeGetGl(state) |> Obj.magic;
              fakeGl##viewport |> expect |> toCalledWith([|0., 0., 100., 200.|]) |> resolve
            },
            state
          )
        }
      )
    }
  );