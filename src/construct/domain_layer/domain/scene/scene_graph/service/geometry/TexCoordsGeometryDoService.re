let getTexCoords = geometry => {
  DpContainer.unsafeGetGeometryRepoDp().getTexCoords(
    geometry->GeometryEntity.value,
  )
  ->Result.mapSuccess(TexCoordsVO.create);
};

let setTexCoords = (geometry, texCoords) => {
  DpContainer.unsafeGetGeometryRepoDp().setTexCoords(
    geometry->GeometryEntity.value,
    texCoords->TexCoordsVO.value,
  );
};

let hasTexCoords = geometry => {
  DpContainer.unsafeGetGeometryRepoDp().hasTexCoords(
    geometry->GeometryEntity.value,
  );
};
