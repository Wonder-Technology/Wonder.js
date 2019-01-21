let computeVertexNormals = (index, state) =>
  GeometryType.(
    switch (GeometryRenderService.unsafeGetIndicesType(index, state)) {
    | Short =>
      ComputeNormalsService.computeVertexNormalsByIndices(
        GetGeometryVerticesRenderService.getVertices(. index, state),
        GetGeometryIndicesRenderService.getIndices16(. index, state),
      )
    | Int =>
      ComputeNormalsService.computeVertexNormalsByIndices32(
        GetGeometryVerticesRenderService.getVertices(. index, state),
        GetGeometryIndicesRenderService.getIndices32(. index, state),
      )
    }
  );