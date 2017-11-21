open MeshRendererType;

open MeshRendererStateUtils;

open Contract;

/* todo optimize: add batch remove  */
let _removeFromRenderArray = (gameObjectUid: string, {renderGameObjectArray} as meshRendererData) => {
  let index = renderGameObjectArray |> Js.Array.indexOf(gameObjectUid);
  let lastIndex = renderGameObjectArray |> Js.Array.length |> pred;
  renderGameObjectArray |> ArraySystem.deleteBySwap(index, lastIndex)
};

let handleDisposeComponent =
    (meshRenderer: meshRenderer, gameObjectUid: string, state: StateDataType.state) => {
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
  _removeFromRenderArray(gameObjectUid, meshRendererData);
  state
};