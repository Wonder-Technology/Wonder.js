let create = () => JobEntity.create("render_accumulation");

let exec = () => {
  Tuple6.collectOption(
    WebGPUCPRepo.getDevice(),
    WebGPUCPRepo.getQueue(),
    WebGPUCPRepo.getWindow(),
    WebGPUCPRepo.getSwapChain(),
    AccumulationPassCPRepo.getStaticBindGroupData(),
    AccumulationPassCPRepo.getPipeline(),
  )
  ->Result.mapSuccess(
      (
        (
          device,
          queue,
          window,
          swapChain,
          {setSlot, bindGroup}: PassCPPOType.staticBindGroupData,
          pipeline,
        ),
      ) => {
      let backBufferView =
        DpContainer.unsafeGetWebGPUCoreDp().swapChain.getCurrentTextureView(
          (),
          swapChain,
        );

      let commandEncoder =
        DpContainer.unsafeGetWebGPUCoreDp().device.createCommandEncoder(
          IWebGPUCoreDp.commandEncoderDescriptor(),
          device,
        );
      let renderPass =
        DpContainer.unsafeGetWebGPUCoreDp().commandEncoder.beginRenderPass(
          IWebGPUCoreDp.passEncoderRenderDescriptor(
            ~colorAttachments=[|
              {
                "clearColor": {
                  "r": 0.0,
                  "g": 0.0,
                  "b": 0.0,
                  "a": 1.0,
                },
                "loadOp": "clear",
                "storeOp": "store",
                "attachment": backBufferView,
              },
            |],
            (),
          ),
          commandEncoder,
        );

      DpContainer.unsafeGetWebGPUCoreDp().passEncoder.render.setPipeline(
        pipeline,
        renderPass,
      );

      DpContainer.unsafeGetWebGPUCoreDp().passEncoder.render.setBindGroup(
        setSlot,
        bindGroup,
        renderPass,
      );

      DpContainer.unsafeGetWebGPUCoreDp().passEncoder.render.draw(
        3,
        1,
        0,
        0,
        renderPass,
      );

      DpContainer.unsafeGetWebGPUCoreDp().passEncoder.render.endPass(
        renderPass,
      );

      DpContainer.unsafeGetWebGPUCoreDp().queue.submit(
        [|
          DpContainer.unsafeGetWebGPUCoreDp().commandEncoder.finish(
            commandEncoder,
          ),
        |],
        queue,
      );
    })
  ->WonderBsMost.Most.just;
};
