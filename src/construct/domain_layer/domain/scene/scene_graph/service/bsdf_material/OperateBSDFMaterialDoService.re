let getDiffuseColor = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getDiffuseColor(
    material->BSDFMaterialEntity.value,
  )
  ->Color3VO.create
  ->DiffuseVO.create;

let setDiffuseColor = (material, diffuse) => {
  DpContainer.unsafeGetBSDFMaterialRepoDp().setDiffuseColor(
    material->BSDFMaterialEntity.value,
    diffuse->DiffuseVO.getPrimitiveValue,
  );
};

let getSpecular = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getSpecular(
    material->BSDFMaterialEntity.value,
  )
  ->SpecularVO.create;

let setSpecular = (material, specular) => {
  DpContainer.unsafeGetBSDFMaterialRepoDp().setSpecular(
    material->BSDFMaterialEntity.value,
    specular->SpecularVO.value,
  );
};

let getRoughness = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getRoughness(
    material->BSDFMaterialEntity.value,
  )
  ->RoughnessVO.create;

let setRoughness = (material, roughness) => {
  DpContainer.unsafeGetBSDFMaterialRepoDp().setRoughness(
    material->BSDFMaterialEntity.value,
    roughness->RoughnessVO.value,
  );
};

let getMetalness = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getMetalness(
    material->BSDFMaterialEntity.value,
  )
  ->MetalnessVO.create;

let setMetalness = (material, metalness) => {
  DpContainer.unsafeGetBSDFMaterialRepoDp().setMetalness(
    material->BSDFMaterialEntity.value,
    metalness->MetalnessVO.value,
  );
};

let getTransmission = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getTransmission(
    material->BSDFMaterialEntity.value,
  )
  ->TransmissionVO.create;

let setTransmission = (material, transmission) => {
  DpContainer.unsafeGetBSDFMaterialRepoDp().setTransmission(
    material->BSDFMaterialEntity.value,
    transmission->TransmissionVO.value,
  );
};

let getIOR = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getIOR(
    material->BSDFMaterialEntity.value,
  )
  ->IORVO.create;

let setIOR = (material, ior) => {
  DpContainer.unsafeGetBSDFMaterialRepoDp().setIOR(
    material->BSDFMaterialEntity.value,
    ior->IORVO.value,
  );
};

let getDiffuseMapImageId = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getDiffuseMapImageId(
    material->BSDFMaterialEntity.value,
  )
  ->OptionSt.map(ImageIdVO.create);

let setDiffuseMapImageId = (material, id) => {
  DpContainer.unsafeGetBSDFMaterialRepoDp().setDiffuseMapImageId(
    material->BSDFMaterialEntity.value,
    id->ImageIdVO.value,
  );
};

let getChannelRoughnessMetallicMapImageId = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().
    getChannelRoughnessMetallicMapImageId(
    material->BSDFMaterialEntity.value,
  )
  ->OptionSt.map(ImageIdVO.create);

let setChannelRoughnessMetallicMapImageId = (material, id) => {
  DpContainer.unsafeGetBSDFMaterialRepoDp().
    setChannelRoughnessMetallicMapImageId(
    material->BSDFMaterialEntity.value,
    id->ImageIdVO.value,
  );
};

let getEmissionMapImageId = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getEmissionMapImageId(
    material->BSDFMaterialEntity.value,
  )
  ->OptionSt.map(ImageIdVO.create);

let setEmissionMapImageId = (material, id) => {
  DpContainer.unsafeGetBSDFMaterialRepoDp().setEmissionMapImageId(
    material->BSDFMaterialEntity.value,
    id->ImageIdVO.value,
  );
};

let getNormalMapImageId = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getNormalMapImageId(
    material->BSDFMaterialEntity.value,
  )
  ->OptionSt.map(ImageIdVO.create);

let setNormalMapImageId = (material, id) => {
  DpContainer.unsafeGetBSDFMaterialRepoDp().setNormalMapImageId(
    material->BSDFMaterialEntity.value,
    id->ImageIdVO.value,
  );
};

let getTransmissionMapImageId = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getTransmissionMapImageId(
    material->BSDFMaterialEntity.value,
  )
  ->OptionSt.map(ImageIdVO.create);

let setTransmissionMapImageId = (material, id) => {
  DpContainer.unsafeGetBSDFMaterialRepoDp().setTransmissionMapImageId(
    material->BSDFMaterialEntity.value,
    id->ImageIdVO.value,
  );
};
