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
      basicSourceTextureImageDataMap,
      cubemapTextureImageDataMap,
    )
    : ResourceData.resourceData => {
  basicMaterials,
  lightMaterials,
  basicSourceTextures,
  cubemapTextures,
  geometrys,
  scriptEventFunctionDataArr,
  scriptAttributeDataArr,
  basicSourceTextureImageDataMap,
  cubemapTextureImageDataMap,
};