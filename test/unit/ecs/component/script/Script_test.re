open Wonder_jest;

let _ =
  describe("Script", () => {
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

    describe("createScript", () => {
      test("create a new script which is just index(int)", () => {
        let (_, script) = ScriptAPI.createScript(state^);

        expect(script) == 0;
      });

      describe("change state", () =>
        test("state->index + 1", () => {
          let (state, _) = ScriptAPI.createScript(state^);

          state.scriptRecord |> (record => expect(record.index) == 1);
        })
      );
    });

    describe("removeScriptEventFunctionData", () =>
      test(
        "remove script's eventFunctionData by scriptEventFunctionDataName", () => {
        let (state, script) = ScriptAPI.createScript(state^);
        let scriptEventFunctionData1 =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptEventFunctionData(
            ~initFunc=
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildInitEventFunc()
              ->Some,
            ~updateFunc=
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildUpdateEventFunc()
              ->Some,
            ~disposeFunc=
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildSetLocalPositionEventFunc()
              ->Some,
          );
        let scriptEventFunctionDataName1 = "scriptEventFunctionData1";
        let scriptEventFunctionData2 =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptEventFunctionData(
            ~initFunc=
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildUpdateEventFunc()
              ->Some,
            ~updateFunc=
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildInitEventFunc()
              ->Some,
            ~disposeFunc=
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildSetLocalPositionEventFunc()
              ->Some,
          );
        let scriptEventFunctionDataName2 = "scriptEventFunctionData2";
        let state =
          ScriptAPI.addScriptEventFunctionData(
            script,
            scriptEventFunctionDataName1,
            scriptEventFunctionData1,
            state,
          );
        let state =
          ScriptAPI.addScriptEventFunctionData(
            script,
            scriptEventFunctionDataName2,
            scriptEventFunctionData2,
            state,
          );

        let state =
          ScriptAPI.removeScriptEventFunctionData(
            script,
            scriptEventFunctionDataName2,
            state,
          );

        ScriptAPI.unsafeGetScriptEventFunctionDataEntries(script, state)
        |> expect
        == [|(scriptEventFunctionDataName1, scriptEventFunctionData1)|];
      })
    );

    describe("removeScriptAttribute", () =>
      test("remove script's eventFunctionData by scriptAttributeName", () => {
        let (state, script) = ScriptAPI.createScript(state^);
        let scriptAttributeName1 = "scriptAttribute1";
        let scriptAttribute1 =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptAttribute(
            scriptAttributeName1,
          );
        let scriptAttributeName2 = "scriptAttribute2";
        let scriptAttribute2 =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptAttribute(
            scriptAttributeName2,
          );
        let state =
          ScriptAPI.addScriptAttribute(
            script,
            scriptAttributeName1,
            scriptAttribute1,
            state,
          );
        let state =
          ScriptAPI.addScriptAttribute(
            script,
            scriptAttributeName2,
            scriptAttribute2,
            state,
          );

        let state =
          ScriptAPI.removeScriptAttribute(
            script,
            scriptAttributeName2,
            state,
          );

        ScriptAPI.unsafeGetScriptAttributeEntries(script, state)
        |> expect == [|(scriptAttributeName1, scriptAttribute1)|];
      })
    );

    describe("unsafeGetScriptEventFunctionDataEntries", () =>
      test("unsafe get scrip's all scriptEventFunction data entries", () => {
        let (state, script) = ScriptAPI.createScript(state^);
        let scriptEventFunctionData1 =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptEventFunctionData(
            ~initFunc=
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildInitEventFunc()
              ->Some,
            ~updateFunc=
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildUpdateEventFunc()
              ->Some,
            ~disposeFunc=
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildSetLocalPositionEventFunc()
              ->Some,
          );
        let scriptEventFunctionDataName1 = "scriptEventFunctionData1";
        let scriptEventFunctionData2 =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptEventFunctionData(
            ~initFunc=
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildUpdateEventFunc()
              ->Some,
            ~updateFunc=
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildInitEventFunc()
              ->Some,
            ~disposeFunc=
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildSetLocalPositionEventFunc()
              ->Some,
          );
        let scriptEventFunctionDataName2 = "scriptEventFunctionData2";
        let state =
          ScriptAPI.addScriptEventFunctionData(
            script,
            scriptEventFunctionDataName1,
            scriptEventFunctionData1,
            state,
          );
        let state =
          ScriptAPI.addScriptEventFunctionData(
            script,
            scriptEventFunctionDataName2,
            scriptEventFunctionData2,
            state,
          );

        ScriptAPI.unsafeGetScriptEventFunctionDataEntries(script, state)
        |> expect
        == [|
             (scriptEventFunctionDataName1, scriptEventFunctionData1),
             (scriptEventFunctionDataName2, scriptEventFunctionData2),
           |];
      })
    );

    describe("unsafeGetScriptAttributeEntries", () =>
      test("unsafe get scrip's all scriptAttributes entries", () => {
        let (state, script) = ScriptAPI.createScript(state^);
        let scriptAttributeName1 = "scriptAttribute1";
        let scriptAttribute1 =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptAttribute(
            scriptAttributeName1,
          );
        let scriptAttributeName2 = "scriptAttribute2";
        let scriptAttribute2 =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptAttribute(
            scriptAttributeName2,
          );
        let state =
          ScriptAPI.addScriptAttribute(
            script,
            scriptAttributeName1,
            scriptAttribute1,
            state,
          );
        let state =
          ScriptAPI.addScriptAttribute(
            script,
            scriptAttributeName2,
            scriptAttribute2,
            state,
          );

        ScriptAPI.unsafeGetScriptAttributeEntries(script, state)
        |> expect
        == [|
             (scriptAttributeName1, scriptAttribute1),
             (scriptAttributeName2, scriptAttribute2),
           |];
      })
    );

    describe("unsafeGetScriptGameObject", () =>
      test("get script's gameObject", () => {
        let (state, script) = ScriptAPI.createScript(state^);
        let (state, gameObject) = state |> GameObjectAPI.createGameObject;
        let state =
          state
          |> GameObjectAPI.addGameObjectScriptComponent(gameObject, script);

        state
        |> ScriptAPI.unsafeGetScriptGameObject(script)
        |> expect == gameObject;
      })
    );

    describe("replaceScriptEventFunctionData", () =>
      test("replace script's event function data", () => {
        let (state, script) = ScriptAPI.createScript(state^);
        let scriptEventFunctionData1 =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptEventFunctionData(
            ~initFunc=
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildInitEventFunc()
              ->Some,
            ~updateFunc=
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildUpdateEventFunc()
              ->Some,
            ~disposeFunc=
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildSetLocalPositionEventFunc()
              ->Some,
          );
        let scriptEventFunctionDataName1 = "scriptEventFunctionData1";
        let state =
          ScriptAPI.addScriptEventFunctionData(
            script,
            scriptEventFunctionDataName1,
            scriptEventFunctionData1,
            state,
          );

        let scriptEventFunctionData2 =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptEventFunctionData(
            ~initFunc=
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildUpdateEventFunc()
              ->Some,
            ~updateFunc=
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildInitEventFunc()
              ->Some,
            ~disposeFunc=
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildSetLocalPositionEventFunc()
              ->Some,
          );

        let state =
          ScriptAPI.replaceScriptEventFunctionData(
            script,
            (scriptEventFunctionDataName1, scriptEventFunctionDataName1),
            scriptEventFunctionData2,
            state,
          );

        ScriptAPI.unsafeGetScriptEventFunctionDataEntries(script, state)
        |> expect
        == [|(scriptEventFunctionDataName1, scriptEventFunctionData2)|];
      })
    );

    describe("replaceScriptAttribute", () =>
      test("replace script's event function data", () => {
        let (state, script) = ScriptAPI.createScript(state^);
        let scriptAttributeName1 = "scriptAttribute1";
        let scriptAttribute1 =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptAttribute(
            scriptAttributeName1,
          );
        let scriptAttributeName2 = "scriptAttribute2";
        let state =
          ScriptAPI.addScriptAttribute(
            script,
            scriptAttributeName1,
            scriptAttribute1,
            state,
          );

        let scriptAttribute2 =
          ScriptTool.TestCaseWithOneEventFuncAndTwoAttributes.buildScriptAttribute2(
            scriptAttributeName2,
          );

        let state =
          ScriptAPI.replaceScriptAttribute(
            script,
            (scriptAttributeName1, scriptAttributeName2),
            scriptAttribute2,
            state,
          );

        ScriptAPI.unsafeGetScriptAttributeEntries(script, state)
        |> expect == [|(scriptAttributeName2, scriptAttribute2)|];
      })
    );

    describe("unsafeGetScriptAttributeFieldDefaultValue", () =>
      test("unsafe get script->attribute->field->default value", () => {
        let (state, script) = ScriptAPI.createScript(state^);
        let state =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptData(
            ~script,
            ~state,
            (),
          );
        let newValue = 3;

        let state =
          ScriptAPI.setScriptAttributeFieldDefaultValueAndValue(
            script,
            ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getScriptAttributeName(),
            "a",
            newValue |> ScriptAttributeType.intToScriptAttributeValue,
            state,
          );

        ScriptAPI.unsafeGetScriptAttributeFieldDefaultValue(
          script,
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getScriptAttributeName(),
          "a",
          state,
        )
        |> ScriptAttributeType.scriptAttributeValueToInt
        |> expect == newValue;
      })
    );

    describe("setScriptAttributeFieldDefaultValueAndValue", () =>
      test(
        "set script->attribute->field->default value and value to be target value",
        () => {
        let (state, script) = ScriptAPI.createScript(state^);
        let state =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptData(
            ~script,
            ~state,
            (),
          );
        let newValue = 3;

        let state =
          ScriptAPI.setScriptAttributeFieldDefaultValueAndValue(
            script,
            ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getScriptAttributeName(),
            "a",
            newValue |> ScriptAttributeType.intToScriptAttributeValue,
            state,
          );

        (
          ScriptTool.unsafeGetScriptAttributeIntFieldValue(
            script,
            ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getScriptAttributeName(),
            "a",
            state,
          ),
          ScriptTool.unsafeGetScriptAttributeIntFieldDefaultValue(
            script,
            ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getScriptAttributeName(),
            "a",
            state,
          ),
        )
        |> expect == (newValue, newValue);
      })
    );

    describe("dispose component", () => {
      let _prepareTwo = state => {
        let (state, gameObject1, _, (script1, _)) =
          CameraTool.createCameraGameObject(state);
        let (state, gameObject2, _, (script2, _)) =
          CameraTool.createCameraGameObject(state);
        (state, gameObject1, script1, gameObject2, script2);
      };

      test("exec script's all dispose event functions", () => {
        let (state, gameObject1, script1) =
          ScriptTool.createGameObject(state^);
        let state =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptData(
            ~script=script1,
            ~state,
            ~disposeFunc=
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildSetLocalPositionEventFunc(),
            (),
          );

        let transform1 =
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            gameObject1,
            state,
          );
        let state =
          state
          |> GameObjectTool.disposeGameObjectScriptComponent(
               gameObject1,
               script1,
             );

        TransformAPI.getTransformLocalPosition(transform1, state)
        |> expect
        == ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getLocalPositionAfterExec();
      });

      describe("dispose data", () => {
        test("remove from gameObjectMap", () => {
          open StateDataMainType;
          let (state, gameObject1, script1) =
            ScriptTool.createGameObject(state^);

          let state =
            state
            |> GameObjectTool.disposeGameObjectScriptComponent(
                 gameObject1,
                 script1,
               );

          let {gameObjectMap} = state.scriptRecord;
          gameObjectMap
          |> WonderCommonlib.MutableSparseMapService.has(script1)
          |> expect == false;
        });
        test("remove from scriptEventFunctionDataMap,scriptAttributeMap", () => {
          open StateDataMainType;
          let (state, gameObject1, script1) =
            ScriptTool.createGameObject(state^);

          let state =
            state
            |> GameObjectTool.disposeGameObjectScriptComponent(
                 gameObject1,
                 script1,
               );

          let {scriptEventFunctionDataMap, scriptAttributeMap} =
            state.scriptRecord;
          (
            scriptEventFunctionDataMap
            |> WonderCommonlib.MutableSparseMapService.has(script1),
            scriptAttributeMap
            |> WonderCommonlib.MutableSparseMapService.has(script1),
          )
          |> expect == (false, false);
        });
      });

      describe("test add new one after dispose old one", () =>
        test("use disposed index as new index firstly", () => {
          let (state, gameObject1, script1) =
            ScriptTool.createGameObject(state^);

          let state =
            state
            |> GameObjectTool.disposeGameObjectScriptComponent(
                 gameObject1,
                 script1,
               );
          let (state, gameObject2, script2) =
            ScriptTool.createGameObject(state);

          script2 |> expect == script1;
        })
      );
    });
  });