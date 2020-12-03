let getIndices = geometry =>
  DpContainer.unsafeGetGeometryRepoDp().getIndices(geometry->GeometryEntity.value)->OptionSt.map(
    IndicesVO.create,
  )
