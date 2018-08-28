open StateDataMainType;

open GameObjectType;

open MeshRendererType;

let handleAddComponent =
  (. meshRenderer, gameObjectUid: int, {gameObjectRecord} as state) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              test(
                Log.buildAssertMessage(
                  ~expect={j|isRender is true|j},
                  ~actual={j|is false|j},
                ),
                () =>
                OperateMeshRendererMainService.getIsRender(
                  meshRenderer,
                  state,
                )
                |> assertTrue
              )
            )
          )
        ),
      IsDebugMainService.getIsDebug(StateDataMain.stateData),
    );

    let meshRendererRecord = RecordMeshRendererMainService.getRecord(state);

    let {gameObjectMap} as meshRendererRecord =
      RenderArrayMeshRendererMainService.addToRenderGameObjectMap(
        meshRenderer,
        gameObjectUid,
        meshRendererRecord,
        gameObjectRecord,
      );

    {
      ...state,
      meshRendererRecord:
        Some({
          ...meshRendererRecord,
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