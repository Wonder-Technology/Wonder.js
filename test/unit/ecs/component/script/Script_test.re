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
            ~disposeFunc=ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildSetLocalPositionEventFunc,
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