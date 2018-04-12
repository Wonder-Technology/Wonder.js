open StateDataMainType;

open CustomGeometryType;

let restore = (currentState, targetState) => {
  let currentCustomGeometryRecord = RecordCustomGeometryMainService.getRecord(currentState);
  let targetCustomGeometryRecord = RecordCustomGeometryMainService.getRecord(targetState);
  let newBuffer =
    CopyArrayBufferService.copyArrayBufferData(
      targetCustomGeometryRecord.buffer,
      currentCustomGeometryRecord.buffer
    );
  {...targetState, customGeometryRecord: Some({...targetCustomGeometryRecord, buffer: newBuffer})}
};