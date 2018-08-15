open StateDataMainType;

open GeometryType;

open GeometryType;

open DisposeComponentService;

/* let isAlive = (geometry, {disposedIndexMap} as record) =>
   disposedIndexMap |> WonderCommonlib.SparseMapService.has(geometry) ?
     false :
     MappedIndexService.isComponentAlive(
       geometry,
       IndexGeometryService.getMappedIndexMap(record)
     ); */
let isAlive = (geometry, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(geometry, disposedIndexArray);

let _disposeData =
    (
      geometry,
      {
        disposeCount,
        disposedIndexArray,
        disposedIndexMap,
        /* verticesInfos,
           normalsInfos,
           indicesInfos, */
        /* computeDataFuncMap,
           configDataMap, */
        gameObjectMap,
        /* isInitMap, */
        groupCountMap,
        nameMap,
      } as geometryRecord,
    ) => {
  ...geometryRecord,
  disposedIndexArray: disposedIndexArray |> ArrayService.push(geometry),
  disposedIndexMap:
    disposedIndexMap |> WonderCommonlib.SparseMapService.set(geometry, true),
  disposeCount: succ(disposeCount),
  /* computeDataFuncMap: computeDataFuncMap |> disposeSparseMapData(geometry),
     configDataMap: configDataMap |> disposeSparseMapData(geometry), */
  gameObjectMap: gameObjectMap |> disposeSparseMapData(geometry),
  /* isInitMap: isInitMap |> disposeSparseMapData(geometry), */
  groupCountMap: groupCountMap |> disposeSparseMapData(geometry),
  nameMap: nameMap |> disposeSparseMapData(geometry)
};

let handleBatchDisposeComponent =
  (. geometryArray: array(geometry), state) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                geometryArray,
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
      geometryArray
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. (geometryNeedDisposeVboBufferArr, geometryRecord), geometry) =>
             switch (
               GroupGeometryService.isGroupGeometry(geometry, geometryRecord)
             ) {
             | false => (
                 geometryNeedDisposeVboBufferArr
                 |> ArrayService.push(geometry),
                 _disposeData(geometry, geometryRecord),
               )
             | true => (
                 geometryNeedDisposeVboBufferArr,
                 GroupGeometryService.decreaseGroupCount(
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