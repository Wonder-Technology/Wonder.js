open BasicCameraViewType;

let isAlive = (cameraView, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(cameraView, disposedIndexArray);

let _disposeData = (cameraView, {isActiveMap, gameObjectMap} as record) => {
  ...record,
  isActiveMap:
    DisposeComponentService.disposeSparseMapData(cameraView, isActiveMap),
  gameObjectMap:
    DisposeComponentService.disposeSparseMapData(cameraView, gameObjectMap),
};

let handleBatchDisposeComponent =
  (.
    cameraViewArray: array(ComponentType.component),
    {disposedIndexArray} as record,
  ) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                cameraViewArray,
                isAlive,
                record,
              )
            )
          )
        ),
      IsDebugMainService.getIsDebug(StateDataMain.stateData),
    );
    cameraViewArray
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. record, cameraView) => record |> _disposeData(cameraView),
         {
           ...record,
           disposedIndexArray:
             disposedIndexArray |> Js.Array.concat(cameraViewArray),
         },
       );
  };