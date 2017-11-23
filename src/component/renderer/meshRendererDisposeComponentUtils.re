open MeshRendererType;

open MeshRendererStateUtils;

open Contract;

/* todo optimize: add batch remove  */
let _removeFromRenderArray = (gameObjectUid: string, {renderGameObjectArray} as data) => {
  let index = renderGameObjectArray |> Js.Array.indexOf(gameObjectUid);
  let lastIndex = renderGameObjectArray |> Js.Array.length |> pred;
  renderGameObjectArray |> ArraySystem.deleteBySwap(index, lastIndex)
};

let isAlive = (meshRenderer: meshRenderer, state: StateDataType.state) =>
  ComponentDisposeComponentUtils.isAlive(
    meshRenderer,
    getMeshRendererData(state).disposedIndexArray
  );

let handleDisposeComponent =
    (meshRenderer: meshRenderer, gameObjectUid: string, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        ComponentDisposeComponentUtils.checkComponentShouldAlive(meshRenderer, isAlive, state)
      )
  );
  let {renderGameObjectArray, disposedIndexArray} as data = getMeshRendererData(state);
  disposedIndexArray |> Js.Array.push(meshRenderer) |> ignore;
  _removeFromRenderArray(gameObjectUid, data);
  state
};