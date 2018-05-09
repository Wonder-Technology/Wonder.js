open StateDataMainType;

open CustomGeometryType;

let _restoreTypeArrays = (currentCustomGeometryRecord, targetCustomGeometryRecord) =>
  currentCustomGeometryRecord.vertices === targetCustomGeometryRecord.vertices
  && currentCustomGeometryRecord.normals === targetCustomGeometryRecord.normals
  && currentCustomGeometryRecord.indices === targetCustomGeometryRecord.indices ?
    (currentCustomGeometryRecord, targetCustomGeometryRecord) :
    {
      let (vertices, texCoords, normals, indices) =
        RecordCustomGeometryMainService.setDefaultTypeArrData(
          currentCustomGeometryRecord.index,
          (
            currentCustomGeometryRecord.vertices,
            currentCustomGeometryRecord.texCoords,
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
        (currentCustomGeometryRecord.texCoords, 0),
        (targetCustomGeometryRecord.texCoords, 0),
        Js.Typed_array.Float32Array.length(targetCustomGeometryRecord.texCoords)
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

/* TODO test texCoords */
let restore = (currentState, targetState) => {
  let currentCustomGeometryRecord = RecordCustomGeometryMainService.getRecord(currentState);
  let targetCustomGeometryRecord = RecordCustomGeometryMainService.getRecord(targetState);
  let (currentCustomGeometryRecord, targetCustomGeometryRecord) =
    _restoreTypeArrays(currentCustomGeometryRecord, targetCustomGeometryRecord);
  {
    ...targetState,
    customGeometryRecord:
      Some({
        ...targetCustomGeometryRecord,
        buffer: currentCustomGeometryRecord.buffer,
        vertices: currentCustomGeometryRecord.vertices,
        texCoords: currentCustomGeometryRecord.texCoords,
        normals: currentCustomGeometryRecord.normals,
        indices: currentCustomGeometryRecord.indices
      })
  }
};