open StateDataMainType;

open GeometryType;

open DisposeComponentService;

let isAlive = (geometry, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(geometry, disposedIndexArray);

let _disposeData =
    (
      gameObject,
      geometry,
      {
        disposeCount,
        disposedIndexArray,
        disposedIndexMap,
        gameObjectsMap,
        nameMap,
      } as geometryRecord,
    ) => {
  ...geometryRecord,
  disposedIndexArray: disposedIndexArray |> ArrayService.push(geometry),
  disposedIndexMap:
    disposedIndexMap |> WonderCommonlib.SparseMapService.set(geometry, true),
  disposeCount: succ(disposeCount),
  gameObjectsMap:
    GameObjectsMapService.removeGameObject(
      gameObject,
      geometry,
      gameObjectsMap,
    ),
  nameMap: nameMap |> disposeSparseMapData(geometry),
};

let handleBatchDisposeComponent =
  (. geometryDataArray, state) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                geometryDataArray
                |> Js.Array.map(((_, geometry)) => geometry),
                isAlive,
                state |> RecordGeometryMainService.getRecord,
              )
            )
          )
        ),
      IsDebugMainService.getIsDebug(StateDataMain.stateData),
    );
    let geometryRecord = state |> RecordGeometryMainService.getRecord;
    let (geometryNeedDisposeVboBufferArr, geometryRecord) =
      geometryDataArray
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (.
             (geometryNeedDisposeVboBufferArr, geometryRecord),
             (gameObject, geometry),
           ) =>
             switch (
               GroupGeometryService.isGroupGeometry(geometry, geometryRecord)
             ) {
             | false => (
                 geometryNeedDisposeVboBufferArr
                 |> ArrayService.push(geometry),
                 _disposeData(gameObject, geometry, geometryRecord),
               )
             | true => (
                 geometryNeedDisposeVboBufferArr,
                 GroupGeometryService.removeGameObject(
                   gameObject,
                   geometry,
                   geometryRecord,
                 ),
               )
             },
           ([||], geometryRecord),
         );
    (
      {...state, geometryRecord: Some(geometryRecord)},
      geometryNeedDisposeVboBufferArr,
    );
  };

let isNotDisposed = ({disposedIndexArray}) =>
  disposedIndexArray |> Js.Array.length === 0;