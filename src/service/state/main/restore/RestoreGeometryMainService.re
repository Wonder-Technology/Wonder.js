open StateDataMainType;

open GeometryType;

let _restoreTypeArrays =
    (geometryPointCount, currentGeometryRecord, targetGeometryRecord) =>
  currentGeometryRecord.vertices === targetGeometryRecord.vertices
  && currentGeometryRecord.normals === targetGeometryRecord.normals
  && currentGeometryRecord.texCoords === targetGeometryRecord.texCoords
  && currentGeometryRecord.indices === targetGeometryRecord.indices
  && currentGeometryRecord.indices32 === targetGeometryRecord.indices32 ?
    (currentGeometryRecord, targetGeometryRecord) :
    {
      let (vertices, texCoords, normals, indices, indices32) =
        RecordGeometryMainService.setAllTypeArrDataToDefault(
          currentGeometryRecord.index,
          geometryPointCount,
          (
            currentGeometryRecord.vertices,
            currentGeometryRecord.texCoords,
            currentGeometryRecord.normals,
            currentGeometryRecord.indices,
            currentGeometryRecord.indices32,
          ),
        );
      TypeArrayService.fillFloat32ArrayWithFloat32Array(
        (currentGeometryRecord.vertices, 0),
        (targetGeometryRecord.vertices, 0),
        Js.Typed_array.Float32Array.length(targetGeometryRecord.vertices),
      )
      |> ignore;
      TypeArrayService.fillFloat32ArrayWithFloat32Array(
        (currentGeometryRecord.texCoords, 0),
        (targetGeometryRecord.texCoords, 0),
        Js.Typed_array.Float32Array.length(targetGeometryRecord.texCoords),
      )
      |> ignore;
      TypeArrayService.fillFloat32ArrayWithFloat32Array(
        (currentGeometryRecord.normals, 0),
        (targetGeometryRecord.normals, 0),
        Js.Typed_array.Float32Array.length(targetGeometryRecord.normals),
      )
      |> ignore;
      TypeArrayService.fillUint16ArrayWithUint16Array(
        (currentGeometryRecord.indices, 0),
        (targetGeometryRecord.indices, 0),
        Js.Typed_array.Uint16Array.length(targetGeometryRecord.indices),
      )
      |> ignore;
      TypeArrayService.fillUint32ArrayWithUint32Array(
        (currentGeometryRecord.indices32, 0),
        (targetGeometryRecord.indices32, 0),
        Js.Typed_array.Uint32Array.length(targetGeometryRecord.indices32),
      )
      |> ignore;
      (currentGeometryRecord, targetGeometryRecord);
    };

let restore = (currentState, targetState) => {
  let currentGeometryRecord =
    RecordGeometryMainService.getRecord(currentState);
  let targetGeometryRecord = RecordGeometryMainService.getRecord(targetState);
  let (currentGeometryRecord, targetGeometryRecord) =
    _restoreTypeArrays(
      BufferSettingService.getGeometryPointCount(currentState.settingRecord),
      currentGeometryRecord,
      targetGeometryRecord,
    );
  {
    ...targetState,
    geometryRecord:
      Some({
        ...targetGeometryRecord,
        buffer: currentGeometryRecord.buffer,
        vertices: currentGeometryRecord.vertices,
        texCoords: currentGeometryRecord.texCoords,
        normals: currentGeometryRecord.normals,
        indices: currentGeometryRecord.indices,
        indices32: currentGeometryRecord.indices32,
      }),
  };
};