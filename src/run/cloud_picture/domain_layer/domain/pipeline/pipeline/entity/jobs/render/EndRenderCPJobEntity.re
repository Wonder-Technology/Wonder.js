let create = () => JobEntity.create("end_render");

let exec = () => {
  Tuple2.collectOption(WebGPUCPRepo.getWindow(), WebGPUCPRepo.getSwapChain())
  ->Result.mapSuccess(((window, swapChain)) => {
      DpContainer.unsafeGetWebGPUCoreDp().swapChain.present(swapChain);

      DpContainer.unsafeGetWebGPUCoreDp().window.pollEvents((), window);
    })
  ->WonderBsMost.Most.just;
};
