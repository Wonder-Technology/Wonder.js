let convertToIndices = (gltf: GLTFType.gltf): WDType.indices => {
  let (
    (imageBasicSourceTextureIndices, imageIndices),
    (samplerTextureIndices, samplerIndices),
  ) =
    ConvertBasicSourceTextureIndicesSystem.convertToImageAndSamplerTextureIndices(
      gltf,
    );

  let (
    (
      imageCubemapTextureIndices,
      pxImageIndices,
      nxImageIndices,
      pyImageIndices,
      nyImageIndices,
      pzImageIndices,
      nzImageIndices,
    ),
    (samplerCubemapTextureIndices, cubemapSamplerIndices),
  ) =
    ConvertCubemapTextureIndicesSystem.convertToImageAndSamplerTextureIndices(
      gltf,
    );

  {
    gameObjectIndices:
      ConvertGameObjectIndexDataSystem.convertToGameObjectIndexData(gltf),
    materialIndices:
      ConvertMaterialIndicesSystem.convertToMaterialIndices(gltf),
    imageBasicSourceTextureIndices: {
      textureIndices: imageBasicSourceTextureIndices,
      imageIndices,
    },
    imageCubemapTextureIndices: {
      cubemapTextureIndices: imageCubemapTextureIndices,
      pxImageIndices,
      nxImageIndices,
      pyImageIndices,
      nyImageIndices,
      pzImageIndices,
      nzImageIndices,
    },
    samplerTextureIndices: {
      textureIndices: samplerTextureIndices,
      samplerIndices,
    },
    samplerCubemapTextureIndices: {
      cubemapTextureIndices: samplerCubemapTextureIndices,
      samplerIndices: cubemapSamplerIndices,
    },
  };
};