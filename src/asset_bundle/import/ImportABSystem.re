open WonderBsMost;

module All = {
  let loadAB =
      (
        abRelativePath,
        wholeManifest,
        wholeDependencyRelationMap,
        (
          getAssetBundlePathFunc,
          isAssetBundleArrayBufferCachedFunc,
          getAssetBundleArrayBufferCacheFunc,
          cacheAssetBundleArrayBufferFunc,
          fetchFunc,
        ),
      ) => {
    let hashId =
      ParseABSystem.WAB.unsafeGetHashId(abRelativePath, wholeManifest);

    isAssetBundleArrayBufferCachedFunc(abRelativePath, hashId) ?
      getAssetBundleArrayBufferCacheFunc(abRelativePath) |> Most.just :
      LoadABSystem.load(getAssetBundlePathFunc() ++ abRelativePath, fetchFunc)
      |> Most.tap(ab =>
           cacheAssetBundleArrayBufferFunc(abRelativePath, ab, hashId)
         );
  };
};

module SAB = {
  let loadSABAndSetToState =
      (
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
      ) => {
    let state = StateDataMainService.unsafeGetState(StateDataMain.stateData);

    let wholeDependencyRelationMap =
      ParseABSystem.WAB.getWholeDependencyRelationMap(wholeManifest);

    OperateSABAssetBundleMainService.isLoaded(sabRelativePath, state) ?
      Most.empty() :
      All.loadAB(
        sabRelativePath,
        wholeManifest,
        wholeDependencyRelationMap,
        (
          getAssetBundlePathFunc,
          isAssetBundleArrayBufferCachedFunc,
          getAssetBundleArrayBufferCacheFunc,
          cacheAssetBundleArrayBufferFunc,
          fetchFunc,
        ),
      )
      |> Most.tap(sab => {
           let state =
             StateDataMainService.unsafeGetState(StateDataMain.stateData);

           state
           |> OperateSABAssetBundleMainService.markLoaded(sabRelativePath)
           |> OperateSABAssetBundleMainService.setLoadedSAB(
                sabRelativePath,
                sab,
              )
           |> StateDataMainService.setState(StateDataMain.stateData)
           |> ignore;
         })
      |> Most.map(_ => ());
  };
};

module RAB = {
  let _loadAndAssembleRAB =
      (
        rabRelativePath,
        wholeManifest,
        wholeDependencyRelationMap,
        (
          getAssetBundlePathFunc,
          isAssetBundleArrayBufferCachedFunc,
          getAssetBundleArrayBufferCacheFunc,
          cacheAssetBundleArrayBufferFunc,
          fetchFunc,
        ),
      ) => {
    let state = StateDataMainService.unsafeGetState(StateDataMain.stateData);

    OperateRABAssetBundleMainService.isAssembled(rabRelativePath, state) ?
      Most.empty() :
      All.loadAB(
        rabRelativePath,
        wholeManifest,
        wholeDependencyRelationMap,
        (
          getAssetBundlePathFunc,
          isAssetBundleArrayBufferCachedFunc,
          getAssetBundleArrayBufferCacheFunc,
          cacheAssetBundleArrayBufferFunc,
          fetchFunc,
        ),
      )
      |> Most.flatMap(rab =>
           AssembleABSystem.RAB.assemble(
             rabRelativePath,
             rab,
             wholeDependencyRelationMap,
           )
         );
  };

  let loadAndAssembleAllDependencyRAB =
      (
        abRelativePath,
        wholeManifest,
        (
          getAssetBundlePathFunc,
          isAssetBundleArrayBufferCachedFunc,
          getAssetBundleArrayBufferCacheFunc,
          cacheAssetBundleArrayBufferFunc,
          fetchFunc,
        ),
      ) => {
    let wholeDependencyRelationMap =
      ParseABSystem.WAB.getWholeDependencyRelationMap(wholeManifest);

    FindDependencyDataSystem.findAllDependencyRAbRelativePath(
      abRelativePath,
      wholeDependencyRelationMap,
    )
    |> Js.Array.map(
         (
           rabRelativePath,
           /* let state = StateDataMainService.unsafeGetState(StateDataMain.stateData); */
           (),
         ) =>
         _loadAndAssembleRAB(
           rabRelativePath,
           wholeManifest,
           wholeDependencyRelationMap,
           (
             getAssetBundlePathFunc,
             isAssetBundleArrayBufferCachedFunc,
             getAssetBundleArrayBufferCacheFunc,
             cacheAssetBundleArrayBufferFunc,
             fetchFunc,
           ),
           /* state, */
         )
       )
    /* |> Most.mergeArray; */
    |> MostUtils.concatExecStreamArr;
    /* |> WonderCommonlib.ArrayService.reduceOneParam(
         (. stream, rabRelativePath) =>
           stream
           |> Most.flatMap(state =>
                loadAndAssembleAB(
                  rabRelativePath,
                  wholeManifest,
                  (
                    getAssetBundlePathFunc,
                    isAssetBundleArrayBufferCachedFunc,
                    getAssetBundleArrayBufferCacheFunc,
                    cacheAssetBundleArrayBufferFunc,
                  ),
                  state,
                )
              ),
         Most.just(state),
       ); */
  };
};

let setSABSceneGameObjectToBeScene = (sceneGameObject, state) =>
  GameObjectSceneMainService.setSceneGameObject(sceneGameObject, state);

let disposeSceneAllChildren = state => {
  let scene = state |> GameObjectSceneMainService.getSceneGameObject;

  state
  |> AllGameObjectMainService.getAllGameObjects(scene)
  |> Js.Array.sliceFrom(1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, gameObject) =>
         state |> DisposeGameObjectMainService.deferDispose(gameObject),
       state,
     );
};