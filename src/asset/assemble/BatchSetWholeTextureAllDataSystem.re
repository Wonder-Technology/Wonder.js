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

let convertKeyFromImageIndexToBasicSourceTexture =
    (imageTextureIndexData, basicSourceTextureArr, imageUint8ArrayDataMap) =>
  imageUint8ArrayDataMap
  |> SparseMapService.reduceiValid(
       (. resultImageUint8ArrayDataMap, data, imageIndex) =>
         IndicesUtils.getBasicSourceTextures(
           imageIndex,
           basicSourceTextureArr,
           imageTextureIndexData,
         )
         |> WonderCommonlib.ArrayService.reduceOneParam(
              (. resultImageUint8ArrayDataMap, basicSourceTexture) =>
                resultImageUint8ArrayDataMap
                |> WonderCommonlib.SparseMapService.set(
                     basicSourceTexture,
                     data,
                   ),
              resultImageUint8ArrayDataMap,
            ),
       WonderCommonlib.SparseMapService.createEmpty(),
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