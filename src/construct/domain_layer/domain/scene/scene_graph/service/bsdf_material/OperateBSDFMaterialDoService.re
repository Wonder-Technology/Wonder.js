let getDiffuseColor = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getDiffuseColor(
    material->BSDFMaterialEntity.value,
  )
  ->Color4VO.create
  ->DiffuseVO.create;

let getSpecular = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getSpecular(
    material->BSDFMaterialEntity.value,
  )
  ->SpecularVO.create;

let getSpecularColor = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getSpecularColor(
    material->BSDFMaterialEntity.value,
  )
  ->Color3VO.create
  ->SpecularColorVO.create;

let getRoughness = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getRoughness(
    material->BSDFMaterialEntity.value,
  )
  ->RoughnessVO.create;

let getMetalness = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getMetalness(
    material->BSDFMaterialEntity.value,
  )
  ->MetalnessVO.create;

let getTransmission = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getTransmission(
    material->BSDFMaterialEntity.value,
  )
  ->TransmissionVO.create;

let getIOR = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getIOR(
    material->BSDFMaterialEntity.value,
  )
  ->IORVO.create;

let getDiffuseMapImageId = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getDiffuseMapImageId(
    material->BSDFMaterialEntity.value,
  )
  ->OptionSt.map(ImageIdVO.create);

let getChannelRoughnessMetallicMapImageId = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().
    getChannelRoughnessMetallicMapImageId(
    material->BSDFMaterialEntity.value,
  )
  ->OptionSt.map(ImageIdVO.create);

let getEmissionMapImageId = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getEmissionMapImageId(
    material->BSDFMaterialEntity.value,
  )
  ->OptionSt.map(ImageIdVO.create);

let getNormalMapImageId = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getNormalMapImageId(
    material->BSDFMaterialEntity.value,
  )
  ->OptionSt.map(ImageIdVO.create);

let getTransmissionMapImageId = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getTransmissionMapImageId(
    material->BSDFMaterialEntity.value,
  )
  ->OptionSt.map(ImageIdVO.create);

let getSpecularMapImageId = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getSpecularMapImageId(
    material->BSDFMaterialEntity.value,
  )
  ->OptionSt.map(ImageIdVO.create);

let getAlphaCutoff = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getAlphaCutoff(
    material->BSDFMaterialEntity.value,
  )
  ->AlphaCutoffVO.create;

let isSame = (material1, material2) => {
  DpContainer.unsafeGetBSDFMaterialRepoDp().isSame(
    material1->BSDFMaterialEntity.value,
    material2->BSDFMaterialEntity.value,
  );
};

let getId = material => {
  DpContainer.unsafeGetBSDFMaterialRepoDp().getId(
    material->BSDFMaterialEntity.value,
  );
};

let getDiffuseMapImageWrapData = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getDiffuseMapImageWrapData(
    material->BSDFMaterialEntity.value,
  )
  ->OptionSt.map(Tuple2.map(WrapVO.create));

let getChannelRoughnessMetallicMapImageWrapData = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().
    getChannelRoughnessMetallicMapImageWrapData(
    material->BSDFMaterialEntity.value,
  )
  ->OptionSt.map(Tuple2.map(WrapVO.create));

let getEmissionMapImageWrapData = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getEmissionMapImageWrapData(
    material->BSDFMaterialEntity.value,
  )
  ->OptionSt.map(Tuple2.map(WrapVO.create));

let getNormalMapImageWrapData = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getNormalMapImageWrapData(
    material->BSDFMaterialEntity.value,
  )
  ->OptionSt.map(Tuple2.map(WrapVO.create));

let getTransmissionMapImageWrapData = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getTransmissionMapImageWrapData(
    material->BSDFMaterialEntity.value,
  )
  ->OptionSt.map(Tuple2.map(WrapVO.create));

let getSpecularMapImageWrapData = material =>
  DpContainer.unsafeGetBSDFMaterialRepoDp().getSpecularMapImageWrapData(
    material->BSDFMaterialEntity.value,
  )
  ->OptionSt.map(Tuple2.map(WrapVO.create));
