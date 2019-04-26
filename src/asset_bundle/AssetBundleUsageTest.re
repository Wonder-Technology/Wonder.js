open WonderBsMost;

let _handleStreamError = e => {
  let message = Obj.magic(e)##message;
  let stack = Obj.magic(e)##stack;

  WonderLog.Log.debug(
    WonderLog.Log.buildDebugMessage(
      ~description={j|dynamicLoadAB stream error|j},
      ~params={j|message:$message\nstack:$stack|j},
    ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
};

let dynamicLoadAB = needRewriteAPI => {
  let getAssetBundlePath = needRewriteAPI##getAssetBundlePath;
  let initAssetBundleArrayBufferCache =
    needRewriteAPI##initAssetBundleArrayBufferCache;
  let isAssetBundleArrayBufferCached =
    needRewriteAPI##isAssetBundleArrayBufferCached;
  let getAssetBundleArrayBufferCache =
    needRewriteAPI##getAssetBundleArrayBufferCache;
  let cacheAssetBundleArrayBuffer =
    needRewriteAPI##cacheAssetBundleArrayBuffer;

  let abRelativePath = "sab/a.sab";

  let wabRelativePath = "whole.wab";

  let abPath = getAssetBundlePath(.) ++ abRelativePath;

  let wabPath = getAssetBundlePath(.) ++ wabRelativePath;

  let _ =
    LoadABSystem.load(wabPath, FetchCommon.fetch)
    |> Most.flatMap(wab => {
         let manifest = ParseABSystem.WAB.parseManifest(wab);

         let state =
           StateDataMainService.unsafeGetState(StateDataMain.stateData);

         let wholeDependencyRelationMap =
           ParseABSystem.WAB.getWholeDependencyRelationMap(manifest);

         state
         |> OperateWABAssetBundleMainService.setWholeDependencyRelationMap(
              wabRelativePath,
              wholeDependencyRelationMap,
            )
         |> StateDataMainService.setState(StateDataMain.stateData)
         |> ignore;

         ImportABSystem.RAB.loadAndAssembleAllDependencyRAB(
           abRelativePath,
           manifest,
           (
             getAssetBundlePath,
             initAssetBundleArrayBufferCache,
             isAssetBundleArrayBufferCached,
             getAssetBundleArrayBufferCache,
             cacheAssetBundleArrayBuffer,
             FetchCommon.fetch,
           ),
         )
         |> Most.concat(
              ImportABSystem.SAB.loadSABAndSetToState(
                abRelativePath,
                manifest,
                (
                  getAssetBundlePath,
                  initAssetBundleArrayBufferCache,
                  isAssetBundleArrayBufferCached,
                  getAssetBundleArrayBufferCache,
                  cacheAssetBundleArrayBuffer,
                  FetchCommon.fetch,
                ),
              ),
            );
       })
    |> Most.subscribe({
         "next": _ => (),
         "error": e => _handleStreamError(e),
         "complete": () => (),
       });
  ();
};

let goToNextScene = (wabRelativePath, sabRelativePath, needRewriteAPI) => {
  let state = StateDataMainService.unsafeGetState(StateDataMain.stateData);

  OperateSABAssetBundleMainService.isLoaded(sabRelativePath, state) ?
    AssembleABSystem.SAB.assemble(
      sabRelativePath,
      OperateSABAssetBundleMainService.unsafeGetLoadedSAB(
        sabRelativePath,
        state,
      ),
      OperateWABAssetBundleMainService.unsafeGetWholeDependencyRelationMap(
        wabRelativePath,
        state,
      ),
    )
    |> Most.subscribe({
         "next": sceneGameObject => {
           let state =
             StateDataMainService.unsafeGetState(StateDataMain.stateData);

           let state = state |> GameObjectAPI.initGameObject(sceneGameObject);

           let state =
             state
             |> ImportABSystem.disposeSceneAllChildren
             |> ImportABSystem.setSABSceneGameObjectToBeScene(sceneGameObject);

           StateDataMainService.setState(StateDataMain.stateData, state)
           |> ignore;
         },
         "error": e => _handleStreamError(e),
         "complete": () => (),
       })
    |> ignore :
    /* wait for finish */
    ();
};

let replaceToRabLightMaterial = (rabRelativePath, needRewriteAPI, state) =>
  OperateRABAssetBundleMainService.isAssembled(rabRelativePath, state) ?
    {
      let lightMaterial1 =
        OperateRABAssetBundleMainService.unsafeFindLightMaterialByName(
          rabRelativePath,
          "lightMaterial1",
          state,
        );

      let gameObjectName = "gameObject10";

      let gameObject =
        GameObjectSceneMainService.findGameObjectsByName(
          gameObjectName,
          state,
        )
        |> ArrayService.unsafeGetFirst;

      let state =
        RenderGroupAPI.replaceMaterial(
          (
            RenderGroupAPI.unsafeGetGameObjectRenderGroupComponents(
              gameObject,
              (
                GameObjectAPI.unsafeGetGameObjectMeshRendererComponent,
                GameObjectAPI.unsafeGetGameObjectLightMaterialComponent,
              ),
              state,
            ),
            RenderGroupAPI.buildRenderGroup(
              GameObjectAPI.unsafeGetGameObjectMeshRendererComponent(
                gameObject,
                state,
              ),
              lightMaterial1,
            ),
          ),
          gameObject,
          (
            GameObjectAPI.disposeGameObjectLightMaterialComponent,
            GameObjectAPI.addGameObjectLightMaterialComponent,
          ),
          state,
        );

      let state = state |> GameObjectAPI.initGameObject(gameObject);

      state;
    } :
    /* wait for finish */
    state;