open MeshRendererType;

open ComponentDisposeComponentCommon;

open MeshRendererStateCommon;

let _removeFromRenderArray = (disposedGameObjectUid: int, renderGameObjectArray) =>
  removeFromArray(disposedGameObjectUid, renderGameObjectArray);

let _batchRemoveFromRenderArray = (disposedGameObjectUidMap, renderGameObjectArray) =>
  batchRemoveFromArray(disposedGameObjectUidMap, renderGameObjectArray);

let isAlive = (meshRenderer: meshRenderer, state: StateDataType.state) =>
  ComponentDisposeComponentCommon.isAlive(
    meshRenderer,
    getMeshRendererData(state).disposedIndexArray
  );

let _disposeData = (meshRenderer: meshRenderer, state: StateDataType.state) => {
  let {gameObjectMap} as data = getMeshRendererData(state);
  {
    ...state,
    meshRendererData: {...data, gameObjectMap: gameObjectMap |> disposeSparseMapData(meshRenderer)}
  }
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
    StateData.stateData.isDebug
  );
  let {renderGameObjectArray, disposedIndexArray} as data = getMeshRendererData(state);
  let state = _disposeData(meshRenderer, state);
  {
    ...state,
    meshRendererData: {
      ...data,
      disposedIndexArray: disposedIndexArray |> ArraySystem.push(meshRenderer),
      renderGameObjectArray: renderGameObjectArray |> _removeFromRenderArray(gameObjectUid)
    }
  }
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
        StateData.stateData.isDebug
      );
      let {renderGameObjectArray, disposedIndexArray} as data = getMeshRendererData(state);
      let state = {
        ...state,
        meshRendererData: {
          ...data,
          disposedIndexArray: disposedIndexArray |> Js.Array.concat(meshRendererArray),
          renderGameObjectArray:
            renderGameObjectArray |> _batchRemoveFromRenderArray(gameObjectUidMap)
        }
      };
      meshRendererArray
      |> ArraySystem.reduceState(
           [@bs] ((state, meshRenderer) => state |> _disposeData(meshRenderer)),
           state
         )
    }
  );