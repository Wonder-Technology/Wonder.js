open Wonder_jest;

let _ =
  describe("fix assemble wdb bug", () => {
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

      ConvertTool.setFakeTransformCount(50);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test dispose gameObject before assemble", () =>
      testPromise(
        "all components should create component from disposedIndexArray when assemble",
        () => {
          let (
            state,
            gameObject1,
            geometry1,
            _,
            _,
            (diffuseMap1, specularMap1),
          ) =
            FrontRenderLightJobTool.prepareGameObjectWithCreatedMap(
              sandbox,
              state^,
            );
          let (
            state,
            gameObject2,
            geometry2,
            _,
            _,
            (diffuseMap2, specularMap2),
          ) =
            FrontRenderLightJobTool.prepareGameObjectWithCreatedMap(
              sandbox,
              state,
            );
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
          let state =
            state
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          let state = state |> RenderJobsTool.init;
          let state = GameObjectAPI.disposeGameObject(gameObject1, state);
          let state = state |> DirectorTool.runWithDefaultTime;

          AssembleWDBSystemTool.testGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("BoxTextured.glb"),
            ((state, _, rootGameObject)) => {
              let state =
                AssembleWDBSystemTool.getAllGameObjects(rootGameObject, state)
                |> WonderCommonlib.ArrayService.reduceOneParam(
                     (. state, gameObject) =>
                       GameObjectAPI.initGameObject(gameObject, state),
                     state,
                   );

              (
                AssembleWDBSystemTool.getAllGeometrys(rootGameObject, state),
                AssembleWDBSystemTool.getAllDiffuseMaps(
                  rootGameObject,
                  state,
                ),
              )
              |> expect == ([|geometry1|], [|specularMap1|]);
            },
            state,
          );
        },
      )
    );
  });