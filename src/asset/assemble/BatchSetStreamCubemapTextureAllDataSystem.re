open StateDataMainType;

open WDType;

let _batchSetCubemapTextureSources =
    (imageCubemapTextures, default11Image, {settingRecord} as state) =>
  imageCubemapTextures
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, cubemapTexture) =>
         state
         |> OperateCubemapTextureMainService.setPXSource(
              cubemapTexture,
              default11Image,
            )
         |> OperateCubemapTextureMainService.setNXSource(
              cubemapTexture,
              default11Image,
            )
         |> OperateCubemapTextureMainService.setPYSource(
              cubemapTexture,
              default11Image,
            )
         |> OperateCubemapTextureMainService.setNYSource(
              cubemapTexture,
              default11Image,
            )
         |> OperateCubemapTextureMainService.setPZSource(
              cubemapTexture,
              default11Image,
            )
         |> OperateCubemapTextureMainService.setNZSource(
              cubemapTexture,
              default11Image,
            ),
       state,
     );

let batchSet =
    (
      (
        (samplerCubemapTextures, cubemapTextureSamplers),
        (imageCubemapTextures, default11Image),
      ),
      state,
    ) =>
  state
  |> BatchSetCubemapTextureAllDataSystem.batchSetCubemapTextureData(
       samplerCubemapTextures,
       cubemapTextureSamplers,
     )
  |> _batchSetCubemapTextureSources(imageCubemapTextures, default11Image);