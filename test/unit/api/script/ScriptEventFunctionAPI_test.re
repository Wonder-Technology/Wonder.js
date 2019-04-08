open Wonder_jest;

let _ =
  describe("ScriptEventFunctionAPI", () => {
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

    describe("isScriptEventFunctionEnable", () =>
      test("return is script event function enable", () => {
        let (state, gameObject, script1) =
          ScriptTool.createGameObject(state^);
        let state =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptData(
            ~script=script1,
            ~state,
            (),
          );
        let state = ScriptEventFunctionAPI.disableScriptEventFunction(state);

        ScriptEventFunctionAPI.isScriptEventFunctionEnable(state)
        |> expect == false;
      })
    );
  });