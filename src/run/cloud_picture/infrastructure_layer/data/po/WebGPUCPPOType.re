type layerIndex = int;

type textureArray = {
  layerIndexMap: ImmutableHashMap.t(ImagePOType.id, layerIndex),
  textureArrayView: option(IWebGPUCoreDp.textureViewObject),
  textureSampler: option(IWebGPUCoreDp.samplerObject),
};

type webgpu = {
  device: option(IWebGPUCoreDp.deviceObject),
  window: option(IWebGPUCoreDp.windowObject),
  adapter: option(IWebGPUCoreDp.adapterObject),
  context: option(IWebGPUCoreDp.contextObject),
  queue: option(IWebGPUCoreDp.queueObject),
  swapChainFormat: option(IWebGPUCoreDp.textureFormat),
  swapChain: option(IWebGPUCoreDp.swapChainObject),
  textureArray,
};
