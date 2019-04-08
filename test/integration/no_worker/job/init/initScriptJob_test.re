open Wonder_jest;

let _ =
  describe("test init_script job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    test("exec all init event functions", () => {
      let (state, gameObject, script1) = ScriptTool.createGameObject(state^);
      let (state, gameObject, script2) = ScriptTool.createGameObject(state);
      let state =
        ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptData(
          ~script=script1,
          ~state,
          (),
        );
      let state =
        ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptData(
          ~script=script2,
          ~state,
          (),
        );

      let state = state |> InitScriptJobTool.exec;

      (
        ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldAValue(
          script1,
          state,
        ),
        ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldAValue(
          script2,
          state,
        ),
      )
      |> expect
      == (
           ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldAValueAfterExecInitEventFunc(),
           ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldAValueAfterExecInitEventFunc(),
         );
    });
  });