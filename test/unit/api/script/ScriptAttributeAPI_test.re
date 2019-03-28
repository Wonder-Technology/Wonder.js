open Wonder_jest;

let _ =
  describe("ScriptAttributeAPI", () => {
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

    describe("removeScriptAttributeField", () =>
      test("remove script attribute field", () => {
        let (state, script) = ScriptAPI.createScript(state^);

        let scriptAttributeName1 = "scriptAttribute1";
        let scriptAttribute1 =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptAttribute(
            scriptAttributeName1,
          );
        let state =
          ScriptAPI.addScriptAttribute(
            script,
            scriptAttributeName1,
            scriptAttribute1,
            state,
          );

        let scriptAttribute1 =
          ScriptAttributeAPI.removeScriptAttributeField(
            "b",
            scriptAttribute1,
          );

        ScriptAttributeAPI.getScriptAttributeEntries(scriptAttribute1)
        |> expect
        == [|
             (
               "a",
               ScriptTool.unsafeGetScriptAttributeEntries(
                 "a",
                 scriptAttribute1,
               ),
             ),
           |];
      })
    );

    describe("getScriptAttributeEntries", () =>
      test("get script attribute entries", () => {
        let (state, script) = ScriptAPI.createScript(state^);

        let scriptAttributeName1 = "scriptAttribute1";
        let scriptAttribute1 =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptAttribute(
            scriptAttributeName1,
          );
        let state =
          ScriptAPI.addScriptAttribute(
            script,
            scriptAttributeName1,
            scriptAttribute1,
            state,
          );

        ScriptAttributeAPI.getScriptAttributeEntries(scriptAttribute1)
        |> expect
        == [|
             (
               "a",
               ScriptTool.unsafeGetScriptAttributeEntries(
                 "a",
                 scriptAttribute1,
               ),
             ),
             (
               "b",
               ScriptTool.unsafeGetScriptAttributeEntries(
                 "b",
                 scriptAttribute1,
               ),
             ),
           |];
      })
    );
  });