open MeshRendererType;

open DisposeMeshRendererService;

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