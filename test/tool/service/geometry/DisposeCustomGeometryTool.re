open CustomGeometryType;

open GeometryType;

open StateDataMainType;

open DisposeCustomGeometryMainService;

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
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
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