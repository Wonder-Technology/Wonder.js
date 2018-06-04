let computeVertexNormals = (index, state) =>
  ComputeNormalsService.computeVertexNormals(
    GetCustomGeometryVerticesRenderService.getVertices(. index, state),
    GetCustomGeometryIndicesRenderService.getIndices(. index, state),
  );