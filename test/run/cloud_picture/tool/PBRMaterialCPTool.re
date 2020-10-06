let createAndAddTwoMaterials = (gameObject1, gameObject2) => {
  let material1 = PBRMaterialCPAPI.create()->ResultTool.getExnSuccessValue;
  let material2 = PBRMaterialCPAPI.create()->ResultTool.getExnSuccessValue;
  GameObjectCPAPI.addPBRMaterial(gameObject1, material1)
  ->ResultTool.getExnSuccessValueIgnore;
  GameObjectCPAPI.addPBRMaterial(gameObject2, material2)
  ->ResultTool.getExnSuccessValueIgnore;
  let diffuseColor1 = (1., 0., 0.)->Color3VO.create->DiffuseVO.create;
  let diffuseColor2 = (0., 1., 0.)->Color3VO.create->DiffuseVO.create;
  let specular1 = 0.5->SpecularVO.create;
  let specular2 = 1.0->SpecularVO.create;
  let roughness1 = 0.5->RoughnessVO.create;
  let roughness2 = 1.5->RoughnessVO.create;
  let metalness1 = 1.0->MetalnessVO.create;
  let metalness2 = 2.0->MetalnessVO.create;
  PBRMaterialCPAPI.setDiffuseColor(material1, diffuseColor1)
  ->ResultTool.getExnSuccessValueIgnore;
  PBRMaterialCPAPI.setDiffuseColor(material2, diffuseColor2)
  ->ResultTool.getExnSuccessValueIgnore;
  PBRMaterialCPAPI.setSpecular(material1, specular1)
  ->ResultTool.getExnSuccessValueIgnore;
  PBRMaterialCPAPI.setSpecular(material2, specular2)
  ->ResultTool.getExnSuccessValueIgnore;
  PBRMaterialCPAPI.setRoughness(material1, roughness1)
  ->ResultTool.getExnSuccessValueIgnore;
  PBRMaterialCPAPI.setRoughness(material2, roughness2)
  ->ResultTool.getExnSuccessValueIgnore;
  PBRMaterialCPAPI.setMetalness(material1, metalness1)
  ->ResultTool.getExnSuccessValueIgnore;
  PBRMaterialCPAPI.setMetalness(material2, metalness2)
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

let setMapData = (material1, material2) => {
  open ImagePOType;

  let id1 = "i1"->ImageIdVO.create;
  let id2 = "i2"->ImageIdVO.create;
  let id3 = "i3"->ImageIdVO.create;
  let id4 = "i4"->ImageIdVO.create;
  let id5 = "i5"->ImageIdVO.create;
  let imageData1 = {
    width: 2,
    height: 1,
    data: Js.Typed_array.Uint8Array.make([|1|]),
  };
  let imageData2 = {
    width: 2,
    height: 2,
    data: Js.Typed_array.Uint8Array.make([|1, 2|]),
  };
  let imageData3 = {
    width: 2,
    height: 2,
    data:
      Js.Typed_array.Uint8Array.make([|
        3,
        2,
        1,
        255,
        100,
        150,
        101,
        255,
        102,
        150,
        101,
        255,
        97,
        150,
        101,
        255,
      |]),
  };
  let imageData4 = {
    width: 4,
    height: 2,
    data: Js.Typed_array.Uint8Array.make([|1, 3, 2|]),
  };
  let imageData5 = {
    width: 2,
    height: 4,
    data: Js.Typed_array.Uint8Array.make([|0, 4|]),
  };
  PBRMaterialCPAPI.setDiffuseMapImageId(material1, id2);
  PBRMaterialCPAPI.setChannelRoughnessMetallicMapImageId(material1, id1);
  PBRMaterialCPAPI.setNormalMapImageId(material1, id3);
  PBRMaterialCPAPI.setDiffuseMapImageId(material2, id2);
  PBRMaterialCPAPI.setEmissionMapImageId(material2, id4);
  PBRMaterialCPAPI.setChannelRoughnessMetallicMapImageId(material2, id1);
  ImageTool.setData(id1, imageData1);
  ImageTool.setData(id2, imageData2);
  ImageTool.setData(id3, imageData3);
  ImageTool.setData(id4, imageData4);
  ImageTool.setData(id5, imageData5);

  (
    (id1, id2, id3, id4, id5),
    (imageData1, imageData2, imageData3, imageData4, imageData5),
  );
};
