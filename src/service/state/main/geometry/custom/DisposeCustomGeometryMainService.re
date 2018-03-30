open MainStateDataType;

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
      (
        vboBufferRecord,
        {
          disposeCount,
          disposedIndexArray,
          disposedIndexMap,
          /* verticesInfoArray,
             normalsInfoArray,
             indicesInfoArray, */
          /* computeDataFuncMap,
             configDataMap, */
          gameObjectMap,
          /* isInitMap, */
          groupCountMap
        } as customGeometryRecord
      )
    ) => {
  let vboBufferRecord =
    DisposeVboBufferService.disposeCustomGeometryBufferData(geometry, vboBufferRecord);
  (
    vboBufferRecord,
    {
      ...customGeometryRecord,
      disposedIndexArray: disposedIndexArray |> ArrayService.push(geometry),
      disposedIndexMap: disposedIndexMap |> WonderCommonlib.SparseMapService.set(geometry, true),
      disposeCount: succ(disposeCount),
      /* computeDataFuncMap: computeDataFuncMap |> disposeSparseMapData(geometry),
         configDataMap: configDataMap |> disposeSparseMapData(geometry), */
      gameObjectMap: gameObjectMap |> disposeSparseMapData(geometry),
      /* isInitMap: isInitMap |> disposeSparseMapData(geometry), */
      groupCountMap: groupCountMap |> disposeSparseMapData(geometry)
    }: customGeometryRecord
  )
};

let _handleByDisposeCount =
    (settingRecord, (vboBufferRecord, customGeometryRecord: customGeometryRecord)) =>
  if (QueryCPUMemoryService.isDisposeTooMany(customGeometryRecord.disposeCount, settingRecord)) {
    customGeometryRecord.disposeCount = 0;
    (vboBufferRecord, ReallocateCustomGeometryCPUMemoryService.reAllocate(customGeometryRecord))
  } else {
    (vboBufferRecord, customGeometryRecord)
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
              state |> RecordCustomGeometryMainService.getRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  /* let {disposedIndexArray} as customGeometryRecord = state |> RecordCustomGeometryMainService.getRecord; */
  let customGeometryRecord = state |> RecordCustomGeometryMainService.getRecord;
  switch (GroupCustomGeometryService.isGroupGeometry(geometry, customGeometryRecord)) {
  | false =>
    let vboBufferRecord =
      PoolVboBufferService.addCustomGeometryBufferToPool(geometry, vboBufferRecord);
    let (vboBufferRecord, customGeometryRecord) =
      _disposeData(geometry, (vboBufferRecord, customGeometryRecord))
      |> _handleByDisposeCount(settingRecord);
    /* customGeometryRecord.disposedIndexArray = disposedIndexArray |> ArrayService.push(geometry); */
    {...state, vboBufferRecord, customGeometryRecord: Some(customGeometryRecord)}
  | true => {
      ...state,
      customGeometryRecord:
        Some(GroupCustomGeometryService.decreaseGroupCount(geometry, customGeometryRecord))
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
                  state |> RecordCustomGeometryMainService.getRecord
                )
              )
            )
          ),
        IsDebugMainService.getIsDebug(MainStateData.stateData)
      );
      /* let {disposedIndexMap} = state |> RecordCustomGeometryMainService.getRecord; */
      let customGeometryRecord = state |> RecordCustomGeometryMainService.getRecord;
      let (vboBufferRecord, customGeometryRecord) =
        geometryArray
        |> WonderCommonlib.ArrayService.reduceOneParam(
             [@bs]
             (
               ((vboBufferRecord, customGeometryRecord), geometry) =>
                 switch (
                   GroupCustomGeometryService.isGroupGeometry(geometry, customGeometryRecord)
                 ) {
                 | false =>
                   let vboBufferRecord =
                     PoolVboBufferService.addCustomGeometryBufferToPool(geometry, vboBufferRecord);
                   /* customGeometryRecord.disposedIndexArray =
                      disposedIndexArray |> ArrayService.push(geometry); */
                   _disposeData(geometry, (vboBufferRecord, customGeometryRecord))
                   |> _handleByDisposeCount(settingRecord)
                 | true => (
                     vboBufferRecord,
                     GroupCustomGeometryService.decreaseGroupCount(geometry, customGeometryRecord)
                   )
                 }
             ),
             (vboBufferRecord, customGeometryRecord)
           );
      {...state, vboBufferRecord, customGeometryRecord: Some(customGeometryRecord)}
    }
  );

let isNotDisposed = ({disposedIndexArray}) => disposedIndexArray |> Js.Array.length === 0;