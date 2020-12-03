let isFlipTexCoordY = geometry =>
  DpContainer.unsafeGetGeometryRepoDp().isFlipTexCoordY(geometry->GeometryEntity.value)

let isSame = (geometry1, geometry2) =>
  DpContainer.unsafeGetGeometryRepoDp().isSame(
    geometry1->GeometryEntity.value,
    geometry2->GeometryEntity.value,
  )

let getId = geometry => DpContainer.unsafeGetGeometryRepoDp().getId(geometry->GeometryEntity.value)
