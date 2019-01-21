let computeVertexNormals = (index, state) =>
  GeometryType.(
    switch (GeometryRenderService.unsafeGetIndicesType(index, state)) {
    | Short =>
      ComputeNormalsService.computeVertexNormals(
        GetGeometryVerticesRenderService.getVertices(. index, state),
        GetGeometryIndicesRenderService.getIndices16(. index, state)
        |> AbstractIndicesType.indices16ToIndices,
      )
    | Int =>
      ComputeNormalsService.computeVertexNormals(
        GetGeometryVerticesRenderService.getVertices(. index, state),
        GetGeometryIndicesRenderService.getIndices32(. index, state)
        |> AbstractIndicesType.indices32ToIndices,
      )
    }
  );