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
    (
      {
        cubemapTextureIndices,
        pxImageIndices,
        nxImageIndices,
        pyImageIndices,
        nyImageIndices,
        pzImageIndices,
        nzImageIndices,
      }: WDType.imageCubemapTextureIndexData,
      cubemapTextureArr,
      imageUint8ArrayDataMap,
    ) =>
  cubemapTextureIndices
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. resultImageUint8ArrayDataMap, cubemapTextureIndex, index) =>
         resultImageUint8ArrayDataMap
         |> WonderCommonlib.MutableSparseMapService.set(
              Array.unsafe_get(cubemapTextureArr, cubemapTextureIndex),
              {
                pxImageUint8ArrayData:
                  imageUint8ArrayDataMap
                  |> WonderCommonlib.MutableSparseMapService.unsafeGet(
                       Array.unsafe_get(pxImageIndices, index),
                     ),
                nxImageUint8ArrayData:
                  imageUint8ArrayDataMap
                  |> WonderCommonlib.MutableSparseMapService.unsafeGet(
                       Array.unsafe_get(nxImageIndices, index),
                     ),
                pyImageUint8ArrayData:
                  imageUint8ArrayDataMap
                  |> WonderCommonlib.MutableSparseMapService.unsafeGet(
                       Array.unsafe_get(pyImageIndices, index),
                     ),
                nyImageUint8ArrayData:
                  imageUint8ArrayDataMap
                  |> WonderCommonlib.MutableSparseMapService.unsafeGet(
                       Array.unsafe_get(nyImageIndices, index),
                     ),
                pzImageUint8ArrayData:
                  imageUint8ArrayDataMap
                  |> WonderCommonlib.MutableSparseMapService.unsafeGet(
                       Array.unsafe_get(pzImageIndices, index),
                     ),
                nzImageUint8ArrayData:
                  imageUint8ArrayDataMap
                  |> WonderCommonlib.MutableSparseMapService.unsafeGet(
                       Array.unsafe_get(nzImageIndices, index),
                     ),
              }: WDType.cubemapTextureImageUint8ArrayData,
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