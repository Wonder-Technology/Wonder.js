let getDiffuseColor = material =>
  DpContainer.unsafeGetBRDFMaterialRepoDp().getDiffuseColor(
    material->BRDFMaterialEntity.value,
  )
  ->Color3VO.create
  ->DiffuseVO.create;

let setDiffuseColor = (material, diffuse) => {
  DpContainer.unsafeGetBRDFMaterialRepoDp().setDiffuseColor(
    material->BRDFMaterialEntity.value,
    diffuse->DiffuseVO.getPrimitiveValue,
  );
};

let getSpecular = material =>
  DpContainer.unsafeGetBRDFMaterialRepoDp().getSpecular(
    material->BRDFMaterialEntity.value,
  )
  ->SpecularVO.create;

let setSpecular = (material, specular) => {
  DpContainer.unsafeGetBRDFMaterialRepoDp().setSpecular(
    material->BRDFMaterialEntity.value,
    specular->SpecularVO.value,
  );
};

let getRoughness = material =>
  DpContainer.unsafeGetBRDFMaterialRepoDp().getRoughness(
    material->BRDFMaterialEntity.value,
  )
  ->RoughnessVO.create;

let setRoughness = (material, roughness) => {
  DpContainer.unsafeGetBRDFMaterialRepoDp().setRoughness(
    material->BRDFMaterialEntity.value,
    roughness->RoughnessVO.value,
  );
};

let getMetalness = material =>
  DpContainer.unsafeGetBRDFMaterialRepoDp().getMetalness(
    material->BRDFMaterialEntity.value,
  )
  ->MetalnessVO.create;

let setMetalness = (material, metalness) => {
  DpContainer.unsafeGetBRDFMaterialRepoDp().setMetalness(
    material->BRDFMaterialEntity.value,
    metalness->MetalnessVO.value,
  );
};

let getDiffuseMapImageId = material =>
  DpContainer.unsafeGetBRDFMaterialRepoDp().getDiffuseMapImageId(
    material->BRDFMaterialEntity.value,
  )
  
  ->OptionSt.map(ImageIdVO.create);

let setDiffuseMapImageId = (material, id) => {
  DpContainer.unsafeGetBRDFMaterialRepoDp().setDiffuseMapImageId(
    material->BRDFMaterialEntity.value,
    id->ImageIdVO.value,
  );
};

let getChannelRoughnessMetallicMapImageId = material =>
  DpContainer.unsafeGetBRDFMaterialRepoDp().getChannelRoughnessMetallicMapImageId(
    material->BRDFMaterialEntity.value,
  )
  
  ->OptionSt.map(ImageIdVO.create);

let setChannelRoughnessMetallicMapImageId = (material, id) => {
  DpContainer.unsafeGetBRDFMaterialRepoDp().setChannelRoughnessMetallicMapImageId(
    material->BRDFMaterialEntity.value,
    id->ImageIdVO.value,
  );
};

let getEmissionMapImageId = material =>
  DpContainer.unsafeGetBRDFMaterialRepoDp().getEmissionMapImageId(
    material->BRDFMaterialEntity.value,
  )
  
  ->OptionSt.map(ImageIdVO.create);

let setEmissionMapImageId = (material, id) => {
  DpContainer.unsafeGetBRDFMaterialRepoDp().setEmissionMapImageId(
    material->BRDFMaterialEntity.value,
    id->ImageIdVO.value,
  );
};

let getNormalMapImageId = material =>
  DpContainer.unsafeGetBRDFMaterialRepoDp().getNormalMapImageId(
    material->BRDFMaterialEntity.value,
  )
  
  ->OptionSt.map(ImageIdVO.create);

let setNormalMapImageId = (material, id) => {
  DpContainer.unsafeGetBRDFMaterialRepoDp().setNormalMapImageId(
    material->BRDFMaterialEntity.value,
    id->ImageIdVO.value,
  );
};
