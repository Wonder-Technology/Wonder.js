open Wonder_jest;

open Js.Promise;

open WonderImgui.IMGUIType;

open Js.Typed_array;

let _ =
  describe("test extend imgui in render worker", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => TestWorkerTool.clear(sandbox));

    describe("test extend by add skin data and add custom control", () =>
      describe("test render", () => {
        /* TODO duplicate */

        beforeAllPromise(() =>
          BasicSourceTextureRenderWorkerTool.buildFakeCreateImageBitmapFunc()
        );
        afterAllPromise(() =>
          BasicSourceTextureRenderWorkerTool.clearFakeCreateImageBitmapFunc()
        );

        testPromise("test color buffer data", () => {
          let (state, bufferData) =
            IMGUIWorkerTool.prepareForTestInRenderWorkerJob(sandbox);

          let state = ExtendIMGUITool.addExtendDataAndSetExecFunc(state);

          let bufferDataCallCountAfterInit = ref(0);
          RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
            ~state,
            ~sandbox,
            ~beforeExecRenderRenderWorkerJobsFunc=
              state =>
                bufferDataCallCountAfterInit := bufferData |> getCallCount,
            ~completeFunc=
              _ =>
                RenderIMGUITool.judgeNoTextureProgramColorBufferData(
                  bufferData,
                  bufferDataCallCountAfterInit^,
                )
                |> resolve,
            (),
          );
        });
      })
    );
  });