let create = () => JobEntity.create("render_bmfr_regression_pass")

let exec = () =>
  Tuple5.collectOption(
    WebGPURTRepo.getDevice(),
    WebGPURTRepo.getQueue(),
    WebGPURTRepo.getWindow(),
    BMFRRegressionPassRTRepo.getStaticBindGroupData(),
    BMFRRegressionPassRTRepo.getPipeline(),
  )
  ->Result.mapSuccess(((
    device,
    queue,
    window,
    {setSlot, bindGroup}: PassRTPOType.staticBindGroupData,
    pipeline,
  )) => {
    let commandEncoder = WebGPUCoreDpRunAPI.unsafeGet().device.createCommandEncoder(
      IWebGPUCoreDp.commandEncoderDescriptor(),
      device,
    )
    let computePass = WebGPUCoreDpRunAPI.unsafeGet().commandEncoder.beginComputePass(
      IWebGPUCoreDp.passEncoderComputeDescriptor(),
      commandEncoder,
    )

    WebGPUCoreDpRunAPI.unsafeGet().passEncoder.compute.setPipeline(pipeline, computePass)

    WebGPUCoreDpRunAPI.unsafeGet().passEncoder.compute.setBindGroup(setSlot, bindGroup, computePass)

    let w = BMFRRegressPassRTDoService.computeHorizentalBlocksCount(window)
    let h = BMFRRegressPassRTDoService.computeVerticalBlocksCount(window)
    WebGPUCoreDpRunAPI.unsafeGet().passEncoder.compute.dispatchX(w * h, computePass)

    WebGPUCoreDpRunAPI.unsafeGet().passEncoder.compute.endPass(computePass)

    WebGPUCoreDpRunAPI.unsafeGet().queue.submit(
      [WebGPUCoreDpRunAPI.unsafeGet().commandEncoder.finish(commandEncoder)],
      queue,
    )
  })
  ->WonderBsMost.Most.just
