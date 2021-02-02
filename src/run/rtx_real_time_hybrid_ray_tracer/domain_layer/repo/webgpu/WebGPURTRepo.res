let getDevice = () => RTRepo.getWebGPU().device

let setDevice = device => RTRepo.setWebGPU({...RTRepo.getWebGPU(), device: device->Some})

let getWindow = () => RTRepo.getWebGPU().window

let setWindow = window => RTRepo.setWebGPU({...RTRepo.getWebGPU(), window: window->Some})

let getAdapter = () => RTRepo.getWebGPU().adapter

let setAdapter = adapter => RTRepo.setWebGPU({...RTRepo.getWebGPU(), adapter: adapter->Some})

let getContext = () => RTRepo.getWebGPU().context

let setContext = context => RTRepo.setWebGPU({...RTRepo.getWebGPU(), context: context->Some})

let getQueue = () => RTRepo.getWebGPU().queue

let setQueue = queue => RTRepo.setWebGPU({...RTRepo.getWebGPU(), queue: queue->Some})

let getSwapChainFormat = () => RTRepo.getWebGPU().swapChainFormat

let setSwapChainFormat = swapChainFormat =>
  RTRepo.setWebGPU({
    ...RTRepo.getWebGPU(),
    swapChainFormat: swapChainFormat->Some,
  })

let getSwapChain = () => RTRepo.getWebGPU().swapChain

let setSwapChain = swapChain =>
  RTRepo.setWebGPU({...RTRepo.getWebGPU(), swapChain: swapChain->Some})
