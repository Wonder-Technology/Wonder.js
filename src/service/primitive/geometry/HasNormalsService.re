let hasNormals = (index, normalsInfos) =>
  ReallocatedPointsGeometryService.hasPointData(
    BufferCustomGeometryService.getInfoIndex(index),
    normalsInfos,
  );