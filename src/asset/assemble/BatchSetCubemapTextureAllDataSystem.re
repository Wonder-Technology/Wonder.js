open StateDataMainType;

open WDType;

let batchSetCubemapTextureData =
    (
      samplerCubemapTextures,
      cubemapTextureSamplers,
      {settingRecord} as state,
    ) =>
  samplerCubemapTextures
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, cubemapTexture, index) => {
         let {magFilter, minFilter, wrapS, wrapT}: WDType.sampler =
           Array.unsafe_get(cubemapTextureSamplers, index);

         state
         |> OperateCubemapTextureMainService.setWrapS(
              cubemapTexture,
              wrapS |> TextureType.wrapToUint8,
            )
         |> OperateCubemapTextureMainService.setWrapT(
              cubemapTexture,
              wrapT |> TextureType.wrapToUint8,
            )
         |> OperateCubemapTextureMainService.setMagFilter(
              cubemapTexture,
              magFilter |> TextureType.filterToUint8,
            )
         |> OperateCubemapTextureMainService.setMinFilter(
              cubemapTexture,
              minFilter |> TextureType.filterToUint8,
            );
       },
       state,
     );

let batchSetFormatAndTypeAndFlipY =
    (cubemapTextureArr, cubemapTextures, state) =>
  cubemapTextureArr
  |> ArrayService.reduceOneParamValidi(
       (. state, cubemapTexture, index) => {
         let {
           flipY,
           pxFormat,
           nxFormat,
           pyFormat,
           nyFormat,
           pzFormat,
           nzFormat,
           pxType,
           nxType,
           pyType,
           nyType,
           pzType,
           nzType,
         } =
           Array.unsafe_get(cubemapTextures, index);

         state
         |> OperateCubemapTextureMainService.setPXFormat(
              cubemapTexture,
              pxFormat,
            )
         |> OperateCubemapTextureMainService.setNXFormat(
              cubemapTexture,
              nxFormat,
            )
         |> OperateCubemapTextureMainService.setPYFormat(
              cubemapTexture,
              pyFormat,
            )
         |> OperateCubemapTextureMainService.setNYFormat(
              cubemapTexture,
              nyFormat,
            )
         |> OperateCubemapTextureMainService.setPZFormat(
              cubemapTexture,
              pzFormat,
            )
         |> OperateCubemapTextureMainService.setNZFormat(
              cubemapTexture,
              nzFormat,
            )
         |> OperateCubemapTextureMainService.setPXType(
              cubemapTexture,
              pxType,
            )
         |> OperateCubemapTextureMainService.setNXType(
              cubemapTexture,
              nxType,
            )
         |> OperateCubemapTextureMainService.setPYType(
              cubemapTexture,
              pyType,
            )
         |> OperateCubemapTextureMainService.setNYType(
              cubemapTexture,
              nyType,
            )
         |> OperateCubemapTextureMainService.setPZType(
              cubemapTexture,
              pzType,
            )
         |> OperateCubemapTextureMainService.setNZType(
              cubemapTexture,
              nzType,
            )
         |> OperateCubemapTextureMainService.setFlipY(cubemapTexture, flipY);
       },
       state,
     );