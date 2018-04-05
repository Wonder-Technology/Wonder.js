open StateRenderType;

let getIndices =
  [@bs]
  (
    (index, {boxGeometryRecord}) =>
      OperateTypeArrayBoxGeometryService.getIndicesTypeArray(index, boxGeometryRecord.indices)
  );