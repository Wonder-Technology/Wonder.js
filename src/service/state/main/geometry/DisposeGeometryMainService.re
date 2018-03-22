open BoxGeometryType;

open GeometryType;

open MainStateDataType;

open DisposeComponentService;

/* let isAlive = (geometry, {disposedIndexMap} as record) =>
   disposedIndexMap |> WonderCommonlib.SparseMapService.has(geometry) ?
     false :
     MappedIndexService.isComponentAlive(
       geometry,
       IndexBoxGeometryService.getMappedIndexMap(record)
     ); */
let isAlive = (geometry, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(geometry, disposedIndexArray);

let _disposeData =
    (
      geometry,
      (
        vboBufferRecord,
        {
          disposeCount,
          disposedIndexArray,
          disposedIndexMap,
          /* verticesInfoArray,
             normalsInfoArray,
             indicesInfoArray, */
          computeDataFuncMap,
          configDataMap,
          gameObjectMap,
          isInitMap,
          groupCountMap
        } as boxGeometryRecord
      )
    ) => {
  let vboBufferRecord =
    DisposeVboBufferService.disposeGeometryBufferData(geometry, vboBufferRecord);
  (
    vboBufferRecord,
    {
      ...boxGeometryRecord,
      disposedIndexArray: disposedIndexArray |> ArrayService.push(geometry),
      disposedIndexMap: disposedIndexMap |> WonderCommonlib.SparseMapService.set(geometry, true),
      disposeCount: succ(disposeCount),
      /* verticesInfoArray: verticesInfoArray |> disposeSparseMapData(geometry),
         normalsInfoArray: normalsInfoArray |> disposeSparseMapData(geometry),
         indicesInfoArray: indicesInfoArray |> disposeSparseMapData(geometry), */
      computeDataFuncMap: computeDataFuncMap |> disposeSparseMapData(geometry),
      configDataMap: configDataMap |> disposeSparseMapData(geometry),
      gameObjectMap: gameObjectMap |> disposeSparseMapData(geometry),
      isInitMap: isInitMap |> disposeSparseMapData(geometry),
      groupCountMap: groupCountMap |> disposeSparseMapData(geometry)
    }
  )
};

let _handleByDisposeCount = (settingRecord, (vboBufferRecord, boxGeometryRecord)) =>
  if (QueryCPUMemoryService.isDisposeTooMany(boxGeometryRecord.disposeCount, settingRecord)) {
    boxGeometryRecord.disposeCount = 0;
    (vboBufferRecord, ReallocateGeometryCPUMemoryService.reAllocate(boxGeometryRecord))
  } else {
    (vboBufferRecord, boxGeometryRecord)
  };

let handleDisposeComponent = (geometry: geometry, {settingRecord, vboBufferRecord} as state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            DisposeComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              state |> RecordBoxGeometryMainService.getRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  /* let {disposedIndexArray} as boxGeometryRecord = state |> RecordBoxGeometryMainService.getRecord; */
  let boxGeometryRecord = state |> RecordBoxGeometryMainService.getRecord;
  switch (GroupGeometryService.isGroupGeometry(geometry, boxGeometryRecord)) {
  | false =>
    let vboBufferRecord = PoolVboBufferService.addGeometryBufferToPool(geometry, vboBufferRecord);
    let (vboBufferRecord, boxGeometryRecord) =
      _disposeData(geometry, (vboBufferRecord, boxGeometryRecord))
      |> _handleByDisposeCount(settingRecord);
    /* boxGeometryRecord.disposedIndexArray = disposedIndexArray |> ArrayService.push(geometry); */
    {...state, vboBufferRecord, boxGeometryRecord: Some(boxGeometryRecord)}
  | true => {
      ...state,
      boxGeometryRecord: Some(GroupGeometryService.decreaseGroupCount(geometry, boxGeometryRecord))
    }
  }
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (
      geometryArray: array(geometry),
      isGameObjectDisposedMap: array(bool),
      {settingRecord, vboBufferRecord} as state
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
        IsDebugMainService.getIsDebug(MainStateData.stateData)
      );
      /* let {disposedIndexMap} = state |> RecordBoxGeometryMainService.getRecord; */
      let boxGeometryRecord = state |> RecordBoxGeometryMainService.getRecord;
      let (vboBufferRecord, boxGeometryRecord) =
        geometryArray
        |> WonderCommonlib.ArrayService.reduceOneParam(
             [@bs]
             (
               ((vboBufferRecord, boxGeometryRecord), geometry) =>
                 switch (GroupGeometryService.isGroupGeometry(geometry, boxGeometryRecord)) {
                 | false =>
                   let vboBufferRecord =
                     PoolVboBufferService.addGeometryBufferToPool(geometry, vboBufferRecord);
                   /* boxGeometryRecord.disposedIndexArray =
                      disposedIndexArray |> ArrayService.push(geometry); */
                   _disposeData(geometry, (vboBufferRecord, boxGeometryRecord))
                   |> _handleByDisposeCount(settingRecord)
                 | true => (
                     vboBufferRecord,
                     GroupGeometryService.decreaseGroupCount(geometry, boxGeometryRecord)
                   )
                 }
             ),
             (vboBufferRecord, boxGeometryRecord)
           );
      {...state, vboBufferRecord, boxGeometryRecord: Some(boxGeometryRecord)}
    }
  );

let isNotDisposed = ({disposedIndexArray}) => disposedIndexArray |> Js.Array.length === 0;