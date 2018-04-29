open StateDataMainType;

open CustomGeometryType;

open GeometryType;

open DisposeComponentService;

/* let isAlive = (geometry, {disposedIndexMap} as record) =>
   disposedIndexMap |> WonderCommonlib.SparseMapService.has(geometry) ?
     false :
     MappedIndexService.isComponentAlive(
       geometry,
       IndexCustomGeometryService.getMappedIndexMap(record)
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
        groupCountMap
      } as customGeometryRecord
    ) => {
  ...customGeometryRecord,
  disposedIndexArray: disposedIndexArray |> ArrayService.push(geometry),
  disposedIndexMap: disposedIndexMap |> WonderCommonlib.SparseMapService.set(geometry, true),
  disposeCount: succ(disposeCount),
  /* computeDataFuncMap: computeDataFuncMap |> disposeSparseMapData(geometry),
     configDataMap: configDataMap |> disposeSparseMapData(geometry), */
  gameObjectMap: gameObjectMap |> disposeSparseMapData(geometry),
  /* isInitMap: isInitMap |> disposeSparseMapData(geometry), */
  groupCountMap: groupCountMap |> disposeSparseMapData(geometry)
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (geometryArray: array(geometry), {settingRecord} as state) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                  geometryArray,
                  isAlive,
                  state |> RecordCustomGeometryMainService.getRecord
                )
              )
            )
          ),
        IsDebugMainService.getIsDebug(StateDataMain.stateData)
      );
      /* let {disposedIndexMap} = state |> RecordCustomGeometryMainService.getRecord; */
      let customGeometryRecord = state |> RecordCustomGeometryMainService.getRecord;
      let (geometryNeedDisposeVboBufferArr, customGeometryRecord) =
        geometryArray
        |> WonderCommonlib.ArrayService.reduceOneParam(
             [@bs]
             (
               ((geometryNeedDisposeVboBufferArr, customGeometryRecord), geometry) =>
                 switch (
                   GroupCustomGeometryService.isGroupGeometry(geometry, customGeometryRecord)
                 ) {
                 | false => (
                     geometryNeedDisposeVboBufferArr |> ArrayService.push(geometry),
                     _disposeData(geometry, customGeometryRecord)
                   )
                 | true => (
                     geometryNeedDisposeVboBufferArr,
                     GroupCustomGeometryService.decreaseGroupCount(geometry, customGeometryRecord)
                   )
                 }
             ),
             ([||], customGeometryRecord)
           );
      (
        {...state, customGeometryRecord: Some(customGeometryRecord)},
        geometryNeedDisposeVboBufferArr
      )
    }
  );

let isNotDisposed = ({disposedIndexArray}) => disposedIndexArray |> Js.Array.length === 0;