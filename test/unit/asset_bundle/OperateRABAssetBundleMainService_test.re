open Wonder_jest;

let _ =
  describe("OperateRABAssetBundleMainService", () => {
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

    describe("releaseLoadedRAB", () => {
      let _prepare = state => {
        let rabRelativePath = "rab1.rab";
        let rab = Obj.magic(100);
        let state =
          state
          |> OperateRABAssetBundleMainService.setLoadedRAB(
               rabRelativePath,
               rab,
             )
          |> OperateRABAssetBundleMainService.markLoaded(rabRelativePath);

        (state, rabRelativePath, rab);
      };

      test("delete loaded rab", () => {
        let (state, rabRelativePath, rab) = _prepare(state^);

        let state =
          OperateRABAssetBundleMainService.releaseLoadedRAB(
            rabRelativePath,
            state,
          );

        OperateRABAssetBundleMainService.getLoadedRAB(rabRelativePath, state)
        |> expect == None;
      });
      test("mark not loaded", () => {
        let (state, rabRelativePath, rab) = _prepare(state^);

        let state =
          OperateRABAssetBundleMainService.releaseLoadedRAB(
            rabRelativePath,
            state,
          );

        OperateRABAssetBundleMainService.isLoaded(rabRelativePath, state)
        |> expect == false;
      });
    });

    describe("releaseAssembleRABData", () => {
      let _prepare =
          (
            ~state,
            ~rabRelativePath="rab1.rab",
            ~imageMapByName=WonderCommonlib.ImmutableHashMapService.createEmpty(),
            ~basicSourceTextureMapByName=WonderCommonlib.ImmutableHashMapService.createEmpty(),
            ~cubemapTextureMapByName=WonderCommonlib.ImmutableHashMapService.createEmpty(),
            ~basicMaterialMap=WonderCommonlib.ImmutableHashMapService.createEmpty(),
            ~lightMaterialMap=WonderCommonlib.ImmutableHashMapService.createEmpty(),
            ~geometryMap=WonderCommonlib.ImmutableHashMapService.createEmpty(),
            ~scriptEventFunctionDataMap=WonderCommonlib.ImmutableHashMapService.createEmpty(),
            ~scriptAttributeMap=WonderCommonlib.ImmutableHashMapService.createEmpty(),
            (),
          ) => {
        let state =
          state
          |> OperateRABAssetBundleMainService.markAssembled(rabRelativePath)
          |> OperateRABAssetBundleMainService.setAssembleRABData(
               rabRelativePath,
               (
                 imageMapByName,
                 basicSourceTextureMapByName,
                 cubemapTextureMapByName,
                 basicMaterialMap,
                 lightMaterialMap,
                 geometryMap,
                 scriptEventFunctionDataMap,
                 scriptAttributeMap,
               ),
             );

        (state, rabRelativePath);
      };

      test("delete assembled image", () => {
        let rabRelativePath = "rab1.rab";
        let imageName = "a";
        let (state, rabRelativePath) =
          _prepare(
            ~state=state^,
            ~rabRelativePath,
            ~imageMapByName=
              WonderCommonlib.ImmutableHashMapService.createEmpty()
              |> WonderCommonlib.ImmutableHashMapService.set(
                   imageName,
                   Obj.magic(10),
                 ),
            (),
          );

        let state =
          OperateRABAssetBundleMainService.releaseAssembleRABData(
            rabRelativePath,
            state,
          );

        OperateRABAssetBundleMainService.findImageByName(
          rabRelativePath,
          imageName,
          state,
        )
        |> expect == None;
      });
      test("mark not assembled", () => {
        let (state, rabRelativePath) = _prepare(~state=state^, ());

        let state =
          OperateRABAssetBundleMainService.releaseAssembleRABData(
            rabRelativePath,
            state,
          );

        OperateRABAssetBundleMainService.isAssembled(rabRelativePath, state)
        |> expect == false;
      });
    });
  });