open StateRenderType;

let getVertices =
  [@bs]
  (
    (index, {boxGeometryRecord}) =>
      OperateTypeArrayBoxGeometryService.getVerticesTypeArray(index, boxGeometryRecord.vertices)
  );