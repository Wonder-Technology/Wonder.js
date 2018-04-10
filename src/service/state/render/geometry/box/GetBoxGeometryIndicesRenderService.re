open StateRenderType;

let getIndices =
  [@bs] ((index: int, {boxGeometryRecord}: renderState) => boxGeometryRecord.indices);

let getIndicesCount =
  [@bs] ((index: int, state: renderState) => ComputePointsBoxGeometryService.getIndicesCount());