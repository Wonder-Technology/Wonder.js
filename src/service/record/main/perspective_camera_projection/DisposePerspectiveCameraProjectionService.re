open PerspectiveCameraProjectionType;

let isAlive = (cameraProjection, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(cameraProjection, disposedIndexArray);

let _disposeData =
    (
      cameraProjection,
      {
        gameObjectMap,
        dirtyArray,
        pMatrixMap,
        nearMap,
        farMap,
        fovyMap,
        aspectMap,
      } as record,
    ) => {
  ...record,
  dirtyArray:
    dirtyArray
    |> Js.Array.filter(dirtyIndex => dirtyIndex !== cameraProjection),
  pMatrixMap:
    DisposeComponentService.disposeSparseMapData(
      cameraProjection,
      pMatrixMap,
    ),
  nearMap:
    DisposeComponentService.disposeSparseMapData(cameraProjection, nearMap),
  farMap:
    DisposeComponentService.disposeSparseMapData(cameraProjection, farMap),
  fovyMap:
    DisposeComponentService.disposeSparseMapData(cameraProjection, fovyMap),
  aspectMap:
    DisposeComponentService.disposeSparseMapData(cameraProjection, aspectMap),
  gameObjectMap:
    DisposeComponentService.disposeSparseMapData(
      cameraProjection,
      gameObjectMap,
    ),
};

let handleBatchDisposeComponent =
  (.
    cameraProjectionArray: array(ComponentType.component),
    {disposedIndexArray} as record,
  ) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                cameraProjectionArray,
                isAlive,
                record,
              )
            )
          )
        ),
      IsDebugMainService.getIsDebug(StateDataMain.stateData),
    );
    cameraProjectionArray
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. record, cameraProjection) =>
           record |> _disposeData(cameraProjection),
         {
           ...record,
           disposedIndexArray:
             disposedIndexArray |> Js.Array.concat(cameraProjectionArray),
         },
       );
  };