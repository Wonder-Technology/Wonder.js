let getColor = light =>
  DpContainer.unsafeGetDirectionLightRepoDp().getColor(
    light->DirectionLightEntity.value,
  )
  ->Color3VO.create;

let setColor = (light, color) => {
  DpContainer.unsafeGetDirectionLightRepoDp().setColor(
    light->DirectionLightEntity.value,
    color->Color3VO.value,
  );
};

let getIntensity = light =>
  DpContainer.unsafeGetDirectionLightRepoDp().getIntensity(
    light->DirectionLightEntity.value,
  )
  ->IntensityVO.create;

let setIntensity = (light, intensity) => {
  DpContainer.unsafeGetDirectionLightRepoDp().setIntensity(
    light->DirectionLightEntity.value,
    intensity->IntensityVO.value,
  );
};
