open WonderBsMost;

let loadAndAssembleAB =
    (
      abRelativePath,
      wholeManifest,
      wholeDependencyRelationMap,
      (
        getAssetBundlePathFunc,
        isAssetBundleArrayBufferCachedFunc,
        getAssetBundleArrayBufferCacheFunc,
        cacheAssetBundleArrayBufferFunc,
      ),
    ) => {
  /* state, */

  let state = StateDataMainService.unsafeGetState(StateDataMain.stateData);

  AssembleABSystem.isAssembled(abRelativePath, state) ?
    Most.empty() :
    {
      let hashId =
        ParseABSystem.WAB.unsafeGetHashId(abRelativePath, wholeManifest);

      isAssetBundleArrayBufferCachedFunc(abRelativePath, hashId) ?
        getAssetBundleArrayBufferCacheFunc(abRelativePath) |> Most.just :
        LoadABSystem.load(getAssetBundlePathFunc() ++ abRelativePath)
        |> Most.tap(ab =>
             cacheAssetBundleArrayBufferFunc(abRelativePath, ab, hashId)
           )
        |> Most.flatMap(ab =>
             AssembleABSystem.assemble(
               abRelativePath,
               ab,
               wholeDependencyRelationMap,
               /* StateDataMainService.setState(StateDataMain.stateData, state)
                  |> ignore; */
             )
           );
    };
};

let loadAndAssembleAllDependencies =
    (
      abRelativePath,
      wholeManifest,
      (
        getAssetBundlePathFunc,
        isAssetBundleArrayBufferCachedFunc,
        getAssetBundleArrayBufferCacheFunc,
        cacheAssetBundleArrayBufferFunc,
      ),
    ) => {
  let state = StateDataMainService.unsafeGetState(StateDataMain.stateData);

  AssembleABSystem.isAssembled(abRelativePath, state) ?
    Most.empty() :
    {
      let wholeDependencyRelationMap =
        ParseABSystem.WAB.getWholeDependencyRelationMap(wholeManifest);

      FindDependencyDataSystem.findAllDependencyAbRelativePath(
        abRelativePath,
        wholeDependencyRelationMap,
      )
      |> Js.Array.map(abRelativePath
           /* let state = StateDataMainService.unsafeGetState(StateDataMain.stateData); */
           =>
             loadAndAssembleAB(
               abRelativePath,
               wholeManifest,
               wholeDependencyRelationMap,
               (
                 getAssetBundlePathFunc,
                 isAssetBundleArrayBufferCachedFunc,
                 getAssetBundleArrayBufferCacheFunc,
                 cacheAssetBundleArrayBufferFunc,
               ),
               /* state, */
             )
           )
      |> Most.mergeArray;
      /* |> WonderCommonlib.ArrayService.reduceOneParam(
           (. stream, abRelativePath) =>
             stream
             |> Most.flatMap(state =>
                  loadAndAssembleAB(
                    abRelativePath,
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