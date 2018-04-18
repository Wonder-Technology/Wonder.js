open BoxGeometryType;

open GeometryType;

open StateDataMainType;

open DisposeBoxGeometryMainService;

let handleDisposeComponent = (geometry: geometry, {vboBufferRecord} as state) => {
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
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  let boxGeometryRecord = state |> RecordBoxGeometryMainService.getRecord;
  switch (GroupBoxGeometryService.isGroupGeometry(geometry, boxGeometryRecord)) {
  | false =>
    let vboBufferRecord =
      PoolVboBufferService.addBoxGeometryBufferToPool(geometry, vboBufferRecord);
    let (vboBufferRecord, boxGeometryRecord) =
      _disposeData(geometry, (vboBufferRecord, boxGeometryRecord));
    {...state, vboBufferRecord, boxGeometryRecord}
  | true => {
      ...state,
      boxGeometryRecord: GroupBoxGeometryService.decreaseGroupCount(geometry, boxGeometryRecord)
    }
  }
};