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
                  ~expect=
                    {j|should add material component before add meshRenderer component|j},
                  ~actual={j|not(the gameObjectUid is $gameObjectUid)|j},
                ),
                () =>
                (
                  HasComponentGameObjectService.hasBasicMaterialComponent(
                    gameObjectUid,
                    state.gameObjectRecord,
                  )
                  || HasComponentGameObjectService.hasLightMaterialComponent(
                       gameObjectUid,
                       state.gameObjectRecord,
                     )
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
      OperateMeshRendererMainService.getIsRender(meshRenderer, state) ?
        RenderArrayMeshRendererMainService.addToRenderGameObjectMap(
          meshRenderer,
          gameObjectUid,
          meshRendererRecord,
          gameObjectRecord,
        ) :
        meshRendererRecord;

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
    };
  };