open BoxGeometryType;

open GeometryType;

open StateDataMainType;

open DisposeComponentService;

let isAlive = (geometry, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(geometry, disposedIndexArray);

let _disposeData =
    (
      geometry,
      (vboBufferRecord, {disposedIndexArray, gameObjectMap, groupCountMap} as boxGeometryRecord)
    ) => {
  let vboBufferRecord =
    DisposeVboBufferService.disposeBoxGeometryBufferData(geometry, vboBufferRecord);
  (
    vboBufferRecord,
    {
      ...boxGeometryRecord,
      disposedIndexArray: disposedIndexArray |> ArrayService.push(geometry),
      gameObjectMap: gameObjectMap |> disposeSparseMapData(geometry),
      groupCountMap: groupCountMap |> disposeSparseMapData(geometry)
    }
  )
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (
      geometryArray: array(geometry),
      {vboBufferRecord} as state
    ) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                  geometryArray,
                  isAlive,
                  state |> RecordBoxGeometryMainService.getRecord
                )
              )
            )
          ),
        IsDebugMainService.getIsDebug(StateDataMain.stateData)
      );
      let boxGeometryRecord = state |> RecordBoxGeometryMainService.getRecord;
      let (vboBufferRecord, boxGeometryRecord) =
        geometryArray
        |> WonderCommonlib.ArrayService.reduceOneParam(
             [@bs]
             (
               ((vboBufferRecord, boxGeometryRecord), geometry) =>
                 switch (GroupBoxGeometryService.isGroupGeometry(geometry, boxGeometryRecord)) {
                 | false =>
                   let vboBufferRecord =
                     PoolVboBufferService.addBoxGeometryBufferToPool(geometry, vboBufferRecord);
                   _disposeData(geometry, (vboBufferRecord, boxGeometryRecord))
                 | true => (
                     vboBufferRecord,
                     GroupBoxGeometryService.decreaseGroupCount(geometry, boxGeometryRecord)
                   )
                 }
             ),
             (vboBufferRecord, boxGeometryRecord)
           );
      {...state, vboBufferRecord, boxGeometryRecord}
    }
  );