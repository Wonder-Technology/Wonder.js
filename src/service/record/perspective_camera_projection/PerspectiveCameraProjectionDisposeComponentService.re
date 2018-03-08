open PerspectiveCameraProjectionType;

let isAlive = (cameraView, {disposedIndexArray}) =>
  ComponentDisposeComponentCommon.isAlive(cameraView, disposedIndexArray);

let _disposeRecord =
    (cameraProjection, {gameObjectMap, nearMap, farMap, fovyMap, aspectMap} as record) => {
  ...record,
  nearMap: ComponentDisposeComponentCommon.disposeSparseMapData(cameraProjection, nearMap),
  farMap: ComponentDisposeComponentCommon.disposeSparseMapData(cameraProjection, farMap),
  fovyMap: ComponentDisposeComponentCommon.disposeSparseMapData(cameraProjection, fovyMap),
  aspectMap: ComponentDisposeComponentCommon.disposeSparseMapData(cameraProjection, aspectMap),
  gameObjectMap:
    ComponentDisposeComponentCommon.disposeSparseMapData(cameraProjection, gameObjectMap)
};

let handleDisposeComponent = (cameraProjection, {disposedIndexArray} as record) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            ComponentDisposeComponentService.checkComponentShouldAlive(
              cameraProjection,
              isAlive,
              record
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  _disposeRecord(
    cameraProjection,
    {...record, disposedIndexArray: disposedIndexArray |> ArraySystem.push(cameraProjection)}
  )
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (
      cameraProjectionArray: array(ComponentType.component),
      isGameObjectDisposedMap: array(bool),
      {disposedIndexArray} as record
    ) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                ComponentDisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                  cameraProjectionArray,
                  isAlive,
                  record
                )
              )
            )
          ),
        StateData.stateData.isDebug
      );
      cameraProjectionArray
      |> WonderCommonlib.ArraySystem.reduceOneParam(
           [@bs] ((record, cameraProjection) => record |> _disposeRecord(cameraProjection)),
           {
             ...record,
             disposedIndexArray: disposedIndexArray |> Js.Array.concat(cameraProjectionArray)
           }
         )
    }
  );