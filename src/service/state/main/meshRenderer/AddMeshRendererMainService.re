open StateDataMainType;

open GameObjectType;

open MeshRendererType;

let _setRenderGameObject =
    (
      meshRenderer: meshRenderer,
      gameObject: gameObject,
      renderGameObjectMap: renderGameObjectMap,
    ) =>
  renderGameObjectMap
  |> WonderCommonlib.SparseMapService.set(meshRenderer, gameObject);

let handleAddComponent =
  (. meshRenderer, gameObjectUid: int, {gameObjectRecord} as state) => {
    let {
          gameObjectMap,
          basicMaterialRenderGameObjectMap,
          lightMaterialRenderGameObjectMap,
        } as meshRendererRecord =
      RecordMeshRendererMainService.getRecord(state);
    let basicMaterialRenderGameObjectMap =
      HasComponentGameObjectService.hasBasicMaterialComponent(
        gameObjectUid,
        gameObjectRecord,
      ) ?
        basicMaterialRenderGameObjectMap
        |> _setRenderGameObject(meshRenderer, gameObjectUid) :
        basicMaterialRenderGameObjectMap;
    let lightMaterialRenderGameObjectMap =
      HasComponentGameObjectService.hasLightMaterialComponent(
        gameObjectUid,
        gameObjectRecord,
      ) ?
        lightMaterialRenderGameObjectMap
        |> _setRenderGameObject(meshRenderer, gameObjectUid) :
        lightMaterialRenderGameObjectMap;

    {
      ...state,
      meshRendererRecord:
        Some({
          ...meshRendererRecord,
          basicMaterialRenderGameObjectMap,
          lightMaterialRenderGameObjectMap,
          gameObjectMap:
            AddComponentService.addComponentToGameObjectMap(
              meshRenderer,
              gameObjectUid,
              gameObjectMap,
            ),
        }),
    }
    |> WonderLog.Contract.ensureCheck(
         state =>
           WonderLog.(
             Contract.(
               Operators.(
                 test(
                   Log.buildAssertMessage(
                     ~expect=
                       {j|should add material component before add meshRenderer component|j},
                     ~actual={j|not(the gameObjectUid is $gameObjectUid)|j},
                   ),
                   () => {
                     let {
                       basicMaterialRenderGameObjectMap,
                       lightMaterialRenderGameObjectMap,
                     } =
                       RecordMeshRendererMainService.getRecord(state);
                     (
                       basicMaterialRenderGameObjectMap
                       |> Js.Array.includes(gameObjectUid)
                       || lightMaterialRenderGameObjectMap
                       |> Js.Array.includes(gameObjectUid)
                     )
                     |> assertTrue;
                   },
                 )
               )
             )
           ),
         IsDebugMainService.getIsDebug(StateDataMain.stateData),
       );
  };