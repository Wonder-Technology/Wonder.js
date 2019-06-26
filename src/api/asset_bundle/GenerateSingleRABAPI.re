open RABType;

let generateSingleRAB = GenerateSingleRABSystem.generateSingleRAB;

let buildResourceData =
    (
      basicMaterials,
      lightMaterials,
      basicSourceTextures,
      cubemapTextures,
      geometrys,
      scriptEventFunctionDataArr,
      scriptAttributeDataArr,
      imageDataMap,
    )
    : resourceData => {
  basicMaterials,
  lightMaterials,
  basicSourceTextures,
  cubemapTextures,
  geometrys,
  scriptEventFunctionDataArr,
  scriptAttributeDataArr,
  imageDataMap,
};