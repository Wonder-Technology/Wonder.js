let getTangents = geometry => {
  DpContainer.unsafeGetGeometryRepoDp().getTangents(
    geometry->GeometryEntity.value,
  )
  ->OptionSt.map(TangentsVO.create);
};
