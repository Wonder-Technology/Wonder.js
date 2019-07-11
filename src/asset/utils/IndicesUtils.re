let _getTextureIndexArr = (imageIndex, imageIndices, indexArr) =>
  imageIndices
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. indexArr, imageSource, index) =>
         imageSource === imageIndex ?
           indexArr |> ArrayService.push(index) : indexArr,
       indexArr,
     );

let getBasicSourceTextures =
    (
      imageIndex,
      basicSourceTextureArr,
      {textureIndices, imageIndices}: WDType.imageTextureIndexData,
    ) =>
  [||]
  |> _getTextureIndexArr(imageIndex, imageIndices)
  |> Js.Array.map(index =>
       Array.unsafe_get(
         basicSourceTextureArr,
         Array.unsafe_get(textureIndices, index),
       )
     );

let _getOneFaceCubemapTextures =
    (imageIndex, cubemapTextureArr, cubemapTextureIndices, imageIndices) =>
  [||]
  |> _getTextureIndexArr(imageIndex, imageIndices)
  |> Js.Array.map(index =>
       Array.unsafe_get(
         cubemapTextureArr,
         Array.unsafe_get(cubemapTextureIndices, index),
       )
     );

let getPXCubemapTextures =
    (
      imageIndex,
      cubemapTextureArr,
      {
        cubemapTextureIndices,
        pxImageIndices,
        nxImageIndices,
        pyImageIndices,
        nyImageIndices,
        pzImageIndices,
        nzImageIndices,
      }: WDType.imageCubemapTextureIndexData,
    ) =>
  _getOneFaceCubemapTextures(
    imageIndex,
    cubemapTextureArr,
    cubemapTextureIndices,
    pxImageIndices,
  );

let getNXCubemapTextures =
    (
      imageIndex,
      cubemapTextureArr,
      {
        cubemapTextureIndices,
        pxImageIndices,
        nxImageIndices,
        pyImageIndices,
        nyImageIndices,
        pzImageIndices,
        nzImageIndices,
      }: WDType.imageCubemapTextureIndexData,
    ) =>
  _getOneFaceCubemapTextures(
    imageIndex,
    cubemapTextureArr,
    cubemapTextureIndices,
    nxImageIndices,
  );

let getPYCubemapTextures =
    (
      imageIndex,
      cubemapTextureArr,
      {
        cubemapTextureIndices,
        pxImageIndices,
        nxImageIndices,
        pyImageIndices,
        nyImageIndices,
        pzImageIndices,
        nzImageIndices,
      }: WDType.imageCubemapTextureIndexData,
    ) =>
  _getOneFaceCubemapTextures(
    imageIndex,
    cubemapTextureArr,
    cubemapTextureIndices,
    pyImageIndices,
  );

let getNYCubemapTextures =
    (
      imageIndex,
      cubemapTextureArr,
      {
        cubemapTextureIndices,
        pxImageIndices,
        nxImageIndices,
        pyImageIndices,
        nyImageIndices,
        pzImageIndices,
        nzImageIndices,
      }: WDType.imageCubemapTextureIndexData,
    ) =>
  _getOneFaceCubemapTextures(
    imageIndex,
    cubemapTextureArr,
    cubemapTextureIndices,
    nyImageIndices,
  );

let getPZCubemapTextures =
    (
      imageIndex,
      cubemapTextureArr,
      {
        cubemapTextureIndices,
        pxImageIndices,
        nxImageIndices,
        pyImageIndices,
        nyImageIndices,
        pzImageIndices,
        nzImageIndices,
      }: WDType.imageCubemapTextureIndexData,
    ) =>
  _getOneFaceCubemapTextures(
    imageIndex,
    cubemapTextureArr,
    cubemapTextureIndices,
    pzImageIndices,
  );

let getNZCubemapTextures =
    (
      imageIndex,
      cubemapTextureArr,
      {
        cubemapTextureIndices,
        pxImageIndices,
        nxImageIndices,
        pyImageIndices,
        nyImageIndices,
        pzImageIndices,
        nzImageIndices,
      }: WDType.imageCubemapTextureIndexData,
    ) =>
  _getOneFaceCubemapTextures(
    imageIndex,
    cubemapTextureArr,
    cubemapTextureIndices,
    nzImageIndices,
  );