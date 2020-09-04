let create = () => JobEntity.create("init_webgpu");

let exec = () => {
  PictureCPDoService.getSize()
  ->OptionSt.get
  ->Result.mapSuccess(((width, height)) => {
      DpContainer.unsafeGetWebGPUCoreDp().window.make({
        "width": width,
        "height": height,
        "title": "Cloud Picture",
        "resizable": false,
      })
      ->LoadWebGPUDoService.load
      ->WonderBsMost.Most.tap(
          ((adapter, device, context, queue, swapChainFormat)) => {
            let swapChain =
              DpContainer.unsafeGetWebGPUCoreDp().context.configureSwapChain(
                {"device": device, "format": swapChainFormat},
                context,
              );

            WebGPUCPRepo.setDevice(device);
            WebGPUCPRepo.setAdapter(adapter);
            WebGPUCPRepo.setContext(context);
            WebGPUCPRepo.setQueue(queue);
            WebGPUCPRepo.setSwapChainFormat(swapChainFormat);
            WebGPUCPRepo.setSwapChain(swapChain);

            ();
          },
          _,
        )
    });
};