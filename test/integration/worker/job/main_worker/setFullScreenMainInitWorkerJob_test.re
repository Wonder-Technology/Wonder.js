open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "test set full screen main worker job",
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
        "set canvas",
        () => {
          let (width, height) = RootTool.setRoot();
          let state =
            state^ |> FakeGlWorkerTool.setFakeGl(FakeGlWorkerTool.buildFakeGl(~sandbox, ()));
          SettingWorkerTool.buildFakeCanvasForNotPassCanvasId(sandbox);
          RenderJobsRenderWorkerTool.init(
            (state) => {
              let canvasDom = ViewTool.getCanvas(state) |> Obj.magic;
              (
                canvasDom##width,
                canvasDom##height,
                canvasDom##style##position,
                canvasDom##style##left,
                canvasDom##style##top,
                canvasDom##style##width,
                canvasDom##style##height
              )
              |> expect == (width, height, "absolute", "0px", "0px", "100%", "100%")
              |> resolve
            },
            state
          )
        }
      )
    }
  );