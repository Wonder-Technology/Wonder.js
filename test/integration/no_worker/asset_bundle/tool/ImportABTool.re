module RAB = {
  let getRabRelativePaths = () => {
    let rab1RelativePath = "rab1.rab";
    let rab2RelativePath = "rab2.rab";
    let rab3RelativePath = "rab3.rab";

    (rab1RelativePath, rab2RelativePath, rab3RelativePath);
  };

  let buildWholeHashIdMap =
      (
        (rab1RelativePath, rab2RelativePath, rab3RelativePath),
        (hashId1, hashId2, hashId3),
      ) =>
    WonderCommonlib.ImmutableHashMapService.createEmpty()
    |> WonderCommonlib.ImmutableHashMapService.set(rab1RelativePath, hashId1)
    |> WonderCommonlib.ImmutableHashMapService.set(rab2RelativePath, hashId2)
    |> WonderCommonlib.ImmutableHashMapService.set(rab3RelativePath, hashId3);

  let getHashId2 = () => "h2";

  let buildWholeDependencyRelationMap =
      ((rab1RelativePath, rab2RelativePath, rab3RelativePath)) =>
    GenerateAllABTool.buildDependencyRelation([|
      [|rab3RelativePath, rab2RelativePath, rab1RelativePath|],
    |]);

  let buldWholeManifest =
      (
        ~rabRelativePaths=getRabRelativePaths(),
        ~wholeHashIdMap=buildWholeHashIdMap(
                          rabRelativePaths,
                          ("h1", getHashId2(), "h3"),
                        ),
        ~wholeDependencyRelationMap=buildWholeDependencyRelationMap(
                                      rabRelativePaths,
                                    ),
        (),
      ) =>
    WABType.{wholeHashIdMap, wholeDependencyRelationMap};

  let loadAllDependencyRABAndSetToState =
      (
        ~abRelativePath,
        ~wholeManifest=buldWholeManifest(
                         ~rabRelativePaths=getRabRelativePaths(),
                         ~wholeHashIdMap=
                           buildWholeHashIdMap(
                             getRabRelativePaths(),
                             ("h1", "h2", "h3"),
                           ),
                         ~wholeDependencyRelationMap=
                           buildWholeDependencyRelationMap(
                             getRabRelativePaths(),
                           ),
                         (),
                       ),
        ~getAssetBundlePathFunc=(.) => "",
        ~initAssetBundleArrayBufferCache=LoadABSystem.initAssetBundleArrayBufferCache,
        ~isAssetBundleArrayBufferCachedFunc=LoadABSystem.isAssetBundleArrayBufferCached,
        ~getAssetBundleArrayBufferCacheFunc=LoadABSystem.getAssetBundleArrayBufferCache,
        ~cacheAssetBundleArrayBufferFunc=LoadABSystem.cacheAssetBundleArrayBuffer,
        ~fetchFunc=FetchCommon.fetch,
        (),
      ) =>
    ImportABSystem.RAB.loadAllDependencyRABAndSetToState(
      abRelativePath,
      wholeManifest,
      (
        getAssetBundlePathFunc,
        isAssetBundleArrayBufferCachedFunc,
        getAssetBundleArrayBufferCacheFunc,
        cacheAssetBundleArrayBufferFunc,
        fetchFunc,
      ),
    );

  let assembleAllDependencyRAB =
      (
        ~abRelativePath,
        ~wholeDependencyRelationMap=buildWholeDependencyRelationMap(
                                      getRabRelativePaths(),
                                    ),
        (),
      ) =>
    ImportABSystem.RAB.assembleAllDependencyRAB(
      abRelativePath,
      wholeDependencyRelationMap,
    );
};

module SAB = {
  let getABRelativePaths = () => {
    let rab1RelativePath = "rab1.rab";
    let rab2RelativePath = "rab2.rab";
    let sab1RelativePath = "sab1.sab";

    (rab1RelativePath, rab2RelativePath, sab1RelativePath);
  };

  let getSABRelativePath = () => {
    let (rab1RelativePath, rab2RelativePath, sab1RelativePath) =
      getABRelativePaths();

    sab1RelativePath;
  };

  let getRABRelativePaths = () => {
    let (rab1RelativePath, rab2RelativePath, sab1RelativePath) =
      getABRelativePaths();

    (rab1RelativePath, rab2RelativePath);
  };

  let buildWholeHashIdMap =
      (
        (rab1RelativePath, rab2RelativePath, sab1RelativePath),
        (hashId1, hashId2, hashId3),
      ) =>
    WonderCommonlib.ImmutableHashMapService.createEmpty()
    |> WonderCommonlib.ImmutableHashMapService.set(rab1RelativePath, hashId1)
    |> WonderCommonlib.ImmutableHashMapService.set(rab2RelativePath, hashId2)
    |> WonderCommonlib.ImmutableHashMapService.set(sab1RelativePath, hashId3);

  let getHashId2 = () => "h2";

  let buildWholeDependencyRelationMap =
      ((rab1RelativePath, rab2RelativePath, sab1RelativePath)) =>
    GenerateAllABTool.buildDependencyRelation([|
      [|sab1RelativePath, rab2RelativePath, rab1RelativePath|],
    |]);

  let buldWholeManifest =
      (
        ~abRelativePaths=getABRelativePaths(),
        ~wholeHashIdMap=buildWholeHashIdMap(
                          abRelativePaths,
                          ("h1", getHashId2(), "h3"),
                        ),
        ~wholeDependencyRelationMap=buildWholeDependencyRelationMap(
                                      abRelativePaths,
                                    ),
        (),
      ) =>
    WABType.{wholeHashIdMap, wholeDependencyRelationMap};

  let loadSABAndSetToState =
      (
        ~sabRelativePath,
        ~wholeManifest=buldWholeManifest(
                         ~abRelativePaths=getABRelativePaths(),
                         ~wholeHashIdMap=
                           buildWholeHashIdMap(
                             getABRelativePaths(),
                             ("h1", "h2", "h3"),
                           ),
                         ~wholeDependencyRelationMap=
                           buildWholeDependencyRelationMap(
                             getABRelativePaths(),
                           ),
                         (),
                       ),
        ~getAssetBundlePathFunc=(.) => "",
        ~initAssetBundleArrayBufferCache=LoadABSystem.initAssetBundleArrayBufferCache,
        ~isAssetBundleArrayBufferCachedFunc=LoadABSystem.isAssetBundleArrayBufferCached,
        ~getAssetBundleArrayBufferCacheFunc=LoadABSystem.getAssetBundleArrayBufferCache,
        ~cacheAssetBundleArrayBufferFunc=LoadABSystem.cacheAssetBundleArrayBuffer,
        ~fetchFunc=FetchCommon.fetch,
        (),
      ) =>
    ImportABSystem.SAB.loadSABAndSetToState(
      sabRelativePath,
      wholeManifest,
      /* wholeDependencyRelationMap, */
      (
        getAssetBundlePathFunc,
        isAssetBundleArrayBufferCachedFunc,
        getAssetBundleArrayBufferCacheFunc,
        cacheAssetBundleArrayBufferFunc,
        fetchFunc,
      ),
    );
};

module WAB = {
  let getWABRelativePath = () => "wab1.wab";

  let buildWAB = () => Obj.magic(-1);

  let loadWABAndSetToState =
      (
        ~wabRelativePath,
        ~getAssetBundlePathFunc=(.) => "",
        ~fetchFunc=FetchCommon.fetch,
        (),
      ) =>
    ImportABSystem.WAB.loadWABAndSetToState(
      wabRelativePath,
      (getAssetBundlePathFunc, fetchFunc),
    );
};