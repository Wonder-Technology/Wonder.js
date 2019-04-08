open Wonder_jest;

let _ =
  describe("test exec script event function", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    let _buildNoWorkerJobConfig = () =>
      NoWorkerJobConfigTool.buildNoWorkerJobConfig(
        ~loopPipelines=
          {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "update_script"
        }
      ]
    }
  ]
        |},
        (),
      );

    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        TestTool.initWithJobConfig(
          ~sandbox,
          ~noWorkerJobRecord=_buildNoWorkerJobConfig(),
          (),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("if script event function, not exec", () =>
      describe("test update event func", () => {
        test("test not exec", () => {
          let (state, gameObject, script1) =
            ScriptTool.createGameObject(state^);
          let state =
            ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptData(
              ~script=script1,
              ~state,
              (),
            );
          let state =
            ScriptEventFunctionAPI.disableScriptEventFunction(state);

          let state = DirectorTool.runWithDefaultTime(state);

          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValue(
            script1,
            state,
          )
          |> expect
          == ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValueBeforeExecUpdateEventFunc();
        });
        test("test exec after enable", () => {
          let (state, gameObject, script1) =
            ScriptTool.createGameObject(state^);
          let state =
            ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptData(
              ~script=script1,
              ~state,
              (),
            );

          let state =
            ScriptEventFunctionAPI.disableScriptEventFunction(state);
          let state = DirectorTool.runWithDefaultTime(state);
          let state = ScriptEventFunctionAPI.enableScriptEventFunction(state);
          let state = DirectorTool.runWithDefaultTime(state);

          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValue(
            script1,
            state,
          )
          |> expect
          == ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValueAfterExecUpdateEventFunc();
        });
      })
    );
  });