open StateDataMainType;

open WDType;

let _batchSetBasicSourceTextureSources =
    (
      imageBasicSourceTextures,
      basicSourceTextureImages,
      {settingRecord} as state,
    ) =>
  imageBasicSourceTextures
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, basicSourceTexture, index) => {
         let image = Array.unsafe_get(basicSourceTextureImages, index);

         OperateBasicSourceTextureMainService.setSource(
           basicSourceTexture,
           image,
           state,
         );
       },
       state,
     );

let batchSet =
    (
      (
        (diffuseMapLightMaterials, lightMaterialDiffuseMaps),
        (samplerBasicSourceTextures, basicSourceTextureSamplers),
        (imageBasicSourceTextures, basicSourceTextureImages),
      ),
      state,
    ) =>
  state
  |> BatchSetTextureAllDataSystem.batchSetNewDiffueMaps(
       diffuseMapLightMaterials,
       lightMaterialDiffuseMaps,
     )
  |> BatchSetTextureAllDataSystem.batchSetBasicSourceTextureData(
       samplerBasicSourceTextures,
       basicSourceTextureSamplers,
     )
  |> _batchSetBasicSourceTextureSources(
       imageBasicSourceTextures,
       basicSourceTextureImages,
     );