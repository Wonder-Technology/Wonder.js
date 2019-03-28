open Wonder_jest;

let _ =
  describe("test update_script job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

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

    describe("exec all update event functions", () => {
      describe("test one script component with one event function data", () => {
        describe("test one script component with one attribute", () => {
          test("test attribute", () => {
            let (state, gameObject, script1) =
              ScriptTool.createGameObject(state^);
            let (state, gameObject, script2) =
              ScriptTool.createGameObject(state);
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

            let state = DirectorTool.runWithDefaultTime(state);

            (
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValue(
                script1,
                state,
              ),
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValue(
                script2,
                state,
              ),
            )
            |> expect
            == (
                 ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValueAfterExecUpdateEventFunc(),
                 ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValueAfterExecUpdateEventFunc(),
               );
          });
          test("set transform local position in update", () => {
            let (state, gameObject, script1) =
              ScriptTool.createGameObject(state^);
            let (state, gameObject, script2) =
              ScriptTool.createGameObject(state);
            let state =
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptData(
                ~script=script1,
                ~state,
                ~updateFunc=
                  ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildSetLocalPositionEventFunc(),
                (),
              );
            let state =
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptData(
                ~script=script2,
                ~state,
                (),
              );

            let state = DirectorTool.runWithDefaultTime(state);

            (
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getLocalPosition(
                script1,
                state,
              ),
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValue(
                script2,
                state,
              ),
            )
            |> expect
            == (
                 ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getLocalPositionAfterExec(),
                 ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValueAfterExecUpdateEventFunc(),
               );
          });
        });

        test("test one script component with two attributes", () => {
          let (state, gameObject, script1) =
            ScriptTool.createGameObject(state^);
          let (state, gameObject, script2) =
            ScriptTool.createGameObject(state);
          let state =
            ScriptTool.TestCaseWithOneEventFuncAndTwoAttributes.buildScriptData(
              script1,
              state,
            );
          let state =
            ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptData(
              ~script=script2,
              ~state,
              (),
            );

          let state = DirectorTool.runWithDefaultTime(state);

          (
            ScriptTool.TestCaseWithOneEventFuncAndTwoAttributes.getAttribute1FieldBValue(
              script1,
              state,
            ),
            ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValue(
              script2,
              state,
            ),
          )
          |> expect
          == (
               ScriptTool.TestCaseWithOneEventFuncAndTwoAttributes.getAttribute1FieldBValueAfterExecUpdateEventFunc(),
               ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValueAfterExecUpdateEventFunc(),
             );
        });
      });

      test("test one script component with two event function data", () => {
        let (state, gameObject, script1) =
          ScriptTool.createGameObject(state^);
        let (state, gameObject, script2) =
          ScriptTool.createGameObject(state);
        let state =
          ScriptTool.TestCaseWithTwoEventFuncsAndTwoAttributes.buildScriptData(
            script1,
            state,
          );
        let state =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptData(
            ~script=script2,
            ~state,
            (),
          );

        let state = DirectorTool.runWithDefaultTime(state);

        (
          ScriptTool.TestCaseWithTwoEventFuncsAndTwoAttributes.getAttribute1FieldAValue(
            script1,
            state,
          ),
          ScriptTool.TestCaseWithTwoEventFuncsAndTwoAttributes.getAttribute1FieldBValue(
            script1,
            state,
          ),
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValue(
            script2,
            state,
          ),
        )
        |> expect
        == (
             ScriptTool.TestCaseWithTwoEventFuncsAndTwoAttributes.getAttribute1FieldAValueAfterExecUpdateEventFunc(),
             ScriptTool.TestCaseWithTwoEventFuncsAndTwoAttributes.getAttribute1FieldBValueAfterExecUpdateEventFunc(),
             ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValueAfterExecUpdateEventFunc(),
           );
      });
    });
  });