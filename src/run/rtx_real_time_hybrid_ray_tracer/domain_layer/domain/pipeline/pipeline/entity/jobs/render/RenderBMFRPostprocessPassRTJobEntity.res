let create = () => JobEntity.create("render_bmfr_postprocess_pass")

let exec = () =>
  Tuple6.collectOption(
    WebGPURTRepo.getDevice(),
    WebGPURTRepo.getQueue(),
    WebGPURTRepo.getWindow(),
    WebGPURTRepo.getSwapChain(),
    BMFRPostprocessPassRTRepo.getStaticBindGroupData(),
    BMFRPostprocessPassRTRepo.getPipeline(),
  )
  ->Result.mapSuccess(((
    device,
    queue,
    window,
    swapChain,
    {setSlot, bindGroup}: PassRTPOType.staticBindGroupData,
    pipeline,
  )) => {
    let backBufferView = WebGPUCoreDpRunAPI.unsafeGet().swapChain.getCurrentTextureView(
      (),
      swapChain,
    )

    let commandEncoder = WebGPUCoreDpRunAPI.unsafeGet().device.createCommandEncoder(
      IWebGPUCoreDp.commandEncoderDescriptor(),
      device,
    )
    let renderPass = WebGPUCoreDpRunAPI.unsafeGet().commandEncoder.beginRenderPass(
      IWebGPUCoreDp.passEncoderRenderDescriptor(
        ~colorAttachments=[
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
        ],
        (),
      ),
      commandEncoder,
    )

    WebGPUCoreDpRunAPI.unsafeGet().passEncoder.render.setPipeline(pipeline, renderPass)

    WebGPUCoreDpRunAPI.unsafeGet().passEncoder.render.setBindGroup(setSlot, bindGroup, renderPass)

    WebGPUCoreDpRunAPI.unsafeGet().passEncoder.render.draw(3, 1, 0, 0, renderPass)

    WebGPUCoreDpRunAPI.unsafeGet().passEncoder.render.endPass(renderPass)

    WebGPUCoreDpRunAPI.unsafeGet().queue.submit(
      [WebGPUCoreDpRunAPI.unsafeGet().commandEncoder.finish(commandEncoder)],
      queue,
    )
  })
  ->WonderBsMost.Most.just
