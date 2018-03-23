open BoxGeometryType;

open GeometryType;

open MainStateDataType;

open DisposeComponentService;

let isAlive = (geometry, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(geometry, disposedIndexArray);

let _disposeData =
    (
      geometry,
      (
        vboBufferRecord,
        {
          disposedIndexArray,
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
      computeDataFuncMap: computeDataFuncMap |> disposeSparseMapData(geometry),
      configDataMap: configDataMap |> disposeSparseMapData(geometry),
      gameObjectMap: gameObjectMap |> disposeSparseMapData(geometry),
      isInitMap: isInitMap |> disposeSparseMapData(geometry),
      groupCountMap: groupCountMap |> disposeSparseMapData(geometry)
    }
  )
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
  let boxGeometryRecord = state |> RecordBoxGeometryMainService.getRecord;
  switch (GroupBoxGeometryService.isGroupGeometry(geometry, boxGeometryRecord)) {
  | false =>
    let vboBufferRecord = PoolVboBufferService.addGeometryBufferToPool(geometry, vboBufferRecord);
    let (vboBufferRecord, boxGeometryRecord) =
      _disposeData(geometry, (vboBufferRecord, boxGeometryRecord));
    {...state, vboBufferRecord, boxGeometryRecord: Some(boxGeometryRecord)}
  | true => {
      ...state,
      boxGeometryRecord:
        Some(GroupBoxGeometryService.decreaseGroupCount(geometry, boxGeometryRecord))
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
                     PoolVboBufferService.addGeometryBufferToPool(geometry, vboBufferRecord);
                   _disposeData(geometry, (vboBufferRecord, boxGeometryRecord))
                 | true => (
                     vboBufferRecord,
                     GroupBoxGeometryService.decreaseGroupCount(geometry, boxGeometryRecord)
                   )
                 }
             ),
             (vboBufferRecord, boxGeometryRecord)
           );
      {...state, vboBufferRecord, boxGeometryRecord: Some(boxGeometryRecord)}
    }
  );

let isNotDisposed = ({disposedIndexArray}) => disposedIndexArray |> Js.Array.length === 0;