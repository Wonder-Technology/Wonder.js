open StateSendAttributeType;

let getVertices =
  [@bs]
  (
    (index, {boxGeometryRecord}) =>
      OperateTypeArrayBoxGeometryService.getVerticesTypeArray(index, boxGeometryRecord.vertices)
  );