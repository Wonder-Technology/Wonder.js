open StateRenderType;

let getIndices =
  [@bs]
  (
    (index, {boxGeometryRecord}) =>
      OperateTypeArrayBoxGeometryService.getIndicesTypeArray(index, boxGeometryRecord.indices)
  );


let getIndicesCount = (index, state) => BufferBoxGeometryService.getIndicesCount();