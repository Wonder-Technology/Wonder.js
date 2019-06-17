open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("test redo,undo meshRenderer", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    let _prepareMeshRendererData = state => {
      let (state, gameObject1, meshRenderer1) =
        MeshRendererTool.createBasicMaterialGameObject(state^);
      let (state, gameObject2, meshRenderer2) =
        MeshRendererTool.createLightMaterialGameObject(state);
      let (state, gameObject3, meshRenderer3) =
        MeshRendererTool.createBasicMaterialGameObject(state);
      let state =
        state
        |> GameObjectTool.disposeGameObjectMeshRendererComponent(
             gameObject3,
             meshRenderer3,
           );
      (
        state,
        gameObject1,
        gameObject2,
        gameObject3,
        meshRenderer1,
        meshRenderer2,
        meshRenderer3,
      );
    };

    beforeEach(() => {
      sandbox := createSandbox();

      state :=
        RenderJobsTool.initWithJobConfig(
          sandbox,
          LoopRenderJobTool.buildNoWorkerJobConfig(),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("deep copy meshRenderer record", () => {
      test(
        "shadow copy basicMaterialRenderGameObjectMap,lightMaterialRenderGameObjectMap, gameObjectMap, disposedIndexArray",
        () =>
        StateDataMainType.(
          MeshRendererType.(
            MainStateTool.testShadowCopyArrayLikeMapData(
              state => {
                let {
                  basicMaterialRenderGameObjectMap,
                  lightMaterialRenderGameObjectMap,
                  gameObjectMap,
                  disposedIndexArray,
                } =
                  MeshRendererTool.getRecord(state);
                [|
                  basicMaterialRenderGameObjectMap |> Obj.magic,
                  lightMaterialRenderGameObjectMap |> Obj.magic,
                  gameObjectMap |> Obj.magic,
                  disposedIndexArray |> Obj.magic,
                |];
              },
              state^,
            )
          )
        )
      );
      test("copy drawModes", () =>
        RedoUndoTool.testCopyTypeArraySingleValue(
          (
            MeshRendererTool.createBasicMaterialGameObject,
            (material, state) =>
              MeshRendererAPI.getMeshRendererDrawMode(material, state),
            MeshRendererAPI.setMeshRendererDrawMode,
            () => (
              DrawModeType.Lines |> DrawModeType.drawModeToUint8,
              DrawModeType.Points |> DrawModeType.drawModeToUint8,
            ),
          ),
          state,
        )
      );
      test("copy isRenders", () =>
        RedoUndoTool.testCopyTypeArraySingleValue(
          (
            MeshRendererTool.createBasicMaterialGameObject,
            (material, state) =>
              MeshRendererAPI.getMeshRendererIsRender(material, state),
            MeshRendererAPI.setMeshRendererIsRender,
            () => (
              MeshRendererTool.getDefaultIsRender(),
              ! MeshRendererTool.getDefaultIsRender(),
            ),
          ),
          state,
        )
      );
    });

    describe("restore meshRenderer record to target state", () => {
      let _prepare = state => {
        let (
          state,
          gameObject1,
          gameObject2,
          gameObject3,
          meshRenderer1,
          meshRenderer2,
          meshRenderer3,
        ) =
          _prepareMeshRendererData(state);
        let state = AllMaterialTool.prepareForInit(state);
        let (currentState, gameObject4, meshRenderer4) =
          MeshRendererTool.createBasicMaterialGameObject(
            MainStateTool.createNewCompleteState(sandbox),
          );
        let currentState = AllMaterialTool.pregetGLSLData(currentState);
        (
          (
            state,
            gameObject1,
            gameObject2,
            gameObject3,
            meshRenderer1,
            meshRenderer2,
            meshRenderer3,
          ),
          (currentState, gameObject4, meshRenderer4),
        );
      };

      test("set restored state to stateData", () => {
        let ((state, _, _, _, _, _, _), (currentState, _, _)) =
          _prepare(state);
        let currentState = MainStateTool.restore(currentState, state);
        MainStateTool.unsafeGetState() |> expect == currentState;
      });
      test("change restored state should affect source state", () => {
        let ((state, _, _, _, _, _, _), (currentState, _, _)) =
          _prepare(state);
        let currentState = MainStateTool.restore(currentState, state);
        let (currentState, gameObject5, meshRenderer5) =
          MeshRendererTool.createBasicMaterialGameObject(
            MainStateTool.createNewCompleteState(sandbox),
          );
        state
        |> MeshRendererAPI.unsafeGetMeshRendererGameObject(meshRenderer5)
        |> expect == gameObject5;
      });
      test(
        "changing restored state which is restored from deep copied state shouldn't affect source state",
        () => {
          let (
            (state, gameObject1, gameObject2, gameObject3, _, _, _),
            (currentState, _, _),
          ) =
            _prepare(state);
          let currentState =
            MainStateTool.restore(
              currentState,
              state |> MainStateTool.deepCopyForRestore,
            );
          let (currentState, _, _) =
            MeshRendererTool.createBasicMaterialGameObject(currentState);
          (
            MeshRendererTool.getBasicMaterialRenderGameObjectArray(state),
            MeshRendererTool.getLightMaterialRenderGameObjectArray(state),
          )
          |> expect == ([|gameObject1|], [|gameObject2|]);
        },
      );
      test("test restore typeArrays", () => {
        open MeshRendererType;
        state :=
          TestTool.initWithJobConfigWithoutBuildFakeDom(
            ~sandbox,
            ~buffer=
              SettingTool.buildBufferConfigStr(~meshRendererCount=4, ()),
            (),
          );

        let (
          state,
          gameObject1,
          gameObject2,
          gameObject3,
          meshRenderer1,
          meshRenderer2,
          meshRenderer3,
        ) =
          _prepareMeshRendererData(state);
        let state =
          state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
        let state = AllMaterialTool.pregetGLSLData(state);
        let copiedState = MainStateTool.deepCopyForRestore(state);
        let (currentState, gameObject4, material4) =
          MeshRendererTool.createBasicMaterialGameObject(state);
        let currentState =
          MeshRendererAPI.setMeshRendererDrawMode(
            material4,
            MeshRendererTool.getLines(),
            currentState,
          )
          |> MeshRendererAPI.setMeshRendererIsRender(
               material4,
               ! MeshRendererTool.getDefaultIsRender(),
             );

        let _ = MainStateTool.restore(currentState, copiedState);

        let defaultDrawMode = MeshRendererTool.getDefaultDrawMode();
        let defaultIsRender = MeshRendererTool.getDefaultIsRenderUint8();
        let {drawModes, isRenders} =
          MainStateTool.unsafeGetState() |> MeshRendererTool.getRecord;
        (drawModes, isRenders)
        |>
        expect == (
                    Uint8Array.make([|
                      defaultDrawMode,
                      defaultDrawMode,
                      defaultDrawMode,
                      defaultDrawMode,
                    |]),
                    Uint8Array.make([|
                      defaultIsRender,
                      defaultIsRender,
                      defaultIsRender,
                      defaultIsRender,
                    |]),
                  );
      });
    });
  });