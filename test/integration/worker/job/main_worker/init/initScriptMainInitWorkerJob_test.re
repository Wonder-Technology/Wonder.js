open Wonder_jest;

open Js.Promise;

let _ =
  describe("test init script main worker job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        TestMainWorkerTool.initWithJobConfig(
          ~sandbox,
          ~buffer=SettingTool.buildBufferConfigStr(),
          (),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    testPromise("exec all init event functions", () => {
      let state =
        state^
        |> FakeGlWorkerTool.setFakeGl(
             FakeGlWorkerTool.buildFakeGl(~sandbox, ()),
           );

      let (state, gameObject1, script1) = ScriptTool.createGameObject(state);
      let state =
        ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptData(
          ~script=script1,
          ~state,
          (),
        );

      SettingWorkerTool.buildFakeCanvasForNotPassCanvasId(sandbox);
      RenderJobsRenderWorkerTool.init(
        state =>
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldAValue(
            script1,
            state,
          )
          |> expect
          == ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldAValueAfterExecInitEventFunc()
          |> resolve,
        state,
      );
    });
  });