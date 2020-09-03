let getDevice = () => {
  CPRepo.getWebGPU().device;
};

let setDevice = device => {
  CPRepo.setWebGPU({...CPRepo.getWebGPU(), device: device->Some});
};

let getAdapter = () => {
  CPRepo.getWebGPU().adapter;
};

let setAdapter = adapter => {
  CPRepo.setWebGPU({...CPRepo.getWebGPU(), adapter: adapter->Some});
};

let getContext = () => {
  CPRepo.getWebGPU().context;
};

let setContext = context => {
  CPRepo.setWebGPU({...CPRepo.getWebGPU(), context: context->Some});
};

let getQueue = () => {
  CPRepo.getWebGPU().queue;
};

let setQueue = queue => {
  CPRepo.setWebGPU({...CPRepo.getWebGPU(), queue: queue->Some});
};

let getSwapChainFormat = () => {
  CPRepo.getWebGPU().swapChainFormat;
};

let setSwapChainFormat = swapChainFormat => {
  CPRepo.setWebGPU({
    ...CPRepo.getWebGPU(),
    swapChainFormat: swapChainFormat->Some,
  });
};

let getSwapChain = () => {
  CPRepo.getWebGPU().swapChain;
};

let setSwapChain = swapChain => {
  CPRepo.setWebGPU({...CPRepo.getWebGPU(), swapChain: swapChain->Some});
};
