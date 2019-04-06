open Wonder_jest;
let _ =
  describe("SceneAPI", () => {
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

    describe("addSceneChild", () =>
      test("add child gameObject to sceneGameObject", () => {
        let (state, gameObject, transform) =
          GameObjectTool.createGameObject(state^);

        let state = SceneAPI.addSceneChild(gameObject, state);

        TransformAPI.unsafeGetTransformChildren(
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            SceneAPI.getSceneGameObject(state),
            state,
          ),
          state,
        )
        |> expect == [|transform|];
      })
    );

    describe("addSceneChildren", () =>
      test("add children gameObject arr to sceneGameObject", () => {
        let (state, gameObject1, transform1) =
          GameObjectTool.createGameObject(state^);

        let (state, gameObject2, transform2) =
          GameObjectTool.createGameObject(state);

        let state =
          SceneAPI.addSceneChildren([|gameObject1, gameObject2|], state);

        TransformAPI.unsafeGetTransformChildren(
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            SceneAPI.getSceneGameObject(state),
            state,
          ),
          state,
        )
        |> expect == [|transform1, transform2|];
      })
    );

    describe("setSceneGameObject", () =>
      test("test", () => {
        let (state, gameObject1) = GameObjectAPI.createGameObject(state^);
        let (state, gameObject2) = GameObjectAPI.createGameObject(state);

        let state = SceneAPI.setSceneGameObject(gameObject2, state);

        SceneAPI.getSceneGameObject(state) |> expect == gameObject2;
      })
    );

    describe("findGameObjectsByName", () =>
      test("find gameObjects by name in scene", () => {
        let (state, gameObject1) = GameObjectAPI.createGameObject(state^);
        let (state, gameObject2) = GameObjectAPI.createGameObject(state);
        let name1 = "aaa";
        let name2 = "bbb";
        let state =
          state
          |> GameObjectAPI.setGameObjectName(gameObject1, name1)
          |> GameObjectAPI.setGameObjectName(gameObject2, name2);
        let state =
          SceneAPI.addSceneChildren([|gameObject1, gameObject2|], state);

        SceneAPI.findGameObjectsByName(name2, state)
        |> expect == [|gameObject2|];
      })
    );
  });