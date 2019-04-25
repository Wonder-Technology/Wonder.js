open RABType;

let generateSingleRAB = GenerateRABSystem.generateSingleRAB;

let buildResourceData =
    (
      basicMaterials,
      lightMaterials,
      textures,
      geometrys,
      scriptEventFunctionDataArr,
      scriptAttributeDataArr,
      imageDataMap,
    )
    : resourceData => {
  basicMaterials,
  lightMaterials,
  textures,
  geometrys,
  scriptEventFunctionDataArr,
  scriptAttributeDataArr,
  imageDataMap,
};