let getVertices = geometry => {
  DpContainer.unsafeGetGeometryRepoDp().getVertices(
    geometry->GeometryEntity.value,
  )
  ->Result.mapSuccess(VerticesVO.create);
};

let setVertices = (geometry, vertices) => {
  DpContainer.unsafeGetGeometryRepoDp().setVertices(
    geometry->GeometryEntity.value,
    vertices->VerticesVO.value,
  );
};

let hasVertices = geometry => {
  DpContainer.unsafeGetGeometryRepoDp().hasVertices(
    geometry->GeometryEntity.value,
  );
};
