let _convertToImageTextureIndices =
    (
      (pxSource, nxSource, pySource, nySource, pzSource, nzSource),
      index,
      (
        imageCubemapTextureIndices,
        pxImageIndices,
        nxImageIndices,
        pyImageIndices,
        nyImageIndices,
        pzImageIndices,
        nzImageIndices,
      ),
    ) => (
  imageCubemapTextureIndices |> ArrayService.push(index),
  pxImageIndices |> ArrayService.push(pxSource),
  nxImageIndices |> ArrayService.push(nxSource),
  pyImageIndices |> ArrayService.push(pySource),
  nyImageIndices |> ArrayService.push(nySource),
  pzImageIndices |> ArrayService.push(pzSource),
  nzImageIndices |> ArrayService.push(nzSource),
);

let _convertToSamplerTextureIndices =
    (sampler, index, (samplerTextureIndices, samplerIndices)) => (
  samplerTextureIndices |> ArrayService.push(index),
  samplerIndices |> ArrayService.push(sampler),
);

let convertToImageAndSamplerTextureIndices = ({nodes, extras}: GLTFType.gltf) =>
  switch (extras) {
  | None => (([||], [||], [||], [||], [||], [||], [||]), ([||], [||]))
  | Some({cubemapTextures}) =>
    switch (cubemapTextures) {
    | None => (([||], [||], [||], [||], [||], [||], [||]), ([||], [||]))
    | Some(cubemapTextures) =>
      cubemapTextures
      |> WonderCommonlib.ArrayService.reduceOneParami(
           (.
             (
               (
                 imageCubemapTextureIndices,
                 pxImageIndices,
                 nxImageIndices,
                 pyImageIndices,
                 nyImageIndices,
                 pzImageIndices,
                 nzImageIndices,
               ),
               (samplerTextureIndices, samplerIndices),
             ),
             {
               sampler,
               pxSource,
               nxSource,
               pySource,
               nySource,
               pzSource,
               nzSource,
             }: GLTFType.cubemapTexture,
             index,
           ) => (
             _convertToImageTextureIndices(
               (pxSource, nxSource, pySource, nySource, pzSource, nzSource),
               index,
               (
                 imageCubemapTextureIndices,
                 pxImageIndices,
                 nxImageIndices,
                 pyImageIndices,
                 nyImageIndices,
                 pzImageIndices,
                 nzImageIndices,
               ),
             ),
             _convertToSamplerTextureIndices(
               sampler,
               index,
               (samplerTextureIndices, samplerIndices),
             ),
           ),
           (([||], [||], [||], [||], [||], [||], [||]), ([||], [||])),
         )
    }
  };