open StateDataMainType;

open GameObjectType;

open MeshRendererType;

let handleAddComponent =
  (. meshRenderer, gameObjectUid: int, {gameObjectRecord} as state) => {
    WonderLog.Contract.requireCheck(
      () => {
        open WonderLog;
        open Contract;
        open Operators;

        test(
          Log.buildAssertMessage(
            ~expect={j|isRender is true|j},
            ~actual={j|is false|j},
          ),
          () =>
          OperateMeshRendererMainService.getIsRender(meshRenderer, state)
          |> assertTrue
        );
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
        );
      },
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
    };
  };