open RABType;

let generateSingleRAB = GenerateSingleRABSystem.generateSingleRAB;

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