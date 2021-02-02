let create = () => JobEntity.create("init_webgpu")

let exec = () => PictureRTDoService.getSize()->OptionSt.get->Result.mapSuccess(((width, height)) =>
    WebGPUCoreDpRunAPI.unsafeGet().window.make({
      "width": width,
      "height": height,
      // "title": "Cloud Picture",
      "title": "实时渲染Demo",
      "resizable": false,
    })
    ->WebGPUCoreRunAPI.load
    ->WonderBsMost.Most.map(((window, adapter, device, context, queue, swapChainFormat)) => {
      let swapChain = WebGPUCoreDpRunAPI.unsafeGet().context.configureSwapChain(
        {"device": device, "format": swapChainFormat},
        context,
      )

      WebGPURTRepo.setWindow(window)
      WebGPURTRepo.setDevice(device)
      WebGPURTRepo.setAdapter(adapter)
      WebGPURTRepo.setContext(context)
      WebGPURTRepo.setQueue(queue)
      WebGPURTRepo.setSwapChainFormat(swapChainFormat)
      WebGPURTRepo.setSwapChain(swapChain)

      ()
    }, _)
  )->ResultMost.sequenceMostM
