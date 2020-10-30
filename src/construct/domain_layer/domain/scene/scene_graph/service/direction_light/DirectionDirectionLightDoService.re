let getDirection = light =>
  DpContainer.unsafeGetDirectionLightRepoDp().getDirection(
    light->DirectionLightEntity.value,
  )
  ->DirectionVO.create;
