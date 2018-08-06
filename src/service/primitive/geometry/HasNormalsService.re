let hasNormals = (index, normalsInfos) =>
  ReallocatedPointsGeometryService.hasPointData(
    BufferGeometryService.getInfoIndex(index),
    normalsInfos,
  );