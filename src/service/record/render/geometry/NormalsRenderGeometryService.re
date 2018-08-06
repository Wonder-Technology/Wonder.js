open RenderGeometryType;

let hasNormals = (geometry, geometryRecord) =>
  HasNormalsService.hasNormals(geometry, geometryRecord.normalsInfos);