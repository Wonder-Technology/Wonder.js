open MeshRendererType;

open ComponentDisposeComponentCommon;

open MeshRendererStateCommon;

let _removeFromRenderArray = (disposedGameObjectUid: int, {renderGameObjectArray} as data) => {
  removeFromArray(disposedGameObjectUid, renderGameObjectArray) |> ignore;
  data
};

let _batchRemoveFromRenderArray = (disposedGameObjectUidMap, {renderGameObjectArray} as data) => {
  data.renderGameObjectArray =
    batchRemoveFromArray(disposedGameObjectUidMap, renderGameObjectArray);
  data
};

let isAlive = (meshRenderer: meshRenderer, state: StateDataType.state) =>
  ComponentDisposeComponentCommon.isAlive(
    meshRenderer,
    getMeshRendererData(state).disposedIndexArray
  );

let _disposeData = (meshRenderer: meshRenderer, state: StateDataType.state) => {
  let {gameObjectMap} as data = getMeshRendererData(state);
  disposeSparseMapData(meshRenderer, gameObjectMap) |> ignore;
  state
};

let handleDisposeComponent =
    (meshRenderer: meshRenderer, gameObjectUid: int, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            ComponentDisposeComponentCommon.checkComponentShouldAlive(meshRenderer, isAlive, state)
          )
        )
      ),
    StateData.stateData.isTest
  );
  let {disposedIndexArray} as data = getMeshRendererData(state);
  disposedIndexArray |> Js.Array.push(meshRenderer) |> ignore;
  _removeFromRenderArray(gameObjectUid, data) |> ignore;
  _disposeData(meshRenderer, state)
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (
      meshRendererArray: array(meshRenderer),
      gameObjectUidMap: array(bool),
      state: StateDataType.state
    ) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                ComponentDisposeComponentCommon.checkComponentShouldAliveWithBatchDispose(
                  meshRendererArray,
                  isAlive,
                  state
                )
              )
            )
          ),
        StateData.stateData.isTest
      );
      let {disposedIndexArray} as data = getMeshRendererData(state);
      data.disposedIndexArray = disposedIndexArray |> Js.Array.concat(meshRendererArray);
      _batchRemoveFromRenderArray(gameObjectUidMap, data) |> ignore;
      meshRendererArray
      |> ArraySystem.reduceState(
           [@bs] ((state, meshRenderer) => state |> _disposeData(meshRenderer)),
           state
         )
    }
  );