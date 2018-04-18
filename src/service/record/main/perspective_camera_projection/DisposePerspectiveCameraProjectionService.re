open PerspectiveCameraProjectionType;

let isAlive = (cameraView, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(cameraView, disposedIndexArray);

let _disposeData =
    (
      cameraProjection,
      {gameObjectMap, dirtyArray, pMatrixMap, nearMap, farMap, fovyMap, aspectMap} as record
    ) => {
  ...record,
  dirtyArray: DisposeComponentService.removeFromArray(cameraProjection, dirtyArray),
  pMatrixMap: DisposeComponentService.disposeSparseMapData(cameraProjection, pMatrixMap),
  nearMap: DisposeComponentService.disposeSparseMapData(cameraProjection, nearMap),
  farMap: DisposeComponentService.disposeSparseMapData(cameraProjection, farMap),
  fovyMap: DisposeComponentService.disposeSparseMapData(cameraProjection, fovyMap),
  aspectMap: DisposeComponentService.disposeSparseMapData(cameraProjection, aspectMap),
  gameObjectMap: DisposeComponentService.disposeSparseMapData(cameraProjection, gameObjectMap)
};

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

let handleBatchDisposeComponent =
  [@bs]
  (
    (
      cameraProjectionArray: array(ComponentType.component),
      {disposedIndexArray} as record
    ) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                  cameraProjectionArray,
                  isAlive,
                  record
                )
              )
            )
          ),
        IsDebugMainService.getIsDebug(StateDataMain.stateData)
      );
      cameraProjectionArray
      |> WonderCommonlib.ArrayService.reduceOneParam(
           [@bs] ((record, cameraProjection) => record |> _disposeData(cameraProjection)),
           {
             ...record,
             disposedIndexArray: disposedIndexArray |> Js.Array.concat(cameraProjectionArray)
           }
         )
    }
  );