

let create = () => JobEntity.create("init_webgpu")

let exec = () => PictureCPDoService.getSize()->OptionSt.get->Result.mapSuccess(((width, height)) =>
    WebGPUCoreDpRunAPI.unsafeGet().window.make({
      "width": width,
      "height": height,
      "title": "Cloud Picture",
      "resizable": false,
    })
    ->WebGPUCoreRunAPI.load
    ->WonderBsMost.Most.map(((window, adapter, device, context, queue, swapChainFormat)) => {
      let swapChain = WebGPUCoreDpRunAPI.unsafeGet().context.configureSwapChain(
        {"device": device, "format": swapChainFormat},
        context,
      )

      WebGPUCPRepo.setWindow(window)
      WebGPUCPRepo.setDevice(device)
      WebGPUCPRepo.setAdapter(adapter)
      WebGPUCPRepo.setContext(context)
      WebGPUCPRepo.setQueue(queue)
      WebGPUCPRepo.setSwapChainFormat(swapChainFormat)
      WebGPUCPRepo.setSwapChain(swapChain)

      ()
    }, _)
  )->ResultMost.sequenceMostM
