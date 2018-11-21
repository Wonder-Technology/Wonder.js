open StateDataMainType;

open GeometryType;

let _restoreTypeArrays =
    (geometryPointCount, currentGeometryRecord, targetGeometryRecord) => {
  let (verticesInfos, texCoordsInfos, normalsInfos, indicesInfos) =
    RecordGeometryMainService.setAllInfosDataToDefault(
      currentGeometryRecord.index,
      (
        currentGeometryRecord.verticesInfos,
        currentGeometryRecord.texCoordsInfos,
        currentGeometryRecord.normalsInfos,
        currentGeometryRecord.indicesInfos,
      ),
    );

  currentGeometryRecord.vertices === targetGeometryRecord.vertices ?
    () :
    TypeArrayService.fillFloat32ArrayWithFloat32Array(
      (currentGeometryRecord.vertices, 0),
      (targetGeometryRecord.vertices, 0),
      Js.Typed_array.Float32Array.length(targetGeometryRecord.vertices),
    )
    |> ignore;

  currentGeometryRecord.texCoords === targetGeometryRecord.texCoords ?
    () :
    TypeArrayService.fillFloat32ArrayWithFloat32Array(
      (currentGeometryRecord.texCoords, 0),
      (targetGeometryRecord.texCoords, 0),
      Js.Typed_array.Float32Array.length(targetGeometryRecord.texCoords),
    )
    |> ignore;

  currentGeometryRecord.normals === targetGeometryRecord.normals ?
    () :
    TypeArrayService.fillFloat32ArrayWithFloat32Array(
      (currentGeometryRecord.normals, 0),
      (targetGeometryRecord.normals, 0),
      Js.Typed_array.Float32Array.length(targetGeometryRecord.normals),
    )
    |> ignore;

  currentGeometryRecord.indices === targetGeometryRecord.indices ?
    () :
    TypeArrayService.fillUint16ArrayWithUint16Array(
      (currentGeometryRecord.indices, 0),
      (targetGeometryRecord.indices, 0),
      Js.Typed_array.Uint16Array.length(targetGeometryRecord.indices),
    )
    |> ignore;

  currentGeometryRecord.indices32 === targetGeometryRecord.indices32 ?
    () :
    TypeArrayService.fillUint32ArrayWithUint32Array(
      (currentGeometryRecord.indices32, 0),
      (targetGeometryRecord.indices32, 0),
      Js.Typed_array.Uint32Array.length(targetGeometryRecord.indices32),
    )
    |> ignore;

  TypeArrayService.fillUint32ArrayWithUint32Array(
    (verticesInfos, 0),
    (targetGeometryRecord.verticesInfos, 0),
    Js.Typed_array.Uint32Array.length(targetGeometryRecord.verticesInfos),
  )
  |> ignore;
  TypeArrayService.fillUint32ArrayWithUint32Array(
    (normalsInfos, 0),
    (targetGeometryRecord.normalsInfos, 0),
    Js.Typed_array.Uint32Array.length(targetGeometryRecord.normalsInfos),
  )
  |> ignore;
  TypeArrayService.fillUint32ArrayWithUint32Array(
    (texCoordsInfos, 0),
    (targetGeometryRecord.texCoordsInfos, 0),
    Js.Typed_array.Uint32Array.length(targetGeometryRecord.texCoordsInfos),
  )
  |> ignore;
  TypeArrayService.fillUint32ArrayWithUint32Array(
    (indicesInfos, 0),
    (targetGeometryRecord.indicesInfos, 0),
    Js.Typed_array.Uint32Array.length(targetGeometryRecord.indicesInfos),
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
        verticesInfos: currentGeometryRecord.verticesInfos,
        texCoordsInfos: currentGeometryRecord.texCoordsInfos,
        normalsInfos: currentGeometryRecord.normalsInfos,
        indicesInfos: currentGeometryRecord.indicesInfos,
      }),
  };
};