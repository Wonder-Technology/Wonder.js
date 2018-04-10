open StateDataMainType;

let getIndices = [@bs] (({boxGeometryRecord}) => boxGeometryRecord.indices);

let getIndicesCount = [@bs] (() => ComputePointsBoxGeometryService.getIndicesCount());