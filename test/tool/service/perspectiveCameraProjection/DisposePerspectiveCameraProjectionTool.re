open PerspectiveCameraProjectionType;

open DisposePerspectiveCameraProjectionService;

let handleDisposeComponent = (cameraProjection, {disposedIndexArray} as record) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            DisposeComponentService.checkComponentShouldAlive(cameraProjection, isAlive, record)
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  _disposeData(
    cameraProjection,
    {...record, disposedIndexArray: disposedIndexArray |> ArrayService.push(cameraProjection)}
  )
};