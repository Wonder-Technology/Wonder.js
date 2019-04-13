open Wonder_jest;

let _ =
  describe("test redo,undo script", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();

      state := TestTool.initWithJobConfig(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test deep copy script record", () =>
      test("shadow copy gameObjectMap, isActiveMap", () =>
        StateDataMainType.(
          MainStateTool.testShadowCopyArrayLikeMapData(
            state => {
              let {gameObjectMap, isActiveMap} = state.scriptRecord;

              [|gameObjectMap |> Obj.magic, isActiveMap |> Obj.magic|];
            },
            state^,
          )
        )
      )
    );

    describe("test restore", () =>
      test("test restore script attribute", () => {
        let (state, gameObject1, script1) =
          ScriptTool.createGameObject(state^);
        let state =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptData(
            ~script=script1,
            ~state,
            (),
          );
        let state =
          state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

        let value = 3;
        let state =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.setScriptAttributeFieldAValue(
            script1,
            value,
            state,
          );
        let copiedState = MainStateTool.deepCopyForRestore(state);
        let state =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.setScriptAttributeFieldAValue(
            script1,
            5,
            state,
          );
        let restoredState = MainStateTool.restore(state, copiedState);

        ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldAValue(
          script1,
          restoredState,
        )
        |> expect == value;
      })
    );
  });