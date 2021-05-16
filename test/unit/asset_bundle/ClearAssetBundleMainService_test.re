open Wonder_jest;

let _ =
  describe("ClearAssetBundleMainService", () => {
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

    describe("clearAllABData", () => {
      let _prepare = state => {
        let (state, gameObject1, transform) =
          GameObjectTool.createGameObject(state);
        let (state, gameObject2, transform) =
          GameObjectTool.createGameObject(state);

        let state =
          state |> GameObjectTool.addChild(gameObject1, gameObject2);

        let state = SceneAPI.addSceneChild(gameObject1, state);

        (state, (gameObject1, gameObject2));
      };

      test("dispose scene's all children", () => {
        let (state, (gameObject1, gameObject2)) = _prepare(state^);

        let state = ClearAssetBundleMainService.clearAllABData(state);

        (
          GameObjectTool.isDeferDisposed(gameObject1, state),
          GameObjectTool.isDeferDisposed(gameObject1, state),
        )
        |> expect == (true, true);
      });
    });

    describe("clear assembleRABData", () => {
      let _prepare = state => {
        let rabRelativePath1 = "rab1.rab";
        let rabRelativePath2 = "rab2.rab";
        let rab1 = Obj.magic(100);
        let rab2 = Obj.magic(200);
        let state =
          state
          |> OperateRABAssetBundleMainService.setLoadedRAB(
               rabRelativePath1,
               rab1,
             )
          |> OperateRABAssetBundleMainService.markLoaded(rabRelativePath1)
          |> OperateRABAssetBundleMainService.setLoadedRAB(
               rabRelativePath2,
               rab2,
             )
          |> OperateRABAssetBundleMainService.markLoaded(rabRelativePath2);

        (state, ((rabRelativePath1, rab1), (rabRelativePath2, rab2)));
      };

      test("test delete all loaded rabs and mark not loaded", () => {
        let (state, ((rabRelativePath1, rab1), (rabRelativePath2, rab2))) =
          _prepare(state^);

        let state = ClearAssetBundleMainService.clearAllABData(state);

        (
          (
            OperateRABAssetBundleMainService.getLoadedRAB(
              rabRelativePath1,
              state,
            ),
            OperateRABAssetBundleMainService.getLoadedRAB(
              rabRelativePath2,
              state,
            ),
          ),
          (
            OperateRABAssetBundleMainService.isLoaded(rabRelativePath1, state),
            OperateRABAssetBundleMainService.isLoaded(
              rabRelativePath2,
              state,
            ),
          ),
        )
        |> expect == ((None, None), (false, false));
      });
    });

    describe("clear assembleSABData", () => {
      let _prepare = state => {
        let sabRelativePath1 = "sab1.sab";
        let sabRelativePath2 = "sab2.sab";
        let sab1 = Obj.magic(100);
        let sab2 = Obj.magic(200);
        let state =
          state
          |> OperateSABAssetBundleMainService.setLoadedSAB(
               sabRelativePath1,
               sab1,
             )
          |> OperateSABAssetBundleMainService.markLoaded(sabRelativePath1)
          |> OperateSABAssetBundleMainService.setLoadedSAB(
               sabRelativePath2,
               sab2,
             )
          |> OperateSABAssetBundleMainService.markLoaded(sabRelativePath2);

        (state, ((sabRelativePath1, sab1), (sabRelativePath2, sab2)));
      };

      test("test delete all loaded sabs and mark not loaded", () => {
        let (state, ((sabRelativePath1, sab1), (sabRelativePath2, sab2))) =
          _prepare(state^);

        let state = ClearAssetBundleMainService.clearAllABData(state);

        (
          (
            OperateSABAssetBundleMainService.getLoadedSAB(
              sabRelativePath1,
              state,
            ),
            OperateSABAssetBundleMainService.getLoadedSAB(
              sabRelativePath2,
              state,
            ),
          ),
          (
            OperateSABAssetBundleMainService.isLoaded(sabRelativePath1, state),
            OperateSABAssetBundleMainService.isLoaded(
              sabRelativePath2,
              state,
            ),
          ),
        )
        |> expect == ((None, None), (false, false));
      });
    });
  });
