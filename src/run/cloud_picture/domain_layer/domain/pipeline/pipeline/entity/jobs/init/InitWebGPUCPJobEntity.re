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

            WebGPUCPDoService.setDevice(device);
            WebGPUCPDoService.setAdapter(adapter);
            WebGPUCPDoService.setContext(context);
            WebGPUCPDoService.setQueue(queue);
            WebGPUCPDoService.setSwapChainFormat(swapChainFormat);
            WebGPUCPDoService.setSwapChain(swapChain);

            ();
          },
          _,
        )
    });
};