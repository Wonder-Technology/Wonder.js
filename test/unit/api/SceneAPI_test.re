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
  });