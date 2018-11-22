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
        verticesInfos: currentGeometryRecord.verticesInfos,
        texCoordsInfos: currentGeometryRecord.texCoordsInfos,
        normalsInfos: currentGeometryRecord.normalsInfos,
        indicesInfos: currentGeometryRecord.indicesInfos,
      }),
  };
};