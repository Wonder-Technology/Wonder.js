let getBasicSourceTextures =
    (
      imageIndex,
      basicSourceTextureArr,
      {textureIndices, imageIndices}: WDType.imageTextureIndexData,
    ) =>
  imageIndices
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. indexArr, imageSource, index) =>
         imageSource === imageIndex ?
           indexArr |> ArrayService.push(index) : indexArr,
       [||],
     )
  |> Js.Array.map(index =>
       Array.unsafe_get(
         basicSourceTextureArr,
         Array.unsafe_get(textureIndices, index),
       )
     );