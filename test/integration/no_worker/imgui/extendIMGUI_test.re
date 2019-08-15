open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("test extend imgui", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        TestTool.initWithJobConfig(
          ~sandbox,
          ~noWorkerJobRecord=
            NoWorkerJobConfigTool.buildNoWorkerJobConfig(
              ~initPipelines=
                {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "init_imgui"
        }
      ]
    }
  ]
        |},
              ~initJobs=
                {|
[
        {
          "name": "init_imgui"
        }
]
        |},
              ~loopPipelines=
                {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "render_imgui"
        }
      ]
    }
  ]
        |},
              ~loopJobs=
                {|
[
        {
          "name": "render_imgui"
        }
]
        |},
              (),
            ),
          (),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test extend by add skin data and add custom control", () =>
      describe("test render", () =>
        test("test color buffer data", () => {
          let state = RenderIMGUITool.prepareIMGUI(state);
          let (state, array_buffer, dynamic_draw, bufferData) =
            RenderIMGUITool.prepareGl(sandbox, state);

          let state = ExtendIMGUITool.addExtendDataAndSetIMGUIFunc(state);

          let state = state |> NoWorkerJobTool.execInitJobs;

          let bufferDataCallCountAfterInit = bufferData |> getCallCount;

          let state = state |> NoWorkerJobTool.execLoopJobs;

          ExtendIMGUITool.judgeColorBufferData(
            bufferData,
            bufferDataCallCountAfterInit,
          );
        })
      )
    );
  });