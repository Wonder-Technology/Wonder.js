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
    |> Most.fromPromise
    |> Most.flatMap(isCached =>
         isCached ?
           getAssetBundleArrayBufferCacheFunc(. abRelativePath)
           |> Most.fromPromise :
           LoadABSystem.load(
             getAssetBundlePathFunc(.) ++ abRelativePath,
             fetchFunc,
           )
           |> Most.flatMap(ab =>
                cacheAssetBundleArrayBufferFunc(. abRelativePath, ab, hashId)
                |> Most.fromPromise
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
                |> StateDataMainService.setState(StateDataMain.stateData)
                |> ignore;
              })
           |> Most.map(_ => ());
       });
};

module RAB = {
  let _loadRABAndSetToState =
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

         OperateRABAssetBundleMainService.isLoaded(rabRelativePath, state) ?
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
           |> Most.tap(rab => {
                let state =
                  StateDataMainService.unsafeGetState(
                    StateDataMain.stateData,
                  );

                state
                |> OperateRABAssetBundleMainService.markLoaded(
                     rabRelativePath,
                   )
                |> OperateRABAssetBundleMainService.setLoadedRAB(
                     rabRelativePath,
                     rab,
                   )
                |> StateDataMainService.setState(StateDataMain.stateData)
                |> ignore;
              })
           |> Most.map(_ => ());
       });

  let loadAllDependencyRABAndSetToState =
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

    FindDependencyDataSystem.findAllDependencyRAbRelativePathByDepthSearch(
      abRelativePath,
      wholeDependencyRelationMap,
    )
    |> Most.from
    |> Most.flatMap(rabRelativePath =>
         _loadRABAndSetToState(
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
       );
  };

  let assembleAllDependencyRAB = (abRelativePath, wholeDependencyRelationMap) =>
    FindDependencyDataSystem.findAllDependencyRAbRelativePathByDepthSearch(
      abRelativePath,
      wholeDependencyRelationMap,
    )
    |> Most.from
    |> Most.concatMap(rabRelativePath => {
         let state =
           StateDataMainService.unsafeGetState(StateDataMain.stateData);

         OperateRABAssetBundleMainService.isAssembled(rabRelativePath, state) ?
           Most.empty() :
           AssembleABSystem.RAB.assemble(
             rabRelativePath,
             OperateRABAssetBundleMainService.unsafeGetLoadedRAB(
               rabRelativePath,
               state,
             ),
             wholeDependencyRelationMap,
           );
       });
};

module WAB = {
  let loadWABAndSetToState =
      (wabRelativePath, (getAssetBundlePathFunc, fetchFunc)) =>
    Most.just(wabRelativePath)
    |> Most.flatMap(wabRelativePath => {
         let state =
           StateDataMainService.unsafeGetState(StateDataMain.stateData);

         OperateWABAssetBundleMainService.isLoaded(wabRelativePath, state) ?
           OperateWABAssetBundleMainService.unsafeGetLoadedWAB(
             wabRelativePath,
             state,
           )
           |> Most.just :
           LoadABSystem.load(
             getAssetBundlePathFunc(.) ++ wabRelativePath,
             fetchFunc,
           )
           |> Most.tap(wab => {
                let state =
                  StateDataMainService.unsafeGetState(
                    StateDataMain.stateData,
                  );

                state
                |> OperateWABAssetBundleMainService.markLoaded(
                     wabRelativePath,
                   )
                |> OperateWABAssetBundleMainService.setLoadedWAB(
                     wabRelativePath,
                     wab,
                   )
                |> StateDataMainService.setState(StateDataMain.stateData)
                |> ignore;
              });
       });
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