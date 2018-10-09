open Wonder_jest;

let _ =
  describe("test redo,undo material", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();

      state :=
        RenderJobsTool.initWithJobConfig(
          sandbox,
          LoopRenderJobTool.buildNoWorkerJobConfig(),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("fix bug", () =>
      describe(
        {|create material1;
            dispose material1;
            create material2;
            deep copy;
            create material3;
            restore;

            material3 should need init|},
        () => {
          test("test light material", () => {
            let state =
              state^
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
            let state = AllMaterialTool.prepareForInit(state);

            let (state, gameObject1, material1) =
              LightMaterialTool.createGameObject(state);
            let state = GameObjectAPI.initGameObject(gameObject1, state);
            let state =
              GameObjectTool.disposeGameObjectLightMaterialComponent(
                gameObject1,
                material1,
                state,
              );
            let copiedState = state |> MainStateTool.deepCopyForRestore;
            let (state, gameObject2, material2) =
              LightMaterialTool.createGameObject(state);
            let state = GameObjectAPI.initGameObject(gameObject2, state);
            let restoredState = MainStateTool.restore(state, copiedState);
            let (restoredState, gameObject3, material3) =
              LightMaterialTool.createGameObject(restoredState);

            LightMaterialTool.isNeedInitMaterial(material3, state)
            |> expect == true;
          });
          test("test basic material", () => {
            let state =
              state^
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
            let state = AllMaterialTool.prepareForInit(state);

            let (state, gameObject1, material1) =
              BasicMaterialTool.createGameObject(state);
            let state = GameObjectAPI.initGameObject(gameObject1, state);
            let state =
              GameObjectTool.disposeGameObjectBasicMaterialComponent(
                gameObject1,
                material1,
                state,
              );
            let copiedState = state |> MainStateTool.deepCopyForRestore;
            let (state, gameObject2, material2) =
              BasicMaterialTool.createGameObject(state);
            let state = GameObjectAPI.initGameObject(gameObject2, state);
            let restoredState = MainStateTool.restore(state, copiedState);
            let (restoredState, gameObject3, material3) =
              BasicMaterialTool.createGameObject(restoredState);

            BasicMaterialTool.isNeedInitMaterial(material3, state)
            |> expect == true;
          });
        },
      )
    );
  });