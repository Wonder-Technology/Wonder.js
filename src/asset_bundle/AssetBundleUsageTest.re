/* open Js.Promise; */

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
  /* WonderLog.Log.fatal(
       WonderLog.Log.buildFatalMessage(
         ~title="InitEventJob",
         ~description={j|from dom event stream error|j},
         ~reason="",
         ~solution={j||j},
         ~params={j|message:$message\nstack:$stack|j},
       ),
     ); */
};

let dynamicLoadAB = needRewriteAPI => {
  /* LoadABSystem.load(PathABSystem.getAssetBundlePath() ++ "whole.wab")
     |> Most.flatMap(wab => {
          let manifest = ParseABSystem.WAB.parseManifest(wab);

          let wholeDependencyRelationMap =
            ParseABSystem.WAB.getWholeDependencyRelationMap(manifest);

          FindDependencyDataSystem.findAllDependencyRAbRelativePath(
            "sab/a.sab",
            wholeDependencyRelationMap,
          )
          |> WonderCommonlib.ArrayService.reduceOneParam(
               (. stream, abPath) =>
                 stream
                 |> Most.flatMap(state =>
                      LoadABSystem.load(
                        PathABSystem.getAssetBundlePath() ++ abPath,
                      )
                      |> Most.map(ab =>
                           AssembleABSystem.assemble(abPath, ab, state)
                         )
                    ),
               Most.just(state),
             );
          /* |> Js.Array.map(abPath =>
                  LoadABSystem.load(
                    PathABSystem.getAssetBundlePath() ++ abPath,
                  )
                  |> Most.map(ab => {

                      AssembleABSystem.assemble(abPath, ab)


                  })
                )
             |> Most.mergeArray; */
        }); */

  let getAssetBundlePath = needRewriteAPI##getAssetBundlePath;
  let isAssetBundleArrayBufferCached =
    needRewriteAPI##isAssetBundleArrayBufferCached;
  let getAssetBundleArrayBufferCache =
    needRewriteAPI##getAssetBundleArrayBufferCache;
  let cacheAssetBundleArrayBuffer =
    needRewriteAPI##cacheAssetBundleArrayBuffer;

  let abRelativePath = "sab/a.sab";

  let wabRelativePath = "whole.wab";

  let abPath = getAssetBundlePath() ++ abRelativePath;

  let wabPath = getAssetBundlePath() ++ wabRelativePath;

  let _ =
    LoadABSystem.load(wabPath, LoaderManagerAPI._fetch)
    |> Most.flatMap(wab => {
         let manifest = ParseABSystem.WAB.parseManifest(wab);

         /* let state = StateAPI.unsafeGetState(); */

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

         MostUtils.concatExecStreamArr([|
           () =>
             ImportABSystem.RAB.loadAndAssembleAllDependencyRAB(
               abRelativePath,
               manifest,
               (
                 getAssetBundlePath,
                 isAssetBundleArrayBufferCached,
                 getAssetBundleArrayBufferCache,
                 cacheAssetBundleArrayBuffer,
                 LoaderManagerAPI._fetch,
               ),
               /* state, */
             ),
           () =>
             ImportABSystem.SAB.loadSABAndSetToState(
               abRelativePath,
               manifest,
               /* wholeDependencyRelationMap, */
               (
                 getAssetBundlePath,
                 isAssetBundleArrayBufferCached,
                 getAssetBundleArrayBufferCache,
                 cacheAssetBundleArrayBuffer,
                 LoaderManagerAPI._fetch,
               ),
               /* state, */
             ),
         |]);
       })
    |> Most.subscribe({
         "next": _ => (),
         "error": e => _handleStreamError(e),
         "complete": () => (),
       });
  ();
};

/* let addSabAllGameObjectsToScene = (needRewriteAPI, state) => { */
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
    |> Most.tap(sceneGameObject => {
         let state =
           StateDataMainService.unsafeGetState(StateDataMain.stateData);

         let state = state |> GameObjectAPI.initGameObject(sceneGameObject);

         let state =
           state
           |> ImportABSystem.disposeSceneAllChildren
           |> ImportABSystem.setSABSceneGameObjectToBeScene(sceneGameObject);

         StateDataMainService.setState(StateDataMain.stateData, state)
         |> ignore;
       })
    |> Most.map(_ => ()) :
    /* let sabAllGameObjects =
         OperateSABAssetBundleMainService.unsafeFindAllGameObjects(
           sabRelativePath,
           state,
         );
       /* |> OptionService.unsafeGet; */

       let state =
         state
         |> ImportABSystem.disposeSceneAllChildren
         |> GameObjectSceneMainService.addChildren(sabAllGameObjects);

       sabAllGameObjects
       |> WonderCommonlib.ArrayService.reduceOneParam(
            (. state, gameObject) =>
              GameObjectAPI.initGameObject(gameObject, state),
            state,
          ); */
    /* wait for finish */
    /* TODO show loading bar? */
    /* state; */
    Most.empty();
};
/* let sabRelativePath = "sab/a.sab"; */

let replaceToRabLightMaterial = (rabRelativePath, needRewriteAPI, state) =>
  OperateRABAssetBundleMainService.isAssembled(rabRelativePath, state) ?
    {
      let lightMaterial1 =
        OperateRABAssetBundleMainService.unsafeFindLightMaterialByName(
          rabRelativePath,
          "lightMaterial1",
          state,
        );
      /* |> OptionService.unsafeGet; */

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