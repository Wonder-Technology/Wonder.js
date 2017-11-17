open GameObjectType;

open MeshRendererType;

open MeshRendererStateUtils;

open Contract;

/* todo optimize: add batch remove  */
let _removeFromRenderArray = (gameObject: gameObject, {renderGameObjectArray} as meshRendererData) =>
  meshRendererData.renderGameObjectArray =
    renderGameObjectArray
    |> Js.Array.filter((renderGameObject: gameObject) => renderGameObject !== gameObject);

let handleDisposeComponent =
    (meshRenderer: meshRenderer, gameObject: gameObject, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "shouldn't dispose before",
          () => {
            let {disposedIndexArray} = getMeshRendererData(state);
            disposedIndexArray |> Js.Array.includes(meshRenderer) |> assertFalse
          }
        )
      )
  );
  let {renderGameObjectArray, disposedIndexArray} as meshRendererData = getMeshRendererData(state);
  disposedIndexArray |> Js.Array.push(meshRenderer) |> ignore;
  _removeFromRenderArray(gameObject, meshRendererData);
  state
};