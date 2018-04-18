open BasicCameraViewType;

open DisposeBasicCameraViewService;

let handleDisposeComponent = (cameraView, {disposedIndexArray} as record) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            DisposeComponentService.checkComponentShouldAlive(cameraView, isAlive, record)
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  _disposeData(
    cameraView,
    {...record, disposedIndexArray: disposedIndexArray |> ArrayService.push(cameraView)}
  )
};