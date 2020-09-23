let getDiffuseColor = material =>
  DpContainer.unsafeGetPBRMaterialRepoDp().getDiffuseColor(
    material->PBRMaterialEntity.value,
  )
  ->Color3VO.create
  ->DiffuseVO.create;

let setDiffuseColor = (material, diffuse) => {
  DpContainer.unsafeGetPBRMaterialRepoDp().setDiffuseColor(
    material->PBRMaterialEntity.value,
    diffuse->DiffuseVO.getPrimitiveValue,
  );
};

let getSpecular = material =>
  DpContainer.unsafeGetPBRMaterialRepoDp().getSpecular(
    material->PBRMaterialEntity.value,
  )
  ->SpecularVO.create;

let setSpecular = (material, specular) => {
  DpContainer.unsafeGetPBRMaterialRepoDp().setSpecular(
    material->PBRMaterialEntity.value,
    specular->SpecularVO.value,
  );
};

let getRoughness = material =>
  DpContainer.unsafeGetPBRMaterialRepoDp().getRoughness(
    material->PBRMaterialEntity.value,
  )
  ->RoughnessVO.create;

let setRoughness = (material, roughness) => {
  DpContainer.unsafeGetPBRMaterialRepoDp().setRoughness(
    material->PBRMaterialEntity.value,
    roughness->RoughnessVO.value,
  );
};

let getMetalness = material =>
  DpContainer.unsafeGetPBRMaterialRepoDp().getMetalness(
    material->PBRMaterialEntity.value,
  )
  ->MetalnessVO.create;

let setMetalness = (material, metalness) => {
  DpContainer.unsafeGetPBRMaterialRepoDp().setMetalness(
    material->PBRMaterialEntity.value,
    metalness->MetalnessVO.value,
  );
};

let getDiffuseMapSourceId = material =>
  DpContainer.unsafeGetPBRMaterialRepoDp().getDiffuseMapSourceId(
    material->PBRMaterialEntity.value,
  )
  ->OptionSt.fromNullable
  ->OptionSt.map(ImageIdVO.create);

let setDiffuseMapSourceId = (material, id) => {
  DpContainer.unsafeGetPBRMaterialRepoDp().setDiffuseMapSourceId(
    material->PBRMaterialEntity.value,
    id->ImageIdVO.value,
  );
};

let getMetalRoughnessMapSourceId = material =>
  DpContainer.unsafeGetPBRMaterialRepoDp().getMetalRoughnessMapSourceId(
    material->PBRMaterialEntity.value,
  )
  ->OptionSt.fromNullable
  ->OptionSt.map(ImageIdVO.create);

let setMetalRoughnessMapSourceId = (material, id) => {
  DpContainer.unsafeGetPBRMaterialRepoDp().setMetalRoughnessMapSourceId(
    material->PBRMaterialEntity.value,
    id->ImageIdVO.value,
  );
};

let getEmissionMapSourceId = material =>
  DpContainer.unsafeGetPBRMaterialRepoDp().getEmissionMapSourceId(
    material->PBRMaterialEntity.value,
  )
  ->OptionSt.fromNullable
  ->OptionSt.map(ImageIdVO.create);

let setEmissionMapSourceId = (material, id) => {
  DpContainer.unsafeGetPBRMaterialRepoDp().setEmissionMapSourceId(
    material->PBRMaterialEntity.value,
    id->ImageIdVO.value,
  );
};

let getNormalMapSourceId = material =>
  DpContainer.unsafeGetPBRMaterialRepoDp().getNormalMapSourceId(
    material->PBRMaterialEntity.value,
  )
  ->OptionSt.fromNullable
  ->OptionSt.map(ImageIdVO.create);

let setNormalMapSourceId = (material, id) => {
  DpContainer.unsafeGetPBRMaterialRepoDp().setNormalMapSourceId(
    material->PBRMaterialEntity.value,
    id->ImageIdVO.value,
  );
};
