let getNormals = geometry => {
  DpContainer.unsafeGetGeometryRepoDp().getNormals(
    geometry->GeometryEntity.value,
  )
  ->Result.mapSuccess(NormalsVO.create);
};

let setNormals = (geometry, normals) => {
  DpContainer.unsafeGetGeometryRepoDp().setNormals(
    geometry->GeometryEntity.value,
    normals->NormalsVO.value,
  );
};

let hasNormals = geometry => {
  DpContainer.unsafeGetGeometryRepoDp().hasNormals(
    geometry->GeometryEntity.value,
  );
};
