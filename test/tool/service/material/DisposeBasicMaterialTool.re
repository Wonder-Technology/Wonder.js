open MaterialType;

open BasicMaterialType;

open DisposeBasicMaterialService;

let handleDisposeComponent = (material, {disposedIndexArray} as record) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(DisposeComponentService.checkComponentShouldAlive(material, isAlive, record))
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  _handleDispose(disposedIndexArray, material, record)
};