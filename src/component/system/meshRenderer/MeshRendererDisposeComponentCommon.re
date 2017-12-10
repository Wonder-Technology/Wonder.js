open MeshRendererType;

open MeshRendererStateCommon;

open Contract;

let _removeFromRenderArray = (disposedGameObjectUid: int, {renderGameObjectArray} as data) => {
  let index = renderGameObjectArray |> Js.Array.indexOf(disposedGameObjectUid);
  let lastIndex = renderGameObjectArray |> Js.Array.length |> pred;
  renderGameObjectArray |> ArraySystem.deleteBySwap(index, lastIndex)
};

let _batchRemoveFromRenderArray = (disposedGameObjectUidMap, {renderGameObjectArray} as data) =>
  data.renderGameObjectArray =
    renderGameObjectArray
    |> Js.Array.filter(
         (renderGameObject) =>
           disposedGameObjectUidMap
           |> WonderCommonlib.SparseMapSystem.has(renderGameObject) == false
       );

let isAlive = (meshRenderer: meshRenderer, state: StateDataType.state) =>
  ComponentDisposeComponentCommon.isAlive(
    meshRenderer,
    getMeshRendererData(state).disposedIndexArray
  );

let handleDisposeComponent =
    (meshRenderer: meshRenderer, gameObjectUid: int, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        ComponentDisposeComponentCommon.checkComponentShouldAlive(meshRenderer, isAlive, state)
      )
  );
  let {renderGameObjectArray, disposedIndexArray} as data = getMeshRendererData(state);
  disposedIndexArray |> Js.Array.push(meshRenderer) |> ignore;
  _removeFromRenderArray(gameObjectUid, data);
  state
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (
      meshRendererArray: array(meshRenderer),
      gameObjectUidMap: array(bool),
      state: StateDataType.state
    ) => {
      requireCheck(
        () =>
          Contract.Operators.(
            meshRendererArray
            |> WonderCommonlib.ArraySystem.forEach(
                 [@bs]
                 (
                   (meshRenderer) =>
                     ComponentDisposeComponentCommon.checkComponentShouldAlive(
                       meshRenderer,
                       isAlive,
                       state
                     )
                 )
               )
          )
      );
      let {renderGameObjectArray, disposedIndexArray} as data = getMeshRendererData(state);
      data.disposedIndexArray = disposedIndexArray |> Js.Array.concat(meshRendererArray);
      _batchRemoveFromRenderArray(gameObjectUidMap, data);
      state
    }
  );