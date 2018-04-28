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
            TestMainWorkerTool.initWithJobConfig(
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
            state^ |> FakeGlWorkerTool.setFakeGl(FakeGlWorkerTool.buildFakeGl(~sandbox, ()));
          SettingWorkerTool.buildFakeCanvasForNotPassCanvasId(sandbox);
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