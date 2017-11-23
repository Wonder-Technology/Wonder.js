open GameObjectType;

open MeshRendererType;

open MeshRendererStateUtils;

let _setRenderGameObjectArray =
    (
      meshRenderer: meshRenderer,
      gameObject: gameObject,
      renderGameObjectArray: Js.Array.t(gameObject)
    ) =>
  renderGameObjectArray |> Js.Array.push(gameObject) |> ignore;

let handleAddComponent =
    (meshRenderer: meshRenderer, gameObjectUid: string, state: StateDataType.state) => {
  let {renderGameObjectArray, gameObjectMap} = getMeshRendererData(state);
  _setRenderGameObjectArray(meshRenderer, gameObjectUid, renderGameObjectArray);
  ComponentSystem.addComponentToGameObjectMap(meshRenderer, gameObjectUid, gameObjectMap) |> ignore;
  state
};