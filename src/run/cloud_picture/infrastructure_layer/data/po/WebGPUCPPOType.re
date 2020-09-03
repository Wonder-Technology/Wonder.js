type webgpu = {
  device: option(IWebGPUCoreDp.deviceObject),
  adapter: option(IWebGPUCoreDp.adapterObject),
  context: option(IWebGPUCoreDp.contextObject),
  queue: option(IWebGPUCoreDp.queueObject),
  swapChainFormat: option(IWebGPUCoreDp.swapChainFormat),
  swapChain: option(IWebGPUCoreDp.swapChainObject),
};
