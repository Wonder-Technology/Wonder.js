open MeshRendererType;

open DisposeComponentService;

let _removeFromRenderArray = (disposedGameObjectUid: int, renderGameObjectArray) =>
  removeFromArray(disposedGameObjectUid, renderGameObjectArray);

let _batchRemoveFromRenderArray = (disposedGameObjectUidMap, renderGameObjectArray) =>
  batchRemoveFromArray(disposedGameObjectUidMap, renderGameObjectArray);

let isAlive = (meshRenderer, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(meshRenderer, disposedIndexArray);

let _disposeData = (meshRenderer: meshRenderer, {gameObjectMap} as record) => {
  ...record,
  gameObjectMap: gameObjectMap |> disposeSparseMapData(meshRenderer)
};

let handleDisposeComponent =
    (
      meshRenderer: meshRenderer,
      gameObjectUid: int,
      {renderGameObjectArray, disposedIndexArray} as record
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            DisposeComponentService.checkComponentShouldAlive(meshRenderer, isAlive, record)
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  let record = _disposeData(meshRenderer, record);
  {
    ...record,
    disposedIndexArray: disposedIndexArray |> ArrayService.push(meshRenderer),
    renderGameObjectArray: renderGameObjectArray |> _removeFromRenderArray(gameObjectUid)
  }
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (
      meshRendererArray: array(meshRenderer),
      isGameObjectDisposedMap: array(bool),
      {renderGameObjectArray, disposedIndexArray} as record
    ) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                DisposeComponentService.checkComponentShouldAliveWithBatchDispose(meshRendererArray, isAlive, record)
              )
            )
          ),
        IsDebugMainService.getIsDebug(StateDataMain.stateData)
      );
      let record = {
        ...record,
        disposedIndexArray: disposedIndexArray |> Js.Array.concat(meshRendererArray),
        renderGameObjectArray:
          renderGameObjectArray |> _batchRemoveFromRenderArray(isGameObjectDisposedMap)
      };
      meshRendererArray
      |> WonderCommonlib.ArrayService.reduceOneParam(
           [@bs] ((record, meshRenderer) => record |> _disposeData(meshRenderer)),
           record
         )
    }
  );