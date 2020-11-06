let getVertices = geometry => {
  DpContainer.unsafeGetGeometryRepoDp().getVertices(
    geometry->GeometryEntity.value,
  )
  ->VerticesVO.create;
};
