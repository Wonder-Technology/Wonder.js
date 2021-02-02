type layerIndex = int

type width = int

type height = int

type textureArray = {
  layerIndexMap: ImmutableHashMap.t<ImageRepoType.id, layerIndex>,
  textureArrayView: option<IWebGPUCoreDp.textureViewObject>,
  textureSampler: option<IWebGPUCoreDp.samplerObject>,
  layerSize: (width, height),
}

type webgpu = {
  device: option<IWebGPUCoreDp.deviceObject>,
  window: option<IWebGPUCoreDp.windowObject>,
  adapter: option<IWebGPUCoreDp.adapterObject>,
  context: option<IWebGPUCoreDp.contextObject>,
  queue: option<IWebGPUCoreDp.queueObject>,
  swapChainFormat: option<IWebGPUCoreDp.textureFormat>,
  swapChain: option<IWebGPUCoreDp.swapChainObject>,
  textureArray: textureArray,
}
