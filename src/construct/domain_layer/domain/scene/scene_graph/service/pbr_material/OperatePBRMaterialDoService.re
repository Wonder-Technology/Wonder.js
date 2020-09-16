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
