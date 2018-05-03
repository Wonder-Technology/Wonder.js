open StateDataMainType;

open CustomGeometryType;

let _restoreTypeArrays =
    (currentCustomGeometryRecord, targetCustomGeometryRecord, customGeometryDataBufferCount) => {
  let (vertices, normals, indices) =
    RecordCustomGeometryMainService.setDefaultTypeArrData(
      customGeometryDataBufferCount,
      (
        currentCustomGeometryRecord.vertices,
        currentCustomGeometryRecord.normals,
        currentCustomGeometryRecord.indices
      )
    );
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (currentCustomGeometryRecord.vertices, 0),
    (targetCustomGeometryRecord.vertices, 0),
    Js.Typed_array.Float32Array.length(targetCustomGeometryRecord.vertices)
  )
  |> ignore;
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (currentCustomGeometryRecord.normals, 0),
    (targetCustomGeometryRecord.normals, 0),
    Js.Typed_array.Float32Array.length(targetCustomGeometryRecord.normals)
  )
  |> ignore;
  TypeArrayService.fillUint16ArrayWithUint16Array(
    (currentCustomGeometryRecord.indices, 0),
    (targetCustomGeometryRecord.indices, 0),
    Js.Typed_array.Uint16Array.length(targetCustomGeometryRecord.indices)
  )
  |> ignore;
  (currentCustomGeometryRecord, targetCustomGeometryRecord)
};

let restore = (currentState, targetState) => {
  let currentCustomGeometryRecord = RecordCustomGeometryMainService.getRecord(currentState);
  let targetCustomGeometryRecord = RecordCustomGeometryMainService.getRecord(targetState);
  let customGeometryDataBufferCount =
    BufferSettingService.getCustomGeometryPointDataBufferCount(currentState.settingRecord);
  let (currentCustomGeometryRecord, targetCustomGeometryRecord) =
    _restoreTypeArrays(
      currentCustomGeometryRecord,
      targetCustomGeometryRecord,
      customGeometryDataBufferCount
    );
  {
    ...targetState,
    customGeometryRecord:
      Some({
        ...targetCustomGeometryRecord,
        buffer: currentCustomGeometryRecord.buffer,
        vertices: currentCustomGeometryRecord.vertices,
        normals: currentCustomGeometryRecord.normals,
        indices: currentCustomGeometryRecord.indices
      })
  }
};