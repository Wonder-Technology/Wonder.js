

let create = () => JobEntity.create("end_render")

let exec = () =>
  Tuple2.collectOption(WebGPURTRepo.getWindow(), WebGPURTRepo.getSwapChain())->Result.mapSuccess(((
    window,
    swapChain,
  )) => {
    WebGPUCoreDpRunAPI.unsafeGet().swapChain.present(swapChain)

    WebGPUCoreDpRunAPI.unsafeGet().window.pollEvents(window)
  })->WonderBsMost.Most.just
