let computeVertexNormals = (index, state) =>
  ComputeNormalsService.computeVertexNormals(
    GetGeometryVerticesRenderService.getVertices(. index, state),
    GetGeometryIndicesRenderService.getIndices(. index, state),
  );