let getColor = light =>
  DpContainer.unsafeGetDirectionLightRepoDp().getColor(
    light->PBRMaterialEntity.value,
  )
  ->Color3VO.create;

let setColor = (light, color) => {
  DpContainer.unsafeGetDirectionLightRepoDp().setColor(
    light->PBRMaterialEntity.value,
    color->Color3VO.value,
  );
};

let getIntensity = light =>
  DpContainer.unsafeGetDirectionLightRepoDp().getIntensity(
    light->PBRMaterialEntity.value,
  )
  ->IntensityVO.create;

let setIntensity = (light, intensity) => {
  DpContainer.unsafeGetDirectionLightRepoDp().setIntensity(
    light->PBRMaterialEntity.value,
    intensity->IntensityVO.value,
  );
};
