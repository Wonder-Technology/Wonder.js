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

    isAssetBundleArrayBufferCachedFunc(. abRelativePath, hashId)
    |> Most.flatMap(isCached =>
         isCached ?
           getAssetBundleArrayBufferCacheFunc(. abRelativePath) :
           LoadABSystem.load(
             getAssetBundlePathFunc(.) ++ abRelativePath,
             fetchFunc,
           )
           |> Most.flatMap(ab =>
                cacheAssetBundleArrayBufferFunc(. abRelativePath, ab, hashId)
                |> Most.map(() => ab)
                |> Most.concat(Most.just(ab))
              )
       );
  };
};

module SAB = {
  let loadSABAndSetToState =
      (
        sabRelativePath,
        wholeManifest,
        (
          getAssetBundlePathFunc,
          initAssetBundleArrayBufferCacheFunc,
          isAssetBundleArrayBufferCachedFunc,
          getAssetBundleArrayBufferCacheFunc,
          cacheAssetBundleArrayBufferFunc,
          fetchFunc,
        ),
      ) =>
    Most.just(sabRelativePath)
    |> Most.flatMap(sabRelativePath => {
         let state =
           StateDataMainService.unsafeGetState(StateDataMain.stateData);

         let wholeDependencyRelationMap =
           ParseABSystem.WAB.getWholeDependencyRelationMap(wholeManifest);

         OperateSABAssetBundleMainService.isLoaded(sabRelativePath, state) ?
           Most.empty() :
           initAssetBundleArrayBufferCacheFunc(.)
           |> Most.concat(
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
                       StateDataMainService.unsafeGetState(
                         StateDataMain.stateData,
                       );

                     state
                     |> OperateSABAssetBundleMainService.markLoaded(
                          sabRelativePath,
                        )
                     |> OperateSABAssetBundleMainService.setLoadedSAB(
                          sabRelativePath,
                          sab,
                        )
                     |> StateDataMainService.setState(
                          StateDataMain.stateData,
                        )
                     |> ignore;
                   })
                |> Most.map(_ => ()),
              );
       });
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
      ) =>
    Most.just(rabRelativePath)
    |> Most.flatMap(rabRelativePath => {
         let state =
           StateDataMainService.unsafeGetState(StateDataMain.stateData);

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
       });

  let loadAndAssembleAllDependencyRAB =
      (
        abRelativePath,
        wholeManifest,
        (
          getAssetBundlePathFunc,
          initAssetBundleArrayBufferCacheFunc,
          isAssetBundleArrayBufferCachedFunc,
          getAssetBundleArrayBufferCacheFunc,
          cacheAssetBundleArrayBufferFunc,
          fetchFunc,
        ),
      ) => {
    let wholeDependencyRelationMap =
      ParseABSystem.WAB.getWholeDependencyRelationMap(wholeManifest);

    initAssetBundleArrayBufferCacheFunc(.)
    |> Most.concat(
         FindDependencyDataSystem.findAllDependencyRAbRelativePathByBreadthSearch(
           abRelativePath,
           wholeDependencyRelationMap,
         )
         |> Most.from
         |> Most.concatMap(rabRelativePathArr =>
              rabRelativePathArr
              |> Js.Array.map(rabRelativePath =>
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
                   )
                 )
              |> Most.mergeArray
            ),
       );
  };
};

let setSABSceneGameObjectToBeScene = (sabSceneGameObject, state) =>
  GameObjectSceneMainService.setSceneGameObject(sabSceneGameObject, state);

let initAllSABGameObjects = (sabSceneGameObject, state) =>
  state
  |> AllGameObjectMainService.getAllGameObjects(sabSceneGameObject)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, gameObject) =>
         InitGameObjectMainService.initGameObject(gameObject, state),
       state,
     );

let addSABSceneGameObjectChildrenToScene = (sabSceneGameObject, state) =>
  state
  |> AllGameObjectMainService.getAllChildren(sabSceneGameObject)
  |> GameObjectSceneMainService.addChildren(_, state);

let disposeSceneAllChildren = state => {
  let scene = state |> GameObjectSceneMainService.getSceneGameObject;

  state
  |> AllGameObjectMainService.getAllChildren(scene)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, gameObject) =>
         state |> DisposeGameObjectMainService.deferDispose(gameObject),
       state,
     );
};