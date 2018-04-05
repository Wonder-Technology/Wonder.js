open SendAttributeStateType;

let getVertices =
  [@bs]
  (
    (index, {boxGeometryRecord}) =>
      OperateTypeArrayBoxGeometryService.getVerticesTypeArray(index, boxGeometryRecord.vertices)
  );