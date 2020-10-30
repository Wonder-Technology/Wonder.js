let getColor = light =>
  DpContainer.unsafeGetDirectionLightRepoDp().getColor(
    light->DirectionLightEntity.value,
  )
  ->Color3VO.create;

let getIntensity = light =>
  DpContainer.unsafeGetDirectionLightRepoDp().getIntensity(
    light->DirectionLightEntity.value,
  )
  ->IntensityVO.create;
