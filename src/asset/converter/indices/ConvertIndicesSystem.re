let convertToIndices = (gltf: GLTFType.gltf): WDType.indices => {
  let (
    (imageTextureIndices, imageIndices),
    (samplerTextureIndices, samplerIndices),
  ) =
    ConvertTextureIndicesSystem.convertToImageAndSamplerTextureIndices(gltf);

  {
    gameObjectIndices:
      ConvertGameObjectIndexDataSystem.convertToGameObjectIndexData(gltf),
    materialIndices:
      ConvertMaterialIndicesSystem.convertToMaterialIndices(gltf),
    imageTextureIndices: {
      textureIndices: imageTextureIndices,
      imageIndices,
    },
    samplerTextureIndices: {
      textureIndices: samplerTextureIndices,
      samplerIndices,
    },
  };
};