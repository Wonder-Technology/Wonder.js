let getTexCoords = geometry =>
  DpContainer.unsafeGetGeometryRepoDp().getTexCoords(geometry->GeometryEntity.value)->OptionSt.map(
    TexCoordsVO.create,
  )
