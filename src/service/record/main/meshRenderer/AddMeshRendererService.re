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
    (meshRenderer, gameObjectUid: int, {gameObjectMap, renderGameObjectArray} as record) => {
      ...record,
      renderGameObjectArray:
        renderGameObjectArray |> _setRenderGameObjectArray(meshRenderer, gameObjectUid),
      gameObjectMap:
        AddComponentService.addComponentToGameObjectMap(meshRenderer, gameObjectUid, gameObjectMap)
    }
  );