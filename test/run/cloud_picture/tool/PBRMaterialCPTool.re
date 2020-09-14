let createAndAddTwoMaterials = (gameObject1, gameObject2) => {
  let material1 = PBRMaterialRunAPI.create()->ResultTool.getExnSuccessValue;
  let material2 = PBRMaterialRunAPI.create()->ResultTool.getExnSuccessValue;
  GameObjectRunAPI.addPBRMaterial(gameObject1, material1)
  ->ResultTool.getExnSuccessValueIgnore;
  GameObjectRunAPI.addPBRMaterial(gameObject2, material2)
  ->ResultTool.getExnSuccessValueIgnore;
  let diffuseColor1 = (1., 0., 0.)->Color3VO.create->DiffuseVO.create;
  let diffuseColor2 = (0., 1., 0.)->Color3VO.create->DiffuseVO.create;
  let specular1 = 0.5->SpecularVO.create;
  let specular2 = 1.0->SpecularVO.create;
  let roughness1 = 0.5->RoughnessVO.create;
  let roughness2 = 1.5->RoughnessVO.create;
  let metalness1 = 1.0->MetalnessVO.create;
  let metalness2 = 2.0->MetalnessVO.create;
  PBRMaterialRunAPI.setDiffuseColor(material1, diffuseColor1)
  ->ResultTool.getExnSuccessValueIgnore;
  PBRMaterialRunAPI.setDiffuseColor(material2, diffuseColor2)
  ->ResultTool.getExnSuccessValueIgnore;
  PBRMaterialRunAPI.setSpecular(material1, specular1)
  ->ResultTool.getExnSuccessValueIgnore;
  PBRMaterialRunAPI.setSpecular(material2, specular2)
  ->ResultTool.getExnSuccessValueIgnore;
  PBRMaterialRunAPI.setRoughness(material1, roughness1)
  ->ResultTool.getExnSuccessValueIgnore;
  PBRMaterialRunAPI.setRoughness(material2, roughness2)
  ->ResultTool.getExnSuccessValueIgnore;
  PBRMaterialRunAPI.setMetalness(material1, metalness1)
  ->ResultTool.getExnSuccessValueIgnore;
  PBRMaterialRunAPI.setMetalness(material2, metalness2)
  ->ResultTool.getExnSuccessValueIgnore;

  (
    (material1, material2),
    (
      (diffuseColor1, diffuseColor2),
      (specular1, specular2),
      (roughness1, roughness2),
      (metalness1, metalness2),
    ),
  );
};
