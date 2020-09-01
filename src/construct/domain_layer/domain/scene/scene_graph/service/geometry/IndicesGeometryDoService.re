let getIndices = geometry => {
  DpContainer.unsafeGetGeometryRepoDp().getIndices(
    geometry->GeometryEntity.value,
  );
};

let setIndices = (geometry, indices) => {
  DpContainer.unsafeGetGeometryRepoDp().setIndices(
    geometry->GeometryEntity.value,
    indices->IndicesVO.value,
  );
};

let hasIndices = geometry => {
  DpContainer.unsafeGetGeometryRepoDp().hasIndices(
    geometry->GeometryEntity.value,
  );
};

let getIndicesCount = geometry => {
  DpContainer.unsafeGetGeometryRepoDp().getIndicesCount(
    geometry->GeometryEntity.value,
  );
};
