open BasicCameraViewType;

let isAlive = (cameraView, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(cameraView, disposedIndexArray);

let _disposeRecord = (cameraView, {gameObjectMap} as record) => {
  ...record,
  gameObjectMap: DisposeComponentService.disposeSparseMapData(cameraView, gameObjectMap)
};

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
    StateData.stateData.isDebug
  );
  _disposeRecord(
    cameraView,
    {...record, disposedIndexArray: disposedIndexArray |> ArrayService.push(cameraView)}
  )
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (
      cameraViewArray: array(ComponentType.component),
      isGameObjectDisposedMap: array(bool),
      {disposedIndexArray} as record
    ) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                  cameraViewArray,
                  isAlive,
                  record
                )
              )
            )
          ),
        StateData.stateData.isDebug
      );
      cameraViewArray
      |> WonderCommonlib.ArraySystem.reduceOneParam(
           [@bs] ((record, cameraView) => record |> _disposeRecord(cameraView)),
           {...record, disposedIndexArray: disposedIndexArray |> Js.Array.concat(cameraViewArray)}
         )
    }
  );