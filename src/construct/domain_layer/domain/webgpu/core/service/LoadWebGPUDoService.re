open WonderBsMost.Most;

let load = window => {
  fromPromise(
    DpContainer.unsafeGetWebGPUCoreDp().gpu.requestAdapter(
      IWebGPUCoreDp.adapterDescriptor(
        ~window,
        ~preferredBackend="Vulkan",
        (),
      ),
    ),
  )
  ->flatMap(
      adapter => {
        fromPromise(
          DpContainer.unsafeGetWebGPUCoreDp().adapter.requestDevice(
            {"extensions": [|"ray_tracing"|]},
            adapter,
          ),
        )
        ->flatMap(
            device => {
              let context =
                DpContainer.unsafeGetWebGPUCoreDp().window.getContext(window);
              let queue =
                DpContainer.unsafeGetWebGPUCoreDp().device.getQueue(device);

              fromPromise(
                DpContainer.unsafeGetWebGPUCoreDp().context.
                  getSwapChainPreferredFormat(
                  device,
                  context,
                ),
              )
              ->map(
                  swapChainFormat => {
                    (adapter, device, context, queue, swapChainFormat)
                  },
                  _,
                );
            },
            _,
          )
      },
      _,
    );
};
