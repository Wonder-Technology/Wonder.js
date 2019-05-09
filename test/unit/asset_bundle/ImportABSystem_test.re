open Wonder_jest;

let _ =
  describe("ImportABSystem", () => {
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

    describe("setSABSceneGameObjectToBeScene", () =>
      test("set sab->scene gameObject to be scene", () => {
        let (state, gameObject) = GameObjectAPI.createGameObject(state^);

        let state =
          ImportABSystem.setSABSceneGameObjectToBeScene(gameObject, state);

        SceneAPI.getSceneGameObject(state) |> expect == gameObject;
      })
    );

    describe("initAllSABGameObjects", () => {
      beforeEach(() =>
        state :=
          TestTool.initWithJobConfigWithoutBuildFakeDom(
            ~sandbox,
            ~noWorkerJobRecord=NoWorkerJobConfigTool.buildNoWorkerJobConfig(),
            (),
          )
      );

      test("init all sab->gameObjects", () => {
        let (state, gameObject1, _, _) =
          InitLightMaterialJobTool.prepareGameObject(sandbox, state^);
        let (state, gameObject2, _, _) =
          InitLightMaterialJobTool.prepareGameObject(sandbox, state);
        let state =
          state |> GameObjectTool.addChild(gameObject1, gameObject2);
        let attachShader = createEmptyStubWithJsObjSandbox(sandbox);
        let state =
          state
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(~sandbox, ~attachShader, ()),
             );
        let state = AllMaterialTool.prepareForInit(state);

        let state = ImportABSystem.initAllSABGameObjects(gameObject1, state);

        attachShader |> getCallCount |> expect == 2;
      });
    });

    describe("addSABSceneGameObjectChildrenToScene", () =>
      test("add sab->scene gameObject->children to scene", () => {
        let (state, gameObject1) = GameObjectAPI.createGameObject(state^);
        let (state, gameObject2) = GameObjectAPI.createGameObject(state);
        let state =
          state |> GameObjectTool.addChild(gameObject1, gameObject2);

        let (state, gameObject3) = GameObjectAPI.createGameObject(state);

        let state = state |> SceneAPI.addSceneChild(gameObject3);

        let state =
          ImportABSystem.addSABSceneGameObjectChildrenToScene(
            gameObject1,
            state,
          );

        GameObjectTool.getChildren(SceneAPI.getSceneGameObject(state), state)
        |> expect == [|gameObject3, gameObject2|];
      })
    );

    describe("disposeSceneAllChildren", () =>
      test("dispose all scene->children", () => {
        let (state, gameObject1) = GameObjectAPI.createGameObject(state^);
        let (state, gameObject2) = GameObjectAPI.createGameObject(state);
        let state =
          state |> GameObjectTool.addChild(gameObject1, gameObject2);

        let (state, gameObject3) = GameObjectAPI.createGameObject(state);

        let state =
          state |> SceneAPI.addSceneChildren([|gameObject3, gameObject1|]);

        let state = ImportABSystem.disposeSceneAllChildren(state);

        (
          GameObjectTool.isDeferDisposed(gameObject1, state),
          GameObjectTool.isDeferDisposed(gameObject2, state),
          GameObjectTool.isDeferDisposed(gameObject3, state),
        )
        |> expect == (true, true, true);
      })
    );
  });