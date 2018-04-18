open MaterialType;

open LightMaterialType;

open DisposeLightMaterialService;

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