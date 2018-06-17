open StateDataMainType;

open GameObjectType;

open MeshRendererType;

let _setRenderGameObjectArray =
    (
      meshRenderer: meshRenderer,
      gameObject: gameObject,
      renderGameObjectArray: Js.Array.t(gameObject)
    ) =>
  renderGameObjectArray |> ArrayService.push(gameObject);

let handleAddComponent =
  [@bs]
  (
    (meshRenderer, gameObjectUid: int, {meshRendererRecord, gameObjectRecord} as state) => {
      let {gameObjectMap, basicMaterialRenderGameObjectArray, lightMaterialRenderGameObjectArray} = meshRendererRecord;
      let basicMaterialRenderGameObjectArray =
        HasComponentGameObjectService.hasBasicMaterialComponent(gameObjectUid, gameObjectRecord) ?
          basicMaterialRenderGameObjectArray
          |> _setRenderGameObjectArray(meshRenderer, gameObjectUid) :
          basicMaterialRenderGameObjectArray;
      let lightMaterialRenderGameObjectArray =
        HasComponentGameObjectService.hasLightMaterialComponent(gameObjectUid, gameObjectRecord) ?
          lightMaterialRenderGameObjectArray
          |> _setRenderGameObjectArray(meshRenderer, gameObjectUid) :
          lightMaterialRenderGameObjectArray;
      {
        ...state,
        meshRendererRecord: {
          ...meshRendererRecord,
          basicMaterialRenderGameObjectArray,
          lightMaterialRenderGameObjectArray,
          gameObjectMap:
            AddComponentService.addComponentToGameObjectMap(
              meshRenderer,
              gameObjectUid,
              gameObjectMap
            )
        }
      }
      /* TODO open! */
      /* |> WonderLog.Contract.ensureCheck(
           (state) =>
             WonderLog.(
               Contract.(
                 Operators.(
                   test(
                     Log.buildAssertMessage(
                       ~expect={j|should add material component before add meshRenderer component|j},
                       ~actual={j|not(the gameObjectUid is $gameObjectUid)|j}
                     ),
                     () => {
                       let {basicMaterialRenderGameObjectArray, lightMaterialRenderGameObjectArray} =
                         state.meshRendererRecord;
                       (
                         basicMaterialRenderGameObjectArray
                         |> Js.Array.includes(gameObjectUid)
                         || lightMaterialRenderGameObjectArray
                         |> Js.Array.includes(gameObjectUid)
                       )
                       |> assertTrue
                     }
                   )
                 )
               )
             ),
           IsDebugMainService.getIsDebug(StateDataMain.stateData)
         ) */
    }
  );