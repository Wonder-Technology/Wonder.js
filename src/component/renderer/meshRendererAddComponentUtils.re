open GameObjectType;

open MeshRendererType;

open MeshRendererStateUtils;

let _setRenderGameObjectArray =
    (
      meshRenderer: meshRenderer,
      gameObject: gameObject,
      renderGameObjectArray: ArraySystem.t(gameObject)
    ) =>
  renderGameObjectArray[meshRenderer] = gameObject;

let handleAddComponent =
    (meshRenderer: meshRenderer, gameObjectUId: string, state: StateDataType.state) => {
  let {renderGameObjectArray, gameObjectMap} = getMeshRendererData(state);
  _setRenderGameObjectArray(meshRenderer, gameObjectUId, renderGameObjectArray);
  ComponentSystem.addComponentToGameObjectMap(meshRenderer, gameObjectUId, gameObjectMap) |> ignore;
  state
};