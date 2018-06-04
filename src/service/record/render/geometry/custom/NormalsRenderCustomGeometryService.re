open RenderCustomGeometryType;

let hasNormals = (geometry, customGeometry) =>
  HasNormalsService.hasNormals(geometry, customGeometry.normalsInfos);