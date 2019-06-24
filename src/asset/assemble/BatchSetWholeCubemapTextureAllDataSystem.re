open StateDataMainType;

open WDType;

let _setSource =
    (
      cubemapTexture,
      cubemapTextureImages,
      imageCubemapTextureIndex,
      setSourceFunc,
      state,
    ) =>
  switch (ArrayService.getNth(imageCubemapTextureIndex, cubemapTextureImages)) {
  | None => state
  | Some(image) => setSourceFunc(cubemapTexture, image, state)
  };

let _batchSetCubemapTextureSources =
    (
      imageCubemapTextures,
      (
        cubemapTexturePXImages,
        cubemapTextureNXImages,
        cubemapTexturePYImages,
        cubemapTextureNYImages,
        cubemapTexturePZImages,
        cubemapTextureNZImages,
      ),
      {settingRecord} as state,
    ) =>
  imageCubemapTextures
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, cubemapTexture, index) =>
         state
         |> _setSource(
              cubemapTexture,
              cubemapTexturePXImages,
              index,
              OperateCubemapTextureMainService.setPXSource,
            )
         |> _setSource(
              cubemapTexture,
              cubemapTextureNXImages,
              index,
              OperateCubemapTextureMainService.setNXSource,
            )
         |> _setSource(
              cubemapTexture,
              cubemapTexturePYImages,
              index,
              OperateCubemapTextureMainService.setPYSource,
            )
         |> _setSource(
              cubemapTexture,
              cubemapTextureNYImages,
              index,
              OperateCubemapTextureMainService.setNYSource,
            )
         |> _setSource(
              cubemapTexture,
              cubemapTexturePZImages,
              index,
              OperateCubemapTextureMainService.setPZSource,
            )
         |> _setSource(
              cubemapTexture,
              cubemapTextureNZImages,
              index,
              OperateCubemapTextureMainService.setNZSource,
            ),
       state,
     );

let convertKeyFromImageIndexToCubemapTexture =
    (imageTextureIndexData, cubemapTextureArr, imageUint8ArrayDataMap) =>
  imageUint8ArrayDataMap
  |> WonderCommonlib.MutableSparseMapService.reduceiValid(
       (. resultImageUint8ArrayDataMap, data, imageIndex) =>
         IndicesUtils.getAllCubemapTextures(
           imageIndex,
           cubemapTextureArr,
           imageTextureIndexData,
         )
         |> WonderCommonlib.ArrayService.reduceOneParam(
              (. resultImageUint8ArrayDataMap, cubemapTexture) =>
                resultImageUint8ArrayDataMap
                |> WonderCommonlib.MutableSparseMapService.set(
                     cubemapTexture,
                     data,
                   ),
              resultImageUint8ArrayDataMap,
            ),
       WonderCommonlib.MutableSparseMapService.createEmpty(),
     );

let batchSet =
    (
      (
        (samplerCubemapTextures, cubemapTextureSamplers),
        (
          imageCubemapTextures,
          cubemapTexturePXImages,
          cubemapTextureNXImages,
          cubemapTexturePYImages,
          cubemapTextureNYImages,
          cubemapTexturePZImages,
          cubemapTextureNZImages,
        ),
      ),
      state,
    ) =>
  state
  |> BatchSetCubemapTextureAllDataSystem.batchSetCubemapTextureData(
       samplerCubemapTextures,
       cubemapTextureSamplers,
     )
  |> _batchSetCubemapTextureSources(
       imageCubemapTextures,
       (
         cubemapTexturePXImages,
         cubemapTextureNXImages,
         cubemapTexturePYImages,
         cubemapTextureNYImages,
         cubemapTexturePZImages,
         cubemapTextureNZImages,
       ),
     );