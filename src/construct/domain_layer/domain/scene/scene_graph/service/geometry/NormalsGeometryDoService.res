let getNormals = geometry =>
  DpContainer.unsafeGetGeometryRepoDp().getNormals(geometry->GeometryEntity.value)->OptionSt.map(
    NormalsVO.create,
  )
