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

          FindDependencyDataSystem.findAllDependencyAbRelativePath(
            "sab/a.sab",
            wholeDependencyRelationMap,
          )
          |> WonderCommonlib.ArrayService.reduceOneParam(
               (. stream, abRelativePath) =>
                 stream
                 |> Most.flatMap(state =>
                      LoadABSystem.load(
                        PathABSystem.getAssetBundlePath() ++ abRelativePath,
                      )
                      |> Most.map(ab =>
                           AssembleABSystem.assemble(abRelativePath, ab, state)
                         )
                    ),
               Most.just(state),
             );
          /* |> Js.Array.map(abRelativePath =>
                  LoadABSystem.load(
                    PathABSystem.getAssetBundlePath() ++ abRelativePath,
                  )
                  |> Most.map(ab => {

                      AssembleABSystem.assemble(abRelativePath, ab)


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

  let _ =
    LoadABSystem.load(getAssetBundlePath() ++ "whole.wab")
    |> Most.flatMap(wab => {
         let manifest = ParseABSystem.WAB.parseManifest(wab);

         /* let state = StateAPI.unsafeGetState(); */

         let wholeDependencyRelationMap =
           ParseABSystem.WAB.getWholeDependencyRelationMap(manifest);

         ImportABSystem.loadAndAssembleAllDependencies(
           abRelativePath,
           manifest,
           (
             getAssetBundlePath,
             isAssetBundleArrayBufferCached,
             getAssetBundleArrayBufferCache,
             cacheAssetBundleArrayBuffer,
           ),
           /* state, */
         )
         |> Most.flatMap(() =>
              ImportABSystem.loadAndAssembleAB(
                abRelativePath,
                manifest,
                wholeDependencyRelationMap,
                (
                  getAssetBundlePath,
                  isAssetBundleArrayBufferCached,
                  getAssetBundleArrayBufferCache,
                  cacheAssetBundleArrayBuffer,
                ),
                /* state, */
              )
            ) /* |> Most. */;
       })
    |> Most.subscribe({
         "next": _ => (),
         "error": e => _handleStreamError(e),
         "complete": () => (),
       });
  ();
};

/* let addSabAllGameObjectsToScene = (needRewriteAPI, state) => { */
let goToNextScene = (sabRelativePath, needRewriteAPI, state) =>
  /* let sabRelativePath = "sab/a.sab"; */
  AssembleABSystem.isAssembled(sabRelativePath, state) ?
    {
      let sabAllGameObjects =
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
         );
    } :
    /* wait for finish */
    /* TODO show loading bar? */
    state;

let replaceToRabLightMaterial = (rabRelativePath, needRewriteAPI, state) =>
  AssembleABSystem.isAssembled(rabRelativePath, state) ?
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